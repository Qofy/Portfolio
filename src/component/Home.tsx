import { Github, Linkedin,Mail } from "lucide-react";
import Profile from "../img/p2.jpg";
import "../styles/component/home.scss"
export function Home (){
  return(
    <>
    <Intro/>
    </>
  )
}

export function IntroInfo(){
  return(
    <div className="intro">
      <header className="intro__header">
       HELLO, MY NAME IS
      </header>
      <p className="intro__name">
        <em className="name-style">Kofi Safo</em> Agyekum
      </p>
      <p className="intro__occupation">
        Software Engineer
      </p>
      <div className="intro__profile">
      From Kumasi, Ghana. I have rich experience
in development cycle for dynamic web projects, 
app development, and I am also proficient in 
UX/UI design.
      </div>
      <div className="btns">
      <button className="intro__btns">
        Download Resume
        </button>
        <button className="intro__btns-2">
          Contact Me
        </button>
      </div>
        <div className="intro__site">
        <Github color="rgb(233, 63, 91)"/>
        <Linkedin color="rgb(233, 63, 91)"/>
        <Mail color="rgb(233, 63, 91)"/>
        </div>
      </div>
  )
}

export function Intro(){
  return(
    <div className="main-intro__con">
      <IntroInfo/>
      {/* <div> */}
      <img src={Profile} alt="profile" className="profile-img"/>
      {/* </div> */}
    </div>
  )
}
