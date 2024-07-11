import type { Post, Event, User, Comment } from '@prisma/client'

export type ExtendedPost = Post & {
  Event: Event
  author: User
  comments: Comment[]
}
