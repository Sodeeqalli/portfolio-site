import type { Metadata } from "next";
import Link from "next/link";
import { basics, skillGroups } from "../profile";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Skills — Sodeeq Alli",
  description: "Skills and tools for Sodeeq Alli.",
};

export default function SkillsPage() {
  return (
    <div className={styles.surface}>
      <main className={styles.page}>
        <div className={styles.inlineNav}>
          <Link href="/">← Back to summary</Link>
          <a href={`mailto:${basics.email}`}>Email</a>
        </div>
        <header className={styles.header}>
          <p className={styles.stamp}>Skills & Tools — Sodeeq Alli</p>
          <h1 className={styles.title}>Stacks & strengths</h1>
          <p className={styles.lead}>
            Cloud and AWS, backend services, data engineering, mobile
            development, and supporting practices.
          </p>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>Full index</div>
          <div className={styles.skillGrid}>
            {skillGroups.map((group) => (
              <div key={group.title} className={styles.skillCard}>
                <h4 className={styles.subhead}>{group.title}</h4>
                <ul className={styles.notes}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
