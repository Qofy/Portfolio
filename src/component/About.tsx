import "../styles/component/about.scss";
import { SectionContainer } from "../sub-components/SectionContainer";
import { Profile } from "../sub-components/Profile";
import { ContactInfo } from "../sub-components/ContactInfo";

export function About() {
  return (
    <SectionContainer>
      <h1 className="about-header">About Me</h1>
      <Profile />
      <h2 className="name-header">Kofi Safo Agyekum</h2>
      <ContactInfo />
    </SectionContainer>
  );
}
