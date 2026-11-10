import type { LucideIcon } from 'lucide-react';
import { Briefcase, Compass, Handshake, Heart, Scale, Smile, TrendingUp } from 'lucide-react';

/*
 * Photos: AI-generated with Higgsfield (gpt_image_2_6), stored as original PNGs in /public/images.
 * See README → Assets.
 */
const person = (name: string) => `/images/people/${name}.png`;
const scene = (name: string) => `/images/scenes/${name}.png`;

/** Every nav target stays on this page for now. Swap for real routes when those pages exist. */
export const ROUTES = {
  home: '#top',
  events: '#events',
  how: '#how',
  upcoming: '#upcoming',
  about: '#about',
  stories: '#stories',
  contact: '#contact',
  login: '#join',
  getStarted: '#join',
};

export const NAV_LINKS = [
  { href: ROUTES.home, label: 'Home', id: 'top' },
  { href: ROUTES.events, label: 'Events', id: 'events' },
  { href: ROUTES.about, label: 'About Us', id: 'about' },
  { href: ROUTES.contact, label: 'Contact Us', id: 'contact' },
];

export const MARQUEE = [
  'Meet founders',
  'Find your next hire',
  'Pitch real investors',
  'Make real friends',
  'Find a mentor',
  'Fall for someone',
  'Expand your circle',
  'Say yes',
  'It’s a match',
  'Seven minutes',
];

export type Person = { name: string; role: string; img: string };

export const PEOPLE: Record<string, Person> = {
  amara: { name: 'Amara J.', role: 'Engineering Lead', img: person('amara') },
  daniel: { name: 'Daniel K.', role: 'Founder, Fintech', img: person('daniel') },
  priya: { name: 'Priya R.', role: 'Product Manager', img: person('priya') },
  zoe: { name: 'Zoe T.', role: 'Physician', img: person('zoe') },
  arjun: { name: 'Arjun S.', role: 'Data Scientist', img: person('arjun') },
  maya: { name: 'Maya C.', role: 'Designer', img: person('maya') },
  kenji: { name: 'Kenji W.', role: 'Architect', img: person('kenji') },
  elena: { name: 'Elena V.', role: 'Seed Investor', img: person('elena') },
  noah: { name: 'Noah B.', role: 'Software Engineer', img: person('noah') },
  marcus: { name: 'Marcus O.', role: 'Corporate Attorney', img: person('marcus') },
  sofia: { name: 'Sofia M.', role: 'Brand Director', img: person('sofia') },
  richard: { name: 'Richard H.', role: 'Angel Investor', img: person('richard') },
  helen: { name: 'Helen D.', role: 'Executive Coach', img: person('helen') },
  lena: { name: 'Lena O.', role: 'Founder, Studio', img: person('lena') },
};

export type ExploreCategory = {
  id: string;
  name: string;
  tagline: string;
  body: string;
  sides: [string, string];
  icon: LucideIcon;
  color: string;
  tint: string;
  img: string;
  tags: string[];
  next: string;
};

export const EXPLORE: ExploreCategory[] = [
  { id: 'business', name: 'Business', tagline: 'Partners, clients & collaborators', body: 'Meet founders, operators and buyers who came to do business.', sides: ['Founders', 'Partners & clients'], icon: Handshake, color: '#009fd8', tint: '#f0f9fd', img: scene('business'), tags: ['Agencies', 'SaaS', 'Real estate'], next: 'Tue · Flatiron' },
  { id: 'careers', name: 'Careers', tagline: 'Speed interviews', body: 'Eight interviews with hiring managers who are hiring right now.', sides: ['Candidates', 'Hiring teams'], icon: Briefcase, color: '#6a4fd8', tint: '#f0edfc', img: scene('careers'), tags: ['Tech', 'Finance', 'Healthcare'], next: 'Wed · Online' },
  { id: 'investors', name: 'Investors', tagline: 'Founders × capital', body: 'Pitch angels and funds matched to your stage and sector.', sides: ['Founders', 'Angels & VCs'], icon: TrendingUp, color: '#c97d08', tint: '#fff5e0', img: scene('investors'), tags: ['Pre-seed', 'Seed', 'Series A'], next: 'Tue · Flatiron' },
  { id: 'mentorship', name: 'Mentorship', tagline: 'Learn from people ahead of you', body: 'Rotate through seasoned operators. Keep the one who gets you.', sides: ['Mentees', 'Mentors'], icon: Compass, color: '#129b6f', tint: '#e8f7f0', img: scene('mentorship'), tags: ['Women in finance', 'First-time founders'], next: 'Wed · Midtown' },
  { id: 'friendship', name: 'Friendship', tagline: 'Find your people', body: 'Seven-minute hellos that turn into brunch plans.', sides: ['New friends', 'New friends'], icon: Smile, color: '#e0662a', tint: '#fff1ea', img: scene('friendship'), tags: ['New in town', '20s & 30s', 'Run clubs'], next: 'Fri · Hoboken' },
  { id: 'dating', name: 'Dating', tagline: 'Chemistry you can’t swipe for', body: 'Verified singles, balanced rooms, venues worth dressing up for.', sides: ['Singles', 'Singles'], icon: Heart, color: '#d6336c', tint: '#fde7f0', img: scene('dating'), tags: ['20s & 30s', '40s & 50s', 'LGBTQ+'], next: 'Thu · Woodbridge' },
  { id: 'professionals', name: 'Professionals', tagline: 'Lawyers, doctors, coaches & more', body: 'Meet lawyers, doctors and coaches before you need one.', sides: ['Guests', 'Professionals'], icon: Scale, color: '#6b2a63', tint: '#f7ecf5', img: scene('professionals'), tags: ['Lawyers', 'Doctors', 'Therapists'], next: 'Mon · Online' },
];

/** Official logos (Wikimedia Commons), one per company. `h` balances optical size across very different marks. */
export const COMPANIES: { name: string; logo: string; h: number }[] = [
  { name: 'Google', logo: '/logos/google.svg', h: 30 },
  { name: 'Meta', logo: '/logos/meta.svg', h: 24 },
  { name: 'Amazon', logo: '/logos/amazon.svg', h: 28 },
  { name: 'OpenAI', logo: '/logos/openai.svg', h: 26 },
  { name: 'Microsoft', logo: '/logos/microsoft.svg', h: 26 },
  { name: 'Disney', logo: '/logos/disney.svg', h: 34 },
  { name: 'Tesla', logo: '/logos/tesla.svg', h: 40 },
  { name: 'Apple', logo: '/logos/apple.svg', h: 36 },
  { name: 'Samsung', logo: '/logos/samsung.svg', h: 18 },
  { name: 'LG', logo: '/logos/lg.svg', h: 30 },
  { name: 'P&G', logo: '/logos/pg.svg', h: 40 },
  { name: 'Netflix', logo: '/logos/netflix.svg', h: 26 },
];

export type EventItem = {
  id: string;
  category: string;
  color: string;
  title: string;
  blurb: string;
  format: 'In person' | 'Online';
  place: string;
  date: string;
  time: string;
  price: string;
  rounds: number;
  mins: number;
  seatsLeft: number;
  capacity: number;
  img: string;
};

/** Two featured rooms — sample data until the events feed is connected. */
export const UPCOMING: EventItem[] = [
  { id: 'founders-angels', category: 'Investors', color: '#c97d08', title: 'Founders × Angels', blurb: 'Pre-seed and seed founders meet active angels.', format: 'In person', place: 'Flatiron, NYC', date: '2026-11-17', time: '6:30 PM', price: '$65', rounds: 8, mins: 6, seatsLeft: 9, capacity: 32, img: scene('event-founders') },
  { id: 'interviews-tech', category: 'Careers', color: '#6a4fd8', title: 'Speed Interviews: Tech', blurb: 'Eight live interviews with teams hiring now.', format: 'Online', place: 'Live video rooms', date: '2026-11-18', time: '12:00 PM ET', price: 'Free', rounds: 8, mins: 7, seatsLeft: 41, capacity: 120, img: scene('event-online') },
];

/** Illustrative stories for the prototype — replace with real member stories. */
export const STORIES = [
  { tag: 'Careers', result: 'Hired in 3 weeks', img: scene('story-careers'), person: PEOPLE.noah,
    quote: 'Forty applications into the void — then eight real interviews in one lunch hour. I had two offers within three weeks.' },
  { tag: 'Dating', result: 'Together 5 months', img: scene('story-dating'), person: PEOPLE.kenji,
    quote: 'It felt like a great dinner party, not a meat market. Seven minutes in, I knew I wanted a second date.' },
  { tag: 'Investors', result: 'Pre-seed closed', img: scene('story-founders'), person: PEOPLE.lena,
    quote: 'Six minutes, one investor, one follow-up. We closed our pre-seed eight weeks later — she’s still the first person I call.' },
  { tag: 'Friendship', result: 'A new crew', img: scene('story-friendship'), person: PEOPLE.maya,
    quote: 'I moved to Hoboken knowing nobody. One Friday night gave me a running group, a brunch crew and a best friend.' },
];

export const MINI_QUOTES = [
  { text: 'Way more efficient than any conference.', person: PEOPLE.marcus },
  { text: 'The private “yes” changes everything.', person: PEOPLE.priya },
  { text: 'We hired two engineers from one evening.', person: PEOPLE.amara },
  { text: 'Met three therapists, booked the right one.', person: PEOPLE.sofia },
  { text: 'My mentor and I matched at table six.', person: PEOPLE.arjun },
  { text: 'Best night out I’ve had in years.', person: PEOPLE.zoe },
  { text: 'Every person was someone worth meeting.', person: PEOPLE.richard },
  { text: 'Found my co-founder in round four.', person: PEOPLE.daniel },
];
