import React, { useState } from 'react';
import { MEDIA_GALLERY } from '../data/mediaData';
import { GalleryMediaItem } from '../types';
import { Maximize2, X, MapPin, Calendar, Wrench } from 'lucide-react';

export const MediaGalleryModal: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'VEHICLES', 'STATIC TESTS', 'PAYLOAD & AVIONICS', 'LAUNCH OPERATIONS'];

  const filteredItems =
    filter === 'ALL'
      ? MEDIA_GALLERY
      : MEDIA_GALLERY.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-20 bg-[#03060c] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
              PHOTO ARCHIVE & TEST FOOTAGE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Hardware Testing & Workshop Gallery
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Photographs of student fabrication, motor static fire tests, payload integrations, and launchpad assembly operations at COEP Technological University.
          </p>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/80 border border-slate-800 rounded-lg w-fit mb-8 overflow-x-auto max-w-full text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filter === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-[#070b14] border border-slate-800 rounded-xl overflow-hidden cursor-pointer hover:border-amber-500/50 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.88] contrast-[1.08]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-3 right-3 p-1.5 bg-black/60 rounded backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-amber-400 bg-black/70 px-2 py-0.5 rounded border border-slate-800">
                  {item.category}
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-sm font-bold text-white font-heading mb-1.5 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{item.date}</span>
                  <span className="truncate max-w-[150px] text-right text-slate-400">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Inspection Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="relative max-w-4xl w-full bg-[#080d19] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/70 hover:bg-slate-800 border border-slate-700 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image Stage */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              <img
                src={selectedItem.imageSrc}
                alt={selectedItem.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal Metadata */}
            <div className="p-6 overflow-y-auto">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-2">
                <span className="text-amber-400 font-bold">{selectedItem.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {selectedItem.date}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {selectedItem.location}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-heading mb-3">
                {selectedItem.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {selectedItem.caption}
              </p>

              {/* Hardware Information Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono flex items-center gap-3">
                <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">HARDWARE CONFIGURATION</span>
                  <span className="text-white font-semibold">{selectedItem.hardware}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
