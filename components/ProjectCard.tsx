'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const displayImage = project.images?.[0] || project.image;

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-white/20 transition-all duration-500 hover:border-white/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.6)]"
    >
      {displayImage ? (
        <img
          src={displayImage}
          alt={project.title}
          className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
          <div className="text-6xl font-bold text-gray-600">
            {project.title.charAt(0)}
          </div>
        </div>
      )}
    </motion.button>
  );
}
