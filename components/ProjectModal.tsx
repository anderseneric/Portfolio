'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = project?.images || (project?.image ? [project.image] : []);
  const totalImages = images.length;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % totalImages);
      }
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
      }
      if (e.key === 'Escape') {
        setCurrentImageIndex(0);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project, totalImages, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-8"
          onClick={handleClose}
        >
          {/* Blurred backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />

          {/* Close button */}
          <button
            className="absolute right-6 top-6 z-10 rounded-lg p-2 text-white/70 transition-all hover:bg-white/10 hover:text-white"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation arrows */}
          {totalImages > 1 && (
            <>
              <button
                className="absolute left-6 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-white/70 transition-all hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                disabled={currentImageIndex === 0}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                className="absolute right-6 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-white/70 transition-all hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                disabled={currentImageIndex === totalImages - 1}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          {/* Image container - Dynamic sizing */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {/* Image counter */}
            {totalImages > 1 && (
              <div className="absolute -top-12 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                {currentImageIndex + 1} / {totalImages}
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="h-auto w-auto max-h-[70vh] max-w-[70vw] rounded-lg border-2 border-white/20 object-contain shadow-2xl"
              />
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
