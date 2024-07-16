// import CommentsSection from '@/components/CommentsSection'
import EditorOutput from '@/components/EditorOutput'

import { buttonVariants } from '@/components/ui/Button'
import { db } from '@/lib/db'
import { redis } from '@/lib/redis'
import { formatTimeToNow } from '@/lib/utils'
import { CachedPost } from '@/types/redis'
import { Post, User } from '@prisma/client'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import CommentsSection from '@/components/CommentsSection'

interface PageProps {
  params: {
    postId: string;
  };
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const Page = async ({ params }: PageProps) => {
  const cachedPost = (await redis.hgetall(`post:${params.postId}`)) as CachedPost;

  let post: (Post & { author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        author: true,
      },
    });
  }

  if (!post && !cachedPost) return notFound();

  return (
    <div>
      <div className="h-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
        <div className="sm:w-0 w-full flex-1 bg-white p-4 rounded-sm">
          <p className="max-h-40 mt-1 truncate text-xs text-gray-500">
            Posted by u/{post?.author.username ?? cachedPost.authorUsername}{' '}
            {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
          </p>
          <h1 className="text-xl font-semibold py-2 leading-6 text-gray-900">
            {post?.title ?? cachedPost.title}
          </h1>
          <EditorOutput content={post?.content ?? cachedPost.content} />
          <Suspense fallback={<Loader2 className="h-5 w-5 animate-spin text-zinc-500" />}>
            {/* @ts-expect-error Server Component */}
            <CommentsSection postId={post?.id ?? cachedPost.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
