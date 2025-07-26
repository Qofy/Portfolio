import { Nav } from "../component/Nav";
import profilePic from "/public/profile2.png";
export function ContactImage(){
  return(
<div className="nav-image-container">
        <Nav nav="nav1" />
        <img className="profile-pic" src={profilePic} alt="Kofi Safo Agyekum profile picture" />
      </div>
  )
}