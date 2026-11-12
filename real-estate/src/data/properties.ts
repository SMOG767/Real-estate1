export type PropertyType = 'House' | 'Apartment' | 'Villa' | 'Townhouse' | 'Penthouse'
export type ListingStatus = 'For sale' | 'For rent'

export type Property = {
  slug: string
  reference: string
  title: string
  address: string
  area: string
  city: string
  type: PropertyType
  status: ListingStatus
  price: number
  beds: number
  baths: number
  sqft: number
  year: number
  featured: boolean
  tagline: string
  description: string[]
  features: string[]
  amenities: string[]
  images: string[]
  agentId: string
}

/** Unsplash delivery URL — every id below was checked to resolve. */
export const photo = (id: string, width = 1600): string =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`

export const properties: Property[] = [
  {
    slug: 'the-glasshouse-kensington',
    reference: 'MAR-1042',
    title: 'The Glasshouse',
    address: '42 Lexham Gardens, Kensington W8',
    area: 'Kensington',
    city: 'London',
    type: 'House',
    status: 'For sale',
    price: 4_850_000,
    beds: 4,
    baths: 3,
    sqft: 3240,
    year: 2019,
    featured: true,
    tagline: 'A light-filled modern house behind a stucco façade.',
    description: [
      'A reimagined Victorian villa where the original stucco front gives way to a double-height glass extension. The ground floor is arranged for entertaining: a nine-metre kitchen, a dining room that seats fourteen, and a garden room that folds open onto a walled terrace.',
      'Upstairs, four bedrooms include a principal suite with a dressing room and a marble bathroom. The house has been refurbished end to end, with underfloor heating, Lutron lighting and a self-contained studio at the end of the garden.',
    ],
    features: [
      'Double-height rear extension',
      'Principal suite with dressing room',
      'Bespoke kitchen by Plain English',
      'Lutron lighting and Sonos throughout',
      'Walled garden with insulated studio',
      'Off-street parking for two cars',
      'Underfloor heating on all floors',
      'Air conditioning in every bedroom',
    ],
    amenities: ['Private garden', 'Garden studio', 'Off-street parking', 'Underfloor heating', 'Smart home wiring', 'Cellar storage'],
    images: [
      photo('1560518883-ce09059eeffa'),
      photo('1600585154340-be6161a56a0c'),
      photo('1600585152220-90363fe7e115'),
      photo('1600210492486-724fe5c67fb0'),
    ],
    agentId: 'elena-marlowe',
  },
  {
    slug: 'elm-row-townhouse',
    reference: 'MAR-1048',
    title: 'Elm Row Townhouse',
    address: '17 Elm Row, Notting Hill W11',
    area: 'Notting Hill',
    city: 'London',
    type: 'Townhouse',
    status: 'For sale',
    price: 3_275_000,
    beds: 4,
    baths: 3,
    sqft: 2680,
    year: 1874,
    featured: true,
    tagline: 'A five-storey townhouse on one of W11’s quietest streets.',
    description: [
      'Built in 1874 and carefully restored over three years, Elm Row keeps its cornicing, shutters and original floorboards while adding a contemporary lower ground floor with a family kitchen and a sunken courtyard.',
      'The first-floor drawing room runs the full width of the house, with three sash windows overlooking the street. Four bedrooms sit above, and the top floor works equally well as a studio or guest suite.',
    ],
    features: [
      'Original cornicing and shutters',
      'Full-width first-floor drawing room',
      'Sunken courtyard garden',
      'Lower-ground family kitchen',
      'Principal suite with walk-in wardrobe',
      'Restored sash windows, double glazed',
      'Utility room and wine store',
      'Residents’ parking permits available',
    ],
    amenities: ['Courtyard garden', 'Wine store', 'Utility room', 'Original features', 'Residents’ parking'],
    images: [
      photo('1600596542815-ffad4c1539a9'),
      photo('1600566753086-00f18fb6b3ea'),
      photo('1600573472550-8090b5e0745e'),
      photo('1512918728675-ed5a9ecdebfd'),
    ],
    agentId: 'james-okafor',
  },
  {
    slug: 'chelsea-creek-penthouse',
    reference: 'MAR-1053',
    title: 'Chelsea Creek Penthouse',
    address: '9 Chelsea Creek, Chelsea SW6',
    area: 'Chelsea',
    city: 'London',
    type: 'Penthouse',
    status: 'For sale',
    price: 6_400_000,
    beds: 3,
    baths: 3,
    sqft: 2410,
    year: 2017,
    featured: true,
    tagline: 'A duplex penthouse with a 60-foot wraparound terrace.',
    description: [
      'Occupying the top two floors of a discreet riverside building, this penthouse is arranged around a double-height reception room with floor-to-ceiling glazing and views across the creek towards Chelsea Harbour.',
      'The terrace wraps three sides and is planted with mature olive trees. A bespoke kitchen, a media room and three en-suite bedrooms complete the upper floor, with two secure parking spaces included.',
    ],
    features: [
      '60-foot wraparound terrace',
      'Double-height reception room',
      'Three en-suite bedrooms',
      'Media room and study',
      '24-hour concierge',
      'Two secure underground parking spaces',
      'Residents’ gym and pool',
      'Air conditioning throughout',
    ],
    amenities: ['Concierge', 'Private terrace', 'Gym and pool', 'Secure parking', 'Lift access', 'Riverside views'],
    images: [
      photo('1512917774080-9991f1c4c750'),
      photo('1600607687939-ce8a6c25118c'),
      photo('1493809842364-78817add7ffb'),
      photo('1584622650111-993a426fbf0a'),
    ],
    agentId: 'james-okafor',
  },
  {
    slug: 'marlow-court-marylebone',
    reference: 'MAR-1061',
    title: 'Marlow Court',
    address: 'Marlow Court, Chiltern Street, Marylebone W1U',
    area: 'Marylebone',
    city: 'London',
    type: 'Apartment',
    status: 'For rent',
    price: 5_200,
    beds: 2,
    baths: 2,
    sqft: 1180,
    year: 2015,
    featured: false,
    tagline: 'A quiet two-bedroom apartment off Chiltern Street.',
    description: [
      'A second-floor apartment in a portered Marylebone building, moments from the independents on Chiltern Street and five minutes from Baker Street.',
      'The reception room faces south over communal gardens, and both bedrooms are generously proportioned with built-in storage. Offered furnished or unfurnished on a twelve-month tenancy.',
    ],
    features: [
      'South-facing reception room',
      'Two double bedrooms with storage',
      'Porter and lift access',
      'Furnished or unfurnished',
      'Communal gardens',
      'Moments from Chiltern Street',
    ],
    amenities: ['Porter', 'Lift', 'Communal gardens', 'Furnished option', 'Bike storage'],
    images: [
      photo('1416331108676-a22ccb276e35'),
      photo('1560448204-e02f11c3d0e2'),
      photo('1484154218962-a197022b5858'),
      photo('1584622650111-993a426fbf0a'),
    ],
    agentId: 'priya-raman',
  },
  {
    slug: 'hampstead-heath-villa',
    reference: 'MAR-1066',
    title: 'Hampstead Heath Villa',
    address: '3 East Heath Road, Hampstead NW3',
    area: 'Hampstead',
    city: 'London',
    type: 'Villa',
    status: 'For sale',
    price: 8_950_000,
    beds: 5,
    baths: 4,
    sqft: 4620,
    year: 2012,
    featured: true,
    tagline: 'A contemporary villa with a swimming pool, opposite the Heath.',
    description: [
      'Set behind a gated carriage drive directly opposite Hampstead Heath, this detached villa offers over 4,600 square feet across three floors, with a lift serving all of them.',
      'The lower ground floor holds a pool, steam room and gym. Above, a 12-metre reception room opens to a landscaped garden by Andy Sturgeon, and five bedrooms includes a principal suite with a private terrace.',
    ],
    features: [
      'Indoor swimming pool and steam room',
      'Lift to all three floors',
      '12-metre reception room',
      'Landscaped garden by Andy Sturgeon',
      'Principal suite with private terrace',
      'Gym and cinema room',
      'Gated carriage drive with four parking spaces',
      'Directly opposite Hampstead Heath',
    ],
    amenities: ['Swimming pool', 'Steam room', 'Gym', 'Cinema room', 'Lift', 'Gated parking', 'Private garden', 'Heath views'],
    images: [
      photo('1613490493576-7fde63acd811'),
      photo('1522708323590-d24dbb6b0267'),
      photo('1600607688969-a5bfcd646154'),
      photo('1600210492486-724fe5c67fb0'),
    ],
    agentId: 'elena-marlowe',
  },
  {
    slug: 'the-linen-house-islington',
    reference: 'MAR-1074',
    title: 'The Linen House',
    address: '88 Almeida Street, Islington N1',
    area: 'Islington',
    city: 'London',
    type: 'House',
    status: 'For sale',
    price: 2_150_000,
    beds: 3,
    baths: 2,
    sqft: 1870,
    year: 1901,
    featured: true,
    tagline: 'A former linen workshop with a glazed garden room.',
    description: [
      'Once a linen workshop, this three-bedroom house on Almeida Street retains its wide industrial windows and exposed brick, softened with oak floors and a calm, neutral palette.',
      'The kitchen and garden room form a single open space at the rear, opening onto a private walled garden. Almeida Theatre, Camden Passage and Highbury & Islington are all within a short walk.',
    ],
    features: [
      'Former workshop with original windows',
      'Glazed garden room',
      'Walled rear garden',
      'Exposed brick and oak floors',
      'Kitchen with concrete worktops',
      'Two bathrooms plus downstairs WC',
      'Close to Almeida Theatre',
      'Chain free',
    ],
    amenities: ['Private garden', 'Chain free', 'Period features', 'Close to transport'],
    images: [
      photo('1570129477492-45c003edd2be'),
      photo('1502672260266-1c1ef2d93688'),
      photo('1600585152220-90363fe7e115'),
      photo('1512918728675-ed5a9ecdebfd'),
    ],
    agentId: 'james-okafor',
  },
  {
    slug: 'shad-thames-loft',
    reference: 'MAR-1080',
    title: 'Shad Thames Loft',
    address: 'Cinnamon Wharf, Shad Thames SE1',
    area: 'Bermondsey',
    city: 'London',
    type: 'Apartment',
    status: 'For rent',
    price: 3_950,
    beds: 2,
    baths: 1,
    sqft: 1240,
    year: 1998,
    featured: false,
    tagline: 'A warehouse loft with river views and a private balcony.',
    description: [
      'A third-floor warehouse conversion with 3.4-metre ceilings, original steel columns and a west-facing balcony looking over the Thames towards Tower Bridge.',
      'The open-plan living space is anchored by a steel and oak kitchen, with two double bedrooms set behind glazed partitions. Offered furnished, available from early December.',
    ],
    features: [
      '3.4-metre ceilings',
      'Original steel columns',
      'West-facing river balcony',
      'Open-plan living and kitchen',
      'Two double bedrooms',
      'Furnished, available December',
      'Lift access',
      'Moments from Tower Bridge',
    ],
    amenities: ['Balcony', 'River views', 'Lift', 'Furnished', 'Warehouse conversion'],
    images: [
      photo('1580587771525-78b9dba3b914'),
      photo('1554995207-c18c203602cb'),
      photo('1600585154526-990dced4db0d'),
      photo('1584622650111-993a426fbf0a'),
    ],
    agentId: 'priya-raman',
  },
  {
    slug: 'larkfield-mews-south-kensington',
    reference: 'MAR-1087',
    title: 'Larkfield Mews',
    address: '6 Larkfield Mews, South Kensington SW7',
    area: 'South Kensington',
    city: 'London',
    type: 'Townhouse',
    status: 'For sale',
    price: 5_600_000,
    beds: 3,
    baths: 3,
    sqft: 2450,
    year: 1986,
    featured: false,
    tagline: 'A discreet mews house with a garage and roof terrace.',
    description: [
      'Tucked away behind a cobbled mews off Old Brompton Road, this house is arranged over three floors with a double garage at ground level — a rarity in SW7.',
      'The first floor holds a reception room with a working fireplace and a separate kitchen, while three bedrooms and a planted roof terrace occupy the upper floors. The Natural History Museum and Gloucester Road are a few minutes away.',
    ],
    features: [
      'Double garage',
      'Cobbled private mews',
      'Working fireplace',
      'Planted roof terrace',
      'Three bedrooms, three bathrooms',
      'Separate kitchen and reception',
      'Close to Gloucester Road',
      'No onward chain',
    ],
    amenities: ['Garage', 'Roof terrace', 'Fireplace', 'Mews location', 'No onward chain'],
    images: [
      photo('1449844908441-8829872d2607'),
      photo('1502005229762-cf1b2da7c5d6'),
      photo('1484154218962-a197022b5858'),
      photo('1584622650111-993a426fbf0a'),
    ],
    agentId: 'elena-marlowe',
  },
  {
    slug: 'richmond-riverside',
    reference: 'MAR-1092',
    title: 'Richmond Riverside',
    address: '12 Riverside Walk, Richmond TW10',
    area: 'Richmond',
    city: 'London',
    type: 'Villa',
    status: 'For sale',
    price: 3_950_000,
    beds: 4,
    baths: 3,
    sqft: 3120,
    year: 2004,
    featured: true,
    tagline: 'A riverside family house with a pool and a lawned garden.',
    description: [
      'A detached family house on a private stretch of the towpath, with a heated pool, a lawned garden and a terrace that catches the evening sun over the river.',
      'The ground floor flows from a bay-fronted sitting room to a garden-facing kitchen and family room. Four bedrooms include two en-suites, and Richmond Park is a fifteen-minute walk.',
    ],
    features: [
      'Heated outdoor pool',
      'Direct river frontage',
      'Lawned garden with terrace',
      'Bay-fronted sitting room',
      'Two en-suite bedrooms',
      'Garden-facing family kitchen',
      'Double garage',
      'Fifteen minutes to Richmond Park',
    ],
    amenities: ['Swimming pool', 'River frontage', 'Garden and terrace', 'Double garage', 'Family kitchen'],
    images: [
      photo('1592595896551-12b371d546d5'),
      photo('1600121848594-d8644e57abab'),
      photo('1600047509807-ba8f99d2cdde'),
      photo('1600210492486-724fe5c67fb0'),
    ],
    agentId: 'james-okafor',
  },
]

export const propertyTypes: PropertyType[] = ['House', 'Apartment', 'Villa', 'Townhouse', 'Penthouse']

export const areas: string[] = Array.from(new Set(properties.map((item) => item.area))).sort()

export const featuredProperties: Property[] = properties.filter((item) => item.featured)

export function getProperty(slug: string | undefined): Property | undefined {
  return properties.find((item) => item.slug === slug)
}

/** Same area, then same type or status — a simple relevance score. */
export function similarProperties(property: Property, limit = 3): Property[] {
  return properties
    .filter((item) => item.slug !== property.slug)
    .map((item) => ({
      item,
      score:
        (item.area === property.area ? 3 : 0) +
        (item.type === property.type ? 2 : 0) +
        (item.status === property.status ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item)
}
