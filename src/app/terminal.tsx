"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  basics,
  primaryRoles,
  onlinePresence,
  education,
  experiencesSorted,
  projects,
  certifications,
} from "./profile";
import styles from "./page.module.css";

type Mode = "cli" | "touch";
type Directory =
  | "projects"
  | "about"
  | "experience"
  | "education"
  | "certifications";
type View = Directory | "intro" | "listing";

const directories: { key: Directory; label: string; summary: string }[] = [
  {
    key: "about",
    label: "about/",
    summary: "",
  },
  {
    key: "experience",
    label: "experience/",
    summary: "",
  },
  {
    key: "education",
    label: "education/",
    summary: "",
  },
  {
    key: "certifications",
    label: "certifications/",
    summary: "",
  },
  {
    key: "projects",
    label: "projects/",
    summary: "",
  },
];

const toSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
const getYearFromPeriod = (period: string) => {
  const match = period.match(/(\d{4})/);
  return match ? match[1] : "na";
};
const experienceFileOverrides: Record<string, string> = {
  "nsbe-ucalgary-national-society-of-black-engineers": "nsbe-ucalgary",
  "google-developer-students-club-gdsc": "gdsc-babcock",
};
const projectFileOverrides: Record<string, string> = {
  "blog-application-node-js-backend-project": "blog-application-backend",
  "inclusivehealth-multilingual-healthcare-communication-platform":
    "inclusivehealth-hackthechange2025",
  "movie-recommendation-system-scalable-collaborative-filtering-platform":
    "movie-recommendation-system",
};

const projectEntries = projects.map((project) => {
  const slug = toSlug(project.name);
  const fileBase = projectFileOverrides[slug] ?? slug;
  return {
    ...project,
    slug,
    file: `${fileBase}.txt`,
  };
});
const experienceEntries = experiencesSorted.map((item) => ({
  ...item,
  slug: toSlug(item.role),
  file: `${experienceFileOverrides[toSlug(item.org.split("—")[0].trim())] ?? toSlug(item.org.split("—")[0].trim())}-${getYearFromPeriod(item.period)}.txt`,
}));
const uniqueExperienceEntries = Array.from(
  new Map(experienceEntries.map((item) => [item.file, item])).values(),
);
const educationEntries = education.map((item) => ({
  ...item,
  slug: toSlug(item.school),
  file: `${toSlug(item.school)}.txt`,
}));
const getCertCategory = (cert: (typeof certifications)[number]) => {
  const text = `${cert.name} ${cert.issuer ?? ""} ${cert.skills ?? ""}`.toLowerCase();
  if (
    text.includes("english") ||
    text.includes("wes") ||
    text.includes("education") ||
    text.includes("academic")
  ) {
    return "language-academics";
  }
  if (text.includes("aws") || text.includes("cloud")) return "cloud-computing";
  if (
    text.includes("machine learning") ||
    text.includes("generative ai") ||
    text.includes("pandas") ||
    text.includes("kaggle") ||
    text.includes("databricks")
  ) {
    return "machine-learning";
  }
  return "software-engineering";
};
const certificationCategories = [
  {
    key: "cloud-computing",
    label: "cloud-computing/",
    items: certifications.filter((cert) => getCertCategory(cert) === "cloud-computing"),
  },
  {
    key: "software-engineering",
    label: "software-engineering/",
    items: certifications.filter(
      (cert) => getCertCategory(cert) === "software-engineering",
    ),
  },
  {
    key: "machine-learning",
    label: "machine-learning/",
    items: certifications.filter(
      (cert) => getCertCategory(cert) === "machine-learning",
    ),
  },
  {
    key: "language-academics",
    label: "language-academics/",
    items: certifications.filter(
      (cert) => getCertCategory(cert) === "language-academics",
    ),
  },
].filter((category) => category.items.length > 0);
const certCategoryMap = Object.fromEntries(
  certificationCategories.map((category) => [category.key, category.items]),
);

const projectCategoryKeywords: Record<string, string[]> = {
  "backend-cloud": [
    "aws",
    "lambda",
    "serverless",
    "cloud",
    "glue",
    "eventbridge",
    "sns",
    "node",
    "express",
    "api",
    "backend",
    "mongo",
  ],
  mobile: ["flutter", "dart", "firebase", "riverpod", "mobile"],
  "machine-learning": [
    "machine learning",
    "sklearn",
    "scikit",
    "random forest",
    "gradient boosting",
    "linear regression",
    "pandas",
    "numpy",
    "spark",
    "pyspark",
    "als",
  ],
  frontend: ["next.js", "nextjs", "react", "tailwind"],
};

const getProjectCategory = (project: (typeof projects)[number]) => {
  if ((project as any).category === "frontend") return "frontend";
  const text = `${project.name} ${project.stack}`.toLowerCase();
  if (text.includes("hospital management")) {
    return "console";
  }
  if (projectCategoryKeywords.mobile.some((kw) => text.includes(kw))) {
    return "mobile";
  }
  if (projectCategoryKeywords["machine-learning"].some((kw) => text.includes(kw))) {
    return "machine-learning";
  }
  if (projectCategoryKeywords["backend-cloud"].some((kw) => text.includes(kw))) {
    return "backend-cloud";
  }
  return "backend-cloud";
};

const projectCategories = [
  {
    key: "backend-cloud",
    label: "backend-cloud/",
    items: projectEntries.filter((p) => getProjectCategory(p) === "backend-cloud"),
  },
  {
    key: "machine-learning",
    label: "machine-learning/",
    items: projectEntries.filter((p) => getProjectCategory(p) === "machine-learning"),
  },
  {
    key: "frontend",
    label: "frontend/",
    items: projectEntries.filter((p) => getProjectCategory(p) === "frontend"),
  },
  {
    key: "console",
    label: "console/",
    items: projectEntries.filter((p) => getProjectCategory(p) === "console"),
  },
  {
    key: "mobile",
    label: "mobile/",
    items: projectEntries.filter((p) => getProjectCategory(p) === "mobile"),
  },
].filter((category) => category.items.length > 0);

const projectCategoryMap = Object.fromEntries(
  projectCategories.map((category) => [category.key, category.items]),
);

export default function Terminal({ mode }: { mode: Mode }) {
  const isTouch = mode === "touch";
  const [activeView, setActiveView] = useState<View>(
    isTouch ? "listing" : "intro",
  );
  const [currentDir, setCurrentDir] = useState<string>("~");
  const [typedCommand, setTypedCommand] = useState(isTouch ? "" : "pwd");
  const [error, setError] = useState("");
  const [openProjectFile, setOpenProjectFile] =
    useState<(typeof projectEntries)[number] | null>(null);
  const [openExperienceFile, setOpenExperienceFile] =
    useState<(typeof uniqueExperienceEntries)[number] | null>(null);
  const [openEducationFile, setOpenEducationFile] =
    useState<(typeof educationEntries)[number] | null>(null);
  const [openCertCategory, setOpenCertCategory] = useState<string | null>(null);
  const [openProjectCategory, setOpenProjectCategory] = useState<string | null>(
    null,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isTouch) {
      inputRef.current?.focus();
    }
  }, [activeView, isTouch]);

  const resetOpenViews = () => {
    setOpenProjectFile(null);
    setOpenExperienceFile(null);
    setOpenEducationFile(null);
    setOpenCertCategory(null);
    setOpenProjectCategory(null);
  };

  const goToListing = () => {
    setActiveView("listing");
    setCurrentDir("~");
    resetOpenViews();
    setError("");
  };

  const goToDirectory = (dir: Directory) => {
    setActiveView(dir);
    setCurrentDir(`~/${dir}`);
    resetOpenViews();
    setError("");
  };

  const handleProjectCategoryOpen = (key: string) => {
    setOpenProjectCategory(key);
    setOpenProjectFile(null);
    setOpenExperienceFile(null);
    setOpenEducationFile(null);
    setOpenCertCategory(null);
    setCurrentDir(`~/projects/${key}`);
    setError("");
  };

  const handleProjectOpen = (project: (typeof projectEntries)[number]) => {
    setOpenProjectFile(project);
    setError("");
  };

  const handleExperienceOpen = (
    item: (typeof uniqueExperienceEntries)[number],
  ) => {
    setOpenExperienceFile(item);
    setError("");
  };

  const handleEducationOpen = (item: (typeof educationEntries)[number]) => {
    setOpenEducationFile(item);
    setError("");
  };

  const handleCertCategoryOpen = (key: string) => {
    setOpenCertCategory(key);
    setOpenProjectFile(null);
    setOpenExperienceFile(null);
    setOpenEducationFile(null);
    setCurrentDir(`~/certifications/${key}`);
    setError("");
  };

  const handleTouchBack = () => {
    if (openProjectFile) {
      setOpenProjectFile(null);
      return;
    }
    if (openExperienceFile) {
      setOpenExperienceFile(null);
      return;
    }
    if (openEducationFile) {
      setOpenEducationFile(null);
      return;
    }
    if (openProjectCategory) {
      setOpenProjectCategory(null);
      setCurrentDir("~/projects");
      return;
    }
    if (openCertCategory) {
      setOpenCertCategory(null);
      setCurrentDir("~/certifications");
      return;
    }
    if (currentDir !== "~") {
      goToListing();
    }
  };

  const runCommand = (value: string) => {
    if (isTouch) return;
    const normalized = value.trim().toLowerCase();

    setTypedCommand("");
    if (!normalized) return;

    const parts = normalized.split(/\s+/);
    const root = parts[0];
    const arg = parts.slice(1).join(" ");

    if (root === "q" || root === ":q") {
      if (
        openExperienceFile ||
        openProjectFile ||
        openEducationFile ||
        openCertCategory ||
        openProjectCategory
      ) {
        setOpenExperienceFile(null);
        setOpenProjectFile(null);
        setOpenEducationFile(null);
        setOpenCertCategory(null);
        setOpenProjectCategory(null);
        setError("");
        return;
      }
    }

    if (root === "pwd") {
      goToListing();
      return;
    }

    if (root === "cd" && arg === "..") {
      if (currentDir === "~") {
        setError("already in home directory");
        return;
      }
      if (currentDir.startsWith("~/certifications/")) {
        setCurrentDir("~/certifications");
        setOpenCertCategory(null);
        setOpenProjectFile(null);
        setOpenExperienceFile(null);
        setOpenEducationFile(null);
        setOpenProjectCategory(null);
        setError("");
        setActiveView("certifications");
        return;
      }
      if (currentDir.startsWith("~/projects/")) {
        setCurrentDir("~/projects");
        setOpenProjectCategory(null);
        setOpenProjectFile(null);
        setOpenExperienceFile(null);
        setOpenEducationFile(null);
        setOpenCertCategory(null);
        setError("");
        setActiveView("projects");
        return;
      }
      goToListing();
      return;
    }

    if (root === "cd") {
      if (!arg) {
        setError("usage: cd <directory>");
        return;
      }

      if (currentDir === "~/projects") {
        const category = projectCategories.find((item) => item.key === arg);
        if (category) {
          setOpenProjectCategory(category.key);
          setCurrentDir(`~/projects/${category.key}`);
          setError("");
          return;
        }
      }

      if (currentDir === "~/certifications") {
        const category = certificationCategories.find(
          (item) => item.key === arg,
        );
        if (category) {
          setOpenCertCategory(category.key);
          setCurrentDir(`~/certifications/${category.key}`);
          setError("");
          return;
        }
      }

      if (directories.some((dir) => dir.key === arg)) {
        goToDirectory(arg as Directory);
      } else {
        setError(`directory not found: ${arg}`);
      }
      return;
    }

    if (root === "cat") {
      const inProjects = currentDir.startsWith("~/projects");
      const inExperience = currentDir === "~/experience";
      const inEducation = currentDir === "~/education";
      if (!inProjects && !inExperience && !inEducation) {
        setError(
          "cat is available inside ~/projects, ~/experience, ~/education",
        );
        return;
      }
      if (!arg) {
        setError("usage: cat <file>");
        return;
      }
      const normalizedArg = toSlug(arg);
      if (inProjects) {
        const list =
          openProjectCategory && projectCategoryMap[openProjectCategory]
            ? projectCategoryMap[openProjectCategory]
            : projectEntries;
        const match = list.find(
          (project) =>
            project.slug === normalizedArg ||
            project.file === arg.toLowerCase() ||
            project.name.toLowerCase() === arg.toLowerCase(),
        );
        if (!match) {
          setError(`file not found: ${arg}`);
          return;
        }
        setError("");
        setOpenProjectFile(match);
        return;
      }
      if (inExperience) {
        const match = uniqueExperienceEntries.find(
          (item) =>
            item.slug === normalizedArg || item.file === arg.toLowerCase(),
        );
        if (!match) {
          setError(`file not found: ${arg}`);
          return;
        }
        setError("");
        setOpenExperienceFile(match);
        return;
      }
      if (inEducation) {
        const match = educationEntries.find(
          (item) =>
            item.slug === normalizedArg || item.file === arg.toLowerCase(),
        );
        if (!match) {
          setError(`file not found: ${arg}`);
          return;
        }
        setError("");
        setOpenEducationFile(match);
        return;
      }

    }

    if (directories.some((dir) => dir.key === root)) {
      goToDirectory(root as Directory);
      return;
    }

    setError(`command not found: ${normalized}`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(typedCommand);
  };

  const intro = (
    <div className={styles.intro}>
      <div className={styles.promptLine}>
        <span className={styles.caret}>&gt;</span>
        <span>hi, i&apos;m sodeeq</span>
      </div>
      <div className={styles.promptLine}>
        <span className={styles.caret}>&gt;</span>
        <span>software engineer &amp; cloud architect</span>
      </div>
      <div className={styles.promptLine}>
        <span className={styles.caret}>&gt;</span>
        <span>
          curious about me outside work?{" "}
          <a
            href="https://sodeeq.com"
            target="_blank"
            rel="noreferrer"
            className={styles.verifyLink}
          >
            sodeeq.com
          </a>
        </span>
      </div>
    </div>
  );

  const projectsView = (
    <div className={styles.sectionBlock}>
      <div className={styles.sectionHeading}>projects</div>
      {openProjectFile ? (
        <div className={styles.catCard}>
          <div className={styles.catHeader}>
            <span className={styles.caret}>&gt;</span>
            <span className={styles.detailTitle}>
              {openProjectFile.file}
            </span>
          </div>
          <div className={styles.detailMeta}>{openProjectFile.duration}</div>
          <div className={styles.detailStack}>{openProjectFile.stack}</div>
          <p className={styles.detailSummary}>{openProjectFile.summary}</p>
          {openProjectFile.link && (
            <a
              href={openProjectFile.link}
              target="_blank"
              rel="noreferrer"
              className={styles.detailLink}
            >
              view project
            </a>
          )}
        </div>
      ) : (
        <ul className={styles.projectList}>
          {(openProjectCategory
            ? projectCategoryMap[openProjectCategory] ?? []
            : projectCategories
          ).map((item) =>
            "items" in item ? (
              <li key={item.key}>
                {isTouch ? (
                  <button
                    type="button"
                    onClick={() => handleProjectCategoryOpen(item.key)}
                    className={`${styles.fileRow} ${styles.dirRowButton}`}
                  >
                    <div className={styles.projectCopy}>
                      <div className={styles.projectTitle}>{item.label}</div>
                    </div>
                  </button>
                ) : (
                  <div className={styles.fileRow}>
                    <div className={styles.projectCopy}>
                      <div className={styles.projectTitle}>{item.label}</div>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li key={item.slug}>
                {isTouch ? (
                  <button
                    type="button"
                    onClick={() => handleProjectOpen(item)}
                    className={`${styles.fileRow} ${styles.dirRowButton}`}
                  >
                    <div className={styles.projectCopy}>
                      <div className={styles.projectTitle}>{item.file}</div>
                    </div>
                  </button>
                ) : (
                  <div className={styles.fileRow}>
                    <div className={styles.projectCopy}>
                      <div className={styles.projectTitle}>{item.file}</div>
                    </div>
                  </div>
                )}
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );

  const directoryView = (
    <div className={styles.sectionBlock}>
      <ul className={styles.dirList}>
        {directories.map((dir) => (
          <li key={dir.key}>
            {isTouch ? (
              <button
                type="button"
                onClick={() => goToDirectory(dir.key)}
                className={`${styles.dirRowStatic} ${styles.dirRowButton}`}
              >
                <span className={styles.dirName}>{dir.label}</span>
                {dir.summary && (
                  <span className={styles.dirSummary}>{dir.summary}</span>
                )}
              </button>
            ) : (
              <div className={styles.dirRowStatic}>
                <span className={styles.dirName}>{dir.label}</span>
                {dir.summary && (
                  <span className={styles.dirSummary}>{dir.summary}</span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  const aboutView = (
    <div className={styles.stack}>
      <div className={styles.sectionBlock}>
        <div className={styles.sectionHeading}>about</div>
        <div className={styles.infoGrid}>
          <div>
            <div className={styles.label}>name</div>
            <div className={styles.value}>{basics.fullName}</div>
          </div>
          <div>
            <div className={styles.label}>roles</div>
            <div className={styles.value}>{primaryRoles.join(" · ")}</div>
          </div>
          <div>
            <div className={styles.label}>location</div>
            <div className={styles.value}>{basics.location}</div>
          </div>
          <div>
            <div className={styles.label}>age</div>
            <div className={styles.value}>{basics.age}</div>
          </div>
          <div>
            <div className={styles.label}>contact</div>
            <div className={styles.value}>
              <a href={`mailto:${basics.email}`}>{basics.email}</a>
            </div>
          </div>
        </div>
        <div className={styles.sectionHeading}>online</div>
        <ul className={styles.linkList}>
          {onlinePresence.map((link) => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const experienceView = (
    <div className={styles.sectionBlock}>
      <div className={styles.sectionHeading}>experience</div>
      {openExperienceFile ? (
        <div className={styles.catCard}>
          <div className={styles.catHeader}>
            <span className={styles.caret}>&gt;</span>
            <span className={styles.detailTitle}>
              {openExperienceFile.file}
            </span>
          </div>
          <div className={styles.detailMeta}>{openExperienceFile.period}</div>
          <div className={styles.detailStack}>{openExperienceFile.org}</div>
          <p className={styles.detailSummary}>{openExperienceFile.summary}</p>
          <ul className={styles.bulletList}>
            {openExperienceFile.bullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className={styles.projectList}>
          {uniqueExperienceEntries.map((item) => (
            <li key={item.file}>
              {isTouch ? (
                <button
                  type="button"
                  onClick={() => handleExperienceOpen(item)}
                  className={`${styles.fileRow} ${styles.dirRowButton}`}
                >
                  <div className={styles.projectCopy}>
                    <div className={styles.projectTitle}>{item.file}</div>
                  </div>
                </button>
              ) : (
                <div className={styles.fileRow}>
                  <div className={styles.projectCopy}>
                    <div className={styles.projectTitle}>{item.file}</div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const educationView = (
    <div className={styles.sectionBlock}>
      <div className={styles.sectionHeading}>education</div>
      {openEducationFile ? (
        <div className={styles.catCard}>
          <div className={styles.catHeader}>
            <span className={styles.caret}>&gt;</span>
            <span className={styles.detailTitle}>
              {openEducationFile.file}
            </span>
          </div>
          <div className={styles.detailMeta}>{openEducationFile.degree}</div>
          {openEducationFile.specialization && (
            <div className={styles.detailStack}>
              {openEducationFile.specialization}
            </div>
          )}
          <div className={styles.detailStack}>{openEducationFile.duration}</div>
          {openEducationFile.location && (
            <div className={styles.detailStack}>{openEducationFile.location}</div>
          )}
          {openEducationFile.focus && (
            <ul className={styles.bulletList}>
              {openEducationFile.focus.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
          {openEducationFile.cgpa && (
            <div className={styles.detailStack}>{openEducationFile.cgpa}</div>
          )}
        </div>
      ) : (
        <ul className={styles.projectList}>
          {educationEntries.map((item) => (
            <li key={item.slug}>
              {isTouch ? (
                <button
                  type="button"
                  onClick={() => handleEducationOpen(item)}
                  className={`${styles.fileRow} ${styles.dirRowButton}`}
                >
                  <div className={styles.projectCopy}>
                    <div className={styles.projectTitle}>{item.file}</div>
                  </div>
                </button>
              ) : (
                <div className={styles.fileRow}>
                  <div className={styles.projectCopy}>
                    <div className={styles.projectTitle}>{item.file}</div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const certificationsView = (
    <div className={styles.sectionBlock}>
      <div className={styles.sectionHeading}>certifications</div>
      {openCertCategory ? (
        <div className={styles.certGrid}>
          {(certCategoryMap[openCertCategory] ?? []).map((cert) => (
            <div key={cert.name} className={styles.cert}>
              <div className={styles.certName}>{cert.name}</div>
              <div className={styles.certIssuer}>{cert.issuer}</div>
              <div className={styles.certMeta}>
                Issued: {cert.issued}
                {cert.expires && <> · Expires: {cert.expires}</>}
              </div>
              {cert.credentialId && (
                <div className={styles.certMeta}>
                  Credential ID: {cert.credentialId}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <ul className={styles.projectList}>
          {certificationCategories.map((category) => (
            <li key={category.key}>
              {isTouch ? (
                <button
                  type="button"
                  onClick={() => handleCertCategoryOpen(category.key)}
                  className={`${styles.fileRow} ${styles.dirRowButton}`}
                >
                  <div className={styles.projectCopy}>
                    <div className={styles.projectTitle}>{category.label}</div>
                  </div>
                </button>
              ) : (
                <div className={styles.fileRow}>
                  <div className={styles.projectCopy}>
                    <div className={styles.projectTitle}>{category.label}</div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderInstructions = () => {
    if (isTouch) return null;
    switch (activeView) {
      case "intro":
        return (
          <ul>
            <li>
              Type <span className={styles.inlineCode}>pwd</span> and press
              enter to list directories
            </li>
          </ul>
        );
      case "listing":
        return (
          <ul>
            <li>
              to open a directory, type{" "}
              <span className={styles.inlineCode}>cd &lt;directory&gt;</span>{" "}
              (e.g. <span className={styles.inlineCode}>cd projects</span>)
            </li>
          </ul>
        );
      case "projects":
        if (openProjectCategory) {
          return openProjectFile ? (
            <ul>
              <li>
                <span className={styles.inlineCode}>q</span> to close file view
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <span className={styles.inlineCode}>cat &lt;file&gt;</span> to
                open a project (e.g.{" "}
                <span className={styles.inlineCode}>
                  cat serverless-gameday-notification-system.txt
                </span>
                )
              </li>
              <li>
                <span className={styles.inlineCode}>cd ..</span> to return to{" "}
                <span className={styles.inlineCode}>projects</span>
              </li>
            </ul>
          );
        }
        return (
          <ul>
            <li>
              to open a directory, type{" "}
              <span className={styles.inlineCode}>cd &lt;directory&gt;</span>{" "}
              (e.g. <span className={styles.inlineCode}>cd backend-cloud</span>)
            </li>
            <li>
              <span className={styles.inlineCode}>cd ..</span> to return to{" "}
              <span className={styles.inlineCode}>~</span>
            </li>
          </ul>
        );
      case "experience":
        return openExperienceFile ? (
          <ul>
            <li>
              <span className={styles.inlineCode}>q</span> to close file view
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <span className={styles.inlineCode}>cat &lt;file&gt;</span> to open
              experience page (e.g.{" "}
              <span className={styles.inlineCode}>cat kdnplus-2024.txt</span>)
            </li>
            <li>
              <span className={styles.inlineCode}>cd ..</span> to return to{" "}
              <span className={styles.inlineCode}>~</span>
            </li>
          </ul>
        );
      case "education":
        return openEducationFile ? (
          <ul>
            <li>
              <span className={styles.inlineCode}>q</span> to close file view
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <span className={styles.inlineCode}>cat &lt;file&gt;</span> to open
              education page (e.g.{" "}
              <span className={styles.inlineCode}>
                cat university-of-calgary.txt
              </span>
              )
            </li>
            <li>
              <span className={styles.inlineCode}>cd ..</span> to return to{" "}
              <span className={styles.inlineCode}>~</span>
            </li>
          </ul>
        );
      case "certifications":
        return (
          <>
            {!openCertCategory && (
              <ul>
                <li>
                  to open a directory, type{" "}
                  <span className={styles.inlineCode}>cd &lt;directory&gt;</span>{" "}
                  (e.g. <span className={styles.inlineCode}>cd cloud-computing</span>)
                </li>
              </ul>
            )}
            <div className={styles.inlineInstructionRow}>
              <span>
                Use <span className={styles.inlineCode}>cd ..</span> to go back
                {currentDir === "~/certifications"
                  ? " to ~"
                  : " to certifications"}
              </span>
              <Link
                href="https://www.linkedin.com/in/sodeeq-alli-94071b267/details/certifications/"
                target="_blank"
                rel="noreferrer"
                className={styles.verifyLink}
              >
                verify all
              </Link>
            </div>
          </>
        );
      case "skills":
      case "about":
        return (
          <ul>
            <li>
              Use <span className={styles.inlineCode}>cd ..</span> to go back
            </li>
          </ul>
        );
      default:
        return (
          <ul>
            <li>No command context yet</li>
          </ul>
        );
    }
  };

  return (
    <div className={styles.viewport}>
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <div className={styles.statusDots}>
            <span className={`${styles.dot} ${styles.gold}`} />
            <span className={`${styles.dot} ${styles.blue}`} />
            <span className={styles.dot} />
          </div>
          <div className={styles.terminalTitle}>
            sodeeq@portfolio:~ {isTouch ? "touch-mode" : "soft-terminal"}
          </div>
          <Link href={isTouch ? "/" : "/gui"} className={styles.headerMeta}>
            {isTouch ? "switch to cli" : "switch to touch mode"}
          </Link>
        </div>

        <div className={styles.shellBody}>
          {!isTouch && (
            <form className={styles.commandLine} onSubmit={handleSubmit}>
              <label className={styles.promptLabel} htmlFor="command-input">
                sodeeq@prompt:~$
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="command-input"
                  ref={inputRef}
                  className={styles.commandInput}
                  value={typedCommand}
                  onChange={(event) => setTypedCommand(event.target.value)}
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Command input"
                />
                <span className={styles.inputCursor} aria-hidden="true" />
              </div>
            </form>
          )}

          {!isTouch && error && (
            <div className={styles.errorLine} role="status" aria-live="polite">
              <span className={styles.caret}>&gt;</span> {error}
            </div>
          )}

          {!isTouch && renderInstructions() && (
            <div className={styles.instructions}>{renderInstructions()}</div>
          )}

          <div className={styles.output}>
            {activeView !== "intro" && (
              <div className={styles.commandEcho}>
                <span className={styles.caret}>&gt;</span>
                <span className={styles.commandText}>{currentDir}</span>
              </div>
            )}
            {isTouch && currentDir !== "~" && (
              <div className={styles.inlineInstructionRow}>
                <button
                  type="button"
                  className={styles.commandButton}
                  onClick={handleTouchBack}
                >
                  back
                </button>
                {activeView === "certifications" && (
                  <Link
                    href="https://www.linkedin.com/in/sodeeq-alli-94071b267/details/certifications/"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.verifyLink}
                  >
                    verify all
                  </Link>
                )}
              </div>
            )}
            {activeView === "intro" && intro}
            {activeView === "listing" && directoryView}
            {activeView === "projects" && projectsView}
            {activeView === "about" && aboutView}
            {activeView === "experience" && experienceView}
            {activeView === "education" && educationView}
            {activeView === "certifications" && certificationsView}
          </div>
        </div>
      </div>
    </div>
  );
}
