import { Intro } from "../sub-components/Intro";

export function About (){
   const customProfileData = {
      header: "About Me",
      nameHighlight: "Driven, Innovative",
      name: "Software Engineer",
      occupation: "",
      profileText: "Motivated and self-driven Software Engineering student with a strong academic foundation and a keen interest in frontend development, user experience, and agile collaboration. Experienced in building responsive and user-centric web applications using TypeScript, React, and modern tooling. Passionate about learning, problem-solving, and delivering clean, maintainable code in fast-paced environments."
    };
  return(
       <Intro 
        profileData={customProfileData} 
        showDefaultElements={false}
        layout="image-left"
      />
  )
}