import { ExternalLink, Github } from "lucide-react";
import { CaseStudy } from "../data/projectCaseStudies";
import "../styles/sub-components/projectCaseStudy.scss";

interface ProjectCaseStudyProps {
  project: CaseStudy;
}

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  return (
    <article className="case-study">
      <header className="case-study-header">
        <div className="case-study-title-section">
          <h2 className="case-study-title">{project.title}</h2>
          <p className="case-study-tagline">{project.tagline}</p>
        </div>

        <div className="case-study-links">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-link live-demo"
              aria-label={`View ${project.title} live`}
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          )}
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-link source-code"
              aria-label={`View ${project.title} source code`}
            >
              <Github size={18} />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </header>

      <div className="case-study-content">
        <section className="case-study-section">
          <h3>Overview</h3>
          <p>{project.description}</p>
        </section>

        <section className="case-study-section">
          <h3>The Problem</h3>
          <p>{project.problem}</p>
        </section>

        <section className="case-study-section">
          <h3>My Role</h3>
          <p>{project.kofiRole}</p>
        </section>

        <section className="case-study-section">
          <h3>Architecture & Design</h3>
          <p>{project.architecture}</p>
        </section>

        <section className="case-study-section">
          <h3>Technical Decisions</h3>
          <ul className="technical-decisions-list">
            {project.technicalDecisions.map((decision, index) => (
              <li key={index}>{decision}</li>
            ))}
          </ul>
        </section>

        <section className="case-study-section">
          <h3>Testing</h3>
          <p>{project.testing}</p>
        </section>

        <section className="case-study-section">
          <h3>Deployment</h3>
          <p>{project.deployment}</p>
        </section>

        <section className="case-study-section">
          <h3>Outcome & Impact</h3>
          <p>{project.outcome}</p>
        </section>

        <section className="case-study-section">
          <h3>Key Features Built</h3>
          <div className="features-grid">
            {project.keyFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {project.screenshots && project.screenshots.length > 0 && (
          <section className="case-study-section screenshots-section">
            <h3>Project Screenshots</h3>
            {project.screenshots.some((s) => s.url) ? (
              <div className="screenshots-grid">
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className="screenshot-item">
                    {screenshot.url ? (
                      <>
                        <img src={screenshot.url} alt={screenshot.title} />
                        <p>{screenshot.title}</p>
                      </>
                    ) : (
                      <>
                        <div className="placeholder-image" />
                        <p>{screenshot.title}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="screenshots-placeholder">
                <p>Screenshots coming soon</p>
              </div>
            )}
          </section>
        )}

        <section className="case-study-section">
          <h3>Tech Stack</h3>
          <div className="tech-stack">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="case-study-section">
          <h3>Timeline</h3>
          <p className="timeline">{project.timeline}</p>
        </section>
      </div>
    </article>
  );
}
