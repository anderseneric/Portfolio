export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;  // Backward compatibility - first image
  images: string[];  // NEW: Array of all images
  tags: string[];
  link?: string;
}
