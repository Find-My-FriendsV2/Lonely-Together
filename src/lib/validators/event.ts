import {z} from 'zod'

export const EventValidator = z.object({
    name: z.string().min(3).max(1000),
})

export const JoinEventValidator = z.object({
    eventId: z.string()
})

export type CreateEventPayload = z.infer<typeof EventValidator>
export type CreateJoinEventPayload = z.infer<typeof JoinEventValidator>