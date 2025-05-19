import { FaHtml5, FaSass, FaCss3, FaReact, FaJs, FaFigma, FaGitAlt, FaJava, FaPython, FaJira } from "react-icons/fa";
import { SiTypescript, SiCplusplus, SiFlutter } from "react-icons/si"

export const skillsData = {
  using: [
    {
      id: 0,
      icon: FaHtml5,
      txt: "HTML"
    },
    {
      id: 1,
      icon: FaSass,
      txt: "Saas"
    },
    {
      id: 2,
      icon: FaCss3,
      txt: "CSS"
    },
    {
      id: 3,
      icon: FaReact,
      txt: "React"
    },
    {
      id: 4,
      icon: FaJs,
      txt: "JavaScript"
    },
    {
      id: 5,
      icon: FaFigma,
      txt: "Figma"
    },
    {
      id: 10,
      icon: SiTypescript,
      txt: "Typescript"
    },
    {
      id: 6,
      icon: FaGitAlt,
      txt: 'Git'
    },
  ],
  learning: [
     
    {
      id: 9,
      icon: FaJira,
      txt: "Jira"
    },
     
  ],
  others:[
    {
      id: 11,
      icon: SiCplusplus,
      txt: "C++"
    },
    {
      id: 8,
      icon: FaPython,
      txt: "Python"
    },
    {
      id: 12,
      icon: SiFlutter,
      txt: "Flutter"
    },
    {
      id: 7,
      icon: FaJava,
      txt: "Java"
    },
  ]
}

// <div className="skill-item">
//           <FaHtml5 className="skill-icon" />
//           <span>HTML</span>
//         </div>