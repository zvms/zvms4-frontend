export interface SocialPractice {
  name: string
  origin: string // Department
  charger: string // Person in Charge, ObjectId
  content: string // Practice Content, Support `Markdown`, planning to support $\LATEX{}$
  validity: string // Register Deadline, ISO 8601
  status: 'pending' | 'effective' | 'refused'
}
