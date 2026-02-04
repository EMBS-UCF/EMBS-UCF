import {
  Home,
  Users,
  Calendar,
  Mail,
  MessageSquare,
  Linkedin,
  Instagram,
  Github,
} from "lucide-react";

const ASSET_BASE_URL = "https://assets.embsucf.org";

export const ASSETS = {
  LOGO_URL: `${ASSET_BASE_URL}/logo.png`,
  FALLBACK_OFFICER: `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`,
  FEATURES: {
    INSIGHT: `${ASSET_BASE_URL}/insight.jpg`,
    TECHNICAL: `${ASSET_BASE_URL}/technical.jpg`,
    PROFESSIONAL: `${ASSET_BASE_URL}/professional.jpg`,
  },
};

export const ORG_INFO = {
  NAME: "IEEE EMBS",
  CHAPTER: "UCF CHAPTER",
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
    major: "Computer Engineering",
    image: `${ASSET_BASE_URL}/eren.jpg`,
  },
  {
    name: "Megan Laffey",
    role: "Vice President",
    major: "Mechanical Engineering",
    image: `${ASSET_BASE_URL}/megan.jpg`,
  },
  {
    name: "Rachel Ostrow",
    role: "Treasurer",
    major: "Photonics Engineering",
    image: `${ASSET_BASE_URL}/rachel.jpg`,
  },
  {
    name: "Erin Weidel",
    role: "Secretary",
    major: "Electrical Engineering",
    image: `${ASSET_BASE_URL}/erin.png`,
  },
  {
    name: "Samuel Lane",
    role: "Workshop Chair",
    major: "Electrical Engineering",
    image: `${ASSET_BASE_URL}/samuel.jpg`,
  },
  {
    name: "Louis Cosentini",
    role: "Project Chair",
    major: "Electrical Engineering",
    image: `${ASSET_BASE_URL}/louis.jpg`,
  },
  {
    name: "Aidan Cobb",
    role: "Outreach Chair",
    major: "Mechanical Engineering",
    image: `${ASSET_BASE_URL}/aidan.jpg`,
  },
];

export const NAV_LINKS = [
  { path: "/", label: "Home", icon: Home },
  { path: "/officers", label: "Officers", icon: Users },
  { path: "/events", label: "Events", icon: Calendar },
  { path: "/contact", label: "Contact", icon: Mail },
];

export const HOME_FEATURES = [
  {
    title: "Industry & Academic Insight",
    desc: "We host guest lectures from UCF faculty and industry leaders to provide a direct look into groundbreaking research and the medical device marketplace.",
    img: ASSETS.FEATURES.INSIGHT,
  },
  {
    title: "Technical Mastery",
    desc: "Gain hands-on experience through student-led technical projects and skill-building workshops designed to bridge the gap between classroom theory and real-world application.",
    img: ASSETS.FEATURES.TECHNICAL,
  },
  {
    title: "Professional Foundation",
    desc: "As a chapter of the world’s largest biomedical engineering society, we connect you to a massive international community and exclusive professional resources.",
    img: ASSETS.FEATURES.PROFESSIONAL,
  },
];
