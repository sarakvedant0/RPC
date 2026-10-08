import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, CheckCircle2, Building, Globe } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    affiliation: '',
    subject: 'Student Recruitment / Membership',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#04070e] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Campus Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
                <span>OFFICIAL PORTAL · CONTACT & LAB VISIT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
                Get in Touch with RPC
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                Reach out for student recruitment, academic collaborations, industry sponsorships,
                or sounding rocket payload opportunities at COEP Technological University.
              </p>

              <div className="space-y-4 text-xs font-mono text-slate-300">
                <div className="p-4 bg-[#070b14] border border-slate-800 rounded-xl flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-slate-500 uppercase text-[10px]">CAMPUS LOCATION</div>
                    <div className="text-white font-medium mt-0.5">
                      Rocket Propulsion Centre (RPC)
                    </div>
                    <div className="text-slate-400 mt-0.5">
                      Department of Mechanical Engineering, COEP Technological University,
                      Wellesley Road, Shivajinagar, Pune – 411005, Maharashtra, India
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#070b14] border border-slate-800 rounded-xl flex items-start gap-3">
                  <Mail className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-slate-500 uppercase text-[10px]">OFFICIAL EMAIL ADDRESS</div>
                    <div className="text-white font-medium mt-0.5">
                      rpc@coeptech.ac.in
                    </div>
                    <div className="text-slate-400 mt-0.5">
                      contact.rpc.coep@gmail.com
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#070b14] border border-slate-800 rounded-xl flex items-start gap-3">
                  <Globe className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-slate-500 uppercase text-[10px]">UNIVERSITY AFFILIATION</div>
                    <div className="text-white font-medium mt-0.5">
                      COEP Technological University (www.coeptech.ac.in)
                    </div>
                    <div className="text-slate-400 mt-0.5">
                      Unitary Public University established under Government of Maharashtra
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800/80 text-xs font-mono text-slate-500">
              CAMPUS GPS: 18.5293° N, 73.8565° E · SHIVAJINAGAR, PUNE
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#070b14] border border-slate-800 rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center justify-center animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading mb-2">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs text-slate-300 max-w-md leading-relaxed mb-6">
                  Thank you for reaching out to the Rocket Propulsion Centre, COEP Technological University.
                  Our team leads will review your inquiry and follow up shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      name: '',
                      email: '',
                      affiliation: '',
                      subject: 'Student Recruitment / Membership',
                      message: '',
                    });
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white rounded transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-800 pb-3 mb-4">
                  <h3 className="text-lg font-bold font-heading text-white">
                    Submit an Inquiry or Collaboration Request
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Please provide your details below. We review all incoming messages within 48 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Affiliation / Institution *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.affiliation}
                      onChange={(e) => setFormState({ ...formState, affiliation: e.target.value })}
                      placeholder="e.g. COEP Tech Mechanical / Company"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Inquiry Category *
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Student Recruitment / Membership">Student Recruitment / Membership</option>
                      <option value="Academic Research Collaboration">Academic Research Collaboration</option>
                      <option value="Sponsorship & Industry Mentorship">Sponsorship & Industry Mentorship</option>
                      <option value="Payload Slot Inquiry">Payload Slot Inquiry</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Your Message / Inquiry Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your inquiry, proposed collaboration, or project background..."
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Message to RPC COEP</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
