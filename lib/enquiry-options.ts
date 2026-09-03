export const EXPERIENCE_LABELS = {
  culture: 'Culture & Heritage',
  adventure: 'Adventure',
  food: 'Food & Culinary',
  nature: 'Nature',
  wellness: 'Wellness',
  luxury: 'Luxury Escapes',
  wildlife: 'Wildlife',
  scenic: 'Scenic Journeys',
  'hidden-gems': 'Hidden Gems',
  festivals: 'Festivals & Events',
  active: 'Active Exploration',
  family: 'Family Experiences',
} as const

export const BUDGET_DETAILS = {
  luxury: { title: 'Luxury', range: '₹1–3 Lakhs' },
  signature: { title: 'Signature', range: '₹3–5 Lakhs' },
  prestige: { title: 'Prestige', range: '₹5–10 Lakhs' },
  'ultra-luxury': { title: 'Ultra Luxury', range: '₹10 Lakhs+' },
  flexible: { title: 'Flexible', range: 'Recommend the best fit' },
} as const

export type ExperienceId = keyof typeof EXPERIENCE_LABELS
export type BudgetId = keyof typeof BUDGET_DETAILS

export function isExperienceId(value: string): value is ExperienceId {
  return Object.hasOwn(EXPERIENCE_LABELS, value)
}

export function isBudgetId(value: string): value is BudgetId {
  return Object.hasOwn(BUDGET_DETAILS, value)
}

export function getBudgetLabel(id: BudgetId) {
  const budget = BUDGET_DETAILS[id]
  return `${budget.title} — ${budget.range}`
}
