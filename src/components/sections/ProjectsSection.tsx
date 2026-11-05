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
import { ProjectDetail } from './ProjectDetail';






const projects = [
  {
    id: 1,
    title: 'Hexashop - Online Fashion Shopping E-commerce',
    category: 'Landing Page',
    company: 'K#2',
    image: Hexashop,
    images: [Hexashop],
    description: 'A modern e-commerce platform for online fashion shopping built with cutting-edge technologies. Features include product browsing, cart management, user authentication, and checkout flow.',
    fullDescription: 'Hexashop is a full-featured e-commerce platform designed for online fashion retail. The project showcases advanced React patterns, state management with Redux Toolkit, form validation with Zod and Formik, and efficient data fetching with React Query. The platform includes responsive design, product filtering, cart persistence, and a seamless checkout experience.',
    tags: ['Next.js', 'React', 'TypeScript', 'React Query', 'Redux Toolkit', 'Zod', 'Formik', 'Web Development'],
    demoUrl: '#',
    githubUrl: 'https://github.com/Qofy/hexashop'
  },
  {
    id: 2,
    title: 'FX-Checker - Foreign Currency Exchange Rate Checker',
    category: 'Landing Page',
    company: 'Self Build',
    image: fxChecker,
    images: [fxChecker],
    description: 'Real-time foreign exchange rate checker. Allows users to check current exchange rates between multiple currencies with live data updates.',
    fullDescription: 'FX-Checker is a utility application for checking real-time foreign exchange rates. Built with React and vanilla JavaScript, it fetches live currency data using Axios and displays real-time exchange rates. The app features a clean UI, currency comparison tools, and historical rate tracking capabilities.',
    tags: ['React', 'JavaScript', 'Axios', 'Web Development'],
    demoUrl: '#',
    githubUrl: 'https://github.com/Qofy/foreign-exchange-checker'
  },
  {
    id: 3,
    title: 'Portfolio - Full Stack Developer & Engineer Showcase',
    category: 'Real Project',
    company: 'Personal Project',
    image: portfolio,
    images: [portfolio],
    description: 'Your professional portfolio website showcasing projects, skills, and experience as a Frontend Engineer.',
    fullDescription: 'A comprehensive portfolio website built with React, Next.js, and TypeScript. Features include a blog system with Firebase backend, 3D animated backgrounds, AI-powered search, project showcase, skills display, and real-time comments/interactions. Includes Docker containerization and CI/CD pipeline.',
    tags: ['React', 'Next.js', 'TypeScript', 'Firebase', 'CSS', 'Docker', 'Web Development'],
    demoUrl: 'https://kofiagye.com',
    githubUrl: 'https://github.com/Qofy/Portfolio'
  },
  {
    id: 4,
    title: 'BrowserUI - Browser Extensions Manager Dashboard',
    category: 'Real Project',
    company: 'Personal Project',
    image: browserUI,
    images: [browserUI],
    description: 'A dashboard for managing and organizing browser extensions with a modern, intuitive interface.',
    fullDescription: 'BrowserUI is a browser extension manager dashboard that helps users organize, enable/disable, and manage their installed extensions. Built with React and TypeScript, featuring a clean component architecture and responsive design. The project demonstrates advanced state management and real-time updates.',
    tags: ['React', 'TypeScript', 'Web Development', 'CSS'],
    demoUrl: '#',
    githubUrl: 'https://github.com/Qofy/browser-gui'
  },
  {
    id: 5,
    title: 'NutriScan - Food & Nutrition Analysis Platform',
    category: 'Real Project',
    company: 'Personal Project',
    image: NutriScan,
    images: [NutriScan],
    description: 'A comprehensive food and nutrition analysis platform for tracking dietary intake and health metrics.',
    fullDescription: 'NutriScan is a full-stack application combining Next.js frontend with Django backend for comprehensive nutrition tracking. Features include meal logging, nutritional analysis, personalized recommendations, and health metrics dashboard. The frontend uses Redux Toolkit for state management and Axios for API communication.',
    tags: ['Next.js', 'React', 'TypeScript', 'Django', 'Redux Toolkit', 'Axios', 'Web Development', 'Performance'],
    demoUrl: '#',
    githubUrl: 'https://github.com/Qofy/NutriScan'
  },
  {
    id: 6,
    title: 'Firepup - Social Food & Recipe Sharing Platform',
    category: 'Real Project',
    company: 'Personal Project',
    image: Firepup,
    images: [Firepup],
    description: 'A social platform where users can share recipes, discover food ideas, and connect with other food enthusiasts.',
    fullDescription: 'Firepup is a social network for food and recipe sharing. Built with Next.js and Django backend, featuring user authentication, recipe publishing, social interactions (likes, comments, shares), user profiles, and recipe discovery algorithms. Includes real-time notifications and community features.',
    tags: ['Next.js', 'React', 'TypeScript', 'Django', 'Redux Toolkit', 'Web Development'],
    demoUrl: '#',
    githubUrl: 'https://github.com/Qofy/foodies-project'
  },
  {
    id: 7,
    title: 'InternTracker - Student Intern Tracker System',
    category: 'Real Project',
    company: 'AT Intuivo',
    image: internTracker,
    images: [internTracker],
    description: 'A comprehensive system for tracking and managing student internship programs and progress.',
    fullDescription: 'InternTracker is an enterprise application built with Svelte for tracking student internships. Features include intern profile management, progress tracking, mentor assignments, reporting dashboards, and performance analytics. The project showcases advanced Svelte patterns, TypeScript for type safety, and Cypress for comprehensive end-to-end testing.',
    tags: ['Svelte', 'TypeScript', 'CSS', 'Web Development', 'Performance', 'Cypress'],
    demoUrl: '#',
    githubUrl: 'https://github.com/Qofy/20251209_intern_tracker_kofi_only_template'
  },
];

const filters = ['All', 'Real Project', 'Landing Page'];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
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
            <button
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProject(project)}
              title="View project details"
            >
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
            </button>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          allProjects={projects}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
