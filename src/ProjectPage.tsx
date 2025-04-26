import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Project {
  name: string;
  images: string[];
  createdAt: string;
}

export default function ProjectPage() {
  const { projectName } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((projects: Project[]) => {
        const found = projects.find((p) => p.name === projectName);
        setProject(found || null);
      });
  }, [projectName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex !== null) {
        if (e.key === "ArrowRight") {
          setCurrentIndex((prev) =>
            prev !== null && project ? (prev + 1) % project.images.length : null
          );
        }
        if (e.key === "ArrowLeft") {
          setCurrentIndex((prev) =>
            prev !== null && project
              ? (prev - 1 + project.images.length) % project.images.length
              : null
          );
        }
        if (e.key === "Escape") {
          setCurrentIndex(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, project]);

  if (!project)
    return (
      <div className="p-8 text-center text-gray-500">Project not found</div>
    );

  const openImage = (index: number) => setCurrentIndex(index);
  const closeImage = () => setCurrentIndex(null);
  const nextImage = () =>
    project && setCurrentIndex((currentIndex! + 1) % project.images.length);
  const prevImage = () =>
    project &&
    setCurrentIndex(
      (currentIndex! - 1 + project.images.length) % project.images.length
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">{project.name}</h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {project.images.map((image, index) => (
          <div
            key={image}
            onClick={() => openImage(index)}
            className="overflow-hidden rounded-xl shadow-md hover:shadow-lg cursor-pointer transition"
          >
            <img
              src={`/projects/${project.name}/${image}`}
              alt={image}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeImage}
        >
          <div
            className="relative max-w-4xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/projects/${project.name}/${project.images[currentIndex]}`}
              alt="Large"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Controls */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-4xl font-bold"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-4xl font-bold"
            >
              ›
            </button>
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 text-white text-3xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
