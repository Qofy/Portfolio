// import { Children } from "react"
import "../styles/component/projects.scss"
import { Link } from "react-router-dom"

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
              <h2>
          Top 4 Project.
        </h2>
          <div className="works">
  <div className="min-work__container min-work1">
    <Link to="https://teslr.vercel.app/" className="project-link">
      <div className="project-overlay">
        <img src="/tesla.svg" alt="tesla" />
      </div>
        <h3>Tesla Clone</h3>
    </Link>
  </div>
  
  <div className="min-work__container min-work2">
    <Link to="https://food-prescription-system-hoyk.vercel.app/" className="project-link">
      <div className="project-overlay">
        <img src="/ait.png" alt="ai-food" />
      </div>
        <h3>AI Food Prescription</h3>
    </Link>
  </div>
  
  <div className="min-work__container min-work3">
    <Link to="https://kmovie-tau.vercel.app/" className="project-link">
      <div className="project-overlay">
        <img src="/kmovie.png" alt="kmovie" />
      </div>
        <h3>KMovie</h3>
    </Link>
  </div>

    <div className="min-work__container min-work3">
    <Link to="https://music-dashboard-using-typescript.vercel.app/" className="project-link">
      <div className="project-overlay">
        <img src="/african-music-logo.webp" alt="african-music" />
      </div>
        <h3>African Music</h3>
    </Link>
  </div>
  
  <div className="min-work__container min-work4">
    <Link to="https://bankist-two-orpin.vercel.app/" className="project-link">
      <div className="project-overlay">
        <img src="/bankist.png" alt="disney" />
      </div>
        <h3>Bankist Calculatio(user:js, pin:1111)</h3>
    </Link>
  </div>
</div>

        
          </div>
        )}
       
      </div>
      
    </section>
  )
}
