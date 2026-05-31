// import { Children } from "react"
// import { icon } from "@fortawesome/fontawesome-svg-core";
import "../styles/component/projects.scss"
import { ExternalLink, Github } from "lucide-react"
import afriqnetImg from "../assets/images/afriqnet.jpg"
import firepupImg from "../assets/images/firepup.png"
import nutriScanImg from "../assets/images/nutriScan.png"
import portfolioImg from "../assets/images/portfolio.png"

type ProjectSectionProps = {
  sectionCon?: string;
  sectionId?: string;
  header?: string;
  title?: string;
  children?: React.ReactNode;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Afriqnet",
    description: "A streaming platform built for African audiences — a homegrown alternative to YouTube, featuring movies, shows, and content that reflects African stories and culture.",
    image: afriqnetImg,
    liveUrl: "https://afriqnet-ten.vercel.app/",
    githubUrl: "#",
    technologies: ["Next.js", "React (v19)", "Redux Toolkit", "Firebase", "Cloudinary", "Movies API", "Tailwind CSS", "Lucia", "Lucide Icons"],
    featured: true
  },
  {
    id: 2,
    title: "FirePup",
    description: "A community food platform where users can post, share, and discover meals and recipes from around the world.",
    image: firepupImg,
    liveUrl: "https://firepup.vercel.app/community",
    githubUrl: "#",
    technologies: ["Next.js", "Cloudinary", "Lucide Icons"],
    featured: true
  },
  {
    id: 3,
    title: "NutriScan",
    description: "An AI-powered health assistant that helps patients track and evaluate their dietary food prescriptions for better nutrition management.",
    image: nutriScanImg,
    liveUrl: "https://nutri-scan-murex.vercel.app",
    githubUrl: "#",
    technologies: ["Next.js", "React", "Redux Toolkit", "Django REST API", "Cloudinary", "Tailwind CSS", "Canvas", "Lucide Icons"],
    featured: true
  },
  {
    id: 4,
    title: "My Portfolio",
    description: "A personal portfolio showcasing my background, experience, projects, and contact information — built with a focus on clean design and performance.",
    image: portfolioImg,
    liveUrl: "https://www.kofiagye.com/",
    githubUrl: "#",
    technologies: ["TypeScript", "React", "React Router", "Hash Link", "SCSS", "Vite", "Lucide Icons"],
    featured: true
  },
];

export function Projects({
  sectionCon = 'project-main__con',
  header,
  title = 'Projects',
  children,
  sectionId = 'projects',
}: ProjectSectionProps) {
  const featuredProjects = projects.filter(project => project.featured);
  // const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id={sectionId} className={sectionCon}>
      <div className="projects-container">
        <header className="projects-header">
          <h1 className={header || "projects-title"}>
            {title}
          </h1>
          <p className="projects-subtitle">A showcase of my recent work and contributions</p>
        </header>
        
        {children || (
          <div className="projects-content">
            {/* Featured Projects */}
            <section className="featured-projects">
              <h2>Featured Projects</h2>
              <div className="projects-grid featured">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} featured />
                ))}
              </div>
            </section>

            {/* Other Projects */}
            {/* <section className="other-projects">
              <h2>Other Projects</h2>
              <div className="projects-grid">
                {otherProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section> */}
          </div>
        )}
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article className={`project-card ${featured ? 'featured' : ''}`}>
      <div className="project-image">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="project-overlay">
          <div className="project-links">
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link live"
              aria-label={`View ${project.title} live`}
            >
              <ExternalLink size={20} />
              <span>Live Demo</span>
            </a>
            {project.githubUrl && project.githubUrl !== '#' && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link github"
                aria-label={`View ${project.title} source code`}
              >
                <Github size={20} />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
