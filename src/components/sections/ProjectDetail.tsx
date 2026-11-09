import { useState, useEffect } from 'react';
import { ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/components/ProjectDetail.scss';

interface Project {
  id: number;
  title: string;
  category: string;
  company: string;
  image: string;
  images: string[];
  videoUrl?: string;
  videoAutoplay?: boolean;
  description: string;
  fullDescription: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

interface ProjectDetailProps {
  project: Project;
  allProjects: Project[];
  onClose: () => void;
}

export function ProjectDetail({ project, allProjects, onClose }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  // Auto-slide gallery
  useEffect(() => {
    if (!autoSlide || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoSlide, project.images.length]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
    setAutoSlide(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    setAutoSlide(false);
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setAutoSlide(false);
  };

  // Get related projects (same category, different project)
  const relatedProjects = allProjects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="project-detail-overlay">
      <div className="project-detail-container">
        {/* Back Button */}
        <button className="back-button" onClick={onClose} title="Back to projects">
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>

        {/* Hero Image Gallery */}
        <div className="project-gallery">
          <div className="gallery-main">
            {project.videoUrl && project.videoAutoplay ? (
              <video
                src={project.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="gallery-video"
              />
            ) : (
              <>
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="gallery-image"
                />

                {project.images.length > 1 && (
                  <>
                    <button
                      className="gallery-nav prev"
                      onClick={handlePrevImage}
                      title="Previous image"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button
                      className="gallery-nav next"
                      onClick={handleNextImage}
                      title="Next image"
                    >
                      <ChevronRight size={28} />
                    </button>

                    {/* Image Counter */}
                    <div className="image-counter">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Thumbnails - Always show when there are images */}
          {project.images.length > 0 && (
            <div className="gallery-thumbnails">
              {project.images.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => handleImageClick(index)}
                  title={`View image ${index + 1}`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="project-info">
          <div className="project-header">
            <div>
              <h1 className="project-title">{project.title}</h1>
              <p className="project-company">
                {project.company} • <span className="category">{project.category}</span>
              </p>
            </div>

            {/* Links */}
            <div className="project-links">
              {project.demoUrl !== '#' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-btn demo"
                  title="View live demo"
                >
                  <ExternalLink size={18} />
                  <span>Live Demo</span>
                </a>
              )}
              {project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-btn github"
                  title="View source code"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="project-description">
            <h2>Overview</h2>
            <p>{project.fullDescription}</p>
          </div>

          {/* Technologies */}
          <div className="project-technologies">
            <h2>Technologies Used</h2>
            <div className="tech-list">
              {project.tags.map((tag, index) => (
                <span key={index} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="related-projects">
              <h2>Related Projects</h2>
              <div className="related-grid">
                {relatedProjects.map((related) => (
                  <div key={related.id} className="related-card">
                    <img src={related.image} alt={related.title} />
                    <div className="related-info">
                      <h3>{related.title}</h3>
                      <p>{related.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
