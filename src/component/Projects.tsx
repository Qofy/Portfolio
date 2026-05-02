// import { Children } from "react"
import "../styles/component/projects.scss"
import { ExternalLink, Github } from "lucide-react"

type projectProps = {
  sectionCon: string,
  sectionId?: string,
  header?: string,
  title?: string,
  children?: React.ReactNode
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
    description: "An ongoing project to allow africaans to hav their own streaming platform instead of using 'Youtube.'",
    image: "/afriqnet.jpg",
    liveUrl: "https://afriqnet-ten.vercel.app/",
    githubUrl: "#",
    technologies: ["Nextjs", "Firebase","lucide icons","cloudinary"],
    featured: true
  },
  {
    id: 2,
    title: "FirePup",
    description: "food platform that allow users to post and share their meal and recipe",
    image: "/firepup.png",
    liveUrl: "https://firepup.vercel.app/community",
    githubUrl: "#",
    technologies: ["Nextjs", "Lucide icons","cloudinary"],
    featured: true
  },
  // {
  //   id: 3,
  //   title: "Roll Dice Game",
  //   description: "An interactive multiplayer dice game with real-time scoring, animations, and competitive gameplay features.",
  //   image: "/dice.png",
  //   liveUrl: "https://pick-game-master.vercel.app/",
  //   githubUrl: "#",
  //   technologies: ["JavaScript", "HTML5", "CSS3", "Canvas API"],
  //   featured: false
  // },
  {
    id: 4,
    title: "My Portfolio",
    description: "A portfolio which contain information about me which include my experience, background, contact information and my projects(not all)",
    image: "/portfolio.png",
    liveUrl: "https://www.kofiagye.com/",
    githubUrl: "#",
    technologies: ["TypeScript", "React", "SCSS","Lucide icons"],
    featured: true
  },
  // {
  //   id: 5,
  //   title: "Bankist",
  //   description: "A modern banking interface with account management, transaction history, and financial analytics. Demo credentials: user 'js', pin '1111'.",
  //   image: "/bankist.png",
  //   liveUrl: "https://bankist-master.vercel.app/",
  //   githubUrl: "#",
  //   technologies: ["JavaScript", "HTML5", "CSS3", "Chart.js"],
  //   featured: false
  // }
];

export function Projects({ sectionCon, header, title = "Projects", children, sectionId }: projectProps) {
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
