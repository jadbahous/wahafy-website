// All public-facing copy for the Marhab site lives here.
// Principle: say WHAT Marhab does and the RESULT it creates, never HOW it is built.

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

export const navCta = { label: 'Book a free demo', href: '/contact' };

/* ------------------------------------------------------------------ home */

export const hero = {
  headline: ['Every customer who reaches out,', 'answered.'],
  eyebrow: 'For clinics, salons and service businesses',
  support: 'Websites. AI reception. Automation. One connected customer experience.',
  sub: 'We build your website and an AI receptionist that answers your customers on WhatsApp, Instagram and your site, books them in and follows up. Day and night.',
  example: 'Example: Lumière, a clinic using Marhab.',
  primaryCta: { label: 'See it in action', href: '#demo' },
  secondaryCta: { label: 'Book a free demo', href: '/contact' },
  meta: ['Premium websites', 'AI reception, 24/7', 'Built for Qatar'],
  numbers: [
    { value: 24, suffix: '/7', label: 'Answering enquiries, capturing leads and booking appointments, around the clock.' },
    { text: 'Every lead, in one place.', label: 'Enquiries captured and sent to you the moment they arrive.' },
    { value: 2, suffix: '', label: 'Languages. Arabic and English, in the same conversation.' },
  ],
  lines: ['Answers questions.', 'Books appointments.', 'Follows up, automatically.'],
};

export const demo = {
  eyebrow: 'See it in action',
  heading: ['It’s 11:02 PM.', 'Everyone has gone home.', 'By 11:03, Sara is booked.'],
  sub: 'This is what your customers experience, on your website, on WhatsApp, on Instagram. No waiting for morning, no missed message.',
  tryLabel: 'Try it yourself',
  replayLabel: 'Replay',
  business: 'Lumière',
  conversation: [
    { role: 'customer', text: 'Do you have an appointment tomorrow at 6 PM?' },
    { role: 'marhab', text: 'Yes. We have 6:00 PM and 7:30 PM available. Which would you prefer?' },
    { role: 'customer', text: '6 PM.' },
    { role: 'marhab', text: 'Perfect. What name should I book it under?' },
    { role: 'customer', text: 'Sara.' },
    { role: 'marhab', text: 'Booked for tomorrow at 6:00 PM, Sara. A confirmation is on its way to your WhatsApp.' },
  ],
  card: { title: 'Appointment booked', line1: 'Tomorrow · 6:00 PM · Sara', line2: 'Confirmation sent on WhatsApp' },
  pipeline: [
    { label: 'Appointment booked', detail: 'Tomorrow · 6:00 PM' },
    { label: 'Lead captured', detail: 'Sara · new client' },
    { label: 'Confirmation sent', detail: 'WhatsApp · just now' },
    { label: 'Reminder scheduled', detail: 'Tomorrow · 3:00 PM' },
    { label: 'Follow-up', detail: 'Review request · after visit' },
  ],
};

export const outcomes = {
  eyebrow: 'Why Marhab',
  heading: 'The customers are already there. Most businesses just don’t catch them.',
  sub: 'Enquiries arrive every day, on the website, on WhatsApp, on Instagram, and most go unanswered until it’s too late. Marhab is built to catch the customers you already have.',
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

/* The showpiece: one customer's week, scrubbed by scroll. Each stage is a
   screen on the same phone and one outcome the business gets from it. */
export const story = {
  eyebrow: 'See it in action',
  heading: ['It’s 11:02 PM.', 'Everyone has gone home.', 'By 11:03, Sara is booked.'],
  sub: 'One client, one week, five steps. Scroll to follow along.',
  business: 'Lumière',
  stages: [
    {
      id: 'enquiry',
      short: 'Lead',
      when: 'Tuesday, 11:02 PM',
      channel: 'Website chat',
      title: 'Never miss a lead',
      text: 'A question at 11:02 PM is answered at 11:02 PM. The common questions are handled instantly, so nobody waits for morning and nothing is typed twice.',
      lines: [
        { role: 'customer', text: 'Do you have an appointment tomorrow at 6 PM?' },
        { role: 'marhab', text: 'Yes. We have 6:00 PM and 7:30 PM available. Which would you prefer?' },
      ],
    },
    {
      id: 'booking',
      short: 'Booking',
      when: 'Tuesday, 11:03 PM',
      channel: 'Website chat',
      title: 'Turn enquiries into bookings',
      text: 'Real availability, a name, a confirmation on WhatsApp. From a question to an appointment in one minute, with no one at the desk.',
      lines: [
        { role: 'customer', text: '6 PM.' },
        { role: 'marhab', text: 'Perfect. What name should I book it under?' },
        { role: 'customer', text: 'Sara.' },
        { role: 'marhab', text: 'Booked for tomorrow at 6:00 PM, Sara. A confirmation is on its way to your WhatsApp.' },
      ],
      card: { title: 'Appointment booked', line1: 'Wednesday, 6:00 PM · Sara', line2: 'Confirmation sent on WhatsApp' },
    },
    {
      id: 'reminder',
      short: 'Reminder',
      focus: 0, // on a small screen, keep the reminder itself
      when: 'Wednesday, 3:00 PM',
      channel: 'WhatsApp',
      title: 'Follow up automatically',
      text: 'The reminder goes out the afternoon before, and the customer confirms with one tap. Fewer no-shows, and none of your staff\u2019s time.',
      lines: [
        { role: 'marhab', text: 'Hi Sara, a reminder of your appointment today at 6:00 PM at Lumière, The Pearl. Reply 1 to confirm or 2 to reschedule.' },
        { role: 'customer', text: '1' },
        { role: 'marhab', text: 'Confirmed. See you at 6:00 PM.' },
      ],
    },
    {
      id: 'review',
      short: 'Review',
      when: 'Wednesday, 7:40 PM',
      channel: 'WhatsApp',
      title: 'Generate more reviews',
      text: 'An hour after the visit, a short message asks how it went. Happy customers are invited to say so on Google, while the visit is still fresh.',
      lines: [
        { role: 'marhab', text: 'Thank you for visiting today, Sara. How was it?' },
        { role: 'customer', text: 'Really good, thank you.', stars: 5 },
        { role: 'marhab', text: 'We\u2019re glad. Would you share that on Google? It takes a minute.', action: 'Leave a review' },
      ],
    },
    {
      id: 'owner',
      short: 'Dashboard',
      when: 'Friday, 9:00 AM',
      channel: 'Your dashboard',
      title: 'Understand what is happening',
      text: 'Every conversation, lead and booking in one place, so you see the week at a glance without asking anyone.',
      stats: [
        { value: '27', label: 'enquiries' },
        { value: '19', label: 'bookings' },
        { value: '6', label: 'reviews' },
      ],
      rows: [
        { label: 'Sara', detail: 'Booked · Wed 6:00 PM', state: 'done' },
        { label: 'Omar', detail: 'Asked about prices', state: 'active' },
        { label: 'Layla', detail: 'Review · 5 stars', state: 'done' },
        { label: 'Khalid', detail: 'Reminder sent', state: 'done' },
      ],
    },
  ],
};

export const servicesPreview = {
  eyebrow: 'What we build',
  heading: 'Everything between a visitor and a booked customer.',
  cta: { label: 'Explore all services', href: '/services' },
  items: [
    { title: 'Premium websites', text: 'Digital experiences designed around conversion, credibility and customer experience.' },
    { title: 'AI reception', text: 'Your 24/7 AI receptionist answers common enquiries instantly and guides customers toward the right next step.' },
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
  origin: 'Marhab comes from marhaba, the first word a customer hears in Doha. We built the system so that welcome never stops at the door.',
  points: [
    { title: 'Arabic and English', text: 'Customers are answered in the language they write in, in the same conversation.' },
    { title: 'WhatsApp-first journeys', text: 'Confirmations, reminders and follow-ups arrive where your customers already are.' },
    { title: 'Local context', text: 'Operating hours, weekends, local schedules and the way business is actually done here.' },
    { title: 'Support in Doha', text: 'A team you can meet, not a ticket queue in another time zone.' },
  ],
};

export const finalCta = {
  heading: 'Your next customer shouldn’t have to wait.',
  sub: 'See what Marhab could do for your business.',
  primary: { label: 'Book a free demo', href: '/contact' },
  secondary: { label: 'Talk to Marhab' },
};

/* -------------------------------------------------------------- services */

export const services = {
  eyebrow: 'Services',
  heading: 'What your business receives.',
  sub: 'Not a list of deliverables: a working customer system. Every engagement is built around how your customers reach you and what should happen next.',
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
      lead: 'An AI receptionist for your business: immediate, 24/7 assistance for every customer, including the ones who write at midnight.',
      points: ['Answers common questions instantly', 'Guides customers to the right service', 'Collects customer details naturally', 'Handles enquiries outside opening hours', 'Directs customers to book or get in touch', 'Arabic and English'],
    },
    {
      n: '03',
      title: 'Booking & lead capture',
      lead: 'Connect every enquiry with the next step: an appointment, a callback, a visit.',
      points: ['Appointment requests and live booking', 'Availability that reflects your real calendar', 'Every lead logged and sent to you instantly', 'Customer information collected once', 'Structured enquiry management', 'Nothing lost between channels'],
    },
    {
      n: '04',
      title: 'Follow-up automation',
      lead: 'The messages your team never has time to send, sent every time.',
      points: ['Appointment reminders', 'Lead follow-ups', 'Missed-enquiry follow-up', 'Post-visit review requests', 'Customer check-ins', 'Delivered on WhatsApp'],
    },
    {
      n: '05',
      title: 'Reporting & insights',
      lead: 'Know what is actually happening, without asking anyone.',
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
      cta: { label: 'Book a free demo', href: '/contact' },
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
        'Live dashboard: leads, bookings, trends',
        'Priority support and monthly tune-ups',
      ],
      cta: { label: 'Book a free demo', href: '/contact' },
      highlight: true,
    },
  ],
  note: [
    'Setup prices are starting points. The final quote depends on the scope of the site and is confirmed after a free discovery call.',
    'The setup fee covers the design and build of your website and customer system. The monthly plan covers what keeps it running (hosting, the AI reception, monitoring, updates and support), with Marhab managing the system on your behalf.',
    'Plans run on a 12-month term. The full terms, including what happens at the end of a plan, are explained clearly before anything is signed.',
  ],
};

/* ------------------------------------------------------------------ work */

export const work = {
  eyebrow: 'Work',
  heading: 'Two businesses, two complete systems.',
  sub: 'Demo builds that show exactly what a Marhab system does for a business, not a gallery of screenshots. As we launch with clients, this page will grow with real outcomes.',
  demoLabel: 'Marhab Demo',
  projects: [
    {
      slug: 'pearl-and-bloom',
      name: 'Pearl & Bloom Dental Studio',
      type: 'Dental clinic',
      location: 'The Pearl, Doha',
      tier: 'Premium system',
      description: 'A boutique dental practice where every enquiry, a price question, a toothache at night, a new patient, becomes a booked appointment without the front desk lifting a finger.',
      challenge: 'Clinics lose patients in the gap between “how much is a cleaning?” and an actual appointment. Enquiries arrive after hours, on WhatsApp and Instagram, and by the time someone replies the patient has booked elsewhere.',
      experience: 'A calm, premium website with an AI reception that answers treatment and price questions, shows real availability, books the appointment, sends the WhatsApp confirmation and reminder, and asks for a review after the visit. The clinic sees every conversation and booking in one dashboard.',
      journey: ['Premium website', 'AI reception', 'Appointment booking', 'Lead capture', 'WhatsApp reminder', 'Review request'],
      href: 'https://pearl-and-bloom-demo.vercel.app',
      accent: '#4F7C6C',
      image: '/work/pearl-and-bloom-desktop.webp',
      imagePhone: '/work/pearl-and-bloom-phone.webp',
      imageAlt: 'The Pearl & Bloom website, home page',
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
      description: 'A specialty roastery whose customers ask the same twenty questions a day (hours, menu, parking, wholesale) and whose owner was answering them by hand.',
      challenge: 'A café’s Instagram inbox is a support desk nobody staffs. Menu questions, opening hours on Fridays, catering requests: each one answered late or not at all, and the catering leads never written down.',
      experience: 'A warm, editorial website with the full menu, and an AI reception that answers hours, menu and location questions instantly, captures catering and wholesale enquiries with a name and number, and sends each one to the owner the moment it lands.',
      journey: ['Premium website', 'AI reception', 'Menu & hours answered', 'Lead capture', 'Owner notified'],
      href: 'https://dune-and-bean-demo.vercel.app',
      accent: '#B08655',
      image: '/work/dune-and-bean-desktop.webp',
      imagePhone: '/work/dune-and-bean-phone.webp',
      imageAlt: 'The Dune & Bean website, home page',
      mock: {
        chat: [
          { role: 'customer', text: 'Are you open Friday morning?' },
          { role: 'marhab', text: 'On Fridays we open at 1:30 PM, after prayers. Saturday to Thursday it’s 7 AM to 11 PM. Want me to save you a table?' },
        ],
        booking: { title: 'Catering enquiry captured', line1: 'Omar · 40 guests · Oct 3', line2: 'Sent to owner · just now' },
      },
    },
  ],
  future: 'Real client outcomes, testimonials and before/after comparisons will be added here as they exist, never before.',
};

/* --------------------------------------------------------------- process */

export const process = {
  eyebrow: 'Process',
  heading: 'Working with Marhab is simple.',
  sub: 'Six steps, one point of contact, and a clear path from first conversation to launch.',
  steps: [
    { n: '01', title: 'Discover', text: 'We learn how your business receives enquiries, customers and bookings today, and where they slip through.', get: 'A short call and a clear summary of what’s being lost.' },
    { n: '02', title: 'Plan', text: 'We define what the customer experience should look like, from the first message to the review.', get: 'A one-page plan of the journey we’ll build.' },
    { n: '03', title: 'Design', text: 'We create the visual and interaction experience around your business: your services, your tone, your customers.', get: 'A design you approve before anything is built.' },
    { n: '04', title: 'Build', text: 'We develop the complete customer-facing system: website, reception, bookings and follow-ups.', get: 'A working system you can try before launch.' },
    { n: '05', title: 'Launch', text: 'We test every path a customer could take, refine, and go live, connected to your calendar and your inbox.', get: 'A live system and a walkthrough for your team.' },
    { n: '06', title: 'Optimize', text: 'We monitor what customers ask and where they hesitate, and keep improving the journey as the business grows.', get: 'Monthly improvements, without you asking.' },
  ],
};

/* --------------------------------------------------------------- contact */

export const contact = {
  eyebrow: 'Contact',
  heading: 'Let’s build a better customer experience.',
  sub: 'Tell us about your business and where customers currently reach you. We’ll explore how Marhab could improve the journey. No obligation.',
  cta: 'Book a free demo',
  email: 'jad@marhab.agency',
  // Set to the Marhab WhatsApp number in international format without "+", e.g. '97455512345'.
  // The WhatsApp option only renders once this is filled in.
  whatsapp: '97477261697',
  // Same number, formatted for display and for the tel: link.
  phone: '+974 7726 1697',
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
  form: {
    name: 'Your name',
    namePlaceholder: 'Full name',
    business: 'Business name',
    businessPlaceholder: 'Your business',
    type: 'Business type',
    typePlaceholder: 'Select…',
    phone: 'Phone / WhatsApp',
    phonePlaceholder: '+974 …',
    email: 'Email',
    emailPlaceholder: 'you@business.com',
    website: 'Website or Instagram',
    websitePlaceholder: 'Optional',
    message: 'What would you like to improve?',
    messagePlaceholder: 'Where do customers reach you today, and what gets missed?',
    sending: 'Sending…',
    note: 'No obligation. We reply within one business day.',
    successTitle: 'Thank you. We’ll be in touch.',
    successText: 'Jad will reply within one business day to arrange your free demo.',
    error: 'Something went wrong. Please try again, or email',
    whatsappUs: 'WhatsApp us',
    talk: 'Talk to Marhab',
  },
};

export const footer = {
  brand: 'Marhab AI',
  tagline: 'Every customer who reaches out, answered.',
  location: 'Doha, Qatar',
  backToTop: 'Back to top',
};

/* ------------------------------------------------------------ chat widget */

export const chat = {
  greeting: "Marhaba. I'm the Marhab assistant. Ask me anything about what we build, or tell me about your business and I'll set up a free demo.",
  suggestions: ['What does Marhab AI do?', 'Standard vs. Premium?', 'How much does it cost?', 'I run a restaurant in Doha'],
  placeholder: 'Ask about your business…',
  send: 'Send',
  open: 'Ask Marhab',
  close: 'Close',
  saved: 'Saved. Jad has your details',
  error: 'Could not connect. Please try again.',
};

/* --------------------------------------------------------------- shared */

export const ui = {
  liveDemo: 'Live demo',
  viewSystem: 'View the system',
  openDemo: 'Open the live demo',
  challenge: 'The challenge',
  experience: 'The experience',
  journeyLabel: 'The customer journey',
  whatHappened: 'What just happened',
  sameReception: 'The same reception runs on this site. Ask it anything about your business. It’s the experience your customers would get.',
  typeMessage: 'Type a message…',
  replies: 'AI reception · replies in seconds',
  aiReception: 'AI reception',
  thisWeek: 'This week',
  from: 'From',
  then: 'Then',
  qar: 'QAR',
  qarMonth: 'QAR / month',
  oneTime: 'one-time setup',
  twelveMonths: '12-month plan',
  monthlyCovers: 'Monthly covers:',
  mostPopular: 'Most popular',
  youGet: 'You get:',
  menu: 'Menu',
  closeMenu: 'Close menu',
  openMenu: 'Open menu',
  fullCaseStudies: 'See the full case studies',
  switchTo: 'عربي',
  switchHref: '/ar',
  // The opening: the clock in the loader, then the line over the phone.
  itIs: 'It is',
  pm: 'PM',
  loading: 'Loading',
  clientBooked: 'Client booked.',
  skipIntro: 'Skip intro',
  skipIntroShort: 'Skip intro',
  // The scroll story.
  stepOf: 'Step {n} of {total}',
  customerSees: 'What your customer sees',
  youSee: 'What you see',
};
