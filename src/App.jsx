import { useState, useEffect, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Experience", "Work", "Skills", "Contact"];

const STATS = [
  { num: "5+", label: "Years Experience" },
  { num: "3.5", label: "GPA — Cum Laude" },
  { num: "6", label: "Relevant Roles Held" },
  { num: "3+", label: "Notable Projects" },
];

const TECH_TAGS = [
  "Python","Java","C","TensorFlow","PyTorch","YOLO",
  "Flask","MongoDB","Google Cloud","Jupyter","Cognex",
  "UiPath","Blender","AutoCAD","Bootstrap",
];

const METHOD_TAGS = ["Agile/SCRUM","Project Management","Data Science"];

const EXPERIENCE = [
  {
    period: "Sep 2025 — Present",
    role: "RPA Developer I",
    company: "United Wholesale Mortgage · Pontiac, MI",
    bullets: [
      "Developing robotic process automation solutions to streamline enterprise mortgage workflows",
      "Contributing to automation initiatives that drive operational efficiency at scale",
      "Working within a large-scale enterprise technology environment on high-impact internal systems",
    ],
  },
  {
    period: "Jun 2025 — Sep 2025",
    role: "Counter Intelligence Agent Senior — Geek Squad",
    company: "Best Buy · East Lansing, MI",
    bullets: [
      "Manager of day-to-day Geek Squad operations",
      "Provides consultations to clients regarding Geek Squad services",
      "Overhauled internal processes and implemented standards to improve team morale and efficiency",
    ],
  },
  {
    period: "Mar 2025 — Jun 2025",
    role: "Shift Lead",
    company: "Best Buy · East Lansing, MI",
    bullets: [
      "Led the Asset Protection team, ensuring good customer experience and product security",
      "Acted as a first test for a new role within the company's retail locations",
      "Trained other Best Buy locations on implementing new processes",
    ],
  },
  {
    period: "Dec 2024 — Mar 2025",
    role: "Sales Advisor",
    company: "Best Buy · East Lansing, MI",
    bullets: [
      "Created solutions for customers in a fast-paced environment, adapting to different customer needs",
    ],
  },
  {
    period: "Mar 2024 — Jun 2024",
    role: "Research Assistant",
    company: "Kettering University · Flint, MI",
    bullets: [
      "Managed a 4-member research team for an intelligent sun glare blocking system for vehicles",
      "Organized bi-weekly meetings with project sponsors to discuss direction and progress",
      "Managed rapid turnover of functional software using agile development methodologies",
      "Developed a simulated testing environment using Unreal Engine",
    ],
  },
  {
    period: "Apr 2022 — Jan 2024",
    role: "Software Engineering Co-Op",
    company: "Indicon Corporation · Sterling Heights, MI",
    bullets: [
      "Led a project to integrate synthetic data into machine vision applications",
      "Worked with Cognex machine vision tools to perform object detection",
      "Regularly presented R&D progress updates to management",
      "Trained neural networks using TensorFlow, PyTorch, and YOLO architectures",
      "Collaborated with cross-functional teams to gather data and perform tests",
    ],
  },
];

const PROJECTS = [
  {
    num: "01",
    name: "Synthetic Data & Machine Vision",
    desc: "Thesis research into training machine vision models with synthetically rendered datasets. Automated image generation in Blender, tested across multiple detection frameworks, and concluded synthetic data can yield accurate results with minimal real-world images.",
    tech: ["TensorFlow","PyTorch","YOLO","Cognex","Blender"],
  },
  {
    num: "02",
    name: "Point of Sale System",
    desc: "A full-featured POS system for a coffee shop built with a Python Flask backend and MongoDB. Tracked inventory, sales, and business variables — delivered iteratively using agile SCRUM methodology.",
    tech: ["Python","Flask","MongoDB","Bootstrap"],
  },
  {
    num: "03",
    name: "Employee Management System",
    desc: "Extended the POS into a cloud-hosted employee management platform for small businesses. Added scheduling, role-based access controls, and privileged user permissions — deployed on Google Cloud Platform.",
    tech: ["Python","Flask","MongoDB","GCP","Bootstrap"],
  },
];

const SKILLS_LEFT = [
  { name: "Python", pct: 92 },
  { name: "Java", pct: 82 },
  { name: "C", pct: 76 },
  { name: "Flask / Web Backend", pct: 74 },
  { name: "MongoDB", pct: 72 },
];

const SKILLS_RIGHT = [
  { name: "UiPath", pct: 85 },
  { name: "TensorFlow / PyTorch", pct: 80 },
  { name: "Computer Vision", pct: 75 },
  { name: "Data Science Libraries", pct: 70 },
  { name: "Google Cloud Platform", pct: 65 },
];

const COURSEWORK = [
  "Software Engineering",
  "Foundations of Data Science",
  "Artificial Intelligence",
  "Operating Systems",
  "Cloud Computing",
];

const HONORS = ["Dean's List","Cum Laude","Kappa Mu Epsilon","Upsilon Pi Epsilon"];

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── SMALL COMPONENTS ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionHeader({ label, title }) {
  return (
    <Reveal>
      <p style={s.sectionLabel}>{label}</p>
      <h2 style={s.sectionTitle} dangerouslySetInnerHTML={{ __html: title }} />
      <div style={s.divider} />
    </Reveal>
  );
}

function Tag({ children }) {
  const [hover, setHover] = useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontSize: 10, padding: "6px 13px",
        border: `1px solid ${hover ? "#7eb8c9" : "rgba(255,255,255,0.08)"}`,
        color: hover ? "#7eb8c9" : "#7a7a7a",
        transition: "all 0.3s", cursor: "default", whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function SkillBar({ name, pct, animate }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <span style={{ fontSize: 11, color: "#e8e4dc", display: "block", marginBottom: 8 }}>{name}</span>
      <div style={{ height: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(to right, #7eb8c9, #c9a96e)",
          width: animate ? `${pct}%` : "0%",
          transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
}

// ── SECTIONS ──────────────────────────────────────────────────────────────────
function Hero({ scrollTo }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const anim = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  });

  return (
    <section id="home" style={s.heroSection}>
      {/* Background */}
      <div style={s.heroBg} />
      <div style={s.heroBgStars} />
      <div style={s.heroBgFade} />

      {/* Avatar */}
      <div style={{ ...s.avatarWrap, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(-14px)", transition: "opacity 0.9s ease 0s, transform 0.9s ease 0s" }}>
        <div style={s.avatarRing2} />
        <div style={s.avatarRing1} />
        <div style={s.avatar}>TB</div>
      </div>

      {/* Text */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <h1 style={{ ...s.heroGreeting, ...anim(0.15) }}>
          Hi, I'm <span style={{ color: "#7eb8c9", fontStyle: "italic" }}>Tyler Brunette</span>
        </h1>
        <p style={{ ...s.heroRole, ...anim(0.3) }}>I'm a Software Developer</p>
        <p style={{ ...s.heroTagline, ...anim(0.45) }}>
          CS graduate from Kettering University. Proven ability to rapidly develop functional solutions, lead technical teams, and deliver results across diverse industries.
        </p>
        <div style={{ ...s.heroCta, ...anim(0.6) }}>
          <button onClick={() => scrollTo("experience")} style={s.btnPrimary}>View My Work</button>
          <button onClick={() => scrollTo("contact")} style={s.btnOutline}>Get in Touch</button>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ ...s.scrollHint, ...anim(1) }}>
        <span>Scroll</span>
        <div style={s.scrollLine} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ ...s.section, background: "#080a0c" }}>
      <div style={s.container}>
        <SectionHeader label="01 — About" title="Adaptable by nature,<br/>technical by training." />
        <div style={s.aboutGrid}>
          {/* Left */}
          <Reveal>
            <p style={s.bodyText}>A Computer Science graduate from Kettering University with hands-on experience across diverse industries — from machine vision R&D and software engineering co-ops to retail leadership and technical operations.</p>
            <p style={s.bodyText}>My career has spanned controls engineering, computer vision research, and multi-role progression at Best Buy — from Sales Advisor to Geek Squad Senior — building a track record of rapidly adapting and leading teams effectively.</p>
            <p style={{ ...s.bodyText, marginBottom: 0 }}>I thrive where technical depth meets people skills — whether that means training a neural network, managing a technical team, or overhauling operational processes to boost efficiency.</p>
            <div style={s.statsGrid}>
              {STATS.map((st) => <StatCard key={st.label} {...st} />)}
            </div>
          </Reveal>
          {/* Right */}
          <Reveal delay={0.15}>
            <DetailBlock title="Technical Skills"><div style={s.tagList}>{TECH_TAGS.map(t => <Tag key={t}>{t}</Tag>)}</div></DetailBlock>
            <DetailBlock title="Methodologies"><div style={s.tagList}>{METHOD_TAGS.map(t => <Tag key={t}>{t}</Tag>)}</div></DetailBlock>
            <DetailBlock title="Currently At"><div style={s.tagList}><Tag>RPA Developer I @ UWM</Tag><Tag>Pontiac, MI</Tag></div></DetailBlock>
            <DetailBlock title="Contact"><div style={s.tagList}><Tag>tybru02@gmail.com</Tag><Tag>(517) 899-5649</Tag></div></DetailBlock>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatCard({ num, label }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: `1px solid ${hover ? "rgba(126,184,201,0.25)" : "rgba(255,255,255,0.08)"}`,
        padding: 22, background: "rgba(255,255,255,0.015)",
        position: "relative", overflow: "hidden", transition: "border-color 0.3s",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: hover ? "100%" : 0, background: "#7eb8c9", transition: "height 0.4s" }} />
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, color: "#7eb8c9", fontWeight: 300 }}>{num}</div>
      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#7a7a7a", marginTop: 4 }}>{label}</div>
    </div>
  );
}

function DetailBlock({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#c9a96e", marginBottom: 14 }}>{title}</p>
      {children}
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ ...s.section, background: "#0d0f11" }}>
      <div style={s.container}>
        <SectionHeader label="02 — Experience" title="Where I've built things." />
        <div style={{ position: "relative", paddingLeft: 2 }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #7eb8c9, rgba(126,184,201,0.1))" }} />
          {EXPERIENCE.map((job, i) => <TimelineItem key={job.role} job={job} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ job, delay }) {
  const [ref, visible] = useInView();
  const [dotHover, setDotHover] = useState(false);
  return (
    <div
      ref={ref}
      style={{
        paddingLeft: 40, marginBottom: 60, position: "relative",
        opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-16px)",
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      <div
        onMouseEnter={() => setDotHover(true)}
        onMouseLeave={() => setDotHover(false)}
        style={{
          position: "absolute", left: -5, top: 5,
          width: 11, height: 11, borderRadius: "50%",
          background: dotHover ? "#7eb8c9" : "#0d0f11",
          border: "2px solid #7eb8c9", transition: "background 0.3s",
        }}
      />
      <p style={{ fontSize: 9, letterSpacing: 2.5, color: "#c9a96e", textTransform: "uppercase", marginBottom: 8 }}>{job.period}</p>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, marginBottom: 4 }}>{job.role}</h3>
      <p style={{ fontSize: 11, letterSpacing: 1, color: "#7a7a7a", marginBottom: 16 }}>{job.company}</p>
      <ul style={{ listStyle: "none" }}>
        {job.bullets.map((b, i) => (
          <li key={i} style={{ fontSize: 12, lineHeight: 2, color: "#8a8880", paddingLeft: 18, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: "#7eb8c9", fontSize: 10, top: 2 }}>—</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Projects() {
  return (
    <section id="work" style={{ ...s.section, background: "#080a0c" }}>
      <div style={s.container}>
        <SectionHeader label="03 — Work" title="Things I've made." />
        <div style={s.projectsGrid}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.num} project={p} delay={i * 0.12} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }) {
  const [ref, visible] = useInView();
  const [hover, setHover] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: `1px solid ${hover ? "rgba(126,184,201,0.3)" : "rgba(255,255,255,0.08)"}`,
        background: hover ? "rgba(126,184,201,0.025)" : "rgba(255,255,255,0.015)",
        padding: 32,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, border-color 0.4s, background 0.4s`,
      }}
    >
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: "rgba(126,184,201,0.1)", lineHeight: 1, marginBottom: 18 }}>{project.num}</div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, marginBottom: 12 }}>{project.name}</h3>
      <p style={{ fontSize: 11, lineHeight: 1.9, color: "#888480" }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20 }}>
        {project.tech.map(t => (
          <span key={t} style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 10px", background: "rgba(126,184,201,0.07)", border: "1px solid rgba(126,184,201,0.15)", color: "#7eb8c9" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const [ref, visible] = useInView();
  return (
    <section id="skills" style={{ ...s.section, background: "#0d0f11" }}>
      <div style={s.container}>
        <SectionHeader label="04 — Skills" title="Tools of the trade." />
        <div ref={ref} style={s.skillsGrid}>
          <SkillGroup title="Languages & Frameworks" skills={SKILLS_LEFT} animate={visible} />
          <SkillGroup title="AI / ML & Tools" skills={SKILLS_RIGHT} animate={visible} />
        </div>
      </div>
    </section>
  );
}

function SkillGroup({ title, skills, animate }) {
  return (
    <div>
      <p style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#c9a96e", marginBottom: 28 }}>{title}</p>
      {skills.map((sk) => <SkillBar key={sk.name} name={sk.name} pct={sk.pct} animate={animate} />)}
    </div>
  );
}

function Education() {
  return (
    <section id="education" style={{ ...s.section, background: "#080a0c" }}>
      <div style={s.container}>
        <SectionHeader label="05 — Education" title="Where it started." />
        <Reveal>
          <div style={{ border: "1px solid rgba(255,255,255,0.08)", padding: 52, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, background: "rgba(255,255,255,0.01)" }}>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, marginBottom: 10 }}>B.S. in Computer Science</h3>
              <p style={{ fontSize: 11, letterSpacing: 2, color: "#7eb8c9", textTransform: "uppercase" }}>Kettering University</p>
              <p style={{ fontSize: 11, color: "#7a7a7a", marginTop: 8, lineHeight: 1.8 }}>Flint, Michigan · Class of 2024<br />GPA: 3.5 / 4.0</p>
              <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
                {HONORS.map(h => (
                  <span key={h} style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", padding: "6px 14px", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.28)", color: "#c9a96e" }}>{h}</span>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#c9a96e", marginBottom: 16 }}>Relevant Coursework</p>
              <ul style={{ listStyle: "none" }}>
                {COURSEWORK.map(c => (
                  <li key={c} style={{ fontSize: 12, lineHeight: 2.1, color: "#9a9590", paddingLeft: 18, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "#7eb8c9" }}>›</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ ...s.section, background: "#0d0f11" }}>
      <div style={s.container}>
        <SectionHeader label="06 — Contact" title="Let's connect." />
        <div style={s.contactGrid}>
          <Reveal>
            {[
              { icon: "✉", label: "Email", value: "tybru02@gmail.com", href: "mailto:tybru02@gmail.com" },
              { icon: "☎", label: "Phone", value: "(517) 899-5649", href: "tel:5178995649" },
              { icon: "in", label: "LinkedIn", value: "in/tyler-brunette", href: "https://linkedin.com/in/tyler-brunette" },
              { icon: "⌖", label: "Location", value: "Pontiac, Michigan", href: null },
            ].map(item => <ContactItem key={item.label} {...item} />)}
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", padding: 52, background: "rgba(126,184,201,0.02)" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 300, lineHeight: 1.3, marginBottom: 34 }}>
                Have a project or <em style={{ color: "#7eb8c9" }}>opportunity</em> in mind?
              </p>
              <p style={{ fontSize: 12, lineHeight: 2, color: "#7a7a7a", marginBottom: 32 }}>
                I'm always open to interesting conversations, collaboration, or new opportunities in software development, automation, and AI.
              </p>
              <a href="mailto:tybru02@gmail.com" style={s.btnPrimary}>Say Hello</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value, href }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: icon === "in" ? 11 : 15, fontWeight: icon === "in" ? 600 : 400, flexShrink: 0, color: "#7eb8c9" }}>{icon}</div>
      <div>
        <p style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#7a7a7a", marginBottom: 5 }}>{label}</p>
        {href ? (
          <a href={href} target={href.startsWith("http") ? "_blank" : undefined} style={{ fontSize: 13, color: "#e8e4dc", textDecoration: "none" }}
            onMouseEnter={e => e.target.style.color = "#7eb8c9"}
            onMouseLeave={e => e.target.style.color = "#e8e4dc"}
          >{value}</a>
        ) : (
          <span style={{ fontSize: 13, color: "#e8e4dc" }}>{value}</span>
        )}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "32px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#080a0c", flexWrap: "wrap", gap: 16 }}>
      <p style={{ fontSize: 10, letterSpacing: 1, color: "#7a7a7a" }}>© 2025 Tyler Brunette. All rights reserved.</p>
      <div style={{ display: "flex", gap: 28 }}>
        {[
          { label: "Email", href: "mailto:tybru02@gmail.com" },
          { label: "LinkedIn", href: "https://linkedin.com/in/tyler-brunette" },
        ].map(l => (
          <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined}
            style={{ fontSize: 10, letterSpacing: 1.5, color: "#7a7a7a", textDecoration: "none" }}
            onMouseEnter={e => e.target.style.color = "#7eb8c9"}
            onMouseLeave={e => e.target.style.color = "#7a7a7a"}
          >{l.label}</a>
        ))}
      </div>
    </footer>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ scrollTo, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 56px",
      background: scrolled ? "rgba(8,10,12,0.97)" : "linear-gradient(to bottom, rgba(8,10,12,0.95), transparent)",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <button onClick={() => scrollTo("home")} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, letterSpacing: 4, color: "#e8e4dc", background: "none", border: "none", cursor: "pointer" }}>TB</button>
      <ul style={{ display: "flex", gap: 40, listStyle: "none" }}>
        {NAV_LINKS.map(link => {
          const id = link.toLowerCase();
          const active = activeSection === id;
          return (
            <li key={link}>
              <button
                onClick={() => scrollTo(id)}
                style={{
                  fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
                  color: active ? "#e8e4dc" : "#7a7a7a",
                  background: "none", border: "none", cursor: "pointer",
                  position: "relative", padding: "4px 0",
                  transition: "color 0.3s",
                }}
              >
                {link}
                <span style={{
                  position: "absolute", bottom: -2, left: 0,
                  width: active ? "100%" : "0%", height: 1,
                  background: "#7eb8c9", transition: "width 0.3s",
                }} />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const s = {
  heroSection: {
    height: "100vh", position: "relative",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    textAlign: "center", overflow: "hidden",
  },
  heroBg: {
    position: "absolute", inset: 0,
    background: "radial-gradient(ellipse 90% 60% at 50% 25%, rgba(20,45,65,0.7) 0%, transparent 65%), linear-gradient(170deg, #08141e 0%, #0a160e 45%, #0f0c09 100%)",
  },
  heroBgStars: {
    position: "absolute", inset: 0,
    backgroundImage: "radial-gradient(1.5px 1.5px at 12% 18%, rgba(126,184,201,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 88% 12%, rgba(201,169,110,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 65% 78%, rgba(126,184,201,0.3) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 22% 65%, rgba(255,255,255,0.12) 0%, transparent 100%), radial-gradient(1px 1px at 78% 55%, rgba(126,184,201,0.2) 0%, transparent 100%)",
    animation: "starPulse 6s ease-in-out infinite alternate",
  },
  heroBgFade: {
    position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
    background: "linear-gradient(to bottom, transparent, rgba(6,9,7,0.98))",
  },
  avatarWrap: { position: "relative", marginBottom: 32, zIndex: 2 },
  avatar: {
    width: 120, height: 120, borderRadius: "50%",
    border: "1.5px solid rgba(126,184,201,0.45)",
    background: "linear-gradient(145deg, #162535 0%, #1a1812 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: "#7eb8c9",
    boxShadow: "0 0 50px rgba(126,184,201,0.12)",
    position: "relative", zIndex: 1,
  },
  avatarRing1: {
    position: "absolute", top: -9, left: -9, right: -9, bottom: -9,
    borderRadius: "50%", border: "1px solid rgba(126,184,201,0.2)",
    animation: "ringPulse 3s ease-in-out infinite",
  },
  avatarRing2: {
    position: "absolute", top: -18, left: -18, right: -18, bottom: -18,
    borderRadius: "50%", border: "1px solid rgba(126,184,201,0.1)",
    animation: "ringPulse 3s ease-in-out infinite 0.7s",
  },
  heroGreeting: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(44px, 7vw, 74px)", fontWeight: 300, letterSpacing: 1, lineHeight: 1.1,
  },
  heroRole: { fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "#c9a96e", marginTop: 18 },
  heroTagline: { fontSize: 11, letterSpacing: 1, color: "#7a7a7a", maxWidth: 440, margin: "18px auto 0", lineHeight: 2 },
  heroCta: { marginTop: 40, display: "flex", gap: 16, justifyContent: "center" },
  scrollHint: { position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, fontSize: 9, letterSpacing: 3, color: "#7a7a7a", textTransform: "uppercase" },
  scrollLine: { width: 1, height: 40, background: "linear-gradient(to bottom, #7a7a7a, transparent)", animation: "scrollAnim 2s ease-in-out infinite" },
  btnPrimary: {
    fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2.5,
    textTransform: "uppercase", padding: "14px 34px",
    background: "#7eb8c9", color: "#080a0c",
    border: "none", cursor: "pointer", textDecoration: "none", display: "inline-block",
    boxShadow: "0 4px 24px rgba(126,184,201,0.25)", transition: "all 0.3s",
  },
  btnOutline: {
    fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2.5,
    textTransform: "uppercase", padding: "14px 34px",
    background: "transparent", color: "#e8e4dc",
    border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", transition: "all 0.3s",
  },
  section: { padding: "110px 0" },
  container: { maxWidth: 1080, margin: "0 auto", padding: "0 56px" },
  sectionLabel: { fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#c9a96e", marginBottom: 12 },
  sectionTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px, 5vw, 54px)", fontWeight: 300, lineHeight: 1.1 },
  divider: { width: 48, height: 1, background: "linear-gradient(to right, #7eb8c9, transparent)", margin: "24px 0 52px" },
  aboutGrid: { display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 80, alignItems: "start" },
  bodyText: { fontSize: 12.5, lineHeight: 2.1, color: "#aaa9a3", marginBottom: 22 },
  statsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 40 },
  tagList: { display: "flex", flexWrap: "wrap", gap: 8 },
  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  skillsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 },
  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" },
};

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Inject fonts + keyframes
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Mono:wght@300;400;500&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #0d0f11; color: #e8e4dc; overflow-x: hidden; }
      html { scroll-behavior: smooth; }
      @keyframes starPulse { from { opacity: 0.5; } to { opacity: 1; } }
      @keyframes ringPulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.015)} }
      @keyframes scrollAnim { 0%,100%{opacity:0.3} 50%{opacity:1} }
      button:focus { outline: none; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #080a0c; }
      ::-webkit-scrollbar-thumb { background: rgba(126,184,201,0.3); border-radius: 2px; }
    `;
    document.head.appendChild(style);
  }, []);

  // Track active section
  useEffect(() => {
    const sections = ["home","about","experience","work","skills","education","contact"];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.4 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'DM Mono', monospace", background: "#0d0f11", color: "#e8e4dc" }}>
      <Nav scrollTo={scrollTo} activeSection={activeSection} />
      <Hero scrollTo={scrollTo} />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
