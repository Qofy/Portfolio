import { InfoDetails } from "./InfoDetails";
import Profile from "../img/p2.jpg";
import { ReactNode } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

type IntroProps = {
  profileData?: {
    header: string;
    nameHighlight: string;
    name: string;
    occupation?: string;
    profileText: string;
  };
  profileImage?: string;
  children?: ReactNode;
  showDefaultElements?: boolean;
  layout?: "image-right" | "image-left";
};

export function Intro({
  profileData = {
    header: "HELLO, MY NAME IS",
    nameHighlight: "Kofi Safo",
    name: "Agyekum",
    occupation: "Software Engineer",
    profileText: "From Kumasi, Ghana. I have rich experience in development cycle for dynamic web projects, app development, and I am also proficient in UX/UI design.",
  },
  profileImage = Profile,
  children,
  showDefaultElements = true,
  layout = "image-right"
}: IntroProps) {
  // Default UI elements that can be conditionally rendered
  const defaultElements = (
    <>
      <div className="btns">
        <button className="intro__btns">
          Download Resume
        </button>
        <button className="intro__btns-2">
          Contact Me
        </button>
      </div>
      <div className="intro__site">
        <Github color="rgb(233, 63, 91)" />
        <Linkedin color="rgb(233, 63, 91)" />
        <Mail color="rgb(233, 63, 91)" />
      </div>
    </>
  );

  // Create the content elements
  const infoElement = (
    <InfoDetails
      header={profileData.header}
      name={profileData.name}
      nameHighlight={profileData.nameHighlight}
      occupation={profileData.occupation || ""}
      profileText={profileData.profileText}
    >
      {children || (showDefaultElements ? defaultElements : null)}
    </InfoDetails>
  );

  const imageElement = (
    <img src={profileImage} alt="profile" className="profile-img" />
  );

  return (
    <div className={`main-intro__con ${layout}`}>
      {layout === "image-left" ? (
        <>
          {imageElement}
          {infoElement}
        </>
      ) : (
        <>
          {infoElement}
          {imageElement}
        </>
      )}
    </div>
  );
}

