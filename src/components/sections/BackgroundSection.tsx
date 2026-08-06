import '../../styles/components/BackgroundSection.scss';
import { Briefcase, BookOpen, ExternalLink } from 'lucide-react';
import djangset from '../../certificates/django-set.pdf';
import { useEffect, useRef } from 'react';

const backgroundData = [
  {
    type: 'education',
    title: 'Bachelor in Software Engineering',
    institution: 'University Of Europe For Apllied Science',
    period: 'Completed',
    description: 'Studied Software Enginerring with focus on software engineering and web development.'
  },
  // {
  //   type: 'education',
  //   title: 'Full Stack Web Development Bootcamp',
  //   institution: 'Coding Academy',
  //   period: '2021 - 2022',
  //   description: 'Intensive bootcamp covering modern web development technologies and practices.'
  // },
  {
    type: 'certification',
    title: 'Django Fullstack Web Development',
    institution: 'Udemy',
    period: '2026',
    description: 'Comprehensive certification in full-stack web development using Django framework.',
    certificateLink: 'https://www.udemy.com/certificate/UC-0e89851d-1f43-4734-9f7c-706ee74767d5/',
    certificateImage: djangset
  }
];

export function BackgroundSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = sectionRef.current?.querySelectorAll('.timeline-item');
            items?.forEach((item) => {
              item.classList.add('animate');
            });
          } else {
            const items = sectionRef.current?.querySelectorAll('.timeline-item');
            items?.forEach((item) => {
              item.classList.remove('animate');
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const current = sectionRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <section className="background" data-section="background" ref={sectionRef}>
      <div className="background-container">
        <div className="background-header">
          <h2>/BACKGROUND</h2>
          <p className="background-subtitle">Education & Certifications</p>
        </div>

        <div className="background-timeline">
          {backgroundData.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                {item.type === 'education' ? (
                  <BookOpen size={20} />
                ) : (
                  <Briefcase size={20} />
                )}
              </div>

              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-institution">{item.institution}</p>
                  </div>
                  <span className="timeline-period">{item.period}</span>
                </div>
                <p className="timeline-description">{item.description}</p>

                {item.type === 'certification' && (item.certificateLink || item.certificateImage) && (
                  <div className="certificate-links">
                    {item.certificateImage && (
                      <a
                        href={item.certificateImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-link"
                      >
                        View Certificate
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {/* {item.certificateLink && (
                      <a
                        href={item.certificateLink}
                        download
                        className="cert-link"
                      >
                        Download PDF
                        <ExternalLink size={16} />
                      </a>
                    )} */}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
