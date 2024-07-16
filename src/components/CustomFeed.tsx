import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config"
import { db } from "@/lib/db"
import PostFeed from "./PostFeed"
import { getAuthSession } from "@/lib/auth"

const CustomFeed = async() => {
    const session = await getAuthSession()
    
    const joinedEvents = await db.joinEvent.findMany({
        where: {
            userId: session?.user.id,
        },
        include: {
            event: true,
        }
    })
    const posts = await db.post.findMany({
        where: {
            Event: {
                name: {
                    in: joinedEvents.map(({ event }) => event.id),
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include : {
            author:true,
            comments:true, 
            Event:true
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS
    })
    

    return <PostFeed initialPosts={posts} />
}

export default CustomFeed