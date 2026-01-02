import { Project } from '@/types';

const STORAGE_KEY = 'portfolio_projects';

export const getProjects = (): Project[] => {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error parsing projects from localStorage:', error);
    return [];
  }
};

export const saveProjects = (projects: Project[]): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
  }
};

export const addProject = (project: Project): void => {
  const projects = getProjects();
  projects.push(project);
  saveProjects(projects);
};

export const updateProject = (id: string, updatedProject: Partial<Project>): void => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);

  if (index !== -1) {
    projects[index] = { ...projects[index], ...updatedProject };
    saveProjects(projects);
  }
};

export const deleteProject = (id: string): void => {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  saveProjects(filtered);
};
