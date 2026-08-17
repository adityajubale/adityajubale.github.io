import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  Check,
  Code2,
  Download,
  ExternalLink,
  FileCode2,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Network,
  PanelTop,
  PenLine,
  Rocket,
  Sun,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

type ProjectCategory = 'fullstack' | 'data' | 'iot';
type SkillCategory = 'frontend' | 'backend' | 'data';

const navItems = [
  ['home', 'Home'],
  ['about', 'About'],
  ['services', 'Services'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['contact', 'Contact'],
] as const;

const projects: {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  tags: string[];
  icon: typeof Layers3;
}[] = [
  {
    id: 'order-management-erp',
    title: 'Order Management ERP',
    category: 'fullstack',
    categoryLabel: 'Full-Stack',
    description: 'End-to-end Angular and Node.js ERP for order processing, inventory tracking, low-stock alerts, and production support.',
    tags: ['Angular', 'Node.js', 'MySQL', 'Express'],
    icon: Layers3,
  },
  {
    id: 'sales-analytics-dashboard',
    title: 'Sales Analytics Dashboard',
    category: 'data',
    categoryLabel: 'Data & Analytics',
    description: 'Power BI dashboard that automated executive reporting and reduced manual reporting effort by 70% across sales teams.',
    tags: ['Power BI', 'SQL', 'Data Visualization'],
    icon: BarChart3,
  },
  {
    id: 'recommendation-engine',
    title: 'Recommendation Engine',
    category: 'data',
    categoryLabel: 'Data & Analytics',
    description: 'Collaborative filtering system built with Python and Pandas to recommend books based on user behavior and ratings.',
    tags: ['Python', 'Pandas', 'Machine Learning'],
    icon: Network,
  },
  {
    id: 'student-well-being-app',
    title: 'Student Well-being App',
    category: 'fullstack',
    categoryLabel: 'Full-Stack',
    description: 'Django web application measuring happiness and well-being using multiple indicators to support student engagement.',
    tags: ['Django', 'REST API', 'UX Design'],
    icon: PanelTop,
  },
  {
    id: 'lpg-gas-leakage-monitor',
    title: 'LPG Gas Leakage Monitor',
    category: 'iot',
    categoryLabel: 'IoT',
    description: 'IoT safety system using Arduino and MQ6 sensors for real-time gas detection, alerting, and automated shutoff response.',
    tags: ['IoT', 'Arduino', 'Automation'],
    icon: Rocket,
  },
];

const skillGroups: {
  id: SkillCategory;
  title: string;
  items: [string, number][];
}[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    items: [['Angular', 90], ['TypeScript', 88], ['HTML5 / CSS3', 95], ['JavaScript (ES6+)', 90]],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    items: [['Node.js / Express', 85], ['Python / Django', 80], ['PHP / .NET', 75], ['REST API Design', 88]],
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    items: [['SQL / MySQL', 85], ['Power BI', 90], ['Data Science', 75], ['AWS Cloud', 70]],
  },
];

const techStack = ['Angular', 'Node.js', 'JavaScript', 'Python', 'MySQL', 'AWS', 'Git', 'Docker', 'Power BI', 'HTML5', 'CSS3', 'Express'];

const experience = [
  {
    date: 'July 2025 — Present',
    title: 'Software Engineer',
    company: 'Sedna Technologies',
    bullets: [
      'Developed full-stack ERP systems with Angular, Node.js, Express, MySQL',
      'Single-handedly managed Order ERP from client meetings to production support',
      'Built real-time inventory tracking with low-stock alerts and product history',
      'Designed and integrated RESTful APIs for seamless data exchange',
    ],
  },
  {
    date: 'April 2024 — April 2025',
    title: 'Data Analyst',
    company: 'ACS Consultancy',
    bullets: [
      'Processed 100,000+ sales records using SQL & Excel, ensuring accuracy',
      'Built automated KPI dashboards in Power BI, reducing manual reporting by 70%',
      'Delivered actionable insights identifying weak zones and top-performing products',
    ],
  },
  {
    date: 'Feb 2024 — May 2024',
    title: 'Data Science Intern',
    company: 'AiVariant',
    bullets: [
      'Developed Book Recommendation System using Python, Pandas & collaborative filtering',
      'Performed EDA with Matplotlib & Seaborn for data insights',
    ],
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function IconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a className="social-link" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer noopener' : undefined} aria-label={label} data-testid={`link-${label.toLowerCase()}`}>
      {children}
    </a>
  );
}

function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projectFilter, setProjectFilter] = useState<'all' | ProjectCategory>('all');
  const [skillFilter, setSkillFilter] = useState<'all' | SkillCategory>('all');
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('aditya-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('aditya-theme', theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );
    navItems.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.title = 'Aditya Ubale | Full-Stack Software Engineer';
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', 'Aditya Ubale - Full-Stack Software Engineer specializing in Angular, Node.js, ERP systems, and analytics automation. Delivering modern enterprise applications with measurable business impact.');
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      document.querySelector<HTMLElement>('.progress-fill')?.style.setProperty('transform', `scaleX(${progress})`);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const visibleProjects = useMemo(
    () => projects.filter((project) => projectFilter === 'all' || project.category === projectFilter),
    [projectFilter],
  );
  const visibleSkills = useMemo(
    () => skillGroups.filter((group) => skillFilter === 'all' || group.id === skillFilter),
    [skillFilter],
  );

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    if (!name || !email || !message) {
      setFormStatus('Please complete all fields before sending.');
      return;
    }
    const subject = encodeURIComponent(`Portfolio conversation from ${name}`);
    const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
    window.location.href = `mailto:adityajubale4567@gmail.com?subject=${subject}&body=${body}`;
    setFormStatus('Your email client is ready to send this message.');
  };

  const navigate = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <div className="portfolio-shell">
      <div className="progress-track" aria-hidden="true"><div className="progress-fill" /></div>
      <header className="site-nav" data-testid="site-navigation">
        <button className="brand" onClick={() => navigate('home')} aria-label="Back to home" data-testid="button-home">
          <span className="brand-mark">AU</span>
          <span>Aditya Ubale</span>
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <button key={id} className={`nav-link ${activeSection === id ? 'active' : ''}`} onClick={() => navigate(id)} data-testid={`button-nav-${id}`}>
              {label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} data-testid="button-theme-toggle">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a className="resume-link" href="Aditya_Ubale_Resume.pdf" download data-testid="link-resume"><Download size={14} /> Resume</a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero site-container">
          <div className="hero-copy reveal">
            <div className="eyebrow" style={{ marginBottom: 14 }}>Aditya Ubale / Full-Stack Software Engineer</div>
            <div className="hero-kicker eyebrow"><span className="live-dot" /> Available for opportunities</div>
            <h1>Complex systems.<br /><em>Clear outcomes.</em></h1>
            <p className="hero-lede">Full-stack software engineer crafting Angular and Node.js solutions for ERP, analytics, and web applications. I deliver scalable systems that automate workflows, improve reporting, and create seamless user experiences.</p>
            <div className="hero-actions">
              <button className="button-primary" onClick={() => navigate('contact')} data-testid="button-hero-contact">Let's Talk <ArrowUpRight size={16} /></button>
              <button className="button-quiet" onClick={() => navigate('projects')} data-testid="button-hero-projects">View Work <ArrowDown size={16} /></button>
            </div>
            <div className="hero-socials">
              <IconLink href="https://www.linkedin.com/in/aditya-ubale-b6456a1b4" label="LinkedIn"><Linkedin size={16} /></IconLink>
              <IconLink href="https://github.com/adityajubale" label="GitHub"><Github size={16} /></IconLink>
              <IconLink href="mailto:adityajubale4567@gmail.com" label="Email"><Mail size={16} /></IconLink>
              <span className="hero-note">Angular / Node.js / ERP / Analytics</span>
            </div>
          </div>
          <div className="hero-visual reveal" style={{ animationDelay: '120ms' }} aria-label="A small snapshot of Aditya's technical focus" data-testid="visual-technical-focus">
            <span className="orbit one" aria-hidden="true" /><span className="orbit two" aria-hidden="true" /><span className="orbit-dot" aria-hidden="true" />
            <div className="code-card">
              <div className="code-bar"><span className="window-dot" /><span className="window-dot" /><span className="window-dot" /><span className="code-title">aditya / systems.ts</span></div>
              <div className="code-body">
                <div><span className="key">const</span> <span className="value">focus</span> = {'{'}</div>
                <div>&nbsp;&nbsp;front_end: <span className="value">'Angular'</span>,</div>
                <div>&nbsp;&nbsp;back_end: <span className="value">'Node.js'</span>,</div>
                <div>&nbsp;&nbsp;data: <span className="value">'Power BI + SQL'</span>,</div>
                <div>&nbsp;&nbsp;impact: <span className="value">'measurable'</span>,</div>
                <div>{'}'}</div>
                <div className="comment">// turn complexity into clarity</div>
              </div>
            </div>
            <div className="scroll-cue"><span className="scroll-line" /> Scroll to explore</div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="site-container">
            <div className="section-heading">
              <div className="section-index eyebrow">01 / About</div>
              <div><h2>Useful by<br />design.</h2><p>Passionate about building scalable solutions that drive business value.</p></div>
            </div>
            <div className="about-grid">
              <div>
                <p className="about-copy">As a software engineer with more than <strong>2 years of experience</strong>, I specialize in building modern enterprise applications using Angular, Node.js, Express and MySQL.</p>
                <p className="muted" style={{ maxWidth: '580px', lineHeight: 1.7 }}>I partner with business teams to translate requirements into production-ready web applications, ERP workflows, and analytics experiences that reduce manual effort and improve operational visibility.</p>
                <ul className="about-list">
                  <li>Delivered end-to-end ERP solutions with inventory tracking, order management, and real-time reporting.</li>
                  <li>Reduced manual reporting by 70% and processed 100,000+ sales records for executive decision-making.</li>
                  <li>Designed robust REST APIs, reusable UI components, and data-driven dashboards for enterprise users.</li>
                  <li>Single-handedly managed Order ERP from client meetings to production support.</li>
                </ul>
              </div>
              <div className="about-cards">
                {[
                  ['01', 'Business Impact', 'Built features that improved order-to-delivery transparency, automated low-stock alerts, and supported faster stakeholder reviews.'],
                  ['02', 'Technical Focus', 'Angular, Node.js, Express, TypeScript, MySQL, Power BI, REST APIs, performance optimization, and responsive UX.'],
                  ['03', 'Problem Solver', 'Transforming complex business requirements into elegant, scalable technical solutions with measurable ROI.'],
                ].map(([number, title, text]) => (
                  <article className="about-card" key={number} data-testid={`card-about-${number}`}>
                    <span className="card-number">{number}</span><h3>{title}</h3><p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="site-container">
            <div className="section-heading">
              <div className="section-index eyebrow">02 / What I do</div>
              <div><h2>From brief<br />to build.</h2><p>Comprehensive software development services tailored to your business needs.</p></div>
            </div>
            <div className="services-layout">
              <div className="services-intro"><p>Good software makes the important path obvious. I work across the stack to make that path faster, clearer, and easier to operate.</p></div>
              <div className="service-list">
                {([
                  ['01', 'Full-Stack Development', 'End-to-end web application development using modern frameworks and best practices.', ['Angular Frontend Development', 'Node.js & Express Backend', 'RESTful API Design', 'Database Architecture']],
                  ['02', 'ERP Solutions', 'Custom ERP systems that streamline operations and improve business efficiency.', ['Order Management Systems', 'Inventory Tracking', 'Real-time Reporting', 'Workflow Automation']],
                  ['03', 'Data Analytics', 'Transform raw data into actionable insights with powerful dashboards and reports.', ['Power BI Dashboards', 'Data Visualization', 'Automated Reporting', 'Business Intelligence']],
                  ['04', 'Responsive Design', 'Pixel-perfect, mobile-first designs that work seamlessly across all devices.', ['Mobile-First Approach', 'Cross-Browser Compatibility', 'Performance Optimization', 'Accessibility Standards']],
                ] as const).map(([no, title, description, features]) => (
                  <article className="service-row" key={no} data-testid={`card-service-${no}`}>
                    <span className="service-no">{no}</span>
                    <div><h3>{title}</h3><p>{description}</p><div className="tag-list" style={{ marginTop: 13 }}>{features.map((feature) => <span className="tag" key={feature}><Check size={10} style={{ display: 'inline', marginRight: 5 }} />{feature}</span>)}</div></div>
                    <ArrowUpRight className="service-arrow" size={18} />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="site-container">
            <div className="section-heading">
              <div className="section-index eyebrow">03 / Experience</div>
              <div><h2>Where the<br />work lands.</h2><p>My professional journey and key contributions.</p></div>
            </div>
            <div className="timeline">
              {experience.map((item, index) => (
                <article className="timeline-item" key={item.company} data-testid={`timeline-experience-${index}`}>
                  <span className="timeline-dot" aria-hidden="true" /><div className="timeline-date">{item.date}</div>
                  <div className="timeline-content"><h3>{item.title}</h3><div className="company">{item.company}</div><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="site-container">
            <div className="section-heading">
              <div className="section-index eyebrow">04 / Skills</div>
              <div><h2>A practical<br />toolkit.</h2><p>Technologies and tools I work with to bring ideas to life.</p></div>
            </div>
            <div className="filter-bar" role="tablist" aria-label="Skill categories">
              {(['all', 'frontend', 'backend', 'data'] as const).map((filter) => (
                <button key={filter} className={`filter-button ${skillFilter === filter ? 'active' : ''}`} onClick={() => setSkillFilter(filter)} role="tab" aria-selected={skillFilter === filter} data-testid={`button-skill-filter-${filter}`}>
                  {filter === 'all' ? 'All Skills' : filter === 'data' ? 'Data & Analytics' : filter[0].toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
            <div className="skills-grid">
              {visibleSkills.map((group) => (
                <article className="skill-panel" key={group.id} data-testid={`panel-skills-${group.id}`}>
                  <h3>{group.title}<span>{group.items.length} areas</span></h3>
                  {group.items.map(([name, value]) => <div className="skill-item" key={name}><div className="skill-meta"><span>{name}</span><span>{value}%</span></div><div className="skill-bar"><div className="skill-fill" style={{ transform: `scaleX(${value / 100})` }} /></div></div>)}
                </article>
              ))}
            </div>
            <div className="tech-strip" aria-label="Technology stack">
              {techStack.map((tech) => <span className="tech-chip" key={tech}><Code2 size={13} />{tech}</span>)}
            </div>
          </div>
        </section>

        <section className="section" aria-label="Selected results">
          <div className="site-container">
            <div className="stats-band">
              {[['5', 'Enterprise Applications'], ['100,000+', 'Records Processed'], ['70%', 'Reporting Automated'], ['2', 'Years Experience']].map(([value, label]) => <div className="stat-cell" key={label} data-testid={`stat-${label.toLowerCase().replaceAll(' ', '-')}`}><div className="stat-value">{value}</div><div className="stat-label">{label}</div></div>)}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="site-container">
            <div className="section-heading">
              <div className="section-index eyebrow">05 / Projects</div>
              <div><h2>Selected<br />work.</h2><p>A showcase of my recent work and personal projects.</p></div>
            </div>
            <div className="filter-bar" role="tablist" aria-label="Project categories">
              {(['all', 'fullstack', 'data', 'iot'] as const).map((filter) => (
                <button key={filter} className={`filter-button ${projectFilter === filter ? 'active' : ''}`} onClick={() => setProjectFilter(filter)} role="tab" aria-selected={projectFilter === filter} data-testid={`button-project-filter-${filter}`}>
                  {filter === 'all' ? 'All Projects' : filter === 'fullstack' ? 'Full-Stack' : filter === 'data' ? 'Data & Analytics' : 'IoT'}
                </button>
              ))}
            </div>
            <div className="project-grid">
              {visibleProjects.map((project) => {
                const ProjectIcon = project.icon;
                return <article className="project-card" key={project.id} data-testid={`card-project-${project.id}`}>
                  <div className="project-visual"><div className="project-visual-icon"><ProjectIcon size={22} /></div><span className="project-category">{project.categoryLabel}</span></div>
                  <div className="project-info"><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
                </article>;
              })}
            </div>
            {visibleProjects.length === 0 && <div className="muted" style={{ padding: '30px 0' }}>No projects in this category.</div>}
          </div>
        </section>

        <section id="certifications" className="section">
          <div className="site-container">
            <div className="section-heading">
              <div className="section-index eyebrow">06 / Learning</div>
              <div><h2>Still<br />curious.</h2><p>Continuous learning and professional development.</p></div>
            </div>
            <div className="learning-grid">
              {[
                [GraduationCap, 'Professional Growth', 'Continuous learning through hands-on training in Angular, Node.js, REST API design, and data visualization for enterprise applications.'],
                [BarChart3, 'Business Intelligence', 'Designed automated Power BI reporting solutions that improved decision-making speed and reduced manual reporting effort by 70%.'],
                [FileCode2, 'Modern Development', 'Committed to staying current with modern front-end and back-end frameworks, performance tuning, and responsive UX best practices.'],
              ].map(([Icon, title, text]) => {
                const LearningIcon = Icon as typeof GraduationCap;
                return <article className="learning-card" key={title as string} data-testid={`card-learning-${title}`}><LearningIcon className="learning-icon" size={22} /><h3>{title as string}</h3><p>{text as string}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="site-container">
            <div className="section-heading">
              <div className="section-index eyebrow">07 / Contact</div>
              <div><h2>Let's make<br />it useful.</h2><p>Have a project in mind? Let's work together to bring your ideas to life.</p></div>
            </div>
            <div className="contact-layout">
              <div className="contact-copy">
                Let's connect.
                <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!</p>
                <div className="contact-list">
                  <a className="contact-item" href="mailto:adityajubale4567@gmail.com" data-testid="link-contact-email"><span className="contact-icon"><Mail size={15} /></span><span>adityajubale4567@gmail.com</span></a>
                  <a className="contact-item" href="https://www.linkedin.com/in/aditya-ubale-b6456a1b4" target="_blank" rel="noreferrer noopener" data-testid="link-contact-linkedin"><span className="contact-icon"><Linkedin size={15} /></span><span>Connect with me professionally</span><ExternalLink size={13} /></a>
                  <a className="contact-item" href="https://github.com/adityajubale" target="_blank" rel="noreferrer noopener" data-testid="link-contact-github"><span className="contact-icon"><Github size={15} /></span><span>Check out my code repositories</span><ExternalLink size={13} /></a>
                </div>
              </div>
              <form className="contact-form" onSubmit={handleContactSubmit} data-testid="form-contact">
                <div className="form-row">
                  <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name" placeholder="Your name" data-testid="input-contact-name" /></div>
                  <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" data-testid="input-contact-email" /></div>
                </div>
                <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" required placeholder="What are you working on?" data-testid="input-contact-message" /></div>
                <button className="button-primary" type="submit" data-testid="button-contact-submit">Prepare email <ArrowUpRight size={16} /></button>
                {formStatus && <p className="form-status" role="status" data-testid="status-contact-form">{formStatus}</p>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container footer-inner">
          <p className="footer-copy"><strong>Aditya Ubale</strong> · Full-Stack Software Engineer specializing in Angular, Node.js, and data-driven enterprise solutions.</p>
          <button className="back-top" onClick={() => navigate('home')} aria-label="Back to top" data-testid="button-back-to-top"><ArrowUp size={16} /></button>
        </div>
      </footer>
      <div className="mobile-dock" aria-label="Mobile navigation">
        {([['home', PanelTop], ['about', PenLine], ['projects', Layers3], ['contact', Mail]] as const).map(([id, Icon]) => <button key={id} className="dock-link" onClick={() => navigate(id)} data-testid={`button-dock-${id}`}><Icon size={16} /><span>{id}</span></button>)}
      </div>
    </div>
  );
}

function Router() {
  return (
    <ErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;