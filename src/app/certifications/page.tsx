import type { Metadata } from "next";
import Link from "next/link";
import { basics, certifications } from "../profile";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Certifications — Sodeeq Alli",
  description: "Verified certifications for Sodeeq Alli.",
};

export default function CertificationsPage() {
  return (
    <div className={styles.surface}>
      <main className={styles.page}>
        <div className={styles.inlineNav}>
          <Link href="/">← Back to summary</Link>
          <a href={`mailto:${basics.email}`}>Email</a>
        </div>
        <header className={styles.header}>
          <p className={styles.stamp}>Certifications — Sodeeq Alli</p>
          <h1 className={styles.title}>Verified credentials</h1>
          <p className={styles.lead}>
            AWS, AI, security, programming, and language credentials captured
            in one list.
          </p>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>Full list</div>
          <div className={styles.certGrid}>
            {certifications.map((cert) => (
              <div key={cert.name} className={styles.cert}>
                <div className={styles.certName}>{cert.name}</div>
                <div className={styles.certIssuer}>{cert.issuer}</div>
                <div className={styles.certMeta}>
                  <span>Issued: {cert.issued}</span>
                  {cert.expires && <span>· Expires: {cert.expires}</span>}
                </div>
                {cert.credentialId && (
                  <div className={styles.certMeta}>
                    Credential ID: {cert.credentialId}
                  </div>
                )}
                {cert.skills && (
                  <div className={styles.certSkills}>{cert.skills}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
