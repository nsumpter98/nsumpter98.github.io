import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Project {
  name: string;
  images: string[];
  createdAt: string;
}

export default function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/projects.json')
      .then(res => res.json())
      .then(setProjects);
  }, []);

  return (
    <div className="grid gap-4">
      {projects.slice(0, 3).map(project => (
        <Link key={project.name} to={`/project/${project.name}`} className="block">
          <img
            src={`/projects/${project.name}/${project.images[0]}`}
            alt={project.name}
            className="w-48 h-32 object-cover rounded-xl shadow-md"
          />
          <h2 className="text-xl font-semibold mt-2">{project.name}</h2>
        </Link>
      ))}
    </div>
  );
}
