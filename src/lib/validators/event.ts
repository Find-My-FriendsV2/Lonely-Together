import {z} from 'zod'

export const TestEventValidator = z.object({
  name: z.string().min(3).max(128),
  description: z.string().min(3).max(500),
  location: z.string().min(3).max(256), // Increased max length for addresses
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
  maxParticipants: z.number().int().min(1).max(20), // Max limit set to 20
  currentParticipants: z.number().int().min(0).max(20), // Max limit set to 20
  rsvpDeadline: z.string().datetime(),
  status: z.enum(['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED']),
  eventType: z.enum(['ONLINE', 'IN_PERSON', 'HYBRID']),
  visibility: z.enum(['PUBLIC', 'PRIVATE', 'FRIENDS_ONLY']),
  eventImage: z.string().url().optional(), // URL validation for image
//   tags: z.array(z.string().min(1).max(32)).optional(), // Array of tags
});

export const JoinEventValidator = z.object({
    eventId: z.string()
})

export const EventValidator = z.object({
    name: z.string().min(3).max(128),
})

export type CreateEventPayload = z.infer<typeof EventValidator>
export type CreateJoinEventPayload = z.infer<typeof JoinEventValidator>