// Chiziqli SVG ikonkalar (currentColor bilan bo'yaladi)
const paths = {
  card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0113 0" /><path d="M16 4.5a3.5 3.5 0 010 7M18 14a6.5 6.5 0 013.5 6" /></>,
  pin: <><path d="M12 21s7-6.2 7-12a7 7 0 00-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  chart: <><path d="M3 3v18h18" /><path d="M8 16v-5M12 16V7M16 16v-8M20 16v-3" /></>,
  warehouse: <><path d="M3 21V8l9-5 9 5v13" /><path d="M7 21v-9h10v9M7 15h10M7 18h10" /></>,
  trendUp: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  gauge: <><path d="M4 18a9 9 0 1116 0" /><path d="M12 14l4-5" /><circle cx="12" cy="14" r="1.2" /></>,
  handCoins: <><circle cx="15" cy="7" r="4" /><path d="M2 15h4l4 2h4a2 2 0 010 4H9" /><path d="M14 19l6-3a2 2 0 012 3l-6 4H6l-4-2" /></>,
  trendDown: <><path d="M3 7l6 6 4-4 8 8" /><path d="M15 17h6v-6" /></>,
  refresh: <><path d="M20 11a8 8 0 00-14.9-3.9L3 9" /><path d="M3 4v5h5" /><path d="M4 13a8 8 0 0014.9 3.9L21 15" /><path d="M21 20v-5h-5" /></>,
  package: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M4 7.5L12 12l8-4.5M12 12v9M8 5.3l8 4.4" /></>,
  phone: <><path d="M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" /></>,
  send: <><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" /></>,
  chevron: <path d="M6 9l6 6 6-6" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 12l5 5 9-10" />,
  reel: <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M3 8.5h18M8 3l3 5.5M14 3l3 5.5" /><path d="M10 12v5l4.5-2.5z" /></>,
  layers: <><rect x="7" y="7" width="13" height="13" rx="2" /><path d="M4 16V6a2 2 0 012-2h10" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
  brick: <><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3 9.7h18M3 14.3h18M9 5v4.7M15 9.7v4.6M9 14.3V19" /></>,
  tv: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  wrench: <path d="M14.7 6.3a4 4 0 005 5L21 13l-8 8-3-3 6.7-6.7a4 4 0 01-5-5zM3 21l6-6" />,
  register: <><rect x="4" y="11" width="16" height="10" rx="1.5" /><path d="M7 11V5h10v6M9 8h6M8 15h2M12 15h2M16 15h0M8 18h8" /></>,
  dollar: <><circle cx="12" cy="12" r="9" /><path d="M15 9.5a2.5 2 0 00-2.5-1.5h-1a2 2 0 000 4h1a2 2 0 010 4h-1A2.5 2 0 019 14.5M12 6.5v1.5M12 16v1.5" /></>,
}

export default function Icon({ name, size = 24, className, stroke = 1.8 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
