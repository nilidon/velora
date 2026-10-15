export type Service = {
  slug: string;
  photo: string;
  name: string;
  shortName: string;
  adKeyword: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  cardLine: string;
  startingAt: number;
  ltv: "high" | "medium" | "one-time";
  includes: string[];
  checklist: { title: string; items: string[] }[];
  faqs: { q: string; a: string }[];
  idealFor: string[];
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "airbnb-short-term-rental-cleaning",
    photo: "/photos/airbnb.jpg",
    name: "Airbnb & Short-Term Rental Cleaning",
    shortName: "Airbnb Turnovers",
    adKeyword: "Airbnb cleaning Staten Island",
    eyebrow: "Same-day turnovers",
    headline: "Airbnb cleaning in Staten Island that protects your reviews",
    subhead:
      "Check-out to guest-ready before the next booking. Hotel-style beds, restocked amenities, and a photo report so you never walk in blind.",
    cardLine: "Guest-ready meets five-star clean.",
    startingAt: 165,
    ltv: "high",
    includes: [
      "Same-day turnovers between check-out and check-in",
      "Hotel-style linen and bedding presentation",
      "Restocking of consumables with inventory notes",
      "Damage and missing-item photo reports",
      "Calendar-friendly scheduling for back-to-back stays",
    ],
    checklist: [
      {
        title: "Bedrooms",
        items: [
          "Fresh linens and hotel-style bed make",
          "Surfaces sanitized, trash emptied",
          "Closets and drawers reset to listing photos",
        ],
      },
      {
        title: "Bathrooms",
        items: [
          "Full sanitize of fixtures and glass",
          "Fresh towels styled",
          "TP, soap, and amenities restocked",
        ],
      },
      {
        title: "Kitchen & living",
        items: [
          "Dishes washed and put away",
          "Appliances, counters, and sink polished",
          "Living area reset to your listing photos",
        ],
      },
    ],
    faqs: [
      {
        q: "How fast can you turn a unit between guests?",
        a: "Most Staten Island turnovers are completed the same day. Tell us check-out and check-in times and we lock a crew to the window.",
      },
      {
        q: "Do you bring linens and consumables?",
        a: "We can work with yours or handle restocking. Either way you get a note of what was used so you are never surprised mid-stay.",
      },
      {
        q: "What if a guest leaves damage?",
        a: "We photograph anything missing or damaged before the next guest arrives so you can file the Airbnb claim with proof.",
      },
      {
        q: "Can you keep a recurring calendar?",
        a: "Yes. Hosts who put us on a standing turnover schedule get priority same-day slots and a lower per-clean rate.",
      },
    ],
    idealFor: [
      "Airbnb Superhosts",
      "VRBO owners",
      "Property managers",
      "Multi-unit hosts",
    ],
    seoTitle: "Airbnb Cleaning Staten Island | Same-Day Turnovers",
    seoDescription:
      "Same-day Airbnb and short-term rental cleaning in Staten Island. Hotel-style turnovers, photo reports, and review-safe presentation. Get a free estimate.",
  },
  {
    slug: "recurring-cleaning",
    photo: "/photos/recurring.jpg",
    name: "Recurring Cleaning",
    shortName: "Weekly / Bi-Weekly",
    adKeyword: "weekly house cleaning Staten Island",
    eyebrow: "Set it and forget it",
    headline: "Weekly and bi-weekly house cleaning on Staten Island",
    subhead:
      "The same trusted team, the same checklist, on a cadence that actually sticks. Most clients save 15–22% versus one-off deep cleans.",
    cardLine: "Weekly, bi-weekly, or monthly — your space stays polished.",
    startingAt: 135,
    ltv: "high",
    includes: [
      "Dedicated team who already knows your home",
      "Custom checklist you can change anytime",
      "Key or lockbox handling",
      "Priority booking and holiday coverage",
      "Discounted rate vs one-time cleans",
    ],
    checklist: [
      {
        title: "Every visit",
        items: [
          "Kitchens and bathrooms fully reset",
          "Floors vacuumed and mopped",
          "Dusting, surfaces, and high-touch points",
        ],
      },
      {
        title: "On rotation",
        items: [
          "Inside microwave and appliance fronts",
          "Baseboards and window sills",
          "Detail work that one-off crews skip",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I get the same cleaners each time?",
        a: "Whenever possible, yes. Consistency is how we keep quality high and keys simple.",
      },
      {
        q: "Can I skip a week when I travel?",
        a: "Text us 24 hours ahead and we pause or move the visit. No cancellation fee for planned travel.",
      },
      {
        q: "What is the difference vs a deep clean?",
        a: "Recurring keeps a maintained home spotless. Book a deep clean first if the home has not been professionally cleaned in a while.",
      },
    ],
    idealFor: [
      "Busy families",
      "Professionals",
      "Seniors",
      "Anyone who wants the house done without thinking",
    ],
    seoTitle: "Weekly House Cleaning Staten Island | Recurring Maids",
    seoDescription:
      "Weekly and bi-weekly house cleaning in Staten Island. Same team, custom checklist, and a lower rate than one-time cleans. Request your recurring quote.",
  },
  {
    slug: "deep-cleaning-services",
    photo: "/photos/deep-clean.jpg",
    name: "Deep Cleaning Services",
    shortName: "Deep Clean",
    adKeyword: "deep cleaning Staten Island",
    eyebrow: "Top to bottom",
    headline: "Deep cleaning in Staten Island for homes that need a reset",
    subhead:
      "Baseboards, grout, inside the oven, behind the toilet — the work a regular wipe-down never reaches. Ideal before guests, after winter, or as a first clean.",
    cardLine: "Thorough cleaning for every corner.",
    startingAt: 245,
    ltv: "medium",
    includes: [
      "Inside oven, fridge, and cabinets on request",
      "Baseboards, trim, doors, and light fixtures",
      "Grout, tile, and detailed bathrooms",
      "Behind and under movable furniture",
      "Satisfaction walkthrough or photo report",
    ],
    checklist: [
      {
        title: "Kitchen",
        items: [
          "Appliance interiors and exteriors",
          "Backsplash, cabinet fronts, and handles",
          "Sink, faucet, and floor edges",
        ],
      },
      {
        title: "Whole home",
        items: [
          "Dusting high to low",
          "Vents, fans, and fixtures",
          "Floors, stairs, and corners",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a deep clean take?",
        a: "Most Staten Island apartments take 4–6 hours. Larger homes can be a full day or a two-person crew.",
      },
      {
        q: "Should I book this before recurring service?",
        a: "Yes. A deep clean first lets weekly visits stay faster — and cheaper — because we are maintaining, not catching up.",
      },
    ],
    idealFor: [
      "Spring reset",
      "Before hosting",
      "First-time clients",
      "Homes that have sat",
    ],
    seoTitle: "Deep Cleaning Staten Island | Top-to-Bottom Home Clean",
    seoDescription:
      "Professional deep cleaning in Staten Island. Ovens, grout, baseboards, and detail work a regular clean skips. Get a same-day estimate.",
  },
  {
    slug: "move-in-move-out-cleaning",
    photo: "/photos/move-in-out.jpg",
    name: "Move-In / Move-Out Cleaning",
    shortName: "Move-In / Move-Out",
    adKeyword: "move out cleaning Staten Island",
    eyebrow: "Deposit-ready",
    headline: "Move-out cleaning in Staten Island that helps you get the deposit back",
    subhead:
      "Empty cabinets, inside appliances, closets, and floors done to landlord and realtor standards — so the walkthrough is uneventful.",
    cardLine: "Deep clean for seamless transitions.",
    startingAt: 295,
    ltv: "one-time",
    includes: [
      "Inside cabinets, drawers, and closets",
      "Inside oven, fridge, dishwasher, and microwave",
      "Bathrooms fully descaled and sanitized",
      "Floors, trim, doors, and switch plates",
      "Empty-home pricing — no furniture in the way",
    ],
    checklist: [
      {
        title: "Landlord checklist",
        items: [
          "Appliance interiors",
          "Cabinet interiors",
          "Windows, sills, and tracks on request",
        ],
      },
      {
        title: "Move-in ready",
        items: [
          "Sanitize after previous tenants",
          "Floors and bathrooms reset",
          "Photo report if you cannot be there",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you clean after the movers leave?",
        a: "Yes. Most clients book us the same day the truck leaves so the inspection can happen the next morning.",
      },
      {
        q: "Do you work with realtors and property managers?",
        a: "Regularly. We can invoice the office and send listing-ready photos the same day.",
      },
    ],
    idealFor: [
      "Renters",
      "Home sellers",
      "Realtors",
      "Landlords",
    ],
    seoTitle: "Move Out Cleaning Staten Island | Deposit-Ready",
    seoDescription:
      "Move-in and move-out cleaning in Staten Island. Inside appliances and cabinets, landlord-ready finish. Book before your walkthrough.",
  },
  {
    slug: "post-construction-cleaning",
    photo: "/photos/post-construction.jpg",
    name: "Post-Construction Cleaning",
    shortName: "Post-Construction",
    adKeyword: "post construction cleaning Staten Island",
    eyebrow: "Fine dust, gone",
    headline: "Post-construction cleaning in Staten Island — photo-ready, not just swept",
    subhead:
      "Contractors leave a film of dust in vents, tracks, and fixtures. We HEPA-vac, degrease, and polish so the renovation actually looks finished.",
    cardLine: "From dust and debris to move-in ready.",
    startingAt: 490,
    ltv: "one-time",
    includes: [
      "HEPA vacuuming of dust in vents and tracks",
      "Surface degreasing and residue removal",
      "Window, sill, and fixture detailing",
      "Floor care matched to new finishes",
      "Rough, standard, or final-pass packages",
    ],
    checklist: [
      {
        title: "Dust & debris",
        items: [
          "HEPA vac of rooms, closets, and vents",
          "Stickers, paint specks, and caulk smears",
          "Tracks, outlets, and hardware",
        ],
      },
      {
        title: "Final polish",
        items: [
          "Glass and mirrors",
          "Stainless and fixtures",
          "Walkthrough with the GC or homeowner",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you do rough clean and final clean?",
        a: "Yes. Rough clean after demo or install, then a final polish before keys. Many GCs book both.",
      },
      {
        q: "How do you price construction cleans?",
        a: "By square footage, finish level, and how much dust is left. Send photos and we quote the same day.",
      },
    ],
    idealFor: [
      "General contractors",
      "Renovating homeowners",
      "Realtors after gut jobs",
      "New-build walkthroughs",
    ],
    seoTitle: "Post Construction Cleaning Staten Island | HEPA Dust",
    seoDescription:
      "Post-construction and renovation cleaning in Staten Island. HEPA dust removal and final polish so the job is photo-ready. Get a quote today.",
  },
  {
    slug: "after-renovation-cleanup",
    photo: "/photos/renovation.jpg",
    name: "After-Renovation Cleanup",
    shortName: "After Renovation",
    adKeyword: "renovation cleaning Staten Island",
    eyebrow: "The last 5%",
    headline: "After-renovation cleanup that makes a finished job look finished",
    subhead:
      "The detail pass after paint, tile, and install — plaster dust, fingerprints, and haze off every surface before you move back in.",
    cardLine: "Fine dust and residue removal.",
    startingAt: 385,
    ltv: "one-time",
    includes: [
      "Plaster and sanding dust removal",
      "Paint specks and caulk haze",
      "New fixture and appliance polish",
      "Floor protection-aware cleaning",
      "Same-week scheduling with your contractor",
    ],
    checklist: [
      {
        title: "Detail pass",
        items: [
          "Switch plates, hardware, and glass",
          "Cabinets inside and out",
          "Bathrooms after tile and grout",
        ],
      },
    ],
    faqs: [
      {
        q: "Is this different from post-construction?",
        a: "Yes. After-renovation is the lighter final pass once the heavy debris is gone. Post-construction is the full dust-and-debris job.",
      },
    ],
    idealFor: ["Kitchen remodels", "Bath remodels", "Paint projects"],
    seoTitle: "Renovation Cleanup Staten Island | After Remodel Clean",
    seoDescription:
      "After-renovation cleanup in Staten Island. Remove plaster dust and haze so your remodel is move-in ready. Free estimate.",
  },
  {
    slug: "residential-apartment-cleaning",
    photo: "/photos/residential.jpg",
    name: "Residential & Apartment Cleaning",
    shortName: "Home Cleaning",
    adKeyword: "house cleaning Staten Island",
    eyebrow: "Homes & apartments",
    headline: "House and apartment cleaning across Staten Island",
    subhead:
      "Professional care that respects your finishes, your pets, and your schedule — from studios in St. George to family homes in Tottenville.",
    cardLine: "Professional care for your home.",
    startingAt: 145,
    ltv: "medium",
    includes: [
      "Custom plan for your layout",
      "Eco-friendly, pet-safe products",
      "Kitchens and bathrooms to a hotel standard",
      "Flexible weekday, evening, and weekend slots",
      "One-time or convert to recurring anytime",
    ],
    checklist: [
      {
        title: "Standard home visit",
        items: [
          "Kitchen reset and bathrooms sanitized",
          "Floors, dusting, and surfaces",
          "Beds made and trash out",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to be home?",
        a: "No. Many clients leave a lockbox. We text when we arrive and when we leave.",
      },
      {
        q: "Are products safe for kids and pets?",
        a: "Yes. We use eco-friendly products by default. Tell us about sensitivities and we adjust.",
      },
    ],
    idealFor: ["Homeowners", "Apartment residents", "Families"],
    seoTitle: "House Cleaning Staten Island | Apartment Maids",
    seoDescription:
      "Residential and apartment cleaning in Staten Island. Eco-friendly products, insured team, and flexible scheduling. Get your free quote.",
  },
  {
    slug: "office-commercial-cleaning",
    photo: "/photos/commercial.jpg",
    name: "Office & Commercial Cleaning",
    shortName: "Office & Commercial",
    adKeyword: "office cleaning Staten Island",
    eyebrow: "After hours or daytime",
    headline: "Office and commercial cleaning in Staten Island that does not interrupt the workday",
    subhead:
      "Touchpoints, restrooms, kitchens, and floors on a contract you can actually rely on — nightly, weekly, or after events.",
    cardLine: "Keep your workplace pristine.",
    startingAt: 185,
    ltv: "high",
    includes: [
      "After-hours or daytime programs",
      "Restrooms, kitchens, and reception",
      "Touchpoint disinfection",
      "Supply restocking on request",
      "Monthly quality walkthroughs",
    ],
    checklist: [
      {
        title: "Workspaces",
        items: [
          "Desks, glass, and common areas",
          "Floors vacuumed and mopped",
          "Trash and recycling",
        ],
      },
      {
        title: "Wet rooms",
        items: ["Restrooms sanitized", "Break room and appliances", "Supplies checked"],
      },
    ],
    faqs: [
      {
        q: "Can you clean after 6pm?",
        a: "Yes. Most commercial clients are after-hours so staff never share space with the crew.",
      },
      {
        q: "Do you invoice monthly?",
        a: "Yes. Contracts are billed monthly with a fixed scope so budgeting is simple.",
      },
    ],
    idealFor: ["Offices", "Showrooms", "Retail", "Medical waiting rooms"],
    seoTitle: "Office Cleaning Staten Island | Commercial Janitorial",
    seoDescription:
      "Office and commercial cleaning in Staten Island. After-hours crews, restrooms, kitchens, and reliable monthly contracts. Request a walkthrough.",
  },
  {
    slug: "window-cleaning",
    photo: "/photos/windows.jpg",
    name: "Window Cleaning",
    shortName: "Windows",
    adKeyword: "window cleaning Staten Island",
    eyebrow: "Interior & exterior",
    headline: "Streak-free window cleaning for Staten Island homes and storefronts",
    subhead:
      "Interior glass, exterior panes, sills, and tracks — so the view, not the haze, is what people notice.",
    cardLine: "Crystal-clear views every time.",
    startingAt: 155,
    ltv: "medium",
    includes: [
      "Interior and exterior glass",
      "Sills, frames, and tracks",
      "Screens rinsed on request",
      "Storefront and first-floor commercial",
      "Seasonal maintenance plans",
    ],
    checklist: [
      {
        title: "Each pane",
        items: ["Streak-free glass", "Sills wiped", "Tracks cleared of grit"],
      },
    ],
    faqs: [
      {
        q: "Do you do second-story exteriors?",
        a: "Yes for most Staten Island homes. Tell us the height and we confirm the method before we quote.",
      },
    ],
    idealFor: ["Homeowners", "Storefronts", "Before listing photos"],
    seoTitle: "Window Cleaning Staten Island | Interior & Exterior",
    seoDescription:
      "Interior and exterior window cleaning in Staten Island. Streak-free glass, sills, and tracks for homes and storefronts. Get a quote.",
  },
  {
    slug: "outdoor-house-washing",
    photo: "/photos/outdoor.jpg",
    name: "Outdoor House Washing",
    shortName: "House Wash",
    adKeyword: "house washing Staten Island",
    eyebrow: "Curb appeal",
    headline: "Soft-wash house washing in Staten Island — curb appeal without wrecking siding",
    subhead:
      "Siding, walkways, patios, and decks cleaned with a soft wash that lifts mildew and city grime without scarring the surface.",
    cardLine: "Revitalize your home’s exterior.",
    startingAt: 275,
    ltv: "one-time",
    includes: [
      "Soft-wash siding safe for vinyl and cedar",
      "Walkways, stoops, and patios",
      "Decks and outdoor furniture on request",
      "Pre-list curb-appeal packages",
      "Same-week availability in season",
    ],
    checklist: [
      {
        title: "Exterior",
        items: ["Siding soft wash", "Entry and walkways", "Patio and deck rinse"],
      },
    ],
    faqs: [
      {
        q: "Is this pressure washing?",
        a: "We soft-wash siding. High pressure can force water behind vinyl and scar wood. Hard surfaces can take a stronger rinse.",
      },
    ],
    idealFor: ["Sellers", "Spring refresh", "Rental exteriors"],
    seoTitle: "House Washing Staten Island | Soft Wash Siding",
    seoDescription:
      "Outdoor house washing in Staten Island. Soft-wash siding, walkways, and patios that restore curb appeal without damage. Free quote.",
  },
  {
    slug: "custom-cleaning-services",
    photo: "/photos/custom.jpg",
    name: "Custom Cleaning Services",
    shortName: "Custom",
    adKeyword: "custom cleaning Staten Island",
    eyebrow: "Tell us the job",
    headline: "Custom cleaning for events, estates, and one-off projects",
    subhead:
      "If it is not on the menu, it is still on the table. Event prep, estate cleans, organizing add-ons — we build the plan and the crew around the job.",
    cardLine: "Tailored to your unique needs.",
    startingAt: 210,
    ltv: "medium",
    includes: [
      "Scoped after a short call or photos",
      "Event, estate, and seasonal projects",
      "Add organizing or staging reset",
      "Flexible crew size",
      "Clear written quote before we start",
    ],
    checklist: [
      {
        title: "How we scope",
        items: ["You send photos or a walkthrough", "We write the checklist", "You approve the number"],
      },
    ],
    faqs: [
      {
        q: "What counts as custom?",
        a: "Anything that is not a standard home, Airbnb, or construction clean — parties, estates, hoarding-lite resets, or mixed jobs.",
      },
    ],
    idealFor: ["Events", "Estates", "Unusual properties"],
    seoTitle: "Custom Cleaning Staten Island | Event & Estate",
    seoDescription:
      "Custom cleaning in Staten Island for events, estates, and special projects. Tell us the job and we will build the plan. Free quote.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
