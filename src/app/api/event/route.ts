// import { getAuthSession } from "@/lib/auth";
// import { db } from '@/lib/db';
// import { TestEventValidator } from "@/lib/validators/event";
// import { z } from 'zod';
// // import { getEventSize } from "@/lib/eventLimit";



// export async function POST(req:Request) {
//     try {
//         const session = await getAuthSession();

//         if (!session?.user) {
//             return new Response("Unauthorized", { status: 401 });
//         }
        
//         const body = await req.json();
//         const { name, description, location, startDateTime, endDateTime, maxParticipants, rsvpDeadline, eventType, visibility,} = TestEventValidator.parse(body);
       
        
//         // const eventSize = getEventSize(maxParticipants);

//         const eventExists = await db.event.findFirst({
//             where: {
//                 name,
//                 description,
//                 location,
//                 startDateTime,
//                 endDateTime,
//                 maxParticipants,
//                 rsvpDeadline,
//                 eventType,
//                 visibility,
//             },
//         });

//         if (eventExists) {
//             return new Response('Event already exists', { status: 409 });
//         }

//         const event = await db.event.create({
//             data: {
//                 name,
//                 description,
//                 location,
//                 startDateTime,
//                 endDateTime,
//                 maxParticipants,
//                 rsvpDeadline,
//                 eventType,
//                 visibility,
//                 creatorId: session.user.id,
//             },
//         });


//         await db.joinEvent.create({
//             data: {
//                 userId: session.user.id,
//                 eventId: event.id,
//             },
//         });

//         return new Response(event.name);
//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             return new Response(error.message, { status: 422 });
//         }
//         return new Response('Could not create event', { status: 500 });
//     }
// }

// pages/api/event.ts
import { getAuthSession } from "@/lib/auth";
import { TestEventValidator } from '@/lib/validators/event';
import { db } from "@/lib/db";
import { getEventSize } from '@/lib/eventSize';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const  { name, description, location, startDateTime, endDateTime, maxParticipants, rsvpDeadline, eventType, visibility } = TestEventValidator.parse(body);


        // Calculate event size based on participants
        const eventSize = getEventSize(maxParticipants);

        // Check if the event already exists
        const eventExists = await db.event.findFirst({
            where: {                 
                name,
                description,
                location,
                startDateTime: new Date(startDateTime),
                endDateTime: new Date(endDateTime),
                maxParticipants,
                eventSize,
                rsvpDeadline: new Date(rsvpDeadline),
                eventType,
                visibility,
             },
        });

        if (eventExists) {
            return new Response('Event already exists', { status: 409 });
        }

        // Create the event
        const event = await db.event.create({
            data: {
                name,
                description,
                location,
                startDateTime: new Date(startDateTime),
                endDateTime: new Date(endDateTime),
                maxParticipants,
                eventSize,
                rsvpDeadline: new Date(rsvpDeadline),
                eventType,
                visibility,
                creatorId: session.user.id,
            },
        });

        await db.joinEvent.create({
            data: {
                userId: session.user.id,
                eventId: event.id,
            },
        });

        return new Response(JSON.stringify(event.name), { status: 201 });
    } catch (error) {
        console.error('Error creating event:', error);
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 });
        }
        return new Response('Could not create event', { status: 500 });
    }
}
