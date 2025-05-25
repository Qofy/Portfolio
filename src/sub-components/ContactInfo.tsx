import { CircleUser, Mail, Phone } from "lucide-react";
type contactinfoProps= {
  contactinfoClassName:string,
  children:React.ReactNode
}

export function ContactInfo({contactinfoClassName="contact-info",children}:contactinfoProps){
  const contactContent=(
    <>
    <div className="contact-item">
        <Phone color="rgb(233, 63, 91)" />
        <p>+49 176 47089256</p>
      </div>
      <div className="contact-item">
        <Mail color="rgb(233, 63, 91)" />
        <p>safokofi888@gmail.com</p>
      </div>
      <div className="contact-item">
        <CircleUser color="rgb(233, 63, 91)" />
        <p>Software Engineer</p>
      </div>
      </>
  )
  return(
    <div className={contactinfoClassName}>
      {contactContent}
      {children}
    </div>
  )
}