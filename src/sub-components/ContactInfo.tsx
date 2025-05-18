import { CircleUser, Mail, Phone } from "lucide-react";

export function ContactInfo(){
  return(
    <div className="contact-info">
      <div className="contact-item">
        <Phone color="rgb(233, 63, 91)" />
        <p>+49 176 47089256</p>
      </div>
      <div className="contact-item">
        <Mail color="rgb(233, 63, 91)" />
        <p>your.email@example.com</p>
      </div>
      <div className="contact-item">
        <CircleUser color="rgb(233, 63, 91)" />
        <p>Software Engineer</p>
      </div>
    </div>
  )
}