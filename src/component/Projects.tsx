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
        <h2>
          Top 4 Project.
        </h2>
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
                  <h3>Dinsey Movie Clone</h3>
                </div>
              </div>
              
            </div>
        <div className="figma_works">
             <h2>
          Figma Works
        </h2>
          <a 
          className="link" 
            href="https://www.figma.com/design/gzCx94h7Z2f6osm3kSWKgK/Mywork-Kofi-Safo-Agyekum-?node-id=0-1&t=SG8x0A3Z5JXBvuuI-1" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Figma"
          >
          Stock Market Mobile &gt;
          </a>
          <a 
          className="link" 
            href="https://www.figma.com/design/JssgmEomCRVoDqFCd46Ixg/Food-Recipe?node-id=0-1&t=TVvbWTtf6eZmzsow-1" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Figma"
          >
          Food Recipe &gt;
          </a>
        </div>
          </div>
        )}
       
      </div>
      
    </section>
  )
}
