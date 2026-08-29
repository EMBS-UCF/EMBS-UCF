export interface NavItem {
  path: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: "/events", label: "Events" },
  { path: "/projects", label: "Projects" },
  { path: "/officers", label: "Officers" },
  { path: "/resources", label: "Resources" },
  { path: "/contact", label: "Contact" },
];
