import {
  Home,
  Users,
  Calendar,
  Mail,
  MessageSquare,
  Linkedin,
  Instagram,
  Github,
  FolderCode,
} from "lucide-react";

const ASSET_BASE_URL = "https://assets.embsucf.org";

export const ASSETS = {
  LOGO_URL: `${ASSET_BASE_URL}/logo.png`,
  FALLBACK_OFFICER: `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`,
  PROJECT_PLACEHOLDER:
    "https://placehold.co/800x450/1e3a8a/ffffff?text=No+Image",
  FEATURES: {
    INSIGHT: `${ASSET_BASE_URL}/insight.jpg`,
    TECHNICAL: `${ASSET_BASE_URL}/technical.jpg`,
    PROFESSIONAL: `${ASSET_BASE_URL}/professional.jpg`,
  },
};

export const ORG_INFO = {
  NAME: "IEEE EMBS",
  CHAPTER: "UCF CHAPTER",
  TAGLINE: "Engineering and medicine, built together at UCF.",
  LOCATION: "Orlando, FL",
  EMAIL: "ieee.embs.ucf@gmail.com",
  SOCIALS: {
    DISCORD: "https://discord.gg/GXjTNuCvka",
    LINKEDIN: "https://www.linkedin.com/company/ieee-embs-ucf/",
    INSTAGRAM: "https://www.instagram.com/embs.ucf",
    GITHUB: "https://www.github.com/embs-ucf",
  },
};

export const CONTACT_SOCIALS = [
  {
    name: "Discord",
    icon: MessageSquare,
    color: "bg-[#5865F2]",
    link: ORG_INFO.SOCIALS.DISCORD,
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-[#0077b5]",
    link: ORG_INFO.SOCIALS.LINKEDIN,
  },
  {
    name: "Instagram",
    icon: Instagram,
    color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
    link: ORG_INFO.SOCIALS.INSTAGRAM,
  },
  {
    name: "GitHub",
    icon: Github,
    color: "bg-slate-900",
    link: ORG_INFO.SOCIALS.GITHUB,
  },
];

export const CALENDAR_CONFIG = {
  ID: import.meta.env.VITE_APP_GOOGLE_CALENDAR_ID || "primary",
  API_KEY: import.meta.env.VITE_APP_GOOGLE_API_KEY || "",
  TIMEZONE: "America/New_York",
  MAX_GBMS: 4,
  FILTER_KEYWORD: "GBM",
  getEMBED_URL: (id) =>
    `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(id)}&ctz=America%2FNew_York&bgcolor=%23ffffff&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1`,
};

export const OFFICERS = [
  {
    name: "Eren Siegman",
    role: "President",
    major: "Computer Science",
    image: `${ASSET_BASE_URL}/eren.jpg`,
    linkedin: "https://www.linkedin.com/in/eren-siegman/",
  },
  {
    name: "Megan Laffey",
    role: "Vice President",
    major: "Mechanical Engineering",
    image: `${ASSET_BASE_URL}/megan.jpg`,
    linkedin: "https://www.linkedin.com/in/megan-laffey/",
  },
  {
    name: "Rachel Ostrow",
    role: "Treasurer",
    major: "Photonics Engineering",
    image: `${ASSET_BASE_URL}/rachel.jpg`,
    linkedin: "https://www.linkedin.com/in/rachel-ostrow-006b2a32a/",
  },
  {
    name: "Erin Weidel",
    role: "Secretary",
    major: "Electrical Engineering",
    image: `${ASSET_BASE_URL}/erin.png`,
    linkedin: "https://www.linkedin.com/in/erinweidel/",
  },
  {
    name: "Samuel Lane",
    role: "Workshop Chair",
    major: "Electrical Engineering",
    image: `${ASSET_BASE_URL}/samuel.jpg`,
    linkedin: "",
  },
  {
    name: "Louis Cosentini",
    role: "Project Chair",
    major: "Electrical Engineering",
    image: `${ASSET_BASE_URL}/louis.jpg`,
    linkedin: "https://www.linkedin.com/in/louis-cosentini-15717829b/",
  },
  {
    name: "Aidan Cobb",
    role: "Outreach Chair",
    major: "Mechanical Engineering",
    image: `${ASSET_BASE_URL}/aidan.jpg`,
    linkedin: "",
  },
];

export const FACULTY_ADVISOR = {
  name: "Dr. Di Wu",
  role: "Faculty Advisor",
  major: "Department of Electrical and Computer Engineering",
  image: `${ASSET_BASE_URL}/di_wu.jpg`,
  linkedin: "https://www.linkedin.com/in/diwu1990/",
};

export const NAV_LINKS = [
  { path: "/", label: "Home", icon: Home },
  { path: "/officers", label: "Officers", icon: Users },
  { path: "/projects", label: "Projects", icon: FolderCode },
  { path: "/events", label: "Events", icon: Calendar },
  { path: "/contact", label: "Contact", icon: Mail },
];

export const RESOURCE_SECTIONS = [
  {
    title: "Biomedical-Related Courses",
    description:
      "Reference list of courses relevant to biomedical engineering topics.",
    links: [
      { label: "Signal processing", href: "#" },
      { label: "Embedded systems", href: "#" },
      { label: "Control systems", href: "#" },
      { label: "Biomechanics", href: "#" },
      { label: "Medical imaging", href: "#" },
    ],
  },
  {
    title: "Scholarships",
    description: "Scholarship opportunities from IEEE, UCF, and external programs.",
    links: [
      { label: "IEEE scholarship opportunities", href: "#" },
      { label: "UCF scholarship portal", href: "#" },
      { label: "STEM and research funding", href: "#" },
    ],
  },
  {
    title: "Professional Opportunities",
    description: "Internships, research roles, and career preparation resources.",
    links: [
      { label: "Biomedical internship boards", href: "#" },
      { label: "Research opportunity listings", href: "#" },
      { label: "Resume and interview prep", href: "#" },
    ],
  },
];

export const HOME_FEATURES = [
  {
    title: "Industry & Academic Insight",
    desc: "We host guest lectures from UCF faculty and industry leaders to provide a direct look into groundbreaking research and the medical device marketplace.",
    img: ASSETS.FEATURES.INSIGHT,
    ctaLabel: "See upcoming talks",
    path: "/events",
  },
  {
    title: "Technical Mastery",
    desc: "Gain hands-on experience through student-led technical projects and skill-building workshops designed to bridge the gap between classroom theory and real-world application.",
    img: ASSETS.FEATURES.TECHNICAL,
    ctaLabel: "Explore project teams",
    path: "/projects",
  },
  {
    title: "Professional Foundation",
    desc: "As a chapter of the world’s largest biomedical engineering society, we connect you to a massive international community and exclusive professional resources.",
    img: ASSETS.FEATURES.PROFESSIONAL,
    ctaLabel: "Meet chapter leadership",
    path: "/officers",
  },
];

export const PROJECTS = [
  {
    title: "Oxygen Concentrator",
    status: "active",
    desc: "The Ox-Con build is officially underway. Members are designing and assembling a student-built oxygen concentrator while learning systems integration and medical hardware fundamentals.",
    meeting: "Mondays, 4:30 PM - 6:00 PM | TCH 238",
    img: ASSETS.PROJECT_PLACEHOLDER,
  },
  {
    title: "EEG From Scratch",
    status: "active",
    desc: "A new project focused on building an EEG acquisition stack from the ground up, from signal capture hardware to clean software pipelines.",
    meeting: "Starting soon",
    img: ASSETS.PROJECT_PLACEHOLDER,
  },
  {
    title: "EEG Cryptography",
    status: "active",
    desc: "A research initiative exploring reliable cryptographic key generation from EEG biometrics. Detailed scope and schedule are still TBA.",
    meeting: "TBA",
    img: ASSETS.PROJECT_PLACEHOLDER,
  },
  {
    title: "UCF x UF x FIT Sensor Competition",
    status: "active",
    desc: "An inter-collegiate sensor design competition hosted once each semester (Fall and Spring) with teams from UCF, UF, and FIT.",
    meeting: "Recurring each Fall & Spring semester",
    img: `${ASSET_BASE_URL}/sensor_comp.png`,
  },

  {
    title: "Sole Pressure Sensor",
    status: "past",
    desc: "Developed a custom Force Sensitive Resistor (FSR) array to detect stance and gait abnormalities.",
    completed: "Fall 2025",
    img: `${ASSET_BASE_URL}/sole_pressure.jpg`,
  },
];
