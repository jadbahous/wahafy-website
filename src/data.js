// All public-facing copy for the Marhab site lives here.
// Principle: say WHAT Marhab does and the RESULT it creates — never HOW it is built.

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

export const navCta = { label: 'Book a Demo', href: '/contact' };

/* ------------------------------------------------------------------ home */

export const hero = {
  headline: ['Every customer who reaches out,', 'answered.'],
  support: 'Websites. AI reception. Automation. One connected customer experience.',
  sub: 'We build intelligent websites and customer systems that answer enquiries, capture leads, book appointments and follow up — automatically, 24/7.',
  primaryCta: { label: 'See it in action', href: '#demo' },
  secondaryCta: { label: 'Book a free demo', href: '/contact' },
  meta: ['Premium websites', 'AI reception, 24/7', 'Built for Qatar'],
  numbers: [
    { value: 24, suffix: '/7', label: 'Answering enquiries, capturing leads and booking appointments — around the clock.' },
    { value: 100, suffix: '%', label: 'Of enquiries captured and sent to you the moment they land.' },
    { value: 2, suffix: '', label: 'Languages — Arabic and English, in the same conversation.' },
  ],
  lines: ['Answers questions.', 'Books appointments.', 'Follows up — automatically.'],
};

export const demo = {
  eyebrow: 'See it in action',
  heading: 'A customer asks at 11pm. By 11:01, they’re booked.',
  sub: 'This is what your customers experience — on your website, on WhatsApp, on Instagram. No waiting for morning, no missed message.',
  tryLabel: 'Try it yourself',
  replayLabel: 'Replay',
  business: 'Pearl & Bloom Dental',
  conversation: [
    { role: 'customer', text: 'Do you have an appointment tomorrow at 6 PM?' },
    { role: 'marhab', text: 'Yes. We have 6:00 PM and 7:30 PM available. Which would you prefer?' },
    { role: 'customer', text: '6 PM.' },
    { role: 'marhab', text: 'Perfect. What name should I book it under?' },
    { role: 'customer', text: 'Sara.' },
    { role: 'marhab', text: 'Booked — tomorrow at 6:00 PM, Sara. A confirmation is on its way to your WhatsApp.' },
  ],
  pipeline: [
    { label: 'Appointment booked', detail: 'Tomorrow · 6:00 PM' },
    { label: 'Lead captured', detail: 'Sara · new patient' },
    { label: 'Confirmation sent', detail: 'WhatsApp · just now' },
    { label: 'Reminder scheduled', detail: 'Tomorrow · 3:00 PM' },
    { label: 'Follow-up', detail: 'Review request · after visit' },
  ],
};

export const outcomes = {
  eyebrow: 'Why Marhab',
  heading: 'The customers are already there. Most businesses just don’t catch them.',
  sub: 'Enquiries arrive every day — on the website, on WhatsApp, on Instagram — and most go unanswered until it’s too late. Marhab is built to catch the customers you already have.',
  items: [
    { title: 'Never miss a lead', text: 'Respond to enquiries even when your team is unavailable.' },
    { title: 'Turn enquiries into bookings', text: 'Help customers move from a question to an appointment without unnecessary delays.' },
    { title: 'Reduce repetitive work', text: 'Handle common questions and routine interactions automatically.' },
    { title: 'Follow up automatically', text: 'Keep potential customers engaged without relying entirely on staff.' },
    { title: 'Generate more reviews', text: 'Encourage satisfied customers to share their experience after their visit.' },
    { title: 'Understand what’s happening', text: 'See conversations, leads, bookings and customer activity in one place.' },
  ],
};

export const journey = {
  eyebrow: 'The customer journey',
  heading: 'From first message to five-star review.',
  sub: 'One connected journey, handled end to end.',
  steps: ['Visitor', 'Conversation', 'Qualified lead', 'Booking', 'Reminder', 'Customer', 'Review'],
};

export const servicesPreview = {
  eyebrow: 'What we build',
  heading: 'Everything between a visitor and a booked customer.',
  cta: { label: 'Explore all services', href: '/services' },
  items: [
    { title: 'Premium websites', text: 'Digital experiences designed around conversion, credibility and customer experience.' },
    { title: 'AI reception', text: 'Instantly answer common enquiries and guide customers toward the right action.' },
    { title: 'Booking & lead systems', text: 'Turn website and customer conversations into structured leads and appointments.' },
    { title: 'Customer automation', text: 'Automate reminders, follow-ups and repetitive customer communication.' },
    { title: 'Growth & insights', text: 'Understand how visitors, conversations and bookings move through the journey.' },
  ],
};

export const processHome = {
  eyebrow: 'How it works',
  heading: 'Simple to start. Easy to live with.',
  cta: { label: 'See the full process', href: '/process' },
};

export const qatar = {
  eyebrow: 'Built for businesses in Qatar',
  heading: 'International standard. Local understanding.',
  origin: 'Marhab comes from marhaba — the first word a customer hears in Doha. We built the system so that welcome never stops at the door.',
  points: [
    { title: 'Arabic and English', text: 'Customers are answered in the language they write in — in the same conversation.' },
    { title: 'WhatsApp-first journeys', text: 'Confirmations, reminders and follow-ups arrive where your customers already are.' },
    { title: 'Local context', text: 'Hours, weekends, prayer times and the way business is actually done here.' },
    { title: 'Support in Doha', text: 'A team you can meet — not a ticket queue in another time zone.' },
  ],
};

export const finalCta = {
  heading: 'Your next customer shouldn’t have to wait.',
  sub: 'See what Marhab could do for your business.',
  primary: { label: 'Book your free demo', href: '/contact' },
  secondary: { label: 'Talk to Marhab' },
};

/* -------------------------------------------------------------- services */

export const services = {
  eyebrow: 'Services',
  heading: 'What your business receives.',
  sub: 'Not a list of deliverables — a working customer system. Every engagement is built around how your customers reach you and what should happen next.',
  categories: [
    {
      n: '01',
      title: 'Website experience',
      lead: 'A premium website designed to build credibility and turn visitors into enquiries.',
      points: ['Responsive, mobile-first design', 'Clear customer journeys', 'Service and pricing presentation', 'Enquiry capture on every page', 'Calls to action that lead somewhere', 'Fast, quiet, and easy to trust'],
    },
    {
      n: '02',
      title: 'AI reception',
      lead: 'Immediate assistance for every customer — including the ones who write at midnight.',
      points: ['Answers common questions instantly', 'Guides customers to the right service', 'Collects customer details naturally', 'Handles enquiries outside opening hours', 'Directs customers to book or get in touch', 'Arabic and English'],
    },
    {
      n: '03',
      title: 'Booking & lead capture',
      lead: 'Connect every enquiry with the next step — an appointment, a callback, a visit.',
      points: ['Appointment requests and live booking', 'Availability that reflects your real calendar', 'Every lead logged and sent to you instantly', 'Customer information collected once', 'Structured enquiry management', 'Nothing lost between channels'],
    },
    {
      n: '04',
      title: 'Follow-up automation',
      lead: 'The messages your team never has time to send — sent every time.',
      points: ['Appointment reminders', 'Lead follow-ups', 'Missed-enquiry follow-up', 'Post-visit review requests', 'Customer check-ins', 'Delivered on WhatsApp'],
    },
    {
      n: '05',
      title: 'Reporting & insights',
      lead: 'Know what is actually happening — without asking anyone.',
      points: ['Enquiries by day and channel', 'Conversations and what customers ask', 'Bookings and no-shows', 'Customer interest by service', 'Website activity', 'One clear view, updated live'],
    },
  ],
  tiersEyebrow: 'Plans',
  tiersHeading: 'Two ways to work with us.',
  tiersSub: 'Every project starts with a custom-designed website. From there, choose how much of the follow-up you want automated. Clear pricing, no surprises.',
  tiers: [
    {
      name: 'Standard',
      tagline: 'A site that captures every lead.',
      price: { setup: '12,000', monthly: '1,500' },
      monthlyCovers: 'Hosting, AI reception usage, monitoring, and monthly content updates.',
      features: [
        'Custom-designed, multi-page website',
        'AI reception trained on your business',
        'Automatic lead capture, logged and sent to you instantly',
        'Mobile-first, fast-loading build',
        'WhatsApp click-to-chat',
      ],
      cta: { label: 'Get a quote', href: '/contact' },
      highlight: false,
    },
    {
      name: 'Premium',
      tagline: 'A site that runs the follow-up for you.',
      price: { setup: '18,000', monthly: '3,500' },
      monthlyCovers: 'Everything in Standard, plus WhatsApp messaging, booking sync, the live dashboard, and priority support.',
      features: [
        'Everything in Standard',
        'Live appointment booking synced to your calendar',
        'Automated WhatsApp appointment reminders',
        'Automated review requests after every visit',
        'Live dashboard — leads, bookings, trends',
        'Priority support and monthly tune-ups',
      ],
      cta: { label: 'Get a quote', href: '/contact' },
      highlight: true,
    },
  ],
  note: 'Setup prices are starting points — the final quote depends on the size of the site and is confirmed after a free discovery call. Monthly plans run on a 12-month term; the site, reception, and hosting are provided as a service and stay live for as long as the plan is active.',
};

/* ------------------------------------------------------------------ work */

export const work = {
  eyebrow: 'Work',
  heading: 'Two businesses, two complete systems.',
  sub: 'Demo builds that show exactly what a Marhab system does for a business — not a gallery of screenshots. As we launch with clients, this page will grow with real outcomes.',
  demoLabel: 'Marhab Demo',
  projects: [
    {
      slug: 'pearl-and-bloom',
      name: 'Pearl & Bloom Dental Studio',
      type: 'Dental clinic',
      location: 'The Pearl, Doha',
      tier: 'Premium system',
      description: 'A boutique dental practice where every enquiry — a price question, a toothache at night, a new patient — becomes a booked appointment without the front desk lifting a finger.',
      challenge: 'Clinics lose patients in the gap between “how much is a cleaning?” and an actual appointment. Enquiries arrive after hours, on WhatsApp and Instagram, and by the time someone replies the patient has booked elsewhere.',
      experience: 'A calm, premium website with an AI reception that answers treatment and price questions, shows real availability, books the appointment, sends the WhatsApp confirmation and reminder, and asks for a review after the visit. The clinic sees every conversation and booking in one dashboard.',
      journey: ['Premium website', 'AI reception', 'Appointment booking', 'Lead capture', 'WhatsApp reminder', 'Review request'],
      href: 'https://pearl-and-bloom-demo.vercel.app',
      accent: '#4F7C6C',
      image: 'https://images.unsplash.com/photo-1609207825181-52d3214556dd?q=80&w=1600&auto=format&fit=crop',
      imageAlt: 'Boutique treatment room with a stone wall and pool view',
      mock: {
        chat: [
          { role: 'customer', text: 'How much is teeth whitening?' },
          { role: 'marhab', text: 'In-studio whitening starts at QAR 1,200. Would you like to see available times for a free consultation?' },
        ],
        booking: { title: 'Consultation confirmed', line1: 'Thu 24 Sep · 6:00 PM', line2: 'Reminder · Thu 3:00 PM' },
      },
    },
    {
      slug: 'dune-and-bean',
      name: 'Dune & Bean Coffee Roastery',
      type: 'Café & roastery',
      location: 'Al Sadd, Doha',
      tier: 'Standard system',
      description: 'A specialty roastery whose customers ask the same twenty questions a day — hours, menu, parking, wholesale — and whose owner was answering them by hand.',
      challenge: 'A café’s Instagram inbox is a support desk nobody staffs. Menu questions, opening hours on Fridays, catering requests — each one answered late or not at all, and the catering leads never written down.',
      experience: 'A warm, editorial website with the full menu, and an AI reception that answers hours, menu and location questions instantly, captures catering and wholesale enquiries with a name and number, and sends each one to the owner the moment it lands.',
      journey: ['Premium website', 'AI reception', 'Menu & hours answered', 'Lead capture', 'Owner notified'],
      href: 'https://dune-and-bean-demo.vercel.app',
      accent: '#B08655',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1600&auto=format&fit=crop',
      imageAlt: 'Window-side café table with a plant and a french press',
      mock: {
        chat: [
          { role: 'customer', text: 'Are you open Friday morning?' },
          { role: 'marhab', text: 'On Fridays we open at 1:30 PM, after prayers. Saturday to Thursday it’s 7 AM to 11 PM. Want me to save you a table?' },
        ],
        booking: { title: 'Catering enquiry captured', line1: 'Omar · 40 guests · Oct 3', line2: 'Sent to owner · just now' },
      },
    },
  ],
  future: 'Real client outcomes, testimonials and before/after comparisons will be added here as they exist — never before.',
};

/* --------------------------------------------------------------- process */

export const process = {
  eyebrow: 'Process',
  heading: 'Working with Marhab is simple.',
  sub: 'Six steps, one point of contact, and a system that is live in days — not months.',
  steps: [
    { n: '01', title: 'Discover', text: 'We learn how your business receives enquiries, customers and bookings today — and where they slip through.', get: 'A short call and a clear summary of what’s being lost.' },
    { n: '02', title: 'Plan', text: 'We define what the customer experience should look like, from the first message to the review.', get: 'A one-page plan of the journey we’ll build.' },
    { n: '03', title: 'Design', text: 'We create the visual and interaction experience around your business — your services, your tone, your customers.', get: 'A design you approve before anything is built.' },
    { n: '04', title: 'Build', text: 'We develop the complete customer-facing system: website, reception, bookings and follow-ups.', get: 'A working system you can try before launch.' },
    { n: '05', title: 'Launch', text: 'We test every path a customer could take, refine, and go live — connected to your calendar and your inbox.', get: 'A live system and a walkthrough for your team.' },
    { n: '06', title: 'Optimize', text: 'We monitor what customers ask and where they hesitate, and keep improving the journey as the business grows.', get: 'Monthly improvements, without you asking.' },
  ],
};

/* --------------------------------------------------------------- contact */

export const contact = {
  eyebrow: 'Contact',
  heading: 'Let’s build a better customer experience.',
  sub: 'Tell us about your business and where customers currently reach you. We’ll explore how Marhab could improve the journey — no obligation.',
  cta: 'Book a free demo',
  email: 'jad.bahous@gmail.com',
  // Set to the Marhab WhatsApp number in international format without "+", e.g. '97455512345'.
  // The WhatsApp option only renders once this is filled in.
  whatsapp: '',
  next: [
    { title: 'We reply within one business day', text: 'A short note from Jad, not an automated ticket.' },
    { title: 'A 20-minute call', text: 'We look at how customers reach you today and what gets missed.' },
    { title: 'A demo on your business', text: 'You see the experience with your services, your hours, your tone.' },
  ],
  businessTypes: [
    'Dental clinic',
    'Medical clinic',
    'Salon & beauty',
    'Gym & fitness',
    'Restaurant & café',
    'Real estate',
    'Automotive',
    'Hospitality',
    'Professional services',
    'Other',
  ],
};

export const footer = {
  brand: 'Marhab AI',
  tagline: 'Every customer who reaches out, answered.',
  location: 'Doha, Qatar',
};
