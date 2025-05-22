// import { SectionContainer } from "../sub-components/SectionContainer"
import "../styles/component/projects.scss"

export function Projects() {
  return(
  <section id="projects" className="project-main__con">
      <h1 className="p-header">
        Projects
      </h1>
      <div className="display-projects">
        <div className="works">
          <div className="min-work__container min-work1">
            <h3>
              Tesla Clone
            </h3>
          </div>
          <div className="min-work__container min-work2">
            <h3>
              E-Commerce App
            </h3>
          </div>
          <div className="min-work__container min-work3">
            <h3>
              Portfolio Website
            </h3>
          </div>
          <div className="min-work__container min-work4">
            <h3>
              Weather Dashboard
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
