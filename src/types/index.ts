export interface JobResult {
  id: string
  collection: string
  data: Job
}
export interface Job {
  [x: string]: any
  title: string
  description: string
  role: string
  company: string
  earnedSkills: string[]
  location?: string
  startDate: Date
  endDate?: Date
}

export interface Certificate {
  title: string
  description: string
  link: string
  earnedSkills: string[]
  date: Date
  draft: boolean
}

export interface Spec {
  title: string
  description: string
  comments: boolean
}

export interface Project {
  title: string
  description: string
  image: string
  link: string
}

export interface Post {
  title: string
  date: Date
  lastMod: Date
  summary: string
  cover: string
  category: string
  tags: string[]
  comments: boolean
  draft: boolean
  sticky: number
}

export interface Publication {
  title: string
  description?: string
  link: string
  date: Date
}
export interface Result<T> {
  id: string
  collection: string
  data: T
}
