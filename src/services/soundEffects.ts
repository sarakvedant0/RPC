/**
 * Sound synthesizer using Web Audio API for zero-dependency, ultra-reliable
 * rocket launch audio, propulsion rumble, radio squelch, and telemetry beeps.
 */

class SoundEffectsService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private rocketNoiseNode: AudioNode | null = null;
  private rocketGainNode: GainNode | null = null;
  private rumbleFilterNode: BiquadFilterNode | null = null;
  private isRunningRumble: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.rocketGainNode && this.ctx) {
        this.rocketGainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Countdown beep for T- minus
   */
  public playCountdownBeep(isTerminal: boolean = false) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isTerminal ? 1200 : 880, this.ctx.currentTime);

      const duration = isTerminal ? 0.35 : 0.12;
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Radio squelch / comms burst
   */
  public playRadioSquelch() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.2;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Audio fallback
    }
  }

  /**
   * Click / Telemetry step beep
   */
  public playTelemetryClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Continuous deep rocket engine rumble and roar modulated by thrust intensity (0 to 1)
   */
  public startRocketRumble(initialIntensity: number = 0.2) {
    if (this.isRunningRumble) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      this.isRunningRumble = true;
      // Synthesize pink/brown noise for low-end rumble
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter: deep low-pass for rumbling thrust
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120 + initialIntensity * 400, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.isMuted ? 0 : Math.min(0.4, initialIntensity * 0.45), this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();

      this.rocketNoiseNode = whiteNoise;
      this.rocketGainNode = gain;
      this.rumbleFilterNode = filter;
    } catch {
      // Audio fallback
    }
  }

  public updateRocketRumble(intensity: number) {
    if (!this.ctx || !this.rocketGainNode || !this.rumbleFilterNode) return;
    try {
      const clamped = Math.max(0, Math.min(1, intensity));
      const targetGain = this.isMuted ? 0 : 0.05 + clamped * 0.35;
      const targetFreq = 90 + clamped * 450;
      this.rocketGainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
      this.rumbleFilterNode.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.05);
    } catch {
      // Audio fallback
    }
  }

  public stopRocketRumble() {
    if (!this.isRunningRumble) return;
    if (this.rocketNoiseNode && 'stop' in this.rocketNoiseNode) {
      try {
        (this.rocketNoiseNode as AudioBufferSourceNode).stop();
      } catch {
        // Stop catch
      }
    }
    this.rocketNoiseNode = null;
    this.rocketGainNode = null;
    this.rumbleFilterNode = null;
    this.isRunningRumble = false;
  }
}

export const soundEffects = new SoundEffectsService();
