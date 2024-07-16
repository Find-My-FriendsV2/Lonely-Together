import { getAuthSession } from "@/lib/auth";
import { PostValidator } from '@/lib/validators/post'
import { db } from "@/lib/db";
import { z } from 'zod';

export async function POST(req: Request) {
    try{
        const session = await getAuthSession()
        if(!session?.user){
            return new Response('Unauthorized', {status: 401})
        }
        const body = await req.json()
        const { eventId, title, content } = PostValidator.parse(body)

        const eventExists = await db.joinEvent.findFirst({
            where: {
                eventId,
                userId: session.user.id
            }
        })
        if(!eventExists){
            return new Response('Join Event', {
                status: 400,
            })
            
        }
        await db.post.create({
            data: {
                title,
                content,
                authorId: session.user.id,
                eventId
            },
        })

        return new Response(eventId)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response("Invalid data", { status: 422 });
        }
        return new Response('Could not post to event community please try again later', { status: 500 });

    }
    
}