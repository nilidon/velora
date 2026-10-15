export type Area = {
  slug: string;
  name: string;
  headline: string;
  subhead: string;
  blurb: string;
  neighborhoods: string[];
  seoTitle: string;
  seoDescription: string;
};

export const areas: Area[] = [
  {
    slug: "staten-island",
    name: "Staten Island",
    headline: "Staten Island’s luxury cleaning team — born and based here",
    subhead:
      "From St. George waterfronts to Tottenville family homes, the same insured crew that your neighbors already use.",
    blurb:
      "We are a Staten Island company first. That means faster arrival windows, crews who know the ferry traffic, and no “we’ll try to fit you in from Brooklyn” runaround.",
    neighborhoods: [
      "St. George",
      "Stapleton",
      "New Dorp",
      "Great Kills",
      "Tottenville",
      "Todt Hill",
      "Annadale",
      "Eltingville",
      "West Brighton",
      "South Beach",
    ],
    seoTitle: "Staten Island Cleaning Services | Local Crews",
    seoDescription:
      "Premium house, Airbnb, and post-construction cleaning across Staten Island. Local, insured, and available 7 days. Get a free quote.",
  },
  {
    slug: "manhattan",
    name: "Manhattan",
    headline: "Cleaning services in Manhattan — apartments, offices, and rentals",
    subhead:
      "High-rise apartments, brownstones, and commercial suites cleaned to a hospitality standard.",
    blurb:
      "We schedule around doormen, elevators, and quiet hours. Tell us the building rules and we work inside them.",
    neighborhoods: [
      "Upper East Side",
      "Upper West Side",
      "Midtown",
      "Chelsea",
      "Downtown",
      "Financial District",
    ],
    seoTitle: "Manhattan Cleaning Services | Apartments & Offices",
    seoDescription:
      "Apartment, office, and Airbnb cleaning in Manhattan. Insured team, building-friendly scheduling. Request a quote.",
  },
  {
    slug: "brooklyn",
    name: "Brooklyn",
    headline: "Brooklyn cleaning for brownstones, rentals, and storefronts",
    subhead:
      "Move-outs, Airbnb turnovers, and recurring home care from Williamsburg to Bay Ridge.",
    blurb:
      "Brooklyn jobs are staffed by the same Velora standard — eco-friendly products, photo reports, and a real person on the phone.",
    neighborhoods: [
      "Williamsburg",
      "Park Slope",
      "Bay Ridge",
      "Brooklyn Heights",
      "Dumbo",
      "Bushwick",
    ],
    seoTitle: "Brooklyn Cleaning Services | Home & Airbnb",
    seoDescription:
      "House, move-out, and Airbnb cleaning in Brooklyn. Insured, eco-friendly, and quote-ready. Book Velora.",
  },
  {
    slug: "queens",
    name: "Queens",
    headline: "Queens house and rental cleaning that shows up on time",
    subhead:
      "Astoria walk-ups to Forest Hills homes — recurring, deep, and turnover cleans.",
    blurb:
      "We cover the borough with realistic arrival windows. No two-hour “maybe” slots.",
    neighborhoods: ["Astoria", "Long Island City", "Forest Hills", "Flushing", "Jackson Heights"],
    seoTitle: "Queens Cleaning Services | Homes & Rentals",
    seoDescription:
      "Professional cleaning in Queens for homes, apartments, and short-term rentals. Get a free Staten Island–based Velora quote.",
  },
  {
    slug: "bronx",
    name: "Bronx",
    headline: "Bronx cleaning services for homes, offices, and turnovers",
    subhead:
      "Reliable residential and commercial cleaning with the same checklist we use on Staten Island.",
    blurb:
      "From Riverdale apartments to small offices, we bring hotel-grade finishes and clear pricing.",
    neighborhoods: ["Riverdale", "Pelham", "Fordham", "Throgs Neck", "City Island"],
    seoTitle: "Bronx Cleaning Services | Residential & Commercial",
    seoDescription:
      "Home, office, and move-out cleaning in the Bronx. Licensed, insured Velora crews. Request your free quote.",
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}

export const areaSlugs = areas.map((a) => a.slug);
