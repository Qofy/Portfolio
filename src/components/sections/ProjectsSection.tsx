import '../../styles/components/ProjectsSection.scss';
import { ArrowUpRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Hexashop from '../../images/hexshop-landing.png';
import fxChecker from '../../images/fx-checker.png';
import portfolio from '../../images/portfolio.png';
import browserUI from '../../images/browserUi.png';
import NutriScan from '../../images/nutriscan.png';
import Firepup from '../../images/firepup.png';
import internTracker from '../../images/internTracker.png';






const projects = [
  {
    id: 1,
    title: 'Hexashop - Online Fashio shopping e-commerce',
    category: 'Landing Page',
    company: 'K#2',
    image: Hexashop,
    tags: ['Next.js & Next.js Api',
      'Redux & Tolkit','React Query', 'Github Repo','Zod','Formik']
  },
  {
    id: 2,
    title: 'FX-Chcker - For checking Foreign currency Exchange rate',
    category: 'Landing Page',
    company: 'Self Build',
    image: fxChecker,
    tags: ['React','Axios', 'GitHub Repo']
  },
  {
    id: 3,
    title: 'Portfolio - Full Stack Developer & Engineer Showcase',
    category: 'Real Project',
    company: 'Personal Project',
    image: portfolio,
    tags: ['React', 'React Router','Scss','Firebase(Firestore)','Docker']
  },
  {
    id: 4,
    title: 'BrowserUI - Browser Extensions Manager Dashboard',
    category: 'Real Project',
    company: 'Personal Project',
    image: browserUI,
    tags: ['Dashboard', 'Personal Project']
  },
  {
    id: 5,
    title: 'NutriScan - Food & Nutrition Analysis Platform',
    category: 'Real Project',
    company: 'Personal Project',
    image: NutriScan,
    tags: ['Next.js', 'Redux Toolkit', 'Axios',
      'Django REST API', 'Canvas API', 'TypeScript']
  },
  {
    id: 6,
    title: 'Firepup - Social Food & Recipe Sharing Platform',
    category: 'Real Project',
    company: 'Personal Project',
    image: Firepup,
    tags: ['Next.js', 'Django REST API', 'Redux Toolkit', 'TypeScript']
  },
  {
    id: 7,
    title: 'InternTracker - Student Intern Tracker System',
    category: 'Real Project',
    company: 'AT Intuivo',
    image: internTracker,
    tags: ['Svelte', 'Rust','Tailwind','Playwright Test', 'Chart js', "rxjs", 'Web-Socket', "HTML- Canvas", 'Routify']
  },
];

const filters = ['All', 'Real Project', 'Landing Page'];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = sectionRef.current?.querySelectorAll('.project-card');
            cards?.forEach((card) => {
              card.classList.add('animate');
            });
          } else {
            const cards = sectionRef.current?.querySelectorAll('.project-card');
            cards?.forEach((card) => {
              card.classList.remove('animate');
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
  }, [activeFilter]);

  return (
    <section className="projects" data-section="projects" ref={sectionRef}>
      <div className="projects-container">
        <div className="projects-header">
          <h2>/SELECTED WORK</h2>
        </div>

        <div className="projects-controls">
          <div className="filter-tabs">
            {filters.map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <a
            href="https://github.com/Qofy"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-btn"
          >
            View All Work <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
