

import { getAuthSession } from "@/lib/auth";
import { JoinEventValidator } from '@/lib/validators/event'
import { db } from "@/lib/db";
import { z } from 'zod';

export async function POST(req: Request) {
    try{
        const session = await getAuthSession()
        if(!session?.user){
            return new Response('Unauthorized', {status: 401})
        }
        const body = await req.json()
        const { eventId } = JoinEventValidator.parse(body)

        const eventExists = await db.joinEvent.findFirst({
            where: {
                eventId,
                userId: session.user.id
            }
        })
        if(!eventExists){
            return new Response('You have not joint this event', {
                status: 400,
            })
            
        }
        const event = await db.event.findFirst({
            where: {
                id: eventId,
                creatorId: session.user.id,
            }
        })

        if(event){
            return new Response('You cant leave your event', {
                status: 400,
            })
        }

        await db.joinEvent.delete({
            where: {
                userId_eventId: {
                    eventId,
                    userId: session.user.id,
                },
            },
        })

        return new Response(eventId)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response("Invalid data", { status: 422 });
        }
        return new Response('Could not leave event please try again later', { status: 500 });

    }
    
}