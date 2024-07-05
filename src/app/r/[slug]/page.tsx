import { PageProps } from "../../../../.next/types/app/layout";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { notFound } from "next/navigation"; 
import MiniCreatePost from "@/components/MiniCreatePost";




interface pageProps {
    params: {
        slug: string
    }
}

const page = async ({params}: PageProps) => {
    const {slug} = params

    const session = await getAuthSession()

    const event = await db.event.findFirst({
        where: {name: slug},
        include:{
            posts: {
                include: {
                    author: true,
                    // comments:true,
                    // event:true,
                },
                take:  INFINITE_SCROLLING_PAGINATION_RESULTS,
            },
        },
    })
    
    if(!event) return notFound()


    return (
    <>
    <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{event.name}
    </h1>
    <MiniCreatePost session={session}/>
    {/*show post in user feed*/}
    </>
    )
}

export default page