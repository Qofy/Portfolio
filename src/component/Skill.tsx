import { SectionContainer } from "../sub-components/SectionContainer"
import "../styles/component/skills.scss"
import { FaHtml5, FaSass, FaCss3 } from "react-icons/fa";

export function Skills (){
  const skillContent=(
    <section className="section-main__container">
        <h1>
          My Skills
        </h1>
        <SkillsContent/>
    </section>
  )
  return(
    <SectionContainer children={skillContent}/>
  )
}

export function SkillsContent(){
  return(
    <div>
      <h4>
        Using Now
      </h4>
      <div>
        <div>
        <FaHtml5/>
        HTML
        </div>
      <div>
      <FaSass/>
        SASS
      </div>
      <div>
      <FaCss3/>
        Css
      </div>
      <div>
      <FaSass/>
        SASS
      </div>
      </div>
  
    </div>
  )
}