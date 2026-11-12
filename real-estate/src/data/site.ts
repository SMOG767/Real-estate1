import { photo } from './properties'

export const brand = {
  name: 'Marlowe & Co.',
  established: 1998,
  phone: '+44 20 7946 0210',
  phoneHref: 'tel:+442079460210',
  email: 'hello@marloweandco.co.uk',
  address: '18 Kensington Church Street, London W8 4EP',
  tagline: 'Prime London property, quietly done.',
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

export const stats = [
  { value: '1,240', suffix: '+', label: 'Homes sold' },
  { value: '£1.8bn', suffix: '', label: 'Property transacted' },
  { value: '24', suffix: ' days', label: 'Average time to offer' },
  { value: '4.9', suffix: '/5', label: 'Average client rating' },
]

export type Agent = {
  id: string
  name: string
  role: string
  photo: string
  phone: string
  email: string
  bio: string
}

export const agents: Agent[] = [
  {
    id: 'elena-marlowe',
    name: 'Elena Marlowe',
    role: 'Founding Director',
    photo: photo('1494790108377-be9c29b29330', 800),
    phone: '+44 20 7946 0211',
    email: 'elena@marloweandco.co.uk',
    bio: 'Elena founded the practice in 1998 after a decade in prime central London sales. She advises on the houses nobody else gets to see, and has sold over £900m of residential property.',
  },
  {
    id: 'james-okafor',
    name: 'James Okafor',
    role: 'Head of Sales',
    photo: photo('1560250097-0b93528c311a', 800),
    phone: '+44 20 7946 0214',
    email: 'james@marloweandco.co.uk',
    bio: 'James leads the sales team across Kensington, Notting Hill and Chelsea. He is known for straight answers, meticulous preparation and a stubborn refusal to over-guide a price.',
  },
  {
    id: 'priya-raman',
    name: 'Priya Raman',
    role: 'Lettings Director',
    photo: photo('1573497019940-1c28c88b4f3e', 800),
    phone: '+44 20 7946 0217',
    email: 'priya@marloweandco.co.uk',
    bio: 'Priya looks after the lettings portfolio and the tenants within it. She has negotiated more than 600 tenancies and believes good management is invisible until the day it matters.',
  },
]

export type Neighbourhood = {
  name: string
  blurb: string
  image: string
}

export const neighbourhoods: Neighbourhood[] = [
  {
    name: 'Kensington',
    blurb: 'Stucco terraces, museums and the quietest garden squares in W8.',
    image: photo('1568605114967-8130f3a36994', 1200),
  },
  {
    name: 'Notting Hill',
    blurb: 'Pastel streets, Portobello mornings and houses that rarely come up.',
    image: photo('1600596542815-ffad4c1539a9', 1200),
  },
  {
    name: 'Hampstead',
    blurb: 'Village life, heathland walks and modernist houses behind high walls.',
    image: photo('1613490493576-7fde63acd811', 1200),
  },
  {
    name: 'Richmond',
    blurb: 'River frontage, family gardens and a slower kind of London.',
    image: photo('1592595896551-12b371d546d5', 1200),
  },
]

export type ServiceIcon = 'search' | 'building' | 'key' | 'chart' | 'file' | 'sparkles'

export type Service = {
  icon: ServiceIcon
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: 'search',
    title: 'Buying search',
    description:
      'A private search on your behalf, including off-market houses we would never advertise. You see the shortlist, we do the legwork.',
  },
  {
    icon: 'building',
    title: 'Sales & marketing',
    description:
      'Photography, film, floorplans and a launch plan built around your house rather than a template. Most homes go under offer in three weeks.',
  },
  {
    icon: 'key',
    title: 'Lettings & management',
    description:
      'Tenant referencing, contracts, renewals and maintenance handled end to end, with quarterly statements you can actually read.',
  },
  {
    icon: 'chart',
    title: 'Valuations',
    description:
      'An honest, evidence-led view of what your home is worth today, plus the three things most likely to move it up a bracket.',
  },
  {
    icon: 'file',
    title: 'Lease & legal support',
    description:
      'Lease extensions, freehold enfranchisement and licence-to-alter applications coordinated with solicitors we trust.',
  },
  {
    icon: 'sparkles',
    title: 'Home staging',
    description:
      'Furniture, art and lighting installed before launch, then removed after. Our staging partners work to a fixed, refundable fee.',
  },
]

export const process = [
  {
    step: '01',
    title: 'Conversation',
    description: 'We meet at the house, listen to your plans and tell you what we think — including the parts you may not want to hear.',
  },
  {
    step: '02',
    title: 'Preparation',
    description: 'Photography, film, floorplans and any works worth doing before launch. We project-manage the trades if you want us to.',
  },
  {
    step: '03',
    title: 'Launch',
    description: 'A staged release to our private list first, then the portals. Every viewing is accompanied by the advisor who knows the house.',
  },
  {
    step: '04',
    title: 'Completion',
    description: 'Offers qualified, chain checked, solicitors chased. You get one point of contact from first viewing to keys.',
  },
]

export const values = [
  {
    title: 'Advice before ambition',
    description:
      'We would rather tell you a house is worth less than win an instruction. Our fee depends on a sale, not on a flattering number.',
  },
  {
    title: 'Discretion as standard',
    description:
      'Many of our clients never appear on a portal. Off-market work is a normal part of the job, not a premium service.',
  },
  {
    title: 'One advisor, start to finish',
    description:
      'The person who shows you the house negotiates the offer and chases the solicitor. Nothing gets handed to a call centre.',
  },
]

export type Testimonial = {
  quote: string
  name: string
  detail: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'They talked us out of the first house we loved — and were right. Six weeks later they found the one we actually wanted, before it was listed.',
    name: 'Sarah & Tom Whitfield',
    detail: 'Bought in Notting Hill, 2025',
  },
  {
    quote:
      'Our flat had been on with two other agents. Marlowe re-shot it, re-wrote the details and had three offers in eleven days at a higher price.',
    name: 'Daniel Okonkwo',
    detail: 'Sold in Marylebone, 2025',
  },
  {
    quote:
      'Priya managed our rental for four years across two tenancies. Not one void period, not one surprise invoice. Genuinely rare.',
    name: 'Helena Voss',
    detail: 'Landlord, Chelsea',
  },
]

export const faqs = [
  {
    question: 'What do you charge for a sale?',
    answer:
      'Our fee is a percentage of the agreed sale price, confirmed in writing before we launch. Photography, film, floorplans and portal listing are included; there are no upfront costs.',
  },
  {
    question: 'Can I see a property before it is advertised?',
    answer:
      'Yes. Around a third of what we sell is never publicly listed. Register your requirements and we will show you suitable houses as they arrive.',
  },
  {
    question: 'Do you handle rentals as well as sales?',
    answer:
      'We do — lettings, tenant referencing and full management across prime central and west London. We also act for tenants looking for something specific.',
  },
  {
    question: 'How quickly can you value my home?',
    answer:
      'Usually within 48 hours. The visit takes about 45 minutes and you will have a written valuation with comparable evidence the next working day.',
  },
  {
    question: 'What areas do you cover?',
    answer:
      'Kensington, Chelsea, Notting Hill, Marylebone, Hampstead, Islington, Bermondsey and Richmond. For anything outside these, we will point you to someone we trust.',
  },
]

export const offices = [
  { name: 'Kensington (head office)', address: '18 Kensington Church Street, London W8 4EP', phone: '+44 20 7946 0210' },
  { name: 'Notting Hill', address: '104 Ledbury Road, London W11 1PY', phone: '+44 20 7946 0220' },
  { name: 'Richmond', address: '9 Hill Rise, Richmond TW10 6UQ', phone: '+44 20 7946 0230' },
]

export const openingHours = [
  { day: 'Monday – Friday', time: '9:00 – 18:30' },
  { day: 'Saturday', time: '10:00 – 16:00' },
  { day: 'Sunday', time: 'By appointment' },
]
