import { getAuthSession } from "@/lib/auth";
import { JoinEventValidator } from '@/lib/validators/event'
import { db } from "@/lib/db";
import { z } from 'zod';
// import { getEventSize } from "@/lib/eventLimit";


  

export async function POST(req: Request) {
    try{
        const session = await getAuthSession()
        if(!session?.user){
            return new Response('Unauthorized', {status: 401})
        }
        const body = await req.json()
        const { eventId } = JoinEventValidator.parse(body)

        //find event 
        const event = await db.event.findUnique({
            where: {id : eventId},
            include: {joinEvent: true}
        })

        if (!event) {
            return new Response('Event not found', { status: 404 });
        }

        // User imit has been reached
        if (event.joinEvent.length >= event.maxParticipants) {
            return new Response('Event is full', { status: 403 });
        }


        const eventExists = await db.joinEvent.findFirst({
            where: {
                eventId,
                userId: session.user.id
            }
        })
        if(eventExists){
            return new Response('You already joined this event', {
                status: 400,
            })
            
        }
        await db.joinEvent.create({
            data: {
                eventId,
                userId: session.user.id
            },
        })

        return new Response(eventId)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response("Invalid data", { status: 422 });
        }
        return new Response('Could not join event please try again later', { status: 500 });

    }
    
}