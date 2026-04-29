import "../styles/component/contact.scss";
import { ContactText } from "../sub-components/ContactText";
import { ContactMyself } from "../sub-components/ContactMyself";
import { ContactImage } from "../sub-components/ContactImage";

export function Contact() {
  return (
    <section id="contact" className="contact-container">
      <ContactText/>
      <ContactImage/>
      <ContactMyself/>
    </section>
  );
}

