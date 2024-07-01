import {z} from 'zod'

export const EventValidator = z.object({
    name: z.string().min(3).max(21),
})

export const JoinEventValidator = z.object({
    EventId: z.string()
})

export type CreateEventPayload = z.infer<typeof EventValidator>
export type CreateJoinEventPayload = z.infer<typeof JoinEventValidator>