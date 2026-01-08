import type { Metadata } from "next";
import Link from "next/link";
import { basics, education, coursework } from "../profile";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Education — Sodeeq Alli",
  description: "Education and coursework for Sodeeq Alli.",
};

export default function EducationPage() {
  return (
    <div className={styles.surface}>
      <main className={styles.page}>
        <div className={styles.inlineNav}>
          <Link href="/">← Back to summary</Link>
          <a href={`mailto:${basics.email}`}>Email</a>
        </div>
        <header className={styles.header}>
          <p className={styles.stamp}>Education — Sodeeq Alli</p>
          <h1 className={styles.title}>Academic track</h1>
          <p className={styles.lead}>
            Graduate and undergraduate studies with emphasis on software,
            cloud, and systems foundations.
          </p>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>Degrees</div>
          <div className={styles.cardGrid}>
            {education.map((item) => (
              <div key={item.school} className={styles.card}>
                <h3 className={styles.subhead}>{item.school}</h3>
                <p className={styles.strong}>{item.degree}</p>
                <p className={styles.muted}>{item.specialization}</p>
                <p className={styles.muted}>{item.cgpa}</p>
                <p className={styles.muted}>{item.duration}</p>
                <p className={styles.muted}>{item.location}</p>
                {item.focus && (
                  <ul className={styles.notes}>
                    {item.focus.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>Relevant coursework</div>
          <ul className={styles.coursework}>
            {coursework.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
