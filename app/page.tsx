'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import TechBackground from '@/components/TechBackground';
import Footer from '@/components/Footer';
import { Project } from '@/types';
import { dummyProjects } from '@/lib/projects';
import { getProjects } from '@/lib/localStorage';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Try to load from localStorage, fallback to dummy data
    const stored = getProjects();
    setProjects(stored.length > 0 ? stored : dummyProjects);
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  };

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* Tech Background - Neural Network */}
      <TechBackground />

      {/* Main Content */}
      <div className="relative z-10 flex-1">
        {/* Header - much smaller and more elegant */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-12 pb-8 text-center"
        >
          <h1 className="text-2xl font-light tracking-[0.3em] text-white">
            Eric's Portofolio
          </h1>
        </motion.header>

        {/* Projects Grid - tighter spacing */}
        <main className="mx-auto max-w-[1200px] px-6 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
