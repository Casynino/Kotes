import type { TeamMember } from "./types";

/**
 * Leadership and key personnel.
 *
 * Add a photo by dropping a square image (min 600x600) into
 * /public/images/team and setting `photo: { src, alt }`. Without a photo the
 * `initials` monogram renders instead.
 */
export const team: TeamMember[] = [
  {
    id: "tm-komba",
    name: "Max Anton Komba",
    role: "Founder",
    initials: "MK",
    bio: "A visionary and accomplished entrepreneur with deep-rooted experience in scaling ICT businesses. Mr. Komba brings exceptional leadership and foresight, having led the company to become one of Tanzania's most reliable IT solutions providers.",
    order: 1,
    active: true,
  },
];

export const activeTeam = team
  .filter((m) => m.active)
  .sort((a, b) => a.order - b.order);
