import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
    const url = new URL(req.url);

    console.log("Starting GET request handler...");

    let session;
    try {
        session = await getAuthSession();
        console.log("Session retrieved:", session);
    } catch (error) {
        console.error("Error retrieving session:", error);
        return new Response('Could not retrieve session', { status: 500 });
    }

    let joinedEventsIds: string[] = [];

    if (session) {
        try {
            const joinedEvents = await db.joinEvent.findMany({
                where: {
                    userId: session.user.id,
                },
                include: {
                    event: true,
                },
            });
            console.log("Joined events retrieved:", joinedEvents);

            joinedEventsIds = joinedEvents.map((event) => event.event.id);
        } catch (error) {
            console.error("Error fetching joined events:", error);
            return new Response('Could not fetch joined events', { status: 500 });
        }
    }

    try {
        console.log("Parsing request parameters...");
        const { limit, page, eventName } = z
            .object({
                limit: z.string(),
                page: z.string(),
                eventName: z.string().nullish().optional(),
            })
            .parse({
                eventName: url.searchParams.get('eventName'),
                limit: url.searchParams.get('limit'),
                page: url.searchParams.get('page'),
            });

        console.log("Request parameters parsed:", { limit, page, eventName });

        let whereClause = {};

        if (eventName) {
            whereClause = {
                Event: {
                    name: eventName,
                },
            };
        } else if (session) {
            whereClause = {
                Event: {
                    id: {
                        in: joinedEventsIds,
                    },
                },
            };
        }

        console.log("Fetching posts with where clause:", whereClause);
        const posts = await db.post.findMany({
            take: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                Event: true,
                author: true,
                comments: true,
            },
            where: whereClause,
        });

        console.log("Posts retrieved:", posts);
        return new Response(JSON.stringify(posts));
    } catch (error) {
        console.error("Error fetching posts:", error);
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 });
        }

        return new Response('Could not fetch more post', {
            status: 500,
        });
    }
}
