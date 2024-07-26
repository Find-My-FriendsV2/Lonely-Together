import {z} from 'zod'

export const TestEventValidator = z.object({
  name: z.string().min(3).max(128),
  description: z.string().min(3).max(500),
  location: z.string().min(3).max(256),
  startDateTime: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: "Invalid datetime",
  }),
  endDateTime: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: "Invalid datetime",
  }),
  maxParticipants: z.number().int().min(1).max(20),
  rsvpDeadline: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: "Invalid datetime",
  }),
  eventType: z.enum(['ONLINE', 'IN_PERSON', 'HYBRID']),
  visibility: z.enum(['PUBLIC', 'PRIVATE', 'FRIENDS_ONLY']),
});



export const JoinEventValidator = z.object({
    eventId: z.string()
})



export type CreateEventPayload1 = z.infer<typeof TestEventValidator>
export type CreateJoinEventPayload = z.infer<typeof JoinEventValidator>