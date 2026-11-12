export type LeadInput = {
  name: string
  email: string
  phone: string
  interest: 'Buying' | 'Renting' | 'Selling' | 'General enquiry'
  message: string
  propertyRef?: string
  propertyTitle?: string
}

export type Lead = LeadInput & {
  id: string
  createdAt: string
}

const STORAGE_KEY = 'marlowe-leads'
const MAX_STORED = 50

/**
 * This demo site has no backend, so enquiries are kept in the visitor's own
 * browser. Swapping this function for a POST to your CRM endpoint is the only
 * change needed to capture leads server-side.
 */
export function saveLead(input: LeadInput): Lead {
  const lead: Lead = {
    ...input,
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
  }

  try {
    const existing = readLeads()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([lead, ...existing].slice(0, MAX_STORED)))
  } catch {
    // Private browsing or a full quota should never block the confirmation.
  }

  return lead
}

export function readLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Lead[]) : []
  } catch {
    return []
  }
}
