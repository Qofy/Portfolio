import "../styles/component/projects.scss";
import { projectCaseStudies } from "../data/projectCaseStudies";
import { ProjectCaseStudy } from "../sub-components/ProjectCaseStudy";

type ProjectSectionProps = {
  sectionCon?: string;
  sectionId?: string;
  header?: string;
  title?: string;
  children?: React.ReactNode;
};

export function Projects({
  sectionCon = 'project-main__con',
  header,
  title = 'Projects',
  children,
  sectionId = 'projects',
}: ProjectSectionProps) {
  const featuredCaseStudies = projectCaseStudies.filter((project) => project.featured);

  return (
    <section id={sectionId} className={sectionCon}>
      <div className="projects-container">
        <header className="projects-header">
          <h1 className={header || "projects-title"}>
            {title}
          </h1>
          <p className="projects-subtitle">Detailed case studies of projects I've built and shipped</p>
        </header>

        {children || (
          <div className="projects-content case-studies-view">
            {featuredCaseStudies.map((caseStudy) => (
              <ProjectCaseStudy key={caseStudy.id} project={caseStudy} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
