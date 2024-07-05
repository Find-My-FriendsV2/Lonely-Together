import { getAuthSession } from "@/lib/auth";
import { db } from '@/lib/db';
import { EventValidator } from "@/lib/validators/event";
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name } = EventValidator.parse(body);

        const eventExists = await db.event.findFirst({
            where: {
                name,
            },
        });

        if (eventExists) {
            return new Response('Event already exists', { status: 409 });
        }

        const event = await db.event.create({
            data: {
                name,
                creatorId: session.user.id,
            },
        });

        await db.joinEvent.create({
            data: {
                userId: session.user.id,
                eventId: event.id,
            },
        });

        return new Response(event.name);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 });
        }
        return new Response('Could not create event', { status: 500 });
    }
}
