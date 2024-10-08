// import { getAuthSession } from '@/lib/auth'
// import { db } from '@/lib/db'
// import { Comment, User } from '@prisma/client'
// import PostComment from './PostComment'
// import CreateComment from './CreateComment'
// // import CreateComment from './CreateComment'


// type ExtendedComment = Comment & {
//   author: User
//   replies: ReplyComment[]
// }

// type ReplyComment = Comment & {
//   author: User
// }

// interface CommentsSectionProps {
//   postId: string
//   comments: ExtendedComment[]
// }

// const CommentsSection = async ({ postId }: CommentsSectionProps) => {
//   const session = await getAuthSession()

//   const comments = await db.comment.findMany({
//     where: {
//       postId: postId,
//       replyToId: null, // only fetch top-level comments
//     },
//     include: {
//       author: true,
//       replies: {
//         // first level replies
//         include: {
//           author: true,
//         },
//       },
//     },
//   })

//   return (
//     <div className='flex flex-col gap-y-4 mt-4'>
//       <hr className='w-full h-px my-6' />

//       <CreateComment postId={postId} />

//       <div className='flex flex-col gap-y-6 mt-4'>
//         {comments
//           .filter((comment) => !comment.replyToId)
//           .map((topLevelComment) => (
//             <div key={topLevelComment.id} className='flex flex-col'>
//               <div className='mb-2'>
//                 <PostComment
//                   comment={topLevelComment}
//                   postId={postId}
//                 />
//               </div>

//               {/* Render replies */}
//               {topLevelComment.replies
//                 .map((reply) => (
//                   <div
//                     key={reply.id}
//                     className='ml-2 py-2 pl-4 border-l-2 border-zinc-200'>
//                     <PostComment
//                       comment={reply}
//                       postId={postId}
//                     />
//                   </div>
//                 ))}
//             </div>
//           ))}
//       </div>
//     </div>
//   )
// }

// export default CommentsSection

import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { Comment, User } from '@prisma/client'
import CreateComment from './CreateComment'
import PostComment from './PostComment'

type ExtendedComment = Comment & {
  author: User
  replies: ReplyComment[]
}

type ReplyComment = Comment & {
  author: User
}

interface CommentsSectionProps {
  postId: string
  comments: ExtendedComment[]
}

const CommentsSection = async ({ postId }: CommentsSectionProps) => {
  const session = await getAuthSession()

  const comments = await db.comment.findMany({
    where: {
      postId: postId,
      replyToId: null, // only fetch top-level comments
    },
    include: {
      author: true,
      replies: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc', // sort by creation date in descending order
    },
  })

  return (
    <div className='flex flex-col gap-y-4 mt-4'>
      <hr className='w-full h-px my-6' />

      <CreateComment postId={postId} />

      <div className='flex flex-col gap-y-6 mt-4'>
        {comments.map((topLevelComment) => {
          return (
            <div key={topLevelComment.id} className='flex flex-col'>
              <div className='mb-2'>
                <PostComment
                  comment={topLevelComment}
                  postId={postId}
                />
              </div>

              {/* Render replies */}
              {topLevelComment.replies.map((reply) => {
                return (
                  <div
                    key={reply.id}
                    className='ml-2 py-2 pl-4 border-l-2 border-zinc-200'>
                    <PostComment
                      comment={reply}
                      postId={postId}
                    />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CommentsSection
