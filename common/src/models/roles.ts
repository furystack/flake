export const roles = ['terms-accepted', 'admin'] as const

export type Role = typeof roles[number]
