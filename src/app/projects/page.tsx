import type { Metadata } from "next";
import Link from "next/link";
import { basics, projects } from "../profile";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Projects — Sodeeq Alli",
  description: "Project portfolio for Sodeeq Alli.",
};

export default function ProjectsPage() {
  return (
    <div className={styles.surface}>
      <main className={styles.page}>
        <div className={styles.inlineNav}>
          <Link href="/">← Back to summary</Link>
          <a href={`mailto:${basics.email}`}>Email</a>
        </div>
        <header className={styles.header}>
          <p className={styles.stamp}>Projects — Sodeeq Alli</p>
          <h1 className={styles.title}>Build log</h1>
          <p className={styles.lead}>
            Cloud-native systems, mobile apps, backend services, and data
            projects with AWS, Flutter, and Node.js.
          </p>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>Full list</div>
          <ul className={styles.projects}>
            {projects.map((project) => (
              <li key={project.name} className={styles.project}>
                <div className={styles.projectHeader}>
                  <span className={styles.projectName}>{project.name}</span>
                  <span className={styles.projectMeta}>{project.duration}</span>
                </div>
                <span className={styles.projectDetail}>{project.stack}</span>
                <p className={styles.projectSummary}>{project.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
