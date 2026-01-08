import type { Metadata } from "next";
import Link from "next/link";
import { basics, experiencesSorted } from "../profile";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Experience — Sodeeq Alli",
  description: "Full experience log for Sodeeq Alli.",
};

export default function ExperiencePage() {
  return (
    <div className={styles.surface}>
      <main className={styles.page}>
        <div className={styles.inlineNav}>
          <Link href="/">← Back to summary</Link>
          <a href={`mailto:${basics.email}`}>Email</a>
        </div>
        <header className={styles.header}>
          <p className={styles.stamp}>Experience — Sodeeq Alli</p>
          <h1 className={styles.title}>Roles & impact</h1>
          <p className={styles.lead}>
            Backend, cloud, and mobile work across startups, student
            organizations, and mentorship programs.
          </p>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>Full log</div>
          <div className={styles.entries}>
            {experiencesSorted.map((item) => (
              <article key={item.role + item.period} className={styles.entry}>
                <div className={styles.period}>{item.period}</div>
                <div className={styles.entryBody}>
                  <div className={styles.entryHeading}>
                    <h3>{item.role}</h3>
                    <span className={styles.entryOrg}>{item.org}</span>
                  </div>
                  <p className={styles.entrySummary}>{item.summary}</p>
                  <ul className={styles.notes}>
                    {item.bullets.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
