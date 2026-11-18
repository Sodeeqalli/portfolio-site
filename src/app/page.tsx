import {
  basics,
  certifications,
  education,
  experiencesSorted,
  onlinePresence,
  projects,
  skillGroups,
  summary,
} from "./profile";
import styles from "./page.module.css";

const nav = [["Experience", "experience"], ["Projects", "projects"], ["Skills", "skills"], ["Education", "education"], ["Credentials", "credentials"]];

export default function Home() {
  return (
    <main>
      <header className={styles.header}>
        <a className={styles.wordmark} href="#top">Sodeeq Alli</a>
        <nav aria-label="Main navigation">
          {nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
      </header>

      <div className={styles.page} id="top">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div>
            <p className={styles.eyebrow}>{basics.location}</p>
            <h1 id="hero-title">Software engineer.</h1>
            <p className={styles.lead}>{summary[0]}</p>
            <p className={styles.supporting}>{summary[1]}</p>
            <div className={styles.heroLinks}>
              <a href={`mailto:${basics.email}`}>Email</a>
              {onlinePresence.map(item => <a key={item.label} href={item.url} target="_blank" rel="noreferrer">{item.label} ↗</a>)}
              <a href="https://credly.com/users/sodeeq-alli" target="_blank" rel="noreferrer">Credly ↗</a>
            </div>
          </div>
          <dl className={styles.facts}>
            <div><dt>Focus</dt><dd>Backend · Cloud · Applied ML</dd></div>
            <div><dt>Education</dt><dd>MEng, expected May 2027</dd></div>
            <div><dt>Credentials</dt><dd>3× AWS certified</dd></div>
            <div><dt>Status</dt><dd>{basics.availability}</dd></div>
            <div><dt>Work authorization</dt><dd>Canada · no sponsorship required</dd></div>
          </dl>
        </section>

        <Section id="experience" number="01" title="Experience">
          <div className={styles.timeline}>
            {experiencesSorted.map(item => (
              <article className={styles.role} key={`${item.role}-${item.org}`}>
                <p className={styles.period}>{item.period}</p>
                <div>
                  <h3>{item.role}</h3><p className={styles.org}>{item.org}</p>
                  <p className={styles.description}>{item.summary}</p>
                  <p className={styles.tags}>{item.bullets.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="projects" number="02" title={`Projects · ${projects.length}`}>
          <div className={styles.projectGrid}>
            {projects.map((project, index) => (
              <article className={styles.project} key={project.name}>
                <p className={styles.projectIndex}>{String(index + 1).padStart(2, "0")} · {project.duration}</p>
                <h3>{project.name}</h3><p className={styles.description}>{project.summary}</p>
                <p className={styles.stack}>{project.stack}</p>
                <a href={project.link} target="_blank" rel="noreferrer">View project ↗</a>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" number="03" title="Skills">
          <div className={styles.skillGrid}>
            {skillGroups.map(group => <article className={styles.skillGroup} key={group.title}><h3>{group.title}</h3><p>{group.items.join(" · ")}</p></article>)}
          </div>
        </Section>

        <Section id="education" number="04" title="Education">
          <div className={styles.educationGrid}>
            {education.map(item => (
              <article key={item.school}>
                <p className={styles.period}>{item.duration}</p><h3>{item.degree}</h3>
                <p className={styles.org}>{item.school} · {item.location}</p>
                <p className={styles.description}>{item.specialization || ""} {item.cgpa ? `· ${item.cgpa}` : ""}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="credentials" number="05" title={`Credentials · ${certifications.length}`}>
          <div className={styles.credentials}>
            {certifications.map((cert, index) => (
              <article key={`${cert.name}-${cert.issuer}`}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{cert.name}</h3><p>{cert.issuer} · {cert.issued}{cert.expires ? ` — ${cert.expires}` : ""}</p></div></article>
            ))}
          </div>
        </Section>

        <footer className={styles.footer}>
          <div><p className={styles.eyebrow}>Contact</p><h2>Let&apos;s talk.</h2></div>
          <div className={styles.footerLinks}>
            <a href={`mailto:${basics.email}`}>{basics.email}</a>
            {onlinePresence.map(item => <a key={item.label} href={item.url} target="_blank" rel="noreferrer">{item.label} ↗</a>)}
            <a href="https://sodeeq.com" target="_blank" rel="noreferrer">Personal site ↗</a>
          </div>
          <p className={styles.copyright}>© {new Date().getFullYear()} Sodeeq Alli</p>
        </footer>
      </div>
    </main>
  );
}

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return <section className={styles.section} id={id} aria-labelledby={`${id}-title`}><div className={styles.sectionHead}><span>{number}</span><h2 id={`${id}-title`}>{title}</h2></div>{children}</section>;
}
