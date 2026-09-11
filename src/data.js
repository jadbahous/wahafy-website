export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

export const hero = {
  eyebrow: 'AI websites & automation — built in Doha',
  headline: ['Your website', 'should sell', 'while you sleep.'],
  sub: 'Wahafy builds AI-native websites for Qatar businesses — a concierge that answers questions, captures leads, books appointments, and follows up automatically, so nothing falls through the cracks.',
  primaryCta: { label: 'Get my free demo', href: '/contact' },
  secondaryCta: { label: 'See the work', href: '/work' },
};

export const about = {
  eyebrow: 'What is Wahafy',
  heading: 'A studio that builds websites that actually do the work.',
  body: "Wahafy is a small, focused studio building AI-native websites for Qatar's independent businesses — clinics, cafés, studios, and service providers who are excellent at what they do, but don't have time to chase every enquiry. We pair considered design with an AI concierge trained on your business, so the site doesn't just look good — it works, around the clock.",
  pillars: [
    {
      title: 'Built for your business',
      text: 'The AI concierge is trained on your real services, pricing, and hours — not a generic chatbot with a script.',
    },
    {
      title: 'Never miss a lead',
      text: 'Every conversation is logged automatically, and every enquiry reaches you the moment it happens.',
    },
    {
      title: 'Grows with you',
      text: 'Start with a site that captures leads. Add booking, reminders, and analytics whenever you’re ready.',
    },
  ],
};

export const services = {
  eyebrow: 'Services',
  heading: 'Two ways to work with us.',
  sub: 'Every project starts with a custom-designed website. From there, choose how much of the follow-up you want automated.',
  tiers: [
    {
      name: 'Standard',
      tagline: 'A site that captures every lead.',
      features: [
        'Custom-designed, multi-page website',
        'AI chat concierge trained on your business',
        'Automatic lead capture, logged and emailed instantly',
        'Mobile-optimized, fast-loading build',
        'WhatsApp click-to-chat integration',
      ],
      cta: { label: 'Get a quote', href: '/contact' },
      highlight: false,
    },
    {
      name: 'Premium',
      tagline: 'A site that runs the follow-up for you.',
      features: [
        'Everything in Standard',
        'Live appointment booking synced to your calendar',
        'Automated WhatsApp appointment reminders',
        'Automated WhatsApp review requests after every visit',
        'Real-time analytics dashboard — leads, bookings, trends',
        'Priority support and monthly tune-ups',
      ],
      cta: { label: 'Get a quote', href: '/contact' },
      highlight: true,
    },
  ],
};

export const work = {
  eyebrow: 'Selected work',
  heading: 'Two businesses, two tiers.',
  sub: 'Live demo builds showing exactly what Standard and Premium look like in practice.',
  projects: [
    {
      name: 'Pearl & Bloom Dental Studio',
      location: 'The Pearl, Doha',
      tier: 'Premium build',
      description:
        'A boutique dental studio. Full premium build: an AI concierge that answers treatment questions, live calendar booking, automated WhatsApp reminders and review requests, and a real-time analytics dashboard.',
      tags: ['AI Chat', 'Live Booking', 'WhatsApp Automation', 'Analytics'],
      href: 'https://pearl-and-bloom-demo.vercel.app',
      accent: '#4F7C6C',
      image: 'https://images.unsplash.com/photo-1609207825181-52d3214556dd?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'Boutique treatment room with a stone wall and pool view',
    },
    {
      name: 'Dune & Bean Coffee Roastery',
      location: 'Al Sadd, Doha',
      tier: 'Standard build',
      description:
        'A specialty coffee roastery and café. Standard build: a custom-designed site with an AI concierge that answers menu and hours questions, and captures every enquiry automatically.',
      tags: ['AI Chat', 'Lead Capture'],
      href: 'https://dune-and-bean-demo.vercel.app',
      accent: '#B08655',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'Window-side café table with a plant and a french press',
    },
  ],
};

export const process = {
  eyebrow: 'Process',
  heading: 'Live in days, not months.',
  steps: [
    {
      n: '01',
      title: 'Discover',
      text: 'A short call to learn your business — services, pricing, hours, and where leads currently slip through.',
    },
    {
      n: '02',
      title: 'Build',
      text: 'A custom-designed site and an AI concierge trained specifically on your business, not a generic template.',
    },
    {
      n: '03',
      title: 'Launch',
      text: 'Live and connected to your calendar, your inbox, and a running log of every lead — no plugins, no guesswork.',
    },
    {
      n: '04',
      title: 'Grow',
      text: 'Add booking, WhatsApp automation, and analytics whenever you’re ready to go further.',
    },
  ],
};

export const contact = {
  eyebrow: 'Contact',
  heading: 'Ready to see it on your business?',
  sub: 'Tell us a bit about your business and we’ll get back to you with a free demo — no obligation.',
  whatsapp: null,
};

export const explore = [
  {
    label: 'Services',
    heading: 'Standard vs. Premium',
    text: 'Two ways to work with us — from lead capture to fully automated booking and follow-up.',
    href: '/services',
  },
  {
    label: 'Work',
    heading: 'Two businesses, two tiers',
    text: 'Live demo builds for a dental studio and a coffee roastery — see exactly what each tier looks like.',
    href: '/work',
  },
  {
    label: 'Process',
    heading: 'Live in days, not months',
    text: 'A four-step process from discovery call to a site that runs the follow-up for you.',
    href: '/process',
  },
];

export const footer = {
  brand: 'Wahafy',
  tagline: 'AI websites & automation for Qatar businesses.',
  location: 'Doha, Qatar',
};
