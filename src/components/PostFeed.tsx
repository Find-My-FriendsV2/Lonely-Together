// 'use client'

// import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
// import { ExtendedPost } from '@/types/db'
// import { useIntersection } from '@mantine/hooks'
// import { useInfiniteQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import { Loader2 } from 'lucide-react'
// import { FC, useEffect, useRef } from 'react'
// import Post from './Post'
// import { useSession } from 'next-auth/react'

// interface PostFeedProps {
//   initialPosts: ExtendedPost[]
//   eventName?: string
// }

// const PostFeed: FC<PostFeedProps> = ({ initialPosts, eventName }) => {
//   const lastPostRef = useRef<HTMLElement>(null)
//   const { ref, entry } = useIntersection({
//     root: lastPostRef.current,
//     threshold: 1,
//   })
//   const { data: session } = useSession()


//   const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
//     ['infinite-query'],
//     async ({ pageParam = 1 }) => {
//       const query =
//         `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
//         (!!eventName ? `&eventName=${eventName}` : '')

//       const { data } = await axios.get(query)
//       return data as ExtendedPost[]
//     },

//     {
//       getNextPageParam: (_, pages) => {
//         return pages.length + 1
//       },
//       initialData: { pages: [initialPosts], pageParams: [1] },
//     }
//   )

//   useEffect(() => {
//     if (entry?.isIntersecting) {
//       fetchNextPage() // Load more posts when the last post comes into view
//     }
//   }, [entry, fetchNextPage])

//   const posts = data?.pages.flatMap((page) => page) ?? initialPosts

//   return (
//     <ul className='flex flex-col col-span-2 space-y-6'>
//       {posts.map((post, index) => {
//         if (index === posts.length - 1) {
//           // Add a ref to the last post in the list
//           return (
//             <li key={post.id} ref={ref}>
//               <Post
//                 post={post}
//                 commentAmt={post.comments.length}
//                 eventName={post.Event.name}
//               />
//             </li>
//           )
//         } else {
//           return (
//             <Post
//               key={post.id}
//               post={post}
//               commentAmt={post.comments.length}
//               eventName={post.Event.name}
//             />
//           )
//         }
//       })}

//       {isFetchingNextPage && (
//         <li className='flex justify-center'>
//           <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
//         </li>
//       )}
//     </ul>
//   )
// }

// export default PostFeed

'use client'

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { ExtendedPost } from '@/types/db'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useRef } from 'react'
import Post from './Post'
import { useSession } from 'next-auth/react'

interface PostFeedProps {
  initialPosts: ExtendedPost[]
  eventName?: string
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, eventName }) => {
  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })
  const { data: session } = useSession()

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (eventName ? `&eventName=${eventName}` : '')

      const { data } = await axios.get(query)
      return data as ExtendedPost[]
    },
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage() // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts

  return (
    <ul className='flex flex-col col-span-2 space-y-6'>
      {posts.map((post, index) => (
        <li key={index} ref={index === posts.length - 1 ? ref : null}>
          <Post
            post={post}
            commentAmt={post.comments.length}
            eventName={post.Event.name}
          />
        </li>
      ))}
      {isFetchingNextPage && (
        <li className='flex justify-center'>
          <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
        </li>
      )}
      {!session && (
        <li className="flex justify-center text-center">
          <p>Please log in to view and post comments.</p>
        </li>
      )}
    </ul>
  )
}

export default PostFeed