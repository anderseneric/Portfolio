import { Project } from '@/types';

// TEMPORARY: Dummy projects for design preview - will be removed later
export const dummyProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with Next.js and Stripe integration',
    image: '/projects/ecommerce.jpg',
    images: ['/projects/ecommerce.jpg'],
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
    link: 'https://example.com'
  },
  {
    id: '2',
    title: 'AI Chat Application',
    description: 'Real-time chat application powered by AI with natural language processing',
    image: '/projects/ai-chat.jpg',
    images: ['/projects/ai-chat.jpg'],
    tags: ['React', 'OpenAI', 'WebSocket', 'Node.js'],
    link: 'https://example.com'
  },
  {
    id: '3',
    title: 'Portfolio Dashboard',
    description: 'Analytics dashboard for tracking portfolio performance with real-time data',
    image: '/projects/dashboard.jpg',
    images: ['/projects/dashboard.jpg'],
    tags: ['React', 'D3.js', 'Firebase', 'Material-UI'],
    link: 'https://example.com'
  },
  {
    id: '4',
    title: 'Task Management System',
    description: 'Collaborative task management tool with team features and Kanban boards',
    image: '/projects/tasks.jpg',
    images: ['/projects/tasks.jpg'],
    tags: ['Vue.js', 'Express', 'MongoDB', 'Socket.io'],
    link: 'https://example.com'
  }
];
