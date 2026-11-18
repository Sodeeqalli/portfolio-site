export const basics = {
  fullName: "Sodeeq Alli",
  location: "Calgary, Alberta, Canada",
  email: "sodeeqalli@gmail.com",
  availability: "Available for 2027 new-graduate roles",
};

export const primaryRoles = [
  "Software Engineer",
  "Cloud / AWS Solutions Engineer",
  "Mobile Application Developer",
];

export const onlinePresence = [
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/sodeeq-alli-94071b267",
  },
  { label: "GitHub", url: "https://github.com/Sodeeqalli" },
];

export const summary = [
  "Backend-oriented software engineer working across cloud systems, applied machine learning, software quality and enterprise architecture.",
  "Currently completing an MEng in Software Engineering at the University of Calgary, with experience spanning production backend work, IT operations, teaching, mentoring and mobile development.",
];

export const education = [
  {
    school: "University of Calgary",
    degree: "Master of Engineering (MEng) – Electrical & Computer Engineering",
    specialization: "Software Engineering",
    duration: "August 2025 – Expected May 2027",
    location: "Calgary, Canada",
    cgpa: "GPA 4.0/4.0",
    focus: [],
  },
  {
    school: "Babcock University",
    degree: "Bachelor of Science (BSc) – Computer Science",
    duration: "January 2021 – May 2024",
    cgpa: "CGPA 4.64/5.0",
    location: "Ilishan-Remo, Nigeria",
  },
];

export const coursework = [
  "Data Structures and Algorithms",
  "Object-Oriented Programming",
  "Artificial Intelligence",
  "Database Management Systems",
  "Internet Technology",
  "Computer Architecture",
  "Software Principles",
  "Information Theory",
];

export const experiences = [
  {
    role: "Graduate Assistant Teaching — ENSF 337",
    org: "University of Calgary",
    period: "Fall 2026",
    summary: "Accepted a one-quarter graduate teaching appointment supporting programming-fundamentals labs, preparation and assignment grading.",
    bullets: ["Programming fundamentals", "Teaching", "Assessment"],
  },
  {
    role: "Enterprise Architecture Specialist",
    org: "University of Calgary",
    period: "March 2026 – August 2026",
    summary: "Refined business-capability definitions, mapped capabilities to enterprise applications, developed Visio, taxonomy and process artefacts, and presented CAUDIT-aligned recommendations.",
    bullets: ["Enterprise architecture", "CAUDIT", "Capability mapping", "Microsoft Visio"],
  },
  {
    role: "AFC Computer Lab Supervisor",
    org: "University of Calgary · Faculty of Arts IT",
    period: "January 2026 – Present",
    summary: "Supervises university computer-lab operations and provides on-site technical and user support for the Faculty of Arts.",
    bullets: ["IT operations", "Technical support", "User support"],
  },
  {
    role: "Software Engineer",
    org: "NSBE UCalgary",
    period: "September 2025 – Present",
    summary: "Builds and maintains software supporting chapter platforms, initiatives and events while translating non-technical requirements into technical work.",
    bullets: ["Python", "REST APIs", "Software architecture", "Documentation"],
  },
  {
    role: "Python Mentor",
    org: "Schulich Ignite · University of Calgary",
    period: "September 2025 – December 2025",
    summary: "Mentored learners through Python fundamentals, debugging, functions, control flow and structured problem solving.",
    bullets: ["Python", "Mentoring", "Technical communication"],
  },
  {
    role: "Software Engineer",
    org: "KDN+ · Remote",
    period: "July 2024 – October 2024",
    summary: "Designed REST APIs and backend services and used AWS services for application authentication, storage, access control and integrations.",
    bullets: ["Python", "AWS Lambda", "S3", "DynamoDB", "Cognito", "REST APIs"],
  },
  {
    role: "Mobile Application Developer",
    org: "GDSC / GDG on Campus · Babcock University",
    period: "January 2024 – July 2024",
    summary: "Developed StudyStats onboarding and mobile features, integrated Firebase and Riverpod, supported junior developers and participated in testing and code review.",
    bullets: ["Flutter", "Dart", "Firebase", "Riverpod"],
  },
  {
    role: "Service Intern",
    org: "UfitFly · Oyo State, Nigeria",
    period: "January 2023 – July 2023",
    summary: "Managed user data and internal documentation, organized daily correspondence and researched travel and operational processes.",
    bullets: ["Data administration", "Research", "CRM", "Operations"],
  },
];

const monthIndex: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

const parseStartPeriod = (period: string) => {
  const seasonMatch = period.match(/(winter|spring|summer|fall)\s+(\d{4})/i);
  if (seasonMatch) {
    const seasonMonth: Record<string, number> = { winter: 1, spring: 4, summer: 7, fall: 9 };
    return Number(seasonMatch[2]) * 12 + seasonMonth[seasonMatch[1].toLowerCase()];
  }
  const match = period.match(/([A-Za-z]+)\s+(\d{4})/);
  if (!match) return 0;
  const month = monthIndex[match[1].toLowerCase()] ?? 1;
  const year = Number(match[2]);
  return year * 12 + month;
};

export const experiencesSorted = [...experiences].sort(
  (a, b) => parseStartPeriod(b.period) - parseStartPeriod(a.period),
);

export const projects = [
  {
    name: "Common Ground",
    duration: "Hack the Change 2026",
    stack:
      "React, TypeScript, Vinext, Vite, Cloudflare Workers, Cloudflare D1",
    summary:
      "Built a calm, strategic multiplayer game where autistic adults coordinate paired robot missions and restore a persistent shared world. Implemented deterministic server-side route resolution, pressure-plate dependencies, conflict-safe state updates, and durable team progress across sessions.",
    link: "https://devpost.com/software/dino-devs-common-ground",
  },
  {
    name: "Polyp Segmentation Model Comparison",
    duration: "April 2026",
    stack: "PyTorch, U-Net++, ResNet34, SLURM",
    summary: "Primary contributor across implementation, experimentation, evaluation and delivery in a three-person U-Net comparison. Best Dice score: 0.9025.",
    link: "https://github.com/Sodeeqalli/ensf617-polyp-segmentation",
  },
  {
    name: "Automating Sports Data Analytics with AWS",
    duration: "March 2025",
    stack:
      "AWS Glue, Amazon S3, Amazon Athena, AWS IAM, Python, SportsData.io API",
    summary:
      "Built a cloud-native pipeline that ingests NBA stats from SportsData.io, lands raw data in S3, normalizes JSON via Glue ETL, and exposes it for Athena SQL analytics without managing servers.",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "Serverless Gameday Notification System",
    duration: "March 2025",
    stack: "AWS Lambda, Amazon EventBridge, Amazon SNS, Python, SportsData.io API",
    summary:
      "Designed an AWS-native, event-driven notifier that polls NBA schedules every two hours with Lambda + EventBridge and delivers SMS/email updates through SNS; handled first-time cron syntax hurdles.",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "InclusiveHealth – Multilingual Healthcare Communication Platform",
    duration: "Hack the Change 2025",
    stack:
      "Next.js, React, Tailwind CSS, AWS Cognito, AWS S3, AWS Transcribe, AWS Translate, AWS Polly, DynamoDB, AWS SDK",
    summary:
      "Part of a 5-person team that built a secure, multilingual healthcare communication app with Cognito auth, session management, and speech-to-text/translation/text-to-speech flows using Transcribe, Translate, Polly, and S3—enabling doctors/patients to record, translate, and playback conversations with persistent session records.",
    link: "https://devpost.com/software/4m13-git-pushers-inclusivehealth",
  },
  {
    name: "Notification System Backend",
    duration: "January 2025 – May 2025",
    stack:
      "Node.js, Express.js, REST APIs, MVC (controllers/routes/middleware), external API integrations",
    summary:
      "Built a modular notification API with layered MVC structure, clean routing/middleware, and external API consumption to keep notification creation, retrieval, and delivery workflows scalable and integration-ready.",
    link: "https://github.com/Sodeeqalli/notification-backend",
  },
  {
    name: "Blog Application (Node.js Backend Project)",
    duration: "July 2024",
    stack: "Node.js, Express.js, MongoDB, REST APIs, Postman",
    summary:
      "Replicated my research project on Node.js to practice server-side patterns—CRUD APIs with Express, MongoDB persistence, and Postman collections for validating endpoints.",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "Calorie Burn Predictor",
    duration: "2025",
    stack:
      "Python, Jupyter Notebook, scikit-learn, Pandas, NumPy, Matplotlib, Random Forest Regressor, Gradient Boosting, Linear Regression",
    summary:
      "Part of a 4-person team that built a supervised regression pipeline to predict end-of-day calorie burn from early wearable signals; compared linear/forest/boosting models, prevented participant leakage, and selected Random Forest after MAE/RMSE/R² benchmarking.",
    link: "https://github.com/ENSF611-F25/Fitness-Tracker-Project-Group12",
  },
  {
    name: "Movie Recommendation System – Scalable Collaborative Filtering Platform",
    duration: "Fall 2025",
    stack:
      "Apache Spark, PySpark MLlib (ALS), Python, MovieLens 25M, Jupyter Notebook, FastAPI, Next.js, Sentence-BERT",
    summary:
      "Part of a 4-person team that built a Spark-based recommender pipeline on MovieLens 25M—temporal splits to avoid leakage, baselines vs ALS with RMSE evaluation, and a hybrid app layer (ALS + semantic/genre signals) for scalable personalized recommendations.",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "StudyStats",
    duration: "January 2024 – July 2024",
    stack: "Flutter, Dart, Firebase, Riverpod",
    summary:
      "I was a member of the team that built a GDSC-backed mobile app for academic tracking; owned onboarding UX and responsive flows, integrating Firebase and Riverpod to help students monitor GPA goals.",
    link: "https://apps.apple.com/ng/app/study-stats-app/id6477740443",
  },
  {
    name: "BU-Connect",
    duration: "January 2024 – May 2024",
    stack: "Flutter, Dart, Firebase, Riverpod",
    summary:
      "Final-year research project: led design and build of a student social app with posting, messaging, profiles, Firebase auth/Firestore, and Riverpod state management tuned for heavy traffic.",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "Favourite Places",
    duration: "January 2024",
    stack: "Flutter, Dart, Google Maps API",
    summary:
      "Created a travel diary app that captures photos, drops pins via Google Maps API, and saves locations; first Maps integration with focus on responsive UI and smooth camera+map flow.",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "Grocery Manager",
    duration: "November 2023",
    stack: "Flutter, Firebase, Cloud Firestore",
    summary:
      "Built a Flutter grocery tracker backed by Firestore for real-time persistence, adding basic server-side patterns into mobile workflows.",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "Hospital Management System",
    duration: "November 2023",
    stack: "Python",
    summary:
      "Console-style Python system to manage hospital records and admin tasks with structured data handling.",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "Meal Planner",
    duration: "October 2023",
    stack: "Flutter",
    summary:
      "Built a Flutter meal-planning app with step-by-step cooking guides and a clean, guided interface.",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "Expense Tracker",
    duration: "July 2023",
    stack: "Flutter",
    summary:
      "Early Flutter project to track expenses, solidifying layout, state handling, and UI composition skills.",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "Guess The Player",
    duration: "April 2023",
    stack: "Flutter, Dart",
    summary:
      "Football-themed guessing game applying foundational Flutter/Dart with simple interaction and scoring logic.",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "Quiz App",
    duration: "March 2023 – April 2023",
    stack: "Flutter, Dart",
    summary:
      "First Flutter app: a quiz that presents questions, tracks responses, and established my base for future mobile builds.",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "sodeeq.com",
    duration: "2025",
    stack: "Next.js, React, Tailwind CSS",
    summary: "Personal landing site showcasing my work and background.",
    category: "frontend",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
  {
    name: "portfolio.sodeeq.com",
    duration: "2025",
    stack: "Next.js, React, Tailwind CSS",
    summary: "Soft-terminal themed interactive portfolio experience.",
    category: "frontend",
    link: "https://www.linkedin.com/in/sodeeq-alli-94071b267/details/projects/",
  },
];

export const skillGroups = [
  {
    title: "Cloud and AWS",
    items: [
      "AWS Solutions Architecture",
      "Serverless architecture",
      "Event-driven architecture",
      "Cloud security fundamentals",
      "AWS Well-Architected Framework awareness",
    ],
  },
  {
    title: "AWS Services",
    items: [
      "AWS Lambda",
      "Amazon EventBridge",
      "Amazon SNS",
      "Amazon S3",
      "AWS Glue & Crawlers",
      "AWS Glue Data Catalog",
      "Amazon Athena",
      "AWS IAM",
      "Amazon CloudWatch",
      "AWS CloudTrail",
    ],
  },
  {
    title: "Backend Engineering",
    items: [
      "REST API design and development",
      "Backend service development",
      "Microservices fundamentals",
      "API integration with third-party services",
      "CRUD systems design",
      "Request/response handling",
      "Backend testing with Postman",
    ],
  },
  {
    title: "Node.js and Web Backend",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Backend API testing (Postman)",
      "Server-side development fundamentals",
    ],
  },
  {
    title: "Data Engineering and Analytics",
    items: [
      "Cloud-native data pipelines",
      "ETL pipeline design",
      "Data ingestion from external APIs",
      "JSON normalization and schema handling",
      "Data lake fundamentals (S3 as storage layer)",
      "Serverless analytics (Athena SQL querying)",
      "Data cataloging and schema inference (Glue)",
      "SQL analytics mindset",
    ],
  },
  {
    title: "Programming Languages",
    items: ["Python", "JavaScript", "Dart", "SQL", "Java (foundational)", "C++ (foundational)", "HTML", "CSS"],
  },
  {
    title: "Mobile Development",
    items: [
      "Flutter mobile development",
      "Dart app development",
      "Cross-platform app development",
      "Mobile UI implementation",
      "Responsive UI design across devices",
      "Clean UI composition and layout design",
      "App performance awareness (rendering, UI efficiency)",
      "Component reuse mindset",
    ],
  },
  {
    title: "Firebase and Mobile Backend",
    items: [
      "Firebase Authentication",
      "Cloud Firestore",
      "Real-time data patterns",
      "Query optimization and read/write efficiency (Firestore performance tuning)",
    ],
  },
  {
    title: "Generative AI and AI Cloud Concepts",
    items: [
      "Generative AI fundamentals",
      "GenAI use cases in cloud environments",
      "Databricks ecosystem familiarity (fundamentals level)",
    ],
  },
  {
    title: "Machine Learning and Data Science Foundations",
    items: [
      "Intro machine learning workflows (foundations)",
      "scikit-learn familiarity (foundations)",
      "Decision trees and random forests (foundations)",
      "Pandas for data manipulation",
      "Data preparation mindset",
    ],
  },
  {
    title: "Security and Cyber Awareness",
    items: [
      "Secure computing fundamentals (EC-Council level)",
      "Cloud security fundamentals",
      "IAM best practices awareness",
      "Basic cybersecurity awareness for cloud systems",
    ],
  },
  {
    title: "Software Engineering Practices",
    items: [
      "System design thinking (small to medium systems)",
      "Feature implementation end-to-end",
      "Debugging and troubleshooting",
      "Testing mindset (especially API testing)",
      "Documentation and technical writing basics",
      "Requirement interpretation and execution",
      "Scalability and performance thinking (Firebase and serverless)",
    ],
  },
  {
    title: "Dev Tools and Workflow",
    items: ["Git", "GitHub", "Version control workflow", "Working with repositories and collaboration", "VS Code", "Postman"],
  },
  {
    title: "Product and Delivery Skills",
    items: [
      "Building deployable, real-world applications",
      "Shipping projects with clear outcomes",
      "Working under time constraints (hackathon style, fast build cycles)",
      "Iterative improvement based on real issues (cron syntax, performance bottlenecks, responsiveness)",
    ],
  },
  {
    title: "Communication and Professional Skills",
    items: [
      "Mentoring and teaching technical concepts",
      "Team collaboration",
      "Research and documentation handling",
    ],
  },
];

export const certifications = [
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services (AWS)",
    issued: "April 2026",
    expires: "April 2029",
    skills: "Artificial Intelligence, Machine Learning, Generative AI, AWS",
  },
  {
    name: "Generative AI Fundamentals",
    issuer: "Databricks",
    issued: "November 2025",
    skills: "Generative AI, Databricks Products",
  },
  {
    name: "Verified International Academic Qualifications",
    issuer: "World Education Services (WES)",
    issued: "March 2025",
  },
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    issued: "February 2025",
    expires: "February 2028",
  },
  {
    name: "AWS Well-Architected Proficient",
    issuer: "Amazon Web Services (AWS)",
    issued: "March 2025",
  },
  {
    name: "AWS Knowledge: Architecting",
    issuer: "Amazon Web Services (AWS)",
    issued: "February 2025",
    skills: "Solution Architecture",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    issued: "December 2024",
    expires: "February 2028",
    skills: "Cloud Computing, AWS",
  },
  {
    name: "AWS Educate: Getting Started with Cloud Operations",
    issuer: "Amazon Web Services (AWS)",
    issued: "November 2024",
    skills: "Cloud Operations, Amazon CloudWatch, AWS CloudTrail",
  },
  {
    name: "AWS Educate: Getting Started with Security",
    issuer: "Amazon Web Services (AWS)",
    issued: "November 2024",
    skills: "Identity and Access Management (IAM), Cloud Security",
  },
  {
    name: "AWS Educate: Getting Started with Serverless",
    issuer: "Amazon Web Services (AWS)",
    issued: "November 2024",
    skills: "AWS Lambda, Serverless Computing, Microservices, Event-Driven Architecture",
  },
  {
    name: "AWS Knowledge: Cloud Essentials",
    issuer: "Amazon Web Services (AWS)",
    issued: "November 2024",
  },
  {
    name: "AWS Educate: Cloud Computing 101",
    issuer: "Amazon Web Services (AWS)",
    issued: "October 2024",
    skills: "Cloud Computing, Cloud Administration, Solution Architecture",
  },
  {
    name: "AWS Educate: Getting Started with Compute",
    issuer: "Amazon Web Services (AWS)",
    issued: "October 2024",
    skills: "Amazon EC2, AWS Lambda, Elastic Beanstalk, ECS, EKS, Elastic Load Balancing",
  },
  {
    name: "AWS Educate: Getting Started with Databases",
    issuer: "Amazon Web Services (AWS)",
    issued: "October 2024",
    skills: "Amazon RDS, Databases",
  },
  {
    name: "AWS Educate: Getting Started with Networking",
    issuer: "Amazon Web Services (AWS)",
    issued: "October 2024",
    skills: "Amazon VPC, Amazon Route 53",
  },
  {
    name: "AWS Educate: Getting Started with Storage",
    issuer: "Amazon Web Services (AWS)",
    issued: "October 2024",
    skills: "Amazon S3, Amazon EBS, Amazon EFS, Cloud Storage",
  },
  {
    name: "AWS Training & Certification: Job Roles in Cloud",
    issuer: "Amazon Web Services (AWS)",
    issued: "August 2024",
    skills: "Cloud Computing, AWS",
  },
  {
    name: "Web Development – Certificate of Completion",
    issuer: "Udemy",
    issued: "October 2024",
    credentialId: "UC-1955e4fe-9e3a-470e-b2e2-2f5677e7aeab",
    skills: "HTML, CSS, JavaScript, Node.js, REST APIs",
  },
  {
    name: "Flutter & Dart – Certificate of Completion",
    issuer: "Udemy",
    issued: "May 2024",
    credentialId: "UC-4f153ffc-7b93-4cdf-9843-b04d2ea5d335",
    skills: "Flutter, Dart",
  },
  {
    name: "Python (Basic)",
    issuer: "HackerRank",
    issued: "November 2024",
    skills: "Python",
  },
  {
    name: "Pandas",
    issuer: "Kaggle",
    issued: "September 2024",
    skills: "pandas",
  },
  {
    name: "Intro to Machine Learning",
    issuer: "Kaggle",
    issued: "August 2024",
    skills: "Machine Learning, pandas, scikit-learn, Decision Trees, Random Forests",
  },
  {
    name: "Python",
    issuer: "Kaggle",
    issued: "August 2024",
    skills: "Python",
  },
  {
    name: "Understanding Generative AI in Cloud Computing: Services and Use Cases",
    issuer: "LinkedIn Learning",
    issued: "August 2024",
    skills: "Generative AI",
  },
  {
    name: "Learning Cloud Computing: Core Concepts",
    issuer: "LinkedIn Learning",
    issued: "August 2024",
    skills: "Cloud Computing",
  },
  {
    name: "Cloud Computing: Understanding Core Concepts",
    issuer: "LinkedIn Learning",
    issued: "August 2024",
    skills: "Cloud Computing",
  },
  {
    name: "Cloud Concepts: Determining Your Cloud Strategy",
    issuer: "LinkedIn Learning",
    issued: "August 2024",
    skills: "Cloud Strategy",
  },
  {
    name: "Cloud Storage Concepts: Services, Cost Control, and Security",
    issuer: "LinkedIn Learning",
    issued: "August 2024",
    skills: "Cloud Storage, Storage Management",
  },
  {
    name: "Cybersecurity Awareness: Cloud Security",
    issuer: "LinkedIn Learning",
    issued: "August 2024",
    skills: "Cybersecurity, Cloud Security",
  },
  {
    name: "Explore a Career as a Cloud Administrator",
    issuer: "LinkedIn Learning",
    issued: "August 2024",
    skills: "Cloud Administration, Cloud Security, Cloud Strategy",
  },
  {
    name: "Including Sustainability in Your Cloud Strategy",
    issuer: "LinkedIn Learning",
    issued: "August 2024",
    skills: "Sustainable Systems, Sustainable Cloud Strategy",
  },
  {
    name: "English Proficiency Certificate",
    issuer: "Duolingo English Test",
    issued: "January 2025",
    expires: "January 2027",
  },
  {
    name: "Introduction to C++",
    issuer: "Sololearn",
    issued: "August 2023",
    credentialId: "CC-OZAWSNQR",
    skills: "C++",
  },
  {
    name: "Introduction to Java",
    issuer: "Sololearn",
    issued: "July 2023",
    credentialId: "CC-IVV0KQWE",
    skills: "Java",
  },
  {
    name: "EC-Council Certified Secure Computer User (v2)",
    issuer: "EC-Council",
    issued: "February 2022",
    credentialId: "626959",
    skills: "Cybersecurity, Information Security",
  },
];
