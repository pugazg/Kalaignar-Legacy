import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, Legend,
} from "recharts";
import {
  Scale, GraduationCap, UtensilsCrossed, HeartPulse, Users, Sprout, Building2,
  TrainFront, Home, Droplets, Tractor, Factory, Cpu, Zap, Trees, Landmark,
  HandCoins, ShieldCheck, Hammer, Plane, BookOpen, Wrench, Gavel, CloudRain,
  Crown, Search, Moon, Sun, ArrowUp, ChevronDown, Quote, ArrowRight, X,
  Menu, FileDown, ArrowDownToLine,
} from "lucide-react";

/* ============================================================================
   DATA LAYER  —  extracted verbatim from the source paper (Yoganandham, GJIBR
   2026, Vol 3 Issue 1).  Exact figures preserved; prose summarised faithfully.
   In a multi-file build this lives under /data; kept inline so the report runs
   as one artifact.
   ========================================================================== */

const PAPER = {
  title: "Kalaignar M. Karunanidhi’s Legacy",
  subtitle: "A Holistic Socio-Economic Transformation of Tamil Nadu",
  author: "Dr. G. Yoganandham",
  affiliation: "Professor, Department of Economics, Thiruvalluvar University, Vellore, Tamil Nadu",
  journal: "Global Journal of International Business Research (GJIBR)",
  publication: "2026 · Volume 3 · Issue 1 · Peer Reviewed · Open Access",
};

const HEADLINE_FIGURES = [
  { value: 80.3, suffix: "%", label: "Literacy rate by 2020", sub: "vs 74% national average" },
  { value: 69, suffix: "%", label: "Reservation upheld", sub: "highest in India · vs 49.5% norm" },
  { value: 44, suffix: " lakh", label: "Children fed daily", sub: "Universal Midday Meal Scheme" },
  { value: 11, prefix: "~", suffix: "%", label: "Poverty by 2011–12", sub: "down from 32% in 1993–94" },
];

const SUMMARY = [
  { icon: Scale, title: "Dravidian inclusive model", body: "A development framework rooted in Dravidian ideology that combined welfare with growth — dismantling caste hierarchy while building a modern economy." },
  { icon: GraduationCap, title: "Education as a right", body: "Decades of investment lifted literacy to 80.3%, with Samacheer Kalvi standardising schooling and colleges growing from ~70 to 160+." },
  { icon: HeartPulse, title: "Health for the vulnerable", body: "Comprehensive insurance (CMCHIS) reached 1.45 crore families with ₹5 lakh cashless cover, alongside 108 emergency services and rural care." },
  { icon: Users, title: "Women at the centre", body: "Property rights, financial dignity (₹1,000/month to 1.3 crore women), free mobility and 90 lakh+ SHG members reshaped economic agency." },
  { icon: Factory, title: "Industrial powerhouse", body: "Institutional foundations (SIPCOT, TIDEL) grew factories from ~7,000 to 40,000+; the state now holds 15.24% of India’s factory workforce." },
  { icon: Building2, title: "Cities & connectivity", body: "India’s first Slum Clearance Board (1970), metro rail, ₹36,000 crore urban transformation and one of the densest road networks." },
  { icon: Sprout, title: "Rural self-reliance", body: "Irrigation, panchayat empowerment and participatory schemes (AGAMT, Namakku Naame) sustained ~5.5% annual agricultural growth." },
  { icon: Landmark, title: "Sustainable governance", body: "Five terms of participatory, redistributive administration that kept welfare and fiscal balance advancing together." },
];

const PILLARS = [
  { icon: Scale, label: "Social Justice", color: "amber" },
  { icon: GraduationCap, label: "Education", color: "jade" },
  { icon: UtensilsCrossed, label: "Midday Meals", color: "amber" },
  { icon: HeartPulse, label: "Healthcare", color: "clay" },
  { icon: Users, label: "Women", color: "jade" },
  { icon: Sprout, label: "Rural Dev.", color: "jade" },
  { icon: Building2, label: "Urban", color: "slate" },
  { icon: TrainFront, label: "Transport", color: "slate" },
  { icon: Home, label: "Housing", color: "clay" },
  { icon: Droplets, label: "Water", color: "slate" },
  { icon: Tractor, label: "Agriculture", color: "jade" },
  { icon: Factory, label: "Industry", color: "amber" },
  { icon: Cpu, label: "Technology", color: "slate" },
  { icon: Zap, label: "Energy", color: "amber" },
  { icon: Trees, label: "Environment", color: "jade" },
  { icon: HandCoins, label: "Finance", color: "amber" },
  { icon: ShieldCheck, label: "Welfare", color: "clay" },
  { icon: Hammer, label: "Public Works", color: "slate" },
  { icon: Plane, label: "Tourism", color: "jade" },
  { icon: BookOpen, label: "Culture", color: "clay" },
  { icon: Wrench, label: "Skills", color: "amber" },
  { icon: Gavel, label: "Legislation", color: "slate" },
  { icon: CloudRain, label: "Disaster Mgmt", color: "clay" },
  { icon: Crown, label: "Governance", color: "amber" },
];

const TIMELINE = [
  { year: "1969", title: "The era begins", text: "First of five terms as Chief Minister, opening nearly five decades of Dravidian-led governance.", stat: "5 terms · 1969–2011" },
  { year: "1970", title: "Slum Clearance Board", text: "India’s first board for in-situ slum redevelopment — later the Tamil Nadu Urban Habitat Development Board.", stat: "1.55 lakh+ tenements built" },
  { year: "1973", title: "First women’s police unit", text: "An early framework for gender-sensitive policing, decades ahead of national practice.", stat: "1st in India" },
  { year: "1982", title: "Universal Midday Meal", text: "A nutrition-oriented scheme that drove primary enrolment toward near-universal levels.", stat: "~99% primary enrolment" },
  { year: "1989", title: "Hindu Succession (TN) Act", text: "Amendment strengthening women’s property rights and advancing gender equity in law.", stat: "Millions of women benefited" },
  { year: "1997", title: "First state IT policy", text: "One of India’s earliest state IT policies, laying the foundation for a knowledge economy.", stat: "Foundation for IT corridors" },
  { year: "1999", title: "Uzhavar Sandhais", text: "Farmers’ markets linking producers directly to consumers, removing exploitative intermediaries.", stat: "160+ markets" },
  { year: "2000", title: "TIDEL Park & Poigai Dam", text: "TIDEL Park — among Asia’s largest IT parks — anchored the OMR corridor; Poigai Dam secured southern irrigation.", stat: "3.91 million m³ storage" },
  { year: "2004", title: "Tamil — a Classical Language", text: "Recognition that anchored linguistic pride as cultural and economic capital.", stat: "Cultural milestone" },
  { year: "2010", title: "Samacheer Kalvi", text: "Uniform schooling system standardising curricula across government and aided schools.", stat: "Equal learning, all backgrounds" },
  { year: "2011", title: "A measured legacy", text: "Literacy above 80%, poverty near 11%, infant mortality halved — a model of equitable growth.", stat: "IMR 44 → 21 per 1,000" },
];

const CATS = [
  "Social Justice", "Education & Health", "Infrastructure",
  "Economy & Industry", "Welfare & Inclusion", "Governance & Culture", "Environment",
];

const SECTIONS = [
  {
    id: "social-justice", cat: "Social Justice", icon: Scale, lead: "40% homes to Scheduled Castes",
    title: "Dravidian Ideology & Social Justice",
    narrative: "Karunanidhi translated Dravidian thought into policy aimed at dismantling caste hierarchy and ensuring dignity for all. Targeted welfare, integrated villages and legal reform reduced caste and gender disparity at scale.",
    initiatives: ["Periyar Ninaivu Samathuvapuram (Equality Villages)", "Expanded educational reservations", "Kalaignar Health Insurance Scheme", "Hindu Succession (TN Amendment) Act, 1989"],
    stats: [
      { label: "Magalir Urimai Thittam", value: "1.3 crore", sub: "women · ₹1,000/month" },
      { label: "Free bus travel", value: "682.02 crore", sub: "rides · ₹888/mo saved" },
      { label: "SHG credit expansion", value: "₹1.12 lakh cr", sub: "300% over prior decade" },
    ],
    details: "The Equality Village scheme allocated 40% of houses to Scheduled Castes with shared civic facilities. Public distribution and health insurance protected vulnerable groups, while women-focused measures — direct aid, free mobility and self-help-group credit — sharply expanded economic participation.",
    source: "Business Standard — Caste, Social Mobility & the Dravidian Movement",
  },
  {
    id: "education", cat: "Education & Health", icon: GraduationCap, lead: "70 → 160+ colleges",
    title: "Education for All",
    narrative: "Universal education became a cornerstone of socio-economic transformation. Standardised curricula, doubled scholarships and adult literacy programmes widened access for rural and marginalised students.",
    initiatives: ["Samacheer Kalvi uniform schooling (2010)", "Doubled SC/ST, BC, MBC scholarships", "Free bus passes & girls’ hostels", "New India Literacy Programme"],
    stats: [
      { label: "Schools", value: "~59,000", sub: "primary & secondary" },
      { label: "Students enrolled", value: "~1.16 crore", sub: "GER ~95%" },
      { label: "Adult learners", value: "30 lakh+", sub: "literacy programmes" },
    ],
    details: "Between 2006–2011 the school system reached ~59,000 schools and ~1.16 crore students with a Gross Enrolment Ratio near 95%. Government and aided colleges rose from ~70 to over 160, while Samacheer Kalvi guaranteed equal curricula regardless of socio-economic background.",
    source: "Government of Tamil Nadu Education Department Reports (2006–2011)",
  },
  {
    id: "midday-meal", cat: "Education & Health", icon: UtensilsCrossed, lead: "44 lakh children fed daily",
    title: "Universal Midday Meal Scheme",
    narrative: "A pioneering model where nutritional support drives education and equity. Eggs and protein-rich items reduced classroom hunger and micronutrient deficiency while incentivising attendance.",
    initiatives: ["Protein-enriched balanced meals", "Coverage across 37,000+ schools", "Employment for women cooks & helpers", "Social inclusion at shared mealtimes"],
    stats: [
      { label: "Students benefited", value: "44 lakh", sub: "4.4 million" },
      { label: "Daily intake", value: "450–500 kcal", sub: "12–15 g protein" },
      { label: "Attendance", value: "+10–15%", sub: "esp. among girls" },
    ],
    details: "Reaching ~44 lakh students in over 37,000 schools, the scheme raised attendance 10–15%, lifted enrolment among girls, cut anaemia and created significant women’s employment — an integrated approach to health, education and social development.",
    source: "Tamil Nadu School Education Department Reports, 2023",
  },
  {
    id: "healthcare", cat: "Education & Health", icon: HeartPulse, lead: "₹5 lakh cashless cover per family",
    title: "Healthcare & Medical Services",
    narrative: "Hospital infrastructure, rural health services and inclusive insurance advanced equity and financial protection — preventing medical impoverishment for low-income households.",
    initiatives: ["Chief Minister’s Comprehensive Health Insurance (CMCHIS)", "108 Ambulance Emergency Service", "Kalaignar Centenary Super Specialty Hospital", "Makkalai Thedi Maruthuvam (doorstep care)"],
    stats: [
      { label: "CMCHIS families", value: "1.45 crore", sub: "1,800+ hospitals" },
      { label: "Patients treated", value: "81 lakh", sub: "₹5,878 crore of care" },
      { label: "108 reach", value: "80 lakh", sub: "incl. 19 lakh mothers" },
    ],
    details: "CMCHIS offered cashless coverage up to ₹5 lakh per family across 1,800+ empanelled hospitals. The 108 service reached nearly 80 lakh people including 19 lakh pregnant women and 14 lakh accident victims, while doorstep rural care lowered out-of-pocket costs.",
    source: "Medical Buyer — CMCHIS Overview",
  },
  {
    id: "women", cat: "Welfare & Inclusion", icon: Users, lead: "47.3% women’s higher-ed enrolment",
    title: "Women’s Empowerment",
    narrative: "Education access, economic participation and safety infrastructure made women central to transformation. Tamil Nadu consistently outperformed national averages in enrolment and safety.",
    initiatives: ["Pudhumai Penn & Naan Mudhalvan schemes", "Magalir Vidiyal Payanam (free travel)", "Women’s Employment & Safety Programme", "First women’s police unit (1973)"],
    stats: [
      { label: "Higher-ed GER", value: "47.3%", sub: "vs 28.5% national" },
      { label: "Workforce share", value: "41.4%", sub: "among highest in India" },
      { label: "Assault rate", value: "1.1", sub: "per lakh vs 4.7 national" },
    ],
    details: "Female higher-education enrolment reached 47.3% (national 28.5%), with a 35% rise under Naan Mudhalvan. SHG loans exceeded ₹1.05 lakh crore, ₹1,000 monthly support reached 1.3 crore women, and crime against women stayed far below national levels.",
    source: "Times of India, 2025 (compiled)",
  },
  {
    id: "rural", cat: "Infrastructure", icon: Sprout, lead: "2,544 villages upgraded",
    title: "Rural Development & Self-Reliance",
    narrative: "Holistic rural infrastructure, irrigation expansion and community participation laid foundations for self-reliant village economies and stronger panchayat institutions.",
    initiatives: ["Anaithu Grama Anna Marumalarchi Thittam (AGAMT)", "Poigai Dam & irrigation projects", "Namakku Naame Thittam (co-financing)", "Panchayat empowerment & canal desilting"],
    stats: [
      { label: "AGAMT outlay", value: "₹1,155 crore", sub: "2022–23 · 2,544 villages" },
      { label: "Canals desilted", value: "5,400 km", sub: "2.1 lakh farmers" },
      { label: "Agri growth", value: "5.56%/yr", sub: "2021–25 average" },
    ],
    details: "AGAMT upgraded roads, drainage and amenities across 2,544 villages; Namakku Naame Thittam mobilised citizens to co-finance projects. Desilting of 5,400 km of canals benefited over 2.1 lakh farmers, sustaining agricultural growth averaging 5.56% annually.",
    source: "TN Rural Development & Panchayat Raj Department",
  },
  {
    id: "urban", cat: "Infrastructure", icon: Building2, lead: "₹36,000 crore urban transformation",
    title: "Urban Modernization",
    narrative: "Structured urban development began with India’s first Slum Clearance Board (1970). Transport nationalisation, link roads and civic reform reshaped cities into inclusive, functional spaces.",
    initiatives: ["TN Urban Habitat Development Board (1970)", "State transport nationalisation & expansion", "Rural–urban link roads (pop. >1,500)", "Integrated air-conditioned bus termini"],
    stats: [
      { label: "Urban investment", value: "₹36,000 cr", sub: "recent transformation" },
      { label: "Drinking water", value: "₹9,000 cr", sub: "1.2 crore people" },
      { label: "Urban roads", value: "9,000 km", sub: "₹4,673 crore upgrade" },
    ],
    details: "The first slum-clearance board in India institutionalised in-situ redevelopment. Contemporary investment continuing Karunanidhi’s ethos committed ₹36,000 crore to urban transformation — clean water for 1.2 crore people and 9,000 km of upgraded roads.",
    source: "The Hans India — TN urban transformation drive",
  },
  {
    id: "transport", cat: "Infrastructure", icon: TrainFront, lead: "54 km metro → 118 km planned",
    title: "Transport Infrastructure",
    narrative: "Road networks, metro rail and public bus services support socio-economic development, with cleaner-energy fleets and integrated multimodal planning extending mobility to underserved areas.",
    initiatives: ["Chennai Metro Rail (Phase I & II)", "Public bus fleet expansion", "Electric & CNG low-floor buses", "Integrated mobility under CUMTA"],
    stats: [
      { label: "Registered vehicles", value: "~36 million", sub: "one of densest networks" },
      { label: "Daily ridership", value: "39 → 65 lakh", sub: "target by 2048" },
      { label: "Public transport", value: "60%", sub: "mode-share target 2048" },
    ],
    details: "Metro Phase I covers 54 km and 41 stations; Phase II adds 118 km and 128 stations. Bus fleets scale from 4,427 (2025) toward 10,151 (2048), with 120 low-floor e-buses leading a cleaner transition and a 60% public-transport mode-share target.",
    source: "tnenvis · swarajyamag · dtnext · itdp",
  },
  {
    id: "housing", cat: "Infrastructure", icon: Home, lead: "1.55 lakh+ tenements built",
    title: "Housing the Poor",
    narrative: "Rooted in social justice, the housing vision gave the poor dignified, permanent homes through institutional slum redevelopment and direct rural support.",
    initiatives: ["TN Slum Clearance Board projects", "TN Housing Board affordable units", "Kalaignar Kanavu Illam scheme", "Hut-Free Tamil Nadu Mission"],
    stats: [
      { label: "Slum tenements", value: "1.55 lakh+", sub: "in-situ redevelopment" },
      { label: "Housing Board units", value: "4.35 lakh+", sub: "across income groups" },
      { label: "Kanavu Illam", value: "₹3,500 cr", sub: "72,000 homes by mid-2025" },
    ],
    details: "In-situ redevelopment kept slum dwellers near work and services. The Housing Board delivered over 4.35 lakh units, while the rural Kanavu Illam scheme — with a ₹3,500 crore outlay — advanced a “Hut-Free Tamil Nadu by 2030,” nearly 8 lakh huts targeted for replacement.",
    source: "Times of India, 2025",
  },
  {
    id: "water", cat: "Infrastructure", icon: Droplets, lead: "Irrigated area 36 → 38 lakh ha",
    title: "Water Resource Management",
    narrative: "Irrigation infrastructure underpinned agricultural growth and rural livelihoods — from major dams to village tanks — reducing dependence on the monsoon and stabilising yields.",
    initiatives: ["Poigai Dam & reservoir construction", "Grand Anicut & Mettur canal systems", "Lake & tank rejuvenation", "Check dams and new ponds"],
    stats: [
      { label: "Poigai Dam", value: "3.91 M m³", sub: "irrigates 383 ha" },
      { label: "Lakes rejuvenated", value: "900+", sub: "8,500+ tanks desilted" },
      { label: "Canal irrigation", value: "25 lakh acres", sub: "delta lands" },
    ],
    details: "Canal systems irrigate over 25 lakh acres; recent rejuvenation revived 917 lakes, built 88 check dams and created 2,382 ponds. Irrigated area expanded from 36.07 to 38.33 lakh hectares, supporting agricultural growth above 5.5% annually.",
    source: "TN Water Resources Dept. & Agriculture Policy Notes",
  },
  {
    id: "agriculture", cat: "Economy & Industry", icon: Tractor, lead: "₹7,000 crore loans waived",
    title: "Agriculture & Farmer Welfare",
    narrative: "Targeted subsidies, cooperative strengthening and financial relief reduced rural distress and improved market access, laying an enduring foundation for agrarian transformation.",
    initiatives: ["Cooperative farm loan waiver", "Interest-free crop loans", "Uzhavar Sandhai farmers’ markets", "Price support & input subsidies"],
    stats: [
      { label: "Loan waiver", value: "₹7,000 cr", sub: "22 lakh farmers" },
      { label: "Cooperative societies", value: "4,500+", sub: "PACCS statewide" },
      { label: "Farmers’ markets", value: "160+", sub: "established/restored" },
    ],
    details: "A ₹7,000 crore cooperative loan waiver eased the debt of nearly 22 lakh farming families. Uzhavar Sandhais (from 1999) enabled direct producer-to-consumer sales, while interest-free crop loans and price support strengthened profitability and resilience.",
    source: "Government of Tamil Nadu Policy Notes",
  },
  {
    id: "industry", cat: "Economy & Industry", icon: Factory, lead: "7,000 → 40,000+ factories",
    title: "Industrial Renaissance",
    narrative: "Institutional foundations such as SIPCOT and SIDCO built ready-to-use industrial estates, widening manufacturing investment beyond traditional hubs and driving sustained job creation.",
    initiatives: ["SIPCOT & SIDCO industrial estates", "Broad-based MSME ecosystem", "Investor conclaves & global MoUs", "Diversified advanced manufacturing"],
    stats: [
      { label: "Factory workforce", value: "15.24%", sub: "of India’s total" },
      { label: "Registered MSMEs", value: "~35 lakh", sub: "strong base" },
      { label: "Manufacturing GDP", value: "~12%", sub: "of India" },
    ],
    details: "Factories grew from under 7,000 in the 1960s to over 40,000 by 2010, with employment rising from ~3.8 lakh to over 12 lakh. The state now leads India in factory employment and projects 100,000+ new jobs from recent renewable, aerospace and shipbuilding MoUs.",
    source: "Economic Survey & Industrial Reports, Tamil Nadu",
  },
  {
    id: "it", cat: "Economy & Industry", icon: Cpu, lead: "₹1.5 lakh crore IT exports",
    title: "Information Technology",
    narrative: "Early adoption of a state IT policy (1997) and TIDEL Park (2000) seeded a knowledge economy, decentralising opportunity to tier-2 cities and integrating Tamil Nadu into global value chains.",
    initiatives: ["OMR IT Corridor & TIDEL Park", "ELCOT parks in tier-2 cities", "AI, cloud & analytics expansion", "Export-led high-value services"],
    stats: [
      { label: "Chennai exports", value: "₹1.5 lakh cr+", sub: "3 lakh+ jobs" },
      { label: "Coimbatore", value: "₹15,000 cr", sub: "1.2 lakh jobs" },
      { label: "Tier-2 hubs", value: "6 cities", sub: "Madurai · Trichy · Salem…" },
    ],
    details: "TIDEL Park anchored the OMR corridor while ELCOT parks took technology to Coimbatore, Madurai, Salem, Trichy, Tirunelveli and Hosur. Coimbatore alone crossed ₹15,000 crore in exports and 1.2 lakh direct jobs, diversifying the economy beyond manufacturing.",
    source: "India Briefing",
  },
  {
    id: "energy", cat: "Economy & Industry", icon: Zap, lead: "Renewables 44.7% → 58.6%",
    title: "Energy & Power Development",
    narrative: "Expanding electricity access and a decisive pivot to clean energy drove industrial competitiveness, rural electrification and lower carbon intensity.",
    initiatives: ["Wind capacity leadership", "Rapid solar expansion", "Grid integration upgrades", "Rural electrification drive"],
    stats: [
      { label: "Installed capacity", value: "43+ GW", sub: "from 36.5 GW" },
      { label: "Solar capacity", value: "10+ GW", sub: "from 0.16 GW" },
      { label: "Electricity access", value: "99%+", sub: "from 92%" },
    ],
    details: "Total capacity reached over 43 GW with renewables at 58.6% — up from 44.7% in 2017–18. Solar grew roughly 6,000% to over 10 GW, wind reached 11.7 GW, and rural-and-urban electricity access climbed from 92% to over 99%.",
    source: "TN Energy Development Agency (TEDA), 2025",
  },
  {
    id: "environment", cat: "Environment", icon: Trees, lead: "108 million trees planted",
    title: "Environmental Conservation",
    narrative: "Conservation evolved into a strategic blend of afforestation, pollution control and sustainable urban planning — aligning ecological resilience with rural employment and climate adaptation.",
    initiatives: ["Afforestation & mangrove restoration", "Real-time river water monitoring", "Manjappai cloth-bag drive", "Blue-green urban infrastructure"],
    stats: [
      { label: "Trees planted", value: "108 million", sub: "3,610 ha mangroves" },
      { label: "Forest cover", value: "+1,000 km²", sub: "2021–2023" },
      { label: "Cloth bags", value: "4.2 lakh", sub: "via 203 machines" },
    ],
    details: "Over 108 million trees and 3,610 ha of restored mangroves expanded forest cover by nearly 1,000 km². Real-time monitoring on major rivers, plastic-reduction drives and green spaces such as the 6.09-acre Kalaignar Centenary Park embedded sustainability into planning.",
    source: "TN Pollution Control Board (TNPCB), 2023",
  },
  {
    id: "finance", cat: "Welfare & Inclusion", icon: HandCoins, lead: "90 lakh+ women in SHGs",
    title: "Financial Inclusion & Banking",
    narrative: "Cooperative banking and microfinance brought millions of low-income households into the formal financial system, reducing dependence on informal moneylenders.",
    initiatives: ["TNSC cooperative bank network", "SHG–bank linkage programmes", "Microfinance for micro-entrepreneurs", "Financial-literacy campaigns"],
    stats: [
      { label: "SHG bank credit", value: "₹1 lakh cr+", sub: "90 lakh+ women" },
      { label: "Microfinance", value: "₹29,461 cr", sub: "1.2 crore accounts" },
      { label: "Coop. deposits", value: "₹12,220 cr", sub: "up from ₹10,674 cr" },
    ],
    details: "Cooperative bank loans nearly doubled to ₹20,834 crore as outreach deepened. A microfinance portfolio near ₹29,461 crore across 1.2 crore accounts, plus SHG credit above ₹1 lakh crore, turned financial inclusion into a socio-political instrument for equitable growth.",
    source: "Times of India — Microfinance is a Macro Success in TN",
  },
  {
    id: "welfare", cat: "Welfare & Inclusion", icon: ShieldCheck, lead: "74 lakh pension beneficiaries",
    title: "Social Welfare & Poverty Alleviation",
    narrative: "An extensive welfare architecture of pensions, disability benefits and integrated poverty targeting combined income support, insurance and large-scale provisioning.",
    initiatives: ["Social security pensions", "Samathuvapuram housing", "Integrated Welfare Scheme", "Unorganised Sector Welfare Boards"],
    stats: [
      { label: "Pension reach", value: "74 lakh", sub: "₹1,200–1,500/month" },
      { label: "Poorest households", value: "12.24 lakh", sub: "targeted support" },
      { label: "Unorganised welfare", value: "₹2,460 cr", sub: "over four years" },
    ],
    details: "Pensions reached 74 lakh beneficiaries; the Integrated Welfare Scheme supported 12.24 lakh of the poorest households with housing, insurance, nutrition and credit. Welfare boards disbursed ₹2,460 crore to informal-sector workers, building durable safety nets.",
    source: "Times of India",
  },
  {
    id: "youth", cat: "Welfare & Inclusion", icon: Wrench, lead: "30 lakh students skilled",
    title: "Youth & Skill Development",
    narrative: "Vocational training and employment schemes equipped young people — especially from marginalised backgrounds — with industry-relevant skills, raising employability and self-employment.",
    initiatives: ["Naan Mudhalvan employability training", "Vetri Nichayam (30+ sectors)", "SHG-linked youth training", "ITI & polytechnic network"],
    stats: [
      { label: "Naan Mudhalvan", value: "30 lakh", sub: "students covered" },
      { label: "SHG youth trained", value: "~80,000", sub: "earlier initiatives" },
      { label: "Training centres", value: "100+ ITIs", sub: "300+ private centres" },
    ],
    details: "Naan Mudhalvan trained over 30 lakh students in employability skills; Vetri Nichayam offers free training across 30+ sectors with stipends up to ₹12,000. A network of 100+ government ITIs and 300+ private centres widened access across districts.",
    source: "TN Skill Development, Labour & Employment Dept.",
  },
  {
    id: "tourism", cat: "Governance & Culture", icon: Plane, lead: "Revenue up 5× to ₹243 crore",
    title: "Tourism Promotion",
    narrative: "Heritage conservation, eco-tourism and urban infrastructure made tourism a strategic instrument of inclusive development, cultural continuity and community livelihoods.",
    initiatives: ["Heritage site modernisation", "Eco-tourism in the Nilgiris & hills", "Cultural interpretation centres", "Tholkappia Poonga restoration"],
    stats: [
      { label: "Tourism revenue", value: "₹243.31 cr", sub: "5× over 2020–21" },
      { label: "Foreign arrivals", value: "1.17 million", sub: "from 0.14 million" },
      { label: "Domestic visits", value: "286 million", sub: "from 218.58 million" },
    ],
    details: "With six UNESCO sites and 400+ monuments, tourism revenue rose five-fold from ₹49.11 to ₹243.31 crore (2020–21 to 2023–24). Foreign arrivals grew to 1.17 million and domestic visits to 286 million, generating broad employment across hospitality and crafts.",
    source: "Department of Tourism, Government of Tamil Nadu",
  },
  {
    id: "culture", cat: "Governance & Culture", icon: BookOpen, lead: "75 films · 210 poems · 15 books",
    title: "Tamil Language, Arts & Cinema",
    narrative: "A prolific writer, Karunanidhi anchored cultural identity into transformation — using literature and cinema to reinforce social reform, rationalist thought and linguistic pride.",
    initiatives: ["Screenplays, dramas, books & poems", "Cinema as socio-political narrative", "Nationalisation of literary works", "Kalaimamani arts recognition"],
    stats: [
      { label: "Literary output", value: "75 films", sub: "15 books · 210 poems" },
      { label: "Works nationalised", value: "179", sub: "₹14.42 cr royalties" },
      { label: "Global engagement", value: "102 countries", sub: "at Chennai Book Fair" },
    ],
    details: "From Thirumbi Paar (1953) to Neethikku Thandanai (1987), his cinema embedded reform in popular culture. Nationalising 179 works with ₹14.42 crore in royalties preserved heritage and expanded the literary economy, turning Tamil identity into an economic asset.",
    source: "Times of India — Nationalisation of Karunanidhi’s works",
  },
  {
    id: "public-works", cat: "Infrastructure", icon: Hammer, lead: "Road density 153 vs 103 km national",
    title: "Public Works & Connectivity",
    narrative: "Roads, bridges and flyovers knit rural areas to urban centres, underpinning economic resilience, trade efficiency and higher living standards across the state.",
    initiatives: ["High road density network", "996 new bridges & 29 ROBs", "Urban flyovers (Chennai, Madurai)", "Panchayat union road upgrades"],
    stats: [
      { label: "Road density", value: "153 km", sub: "per 100 sq km · nat. 103" },
      { label: "New bridges", value: "996", sub: "+29 railway overbridges" },
      { label: "Rural roads", value: "5,600 km", sub: "upgraded since 2021" },
    ],
    details: "Tamil Nadu’s road density of 153 km per 100 sq km exceeds the national 103 km. Over 996 bridges, 29 railway overbridges and ₹1,500 crore of civic works improved year-round connectivity, market access and rural-urban integration.",
    source: "DT Next — TN Road & Infrastructure Development",
  },
  {
    id: "legislation", cat: "Governance & Culture", icon: Gavel, lead: "69% reservation vs 49.5% norm",
    title: "Legislative Reforms for Social Equity",
    narrative: "Laws on reservation, minority rights and women’s rights created structural avenues for historically disadvantaged communities, reinforcing Tamil Nadu’s leadership in social justice.",
    initiatives: ["69% reservation framework", "Minority scholarships & education", "50% women’s reservation in panchayats", "Laws against domestic & workplace violence"],
    stats: [
      { label: "SC/ST enrolment", value: "+28%", sub: "higher education 2010–20" },
      { label: "Women elected", value: "85,000+", sub: "to local bodies (2021)" },
      { label: "Per-capita income", value: "+18%", sub: "in backward regions" },
    ],
    details: "Reservation upheld at 69% (vs 49.5% national norm) lifted SC/ST higher-education enrolment 28% and government employment 22%. Fifty-percent women’s reservation brought 85,000+ women into local governance, with ₹1,850 crore directed to welfare programmes.",
    source: "TN Policy Notes · Census of India · State Election Commission",
  },
  {
    id: "disaster", cat: "Governance & Culture", icon: CloudRain, lead: "₹15,270 crore on resilience",
    title: "Disaster Management & Relief",
    narrative: "Facing floods, cyclones and droughts, the state shifted from reactive relief toward mitigation — investing in preparedness, forecasting and ecosystem-based risk governance.",
    initiatives: ["Proactive mitigation spending", "Real-time flood forecasting", "Vulnerability mapping", "Community-level preparedness"],
    stats: [
      { label: "Resilience spend", value: "₹15,270 cr", sub: "four years to 2025" },
      { label: "Central support", value: "17%", sub: "of ₹24,679 cr sought" },
      { label: "Land at risk", value: "1–1.5 lakh ha", sub: "in severe events" },
    ],
    details: "State spending of about ₹15,270 crore far exceeded central allocations — only 17% of the ₹24,679 crore sought over a decade. Real-time forecasting and ecosystem approaches mark a shift to mitigation-oriented governance in one of India’s most climate-exposed states.",
    source: "Government of Tamil Nadu — State Disaster Management Authority",
  },
  {
    id: "governance", cat: "Governance & Culture", icon: Crown, lead: "Poverty 32% → 11% by 2011–12",
    title: "Political Leadership & the Dravidian Model",
    narrative: "Five terms of efficient, participatory and redistributive administration proved that economic growth and social justice are mutually reinforcing — a durable benchmark for welfare-oriented governance.",
    initiatives: ["Social-sector spending above 40%", "Panchayati Raj devolution (73rd/74th)", "Welfare with fiscal balance", "Federal assertiveness on state rights"],
    stats: [
      { label: "Literacy", value: "63.7% → 80%", sub: "1991 → 2011" },
      { label: "Infant mortality", value: "44 → 21", sub: "per 1,000 live births" },
      { label: "GSDP growth", value: "~8%", sub: "mid-2000s average" },
    ],
    details: "Social-sector spending consistently exceeded 40% of state expenditure. Poverty fell from ~32% (1993–94) to ~11% (2011–12) and infant mortality halved, while Tamil Nadu contributed nearly 9% of India’s GDP — welfare-led growth without sacrificing competitiveness.",
    source: "Government of Tamil Nadu & Census of India (1991–2011)",
  },
];

const CHARTS = {
  industry: [
    { name: "1960s", Factories: 7000, Employment: 3.8 },
    { name: "2010", Factories: 40000, Employment: 12 },
  ],
  energy: [
    { name: "Renewable share", "2017–18": 44.7, "2024–25": 58.6 },
    { name: "Wind (GW)", "2017–18": 9.5, "2024–25": 11.7 },
    { name: "Solar (GW)", "2017–18": 0.16, "2024–25": 10 },
    { name: "Access (%)", "2017–18": 92, "2024–25": 99 },
  ],
  tourism: [
    { name: "2020–21", Revenue: 49.11 },
    { name: "2023–24", Revenue: 243.31 },
    { name: "2025–26*", Revenue: 700 },
  ],
  literacy: [
    { year: "1991", Overall: 63.7, Female: 55 },
    { year: "2001", Overall: 73.5, Female: 64.6 },
    { year: "2011", Overall: 80.3, Female: 73.4 },
  ],
  poverty: [
    { year: "1993–94", rate: 35 },
    { year: "2004–05", rate: 22 },
    { year: "2011–12", rate: 11.5 },
  ],
  welfare: [
    { name: "Pensions", value: 74 },
    { name: "Integrated Welfare", value: 12.24 },
    { name: "Disability (UDID)", value: 6.12 },
    { name: "Samathuvapuram", value: 1 },
  ],
};

const REFERENCES = [
  { n: 1, t: "Government of Tamil Nadu (2011). Tamil Nadu Human Development Report. Dept. of Planning." },
  { n: 2, t: "Yoganandham, G. (2015). Socio-economic development and policy challenges in Tamil Nadu. IJEDS, 3(2)." },
  { n: 9, t: "Government of Tamil Nadu (2020). Socio-Economic and Caste Census Data. Ministry of Rural Development." },
  { n: 21, t: "Kumar, S. (2016). Dravidian politics and Tamil identity: The legacy of M. Karunanidhi. Routledge." },
  { n: 24, t: "National Sample Survey Office (2019). Household Consumer Expenditure in Tamil Nadu. NSSO Report 567." },
  { n: 29, t: "Thirumalai, R. (2018). Political leadership and social justice: The case of M. Karunanidhi. IPSR, 12(4)." },
  { n: 35, t: "Zaman, M. (2019). The political economy of Tamil Nadu’s development model. EPW, 54(29), 45–54." },
  { n: 37, t: "Yoganandham, G. (2025). Financial inclusion and poverty alleviation in Tamil Nadu. JDS, 10(2), 75–92." },
];

/* ============================================================================
   THEME TOKENS
   ========================================================================== */
const palette = (dark) => dark
  ? {
      bg: "#0B1A18", bgAlt: "#0F231F", glass: "rgba(255,255,255,0.045)",
      glassStrong: "rgba(255,255,255,0.07)", ink: "#F1ECE0", inkSoft: "#9FACA3",
      line: "rgba(241,236,224,0.13)", petrol: "#7FB7A8", amber: "#E2A94E",
      jade: "#5FB89B", clay: "#E08562", slate: "#9DB0C2",
      heroGrad: "radial-gradient(120% 90% at 80% -10%, rgba(226,169,78,0.16), transparent 55%), radial-gradient(90% 80% at 0% 0%, rgba(127,183,168,0.12), transparent 50%)",
    }
  : {
      bg: "#F7F2E8", bgAlt: "#F0E9DA", glass: "rgba(255,255,255,0.55)",
      glassStrong: "rgba(255,255,255,0.78)", ink: "#1C1714", inkSoft: "#5E564A",
      line: "rgba(28,23,20,0.12)", petrol: "#13403B", amber: "#A86A1E",
      jade: "#2F6F5E", clay: "#A6492A", slate: "#445567",
      heroGrad: "radial-gradient(120% 90% at 82% -10%, rgba(168,106,30,0.14), transparent 55%), radial-gradient(90% 80% at -5% 0%, rgba(19,64,59,0.10), transparent 52%)",
    };

const accentOf = (t, key) => ({ amber: t.amber, jade: t.jade, clay: t.clay, slate: t.slate, petrol: t.petrol }[key] || t.amber);

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
@keyframes kl-rise { from { opacity:0; transform: translateY(22px); } to { opacity:1; transform:none; } }
@keyframes kl-fade { from { opacity:0; } to { opacity:1; } }
@keyframes kl-bob { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(7px);} }
.kl-reveal { opacity:0; }
.kl-reveal.kl-in { animation: kl-rise .7s cubic-bezier(.22,.7,.25,1) forwards; }
@media (prefers-reduced-motion: reduce){
  .kl-reveal { opacity:1 !important; animation:none !important; }
  .kl-bob { animation:none !important; }
}
.kl-scroll::-webkit-scrollbar { height:6px; width:6px; }
.kl-scroll::-webkit-scrollbar-thumb { background: rgba(150,150,150,.4); border-radius:6px; }
`;

const display = { fontFamily: "'Fraunces', Georgia, serif" };
const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };
const body = { fontFamily: "'Inter', system-ui, sans-serif" };

/* ============================================================================
   HOOKS
   ========================================================================== */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("kl-in"), io.unobserve(e.target))),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    el.querySelectorAll(".kl-reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  });
  return ref;
}

function useCountUp(target, run, dur = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, dur]);
  return v;
}

/* ============================================================================
   SMALL COMPONENTS
   ========================================================================== */
const Eyebrow = ({ children, t, color }) => (
  <div style={{ ...mono, color: color || t.amber, letterSpacing: ".18em", fontSize: 11, textTransform: "uppercase", fontWeight: 600 }}>
    {children}
  </div>
);

function Counter({ value, prefix = "", suffix = "", t }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (setRun(true), io.disconnect())), { threshold: 0.5 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const v = useCountUp(value, run);
  const dec = value % 1 !== 0;
  return (
    <span ref={ref} style={{ ...display, color: t.ink }}>
      {prefix}{dec ? v.toFixed(1) : Math.round(v)}{suffix}
    </span>
  );
}

function ChartFrame({ title, t, children, note }) {
  return (
    <div className="kl-reveal" style={{ background: t.glass, border: `1px solid ${t.line}`, borderRadius: 18, padding: "20px 16px 12px", backdropFilter: "blur(10px)" }}>
      <div style={{ ...mono, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.inkSoft, marginBottom: 14, paddingLeft: 6 }}>{title}</div>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
      {note && <div style={{ ...mono, fontSize: 10.5, color: t.inkSoft, marginTop: 8, paddingLeft: 6 }}>{note}</div>}
    </div>
  );
}

const ChartTip = (t) => ({ active, payload, label }) =>
  active && payload && payload.length ? (
    <div style={{ ...mono, background: t.bg, border: `1px solid ${t.line}`, borderRadius: 10, padding: "8px 11px", fontSize: 11.5, color: t.ink, boxShadow: "0 8px 24px rgba(0,0,0,.18)" }}>
      <div style={{ color: t.inkSoft, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: {p.value}</div>
      ))}
    </div>
  ) : null;

/* ============================================================================
   NAV  +  PROGRESS
   ========================================================================== */
const NAV = [
  { id: "summary", label: "Summary" },
  { id: "pillars", label: "Pillars" },
  { id: "timeline", label: "Timeline" },
  { id: "themes", label: "Themes" },
  { id: "dashboard", label: "Data" },
  { id: "references", label: "References" },
];

function Nav({ t, dark, setDark, active, onSearch }) {
  const [open, setOpen] = useState(false);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div style={{ background: t.glassStrong, borderBottom: `1px solid ${t.line}`, backdropFilter: "blur(14px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "12px 18px", display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => go("top")} style={{ ...display, fontWeight: 600, fontSize: 17, color: t.ink, background: "none", border: "none", cursor: "pointer", letterSpacing: "-.01em", whiteSpace: "nowrap" }}>
            Kalaignar<span style={{ color: t.amber }}> · </span><span style={{ ...mono, fontSize: 11, letterSpacing: ".12em", color: t.inkSoft, textTransform: "uppercase" }}>Legacy</span>
          </button>
          <nav className="kl-desk" style={{ display: "none", gap: 4, marginLeft: 8 }}>
            {NAV.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} style={{
                ...mono, fontSize: 12, letterSpacing: ".04em", padding: "6px 11px", borderRadius: 9, cursor: "pointer",
                background: active === n.id ? t.glass : "transparent", color: active === n.id ? t.ink : t.inkSoft,
                border: `1px solid ${active === n.id ? t.line : "transparent"}`, textTransform: "uppercase",
              }}>{n.label}</button>
            ))}
          </nav>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={onSearch} aria-label="Search" style={iconBtn(t)}><Search size={17} /></button>
            <button onClick={() => setDark((d) => !d)} aria-label="Toggle theme" style={iconBtn(t)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
            <button className="kl-mob" onClick={() => setOpen((o) => !o)} aria-label="Menu" style={{ ...iconBtn(t), display: "flex" }}>{open ? <X size={17} /> : <Menu size={17} />}</button>
          </div>
        </div>
        {open && (
          <div className="kl-mob" style={{ borderTop: `1px solid ${t.line}`, padding: "8px 14px 14px", display: "grid", gap: 4 }}>
            {NAV.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} style={{ ...mono, textAlign: "left", fontSize: 13, padding: "10px 12px", borderRadius: 10, background: active === n.id ? t.glass : "transparent", color: active === n.id ? t.ink : t.inkSoft, border: "none", cursor: "pointer" }}>{n.label}</button>
            ))}
          </div>
        )}
      </div>
      <style>{`@media(min-width:880px){.kl-desk{display:flex !important;} .kl-mob{display:none !important;}}`}</style>
    </header>
  );
}

const iconBtn = (t) => ({
  width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
  background: t.glass, border: `1px solid ${t.line}`, color: t.ink, cursor: "pointer",
});

function Progress({ t }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => { const h = document.documentElement; setP((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 || 0); };
    window.addEventListener("scroll", on, { passive: true }); on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div style={{ position: "fixed", top: 0, left: 0, height: 3, width: `${p}%`, background: `linear-gradient(90deg, ${t.amber}, ${t.jade})`, zIndex: 60, transition: "width .1s" }} />;
}

/* ============================================================================
   SEARCH OVERLAY
   ========================================================================== */
function SearchOverlay({ t, open, onClose }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 60); }, [open]);
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);
  const results = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return SECTIONS.filter((x) => (x.title + x.narrative + x.details + x.cat + x.initiatives.join(" ")).toLowerCase().includes(s)).slice(0, 8);
  }, [q]);
  if (!open) return null;
  const go = (id) => { onClose(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 70, background: "rgba(0,0,0,.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "16vh 16px 0" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 620, background: t.bg, border: `1px solid ${t.line}`, borderRadius: 18, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,.4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px", borderBottom: `1px solid ${t.line}` }}>
          <Search size={18} color={t.inkSoft} />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search themes, schemes, figures…"
            style={{ ...body, flex: 1, background: "none", border: "none", outline: "none", color: t.ink, fontSize: 16 }} />
          <button onClick={onClose} style={iconBtn(t)}><X size={16} /></button>
        </div>
        <div className="kl-scroll" style={{ maxHeight: "46vh", overflowY: "auto" }}>
          {q && results.length === 0 && <div style={{ ...mono, padding: 22, color: t.inkSoft, fontSize: 13 }}>No matches. Try “reservation”, “metro”, “solar”, “women”.</div>}
          {results.map((r) => (
            <button key={r.id} onClick={() => go(r.id)} style={{ width: "100%", textAlign: "left", padding: "13px 18px", background: "none", border: "none", borderBottom: `1px solid ${t.line}`, cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}>
              <r.icon size={18} color={t.amber} style={{ flexShrink: 0 }} />
              <span style={{ minWidth: 0 }}>
                <span style={{ ...body, display: "block", color: t.ink, fontWeight: 600, fontSize: 14 }}>{r.title}</span>
                <span style={{ ...mono, fontSize: 11, color: t.inkSoft }}>{r.cat} · {r.lead}</span>
              </span>
              <ArrowRight size={15} color={t.inkSoft} style={{ marginLeft: "auto", flexShrink: 0 }} />
            </button>
          ))}
          {!q && <div style={{ ...mono, padding: 22, color: t.inkSoft, fontSize: 12.5, letterSpacing: ".03em" }}>Type to search across {SECTIONS.length} themes and their measured outcomes.</div>}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SECTIONS
   ========================================================================== */
function Hero({ t }) {
  return (
    <section id="top" style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", overflow: "hidden", background: t.heroGrad }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "120px 22px 90px", width: "100%" }}>
        <div className="kl-reveal kl-in" style={{ marginBottom: 22 }}>
          <Eyebrow t={t}>{PAPER.journal} · {PAPER.publication}</Eyebrow>
        </div>
        <h1 className="kl-reveal kl-in" style={{ ...display, color: t.ink, fontWeight: 600, lineHeight: 1.02, letterSpacing: "-.02em", margin: 0, fontSize: "clamp(2.7rem, 8vw, 5.6rem)", animationDelay: ".05s" }}>
          Kalaignar M.<br />Karunanidhi’s <span style={{ fontStyle: "italic", color: t.amber }}>Legacy</span>
        </h1>
        <p className="kl-reveal kl-in" style={{ ...body, color: t.inkSoft, fontSize: "clamp(1.05rem, 2.4vw, 1.45rem)", maxWidth: 640, marginTop: 22, lineHeight: 1.5, animationDelay: ".12s" }}>
          A holistic socio-economic transformation of Tamil Nadu through inclusive development, social justice and sustainable governance — read in ten minutes, not eighty pages.
        </p>
        <div className="kl-reveal kl-in" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34, animationDelay: ".2s" }}>
          <button onClick={() => document.getElementById("summary")?.scrollIntoView({ behavior: "smooth" })}
            style={{ ...mono, fontSize: 13, letterSpacing: ".05em", textTransform: "uppercase", padding: "14px 24px", borderRadius: 12, background: t.ink, color: t.bg, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 9 }}>
            Explore the Legacy <ArrowRight size={16} />
          </button>
          <button onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
            style={{ ...mono, fontSize: 13, letterSpacing: ".05em", textTransform: "uppercase", padding: "14px 24px", borderRadius: 12, background: "transparent", color: t.ink, border: `1px solid ${t.line}`, cursor: "pointer" }}>
            See the data
          </button>
        </div>

        <div className="kl-reveal kl-in" style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 0, borderTop: `1px solid ${t.line}`, animationDelay: ".28s" }}>
          {HEADLINE_FIGURES.map((f, i) => (
            <div key={i} style={{ padding: "22px 18px 4px", borderRight: i < HEADLINE_FIGURES.length - 1 ? `1px solid ${t.line}` : "none" }} className="kl-figcell">
              <div style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.7rem)", fontWeight: 600, lineHeight: 1 }}>
                <Counter value={f.value} prefix={f.prefix || ""} suffix={f.suffix || ""} t={t} />
              </div>
              <div style={{ ...body, color: t.ink, fontSize: 14, fontWeight: 600, marginTop: 12 }}>{f.label}</div>
              <div style={{ ...mono, color: t.inkSoft, fontSize: 11, marginTop: 4 }}>{f.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="kl-bob" style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", color: t.inkSoft, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, animation: "kl-bob 2.2s ease-in-out infinite" }}>
        <span style={{ ...mono, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase" }}>Scroll</span>
        <ChevronDown size={18} />
      </div>
      <style>{`@media(max-width:560px){.kl-figcell{border-right:none !important; border-bottom:1px solid ${t.line};}}`}</style>
    </section>
  );
}

function SectionHead({ t, no, eyebrow, title, intro }) {
  return (
    <div className="kl-reveal" style={{ maxWidth: 760, marginBottom: 44 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <span style={{ ...mono, fontSize: 12, color: t.amber, letterSpacing: ".1em" }}>{no}</span>
        <span style={{ height: 1, width: 40, background: t.line }} />
        <Eyebrow t={t}>{eyebrow}</Eyebrow>
      </div>
      <h2 style={{ ...display, color: t.ink, fontWeight: 600, letterSpacing: "-.015em", lineHeight: 1.08, margin: 0, fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>{title}</h2>
      {intro && <p style={{ ...body, color: t.inkSoft, fontSize: "clamp(1rem, 2vw, 1.18rem)", lineHeight: 1.55, marginTop: 18 }}>{intro}</p>}
    </div>
  );
}

const wrap = { maxWidth: 1180, margin: "0 auto", padding: "0 22px" };
const sectionPad = { padding: "clamp(70px, 11vw, 130px) 0" };

function Summary({ t }) {
  const ref = useReveal();
  return (
    <section id="summary" ref={ref} style={sectionPad}>
      <div style={wrap}>
        <SectionHead t={t} no="01" eyebrow="Executive Summary"
          title="One leader, a state remade"
          intro="The abstract of an eighty-page study, told in eight ideas. Each combined welfare with growth — the defining logic of the Dravidian model." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(248px, 1fr))", gap: 16 }}>
          {SUMMARY.map((c, i) => (
            <div key={i} className="kl-reveal" style={{ background: t.glass, border: `1px solid ${t.line}`, borderRadius: 18, padding: 24, backdropFilter: "blur(10px)", animationDelay: `${i * 0.04}s` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: t.glassStrong, border: `1px solid ${t.line}`, color: t.amber, marginBottom: 16 }}>
                <c.icon size={21} />
              </div>
              <h3 style={{ ...display, color: t.ink, fontSize: 19, fontWeight: 600, margin: 0, lineHeight: 1.2 }}>{c.title}</h3>
              <p style={{ ...body, color: t.inkSoft, fontSize: 14.5, lineHeight: 1.55, marginTop: 10 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars({ t }) {
  const ref = useReveal();
  const [open, setOpen] = useState(null);
  return (
    <section id="pillars" ref={ref} style={{ ...sectionPad, background: t.bgAlt }}>
      <div style={wrap}>
        <SectionHead t={t} no="02" eyebrow="Legacy Overview"
          title="Twenty-four pillars of one vision"
          intro="Karunanidhi’s architecture of transformation spanned every domain of public life. Tap any pillar to see its measured outcome." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(112px, 1fr))", gap: 10 }}>
          {PILLARS.map((p, i) => {
            const match = SECTIONS.find((s) => s.title.toLowerCase().includes(p.label.toLowerCase().split(" ")[0]) || s.id === p.label.toLowerCase());
            const acc = accentOf(t, p.color);
            const isOpen = open === i;
            return (
              <button key={i} onClick={() => setOpen(isOpen ? null : i)} className="kl-reveal"
                style={{ background: isOpen ? t.glassStrong : t.glass, border: `1px solid ${isOpen ? acc : t.line}`, borderRadius: 14, padding: "16px 10px", cursor: "pointer", textAlign: "center", transition: "all .25s", animationDelay: `${i * 0.012}s`, color: t.ink }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 9, color: acc }}><p.icon size={22} /></div>
                <div style={{ ...mono, fontSize: 11, fontWeight: 500, letterSpacing: ".01em", lineHeight: 1.25, color: t.ink }}>{p.label}</div>
                {isOpen && match && (
                  <div style={{ ...body, fontSize: 11.5, color: t.inkSoft, marginTop: 9, lineHeight: 1.4, animation: "kl-fade .3s" }}>{match.lead}</div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Timeline({ t }) {
  const ref = useReveal();
  return (
    <section id="timeline" ref={ref} style={sectionPad}>
      <div style={wrap}>
        <SectionHead t={t} no="03" eyebrow="Reforms Timeline"
          title="A measured arc, 1969 – 2011"
          intro="The milestones that compounded into transformation — each a policy decision with a number attached." />
        <div style={{ position: "relative", paddingLeft: 4 }}>
          <div style={{ position: "absolute", left: 9, top: 8, bottom: 8, width: 2, background: `linear-gradient(${t.amber}, ${t.line})` }} />
          {TIMELINE.map((m, i) => (
            <div key={i} className="kl-reveal" style={{ position: "relative", paddingLeft: 38, paddingBottom: i === TIMELINE.length - 1 ? 0 : 34 }}>
              <div style={{ position: "absolute", left: 0, top: 4, width: 20, height: 20, borderRadius: "50%", background: t.bg, border: `2px solid ${t.amber}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.amber }} />
              </div>
              <div style={{ background: t.glass, border: `1px solid ${t.line}`, borderRadius: 16, padding: "18px 20px", backdropFilter: "blur(8px)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ ...display, fontSize: 26, fontWeight: 600, color: t.amber }}>{m.year}</span>
                  <span style={{ ...display, fontSize: 19, fontWeight: 600, color: t.ink }}>{m.title}</span>
                </div>
                <p style={{ ...body, color: t.inkSoft, fontSize: 14.5, lineHeight: 1.55, margin: "10px 0 0" }}>{m.text}</p>
                <div style={{ ...mono, fontSize: 11.5, color: t.jade, marginTop: 12, letterSpacing: ".03em", display: "inline-flex", alignItems: "center", gap: 7, background: t.glassStrong, border: `1px solid ${t.line}`, padding: "5px 10px", borderRadius: 8 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.jade }} />{m.stat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ThemeCard({ t, s, expanded, onToggle }) {
  const acc = t.amber;
  return (
    <div id={s.id} className="kl-reveal" style={{ background: t.glass, border: `1px solid ${expanded ? acc : t.line}`, borderRadius: 18, overflow: "hidden", backdropFilter: "blur(10px)", scrollMarginTop: 90, transition: "border-color .3s" }}>
      <button onClick={onToggle} style={{ width: "100%", textAlign: "left", padding: 22, background: "none", border: "none", cursor: "pointer", display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ width: 46, height: 46, borderRadius: 13, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: t.glassStrong, border: `1px solid ${t.line}`, color: acc }}>
          <s.icon size={22} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...mono, fontSize: 11, color: t.jade, letterSpacing: ".05em", marginBottom: 6 }}>{s.lead}</div>
          <h3 style={{ ...display, color: t.ink, fontSize: 21, fontWeight: 600, margin: 0, lineHeight: 1.18 }}>{s.title}</h3>
          <p style={{ ...body, color: t.inkSoft, fontSize: 14.5, lineHeight: 1.55, margin: "10px 0 0" }}>{s.narrative}</p>
        </div>
        <ChevronDown size={20} color={t.inkSoft} style={{ flexShrink: 0, transform: expanded ? "rotate(180deg)" : "none", transition: "transform .3s", marginTop: 4 }} />
      </button>
      {expanded && (
        <div style={{ padding: "0 22px 24px", animation: "kl-fade .35s" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 18 }}>
            {s.stats.map((st, i) => (
              <div key={i} style={{ background: t.glassStrong, border: `1px solid ${t.line}`, borderRadius: 12, padding: "14px 14px" }}>
                <div style={{ ...display, fontSize: 21, fontWeight: 600, color: t.ink, lineHeight: 1 }}>{st.value}</div>
                <div style={{ ...body, fontSize: 12.5, color: t.ink, fontWeight: 600, marginTop: 8 }}>{st.label}</div>
                <div style={{ ...mono, fontSize: 10.5, color: t.inkSoft, marginTop: 3 }}>{st.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gap: 18, gridTemplateColumns: "1fr", marginBottom: 16 }}>
            <div>
              <div style={{ ...mono, fontSize: 10.5, letterSpacing: ".15em", textTransform: "uppercase", color: t.amber, marginBottom: 10 }}>Key initiatives</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.initiatives.map((x, i) => (
                  <span key={i} style={{ ...body, fontSize: 12.5, color: t.ink, background: t.glassStrong, border: `1px solid ${t.line}`, borderRadius: 20, padding: "6px 13px" }}>{x}</span>
                ))}
              </div>
            </div>
          </div>
          <p style={{ ...body, fontSize: 14.5, color: t.inkSoft, lineHeight: 1.6, margin: 0, paddingTop: 16, borderTop: `1px solid ${t.line}` }}>{s.details}</p>
          <div style={{ ...mono, fontSize: 10.5, color: t.inkSoft, marginTop: 14, display: "flex", alignItems: "center", gap: 7 }}>
            <Quote size={12} /> Source — {s.source}
          </div>
        </div>
      )}
    </div>
  );
}

function Themes({ t }) {
  const ref = useReveal();
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(SECTIONS[0].id);
  const shown = filter === "All" ? SECTIONS : SECTIONS.filter((s) => s.cat === filter);
  return (
    <section id="themes" ref={ref} style={{ ...sectionPad, background: t.bgAlt }}>
      <div style={wrap}>
        <SectionHead t={t} no="04" eyebrow="Thematic Sections"
          title="Every sector, with the evidence"
          intro="The full study, organised by domain. Filter by category, then open any theme for its initiatives, statistics and source." />
        <div className="kl-reveal kl-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 22 }}>
          {["All", ...CATS].map((c) => (
            <button key={c} onClick={() => setFilter(c)} style={{
              ...mono, fontSize: 12, letterSpacing: ".03em", padding: "8px 15px", borderRadius: 20, whiteSpace: "nowrap", cursor: "pointer",
              background: filter === c ? t.ink : t.glass, color: filter === c ? t.bg : t.inkSoft, border: `1px solid ${filter === c ? t.ink : t.line}`,
            }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          {shown.map((s) => (
            <ThemeCard key={s.id} t={t} s={s} expanded={expanded === s.id} onToggle={() => setExpanded(expanded === s.id ? null : s.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Dashboard({ t }) {
  const ref = useReveal();
  const tip = ChartTip(t);
  const grid = t.line;
  const axis = { fill: t.inkSoft, fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" };
  return (
    <section id="dashboard" ref={ref} style={sectionPad}>
      <div style={wrap}>
        <SectionHead t={t} no="05" eyebrow="Statistics Dashboard"
          title="The numbers behind the model"
          intro="Thirty-four data tables from the paper, rendered as the story they tell — transformation you can read at a glance." />

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <ChartFrame t={t} title="Industrial growth — factories" note="Factories grew ~6× from the 1960s to 2010.">
            <BarChart data={CHARTS.industry} margin={{ top: 6, right: 10, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
              <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} />
              <Tooltip content={tip} cursor={{ fill: t.glass }} />
              <Bar dataKey="Factories" radius={[6, 6, 0, 0]} fill={t.amber} barSize={54} />
            </BarChart>
          </ChartFrame>

          <ChartFrame t={t} title="Industrial employment (lakh workers)" note="From ~3.8 lakh to over 12 lakh workers.">
            <LineChart data={CHARTS.industry} margin={{ top: 6, right: 14, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
              <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} />
              <Tooltip content={tip} />
              <Line type="monotone" dataKey="Employment" stroke={t.jade} strokeWidth={3} dot={{ r: 5, fill: t.jade }} />
            </LineChart>
          </ChartFrame>

          <ChartFrame t={t} title="Energy transition — 2017–18 vs 2024–25" note="Renewable share rose to 58.6%; solar grew ~6,000%.">
            <BarChart data={CHARTS.energy} margin={{ top: 6, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
              <XAxis dataKey="name" tick={{ ...axis, fontSize: 9.5 }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={axis} axisLine={false} tickLine={false} />
              <Tooltip content={tip} cursor={{ fill: t.glass }} />
              <Legend wrapperStyle={{ ...mono, fontSize: 11, color: t.inkSoft }} />
              <Bar dataKey="2017–18" radius={[4, 4, 0, 0]} fill={t.slate} barSize={16} />
              <Bar dataKey="2024–25" radius={[4, 4, 0, 0]} fill={t.jade} barSize={16} />
            </BarChart>
          </ChartFrame>

          <ChartFrame t={t} title="Tourism revenue (₹ crore)" note="Five-fold rise, with ₹700 cr projected for 2025–26.">
            <AreaChart data={CHARTS.tourism} margin={{ top: 6, right: 14, left: -6, bottom: 0 }}>
              <defs>
                <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={t.amber} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={t.amber} stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
              <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} />
              <Tooltip content={tip} />
              <Area type="monotone" dataKey="Revenue" stroke={t.amber} strokeWidth={2.5} fill="url(#tg)" />
            </AreaChart>
          </ChartFrame>

          <ChartFrame t={t} title="Literacy rate (%)" note="Overall and female literacy, 1991 → 2011.">
            <LineChart data={CHARTS.literacy} margin={{ top: 6, right: 14, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
              <XAxis dataKey="year" tick={axis} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 90]} tick={axis} axisLine={false} tickLine={false} />
              <Tooltip content={tip} />
              <Legend wrapperStyle={{ ...mono, fontSize: 11 }} />
              <Line type="monotone" dataKey="Overall" stroke={t.petrol} strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Female" stroke={t.clay} strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ChartFrame>

          <ChartFrame t={t} title="Poverty ratio (%)" note="From ~32–35% to ~11–12% by 2011–12.">
            <AreaChart data={CHARTS.poverty} margin={{ top: 6, right: 14, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={t.clay} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={t.clay} stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
              <XAxis dataKey="year" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} />
              <Tooltip content={tip} />
              <Area type="monotone" dataKey="rate" name="Poverty %" stroke={t.clay} strokeWidth={2.5} fill="url(#pg)" />
            </AreaChart>
          </ChartFrame>

          <ChartFrame t={t} title="Social welfare reach (lakh beneficiaries)" note="Coverage of key welfare schemes.">
            <BarChart layout="vertical" data={CHARTS.welfare} margin={{ top: 0, right: 16, left: 6, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={grid} horizontal={false} />
              <XAxis type="number" tick={axis} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ ...axis, fontSize: 10 }} width={108} axisLine={false} tickLine={false} />
              <Tooltip content={tip} cursor={{ fill: t.glass }} />
              <Bar dataKey="value" name="Lakh" radius={[0, 6, 6, 0]} barSize={18}>
                {CHARTS.welfare.map((e, i) => <Cell key={i} fill={[t.amber, t.jade, t.clay, t.slate][i]} />)}
              </Bar>
            </BarChart>
          </ChartFrame>

          <div className="kl-reveal" style={{ background: `linear-gradient(135deg, ${t.glassStrong}, ${t.glass})`, border: `1px solid ${t.line}`, borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Eyebrow t={t} color={t.jade}>Headline outcome</Eyebrow>
            <div style={{ ...display, fontSize: "clamp(2.4rem,7vw,3.4rem)", fontWeight: 600, color: t.ink, lineHeight: 1, marginTop: 14 }}>
              <Counter value={9} suffix="%" t={t} />
            </div>
            <p style={{ ...body, color: t.inkSoft, fontSize: 14.5, lineHeight: 1.55, marginTop: 12 }}>
              of India’s GDP from one state — while keeping over 40% of the budget on education, health and welfare. The Dravidian model’s proof that equity and growth reinforce each other.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function References({ t }) {
  const ref = useReveal();
  return (
    <section id="references" ref={ref} style={{ ...sectionPad, background: t.bgAlt }}>
      <div style={wrap}>
        <SectionHead t={t} no="06" eyebrow="References"
          title="Grounded in the record"
          intro="The study draws on 37 sources — government reports, census data and peer-reviewed scholarship. A representative selection:" />
        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {REFERENCES.map((r) => (
            <div key={r.n} className="kl-reveal" style={{ display: "flex", gap: 14, background: t.glass, border: `1px solid ${t.line}`, borderRadius: 14, padding: "16px 18px" }}>
              <span style={{ ...mono, fontSize: 13, color: t.amber, fontWeight: 600, flexShrink: 0 }}>{String(r.n).padStart(2, "0")}</span>
              <span style={{ ...body, fontSize: 13.5, color: t.inkSoft, lineHeight: 1.5 }}>{r.t}</span>
            </div>
          ))}
        </div>
        <p style={{ ...mono, fontSize: 11.5, color: t.inkSoft, marginTop: 22, lineHeight: 1.6 }}>
          Full bibliography of 37 references in the source paper. All figures on this page are drawn directly from the study; none are independently verified or added.
        </p>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer style={{ borderTop: `1px solid ${t.line}`, background: t.bg }}>
      <div style={{ ...wrap, padding: "54px 22px 40px" }}>
        <div style={{ display: "grid", gap: 28, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", alignItems: "start" }}>
          <div>
            <div style={{ ...display, fontSize: 22, fontWeight: 600, color: t.ink, lineHeight: 1.1 }}>Kalaignar M.<br />Karunanidhi’s Legacy</div>
            <p style={{ ...body, fontSize: 13.5, color: t.inkSoft, marginTop: 14, lineHeight: 1.55, maxWidth: 320 }}>
              An interactive reading of a peer-reviewed assessment of Tamil Nadu’s socio-economic transformation.
            </p>
          </div>
          <div>
            <Eyebrow t={t}>Author</Eyebrow>
            <p style={{ ...body, fontSize: 14, color: t.ink, marginTop: 10, lineHeight: 1.5 }}>{PAPER.author}</p>
            <p style={{ ...body, fontSize: 12.5, color: t.inkSoft, marginTop: 4, lineHeight: 1.5 }}>{PAPER.affiliation}</p>
          </div>
          <div>
            <Eyebrow t={t}>Publication</Eyebrow>
            <p style={{ ...body, fontSize: 14, color: t.ink, marginTop: 10, lineHeight: 1.5 }}>{PAPER.journal}</p>
            <p style={{ ...mono, fontSize: 11.5, color: t.inkSoft, marginTop: 6, lineHeight: 1.6 }}>{PAPER.publication}</p>
            <p style={{ ...mono, fontSize: 11.5, color: t.inkSoft, marginTop: 2 }}>ISSN 1933-3471 · 1933-3412</p>
          </div>
        </div>
        <div style={{ marginTop: 34, paddingTop: 22, borderTop: `1px solid ${t.line}`, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ ...mono, fontSize: 11, color: t.inkSoft }}>© GJIBR 2026 · Content from the source study · Interactive report for educational use.</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); document.getElementById("top")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ ...mono, fontSize: 11.5, letterSpacing: ".06em", textTransform: "uppercase", color: t.ink, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${t.line}`, padding: "9px 16px", borderRadius: 10 }}>
            <ArrowDownToLine size={14} style={{ transform: "rotate(180deg)" }} /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}

function BackToTop({ t }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
      style={{ position: "fixed", bottom: 22, right: 22, zIndex: 55, width: 46, height: 46, borderRadius: 14, background: t.ink, color: t.bg, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px rgba(0,0,0,.25)", animation: "kl-fade .3s" }}>
      <ArrowUp size={20} />
    </button>
  );
}

/* ============================================================================
   APP
   ========================================================================== */
export default function App() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("summary");
  const [searchOpen, setSearchOpen] = useState(false);
  const t = palette(dark);

  useEffect(() => {
    const ids = ["top", ...NAV.map((n) => n.id)];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting && e.target.id !== "top") setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ ...body, background: t.bg, color: t.ink, minHeight: "100vh", transition: "background .4s, color .4s", overflowX: "hidden" }}>
      <style>{FONT_CSS}</style>
      <Progress t={t} />
      <Nav t={t} dark={dark} setDark={setDark} active={active} onSearch={() => setSearchOpen(true)} />
      <SearchOverlay t={t} open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main>
        <Hero t={t} />
        <Summary t={t} />
        <Pillars t={t} />
        <Timeline t={t} />
        <Themes t={t} />
        <Dashboard t={t} />
        <References t={t} />
      </main>
      <Footer t={t} />
      <BackToTop t={t} />
    </div>
  );
}
