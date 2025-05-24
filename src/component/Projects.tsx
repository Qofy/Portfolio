// import { Children } from "react"
import "../styles/component/projects.scss"

type projectProps = {
  sectionCon: string,
  sectionId?: string,
  header?: string,
  title?: string,
  children?: React.ReactNode
}

export function Projects({ sectionCon, header, title = "Projects", children, sectionId }: projectProps) {
  return (
    <section id={sectionId} className={sectionCon}>
      <div className="project-main__con">
        <h1 className={header || "p-header"}>
          {title}
        </h1>
        {children || (
          <div className="display-projects">
            <div className="works">
              <div className="min-work__container min-work1">
                <div className="project-overlay">
                  <h3>Tesla Clone</h3>
                </div>
              </div>
              <div className="min-work__container min-work2">
                <div className="project-overlay">
                  <h3>E-Commerce App</h3>
                </div>
              </div>
              <div className="min-work__container min-work3">
                <div className="project-overlay">
                  <h3>Portfolio Website</h3>
                </div>
              </div>
              <div className="min-work__container min-work4">
                <div className="project-overlay">
                  <h3>Weather Dashboard</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
