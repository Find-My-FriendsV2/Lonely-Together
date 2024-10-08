// import { getAuthSession } from "@/lib/auth";
// import { db } from "@/lib/db";
// import { notFound } from "next/navigation";
// import { format } from "date-fns";
// import JoinLeaveToggle from "@/components/JoinLeaveToggle";
// import { buttonVariants } from "@/components/ui/Button";
// import Link from "next/link";

// const Layout = async ({
//   children,
//   params: { slug },
// }: {
//   children: React.ReactNode;
//   params: { slug: string };
// }) => {
//   const session = await getAuthSession();

//   const event = await db.event.findFirst({
//     where: {
//       name: slug,
//     },
//     include: {
//       posts: {
//         include: {
//           author: true,
//         },
//       },
//       joinEvent: true,
//     },
//   });

//   if (!event) return notFound();

//   const joinEvent = session?.user
//     ? await db.joinEvent.findFirst({
//         where: {
//           event: {
//             name: slug,
//           },
//           user: {
//             id: session.user.id,
//           },
//         },
//       })
//     : undefined;

//   const isJoinEvent = !!joinEvent;
//   const memberCount = event.joinEvent.length;
//   const isEventFull = memberCount >= event.maxParticipants;

//   // const memberCount = await db.joinEvent.count({
//   //   where: {
//   //     event: {
//   //       name: slug,
//   //     },
//   //   },
//   // });

//   return (
//     <div className="sm:container max-w-7xl mx-auto h-full pt-12">
//       <div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
//           <div className="flex flex-col col-span-2 space-y-6">{children}</div>
//           <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
//             <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
//               <p className="font-semibold py-3">About E/{event.name}</p>
//               <div className="flex justify-between gap-x-4 py-3">
//                 <dd className="text-gray-500">Created</dd>
//                 <dd className="text-gray-700">
//                   <time dateTime={event.createdAt.toDateString()}>
//                     {format(event.createdAt, "MMM d, yyyy")}
//                   </time>
//                 </dd>
//               </div>
//               <div className="flex justify-between gap-x-4 py-3">
//                 <dt className="text-gray-500">Members</dt>
//                 <dd className="text-gray-700">
//                   <div className="text-gray-900">{memberCount}</div>
//                 </dd>
//               </div>
//               {event.creatorId === session?.user.id ? (
//                 <div className="flex justify-between gap-x-4 py-3">
//                   <p className="text-gray-500">You Created this event</p>
//                 </div>
//               ) : null}

//               {event.creatorId !== session?.user.id ? (
//                 <JoinLeaveToggle
//                   isJoined={isJoinEvent}
//                   eventId={event.id}
//                   eventName={event.name}
//                   isEventFull={isEventFull}
//                 />
//               ) : null}

//               <Link
//                 className={buttonVariants({
//                   variant: "outline",
//                   className: "w-full mb-6",
//                 })}
//                 href={`/r/${slug}/submit`}
//               >
//                 Create Post
//               </Link>
//             </dl>
//             <div className="px-6 py-4">
//               <p className="font-semibold py-3">Additional Event Information</p>
//               <p className="font-semibold py-3">
//                 Start Date:{" "}
//                 {format(new Date(event.startDateTime), "MMM d, yyyy HH:mm")}
//               </p>
//               <p className="font-semibold py-3">
//                 End Date:{" "}
//                 {format(new Date(event.endDateTime), "MMM d, yyyy HH:mm")}
//               </p>
//               <p className="font-semibold py-3">
//                 RSVP Deadline:{" "}
//                 {format(new Date(event.rsvpDeadline), "MMM d, yyyy HH:mm")}
//               </p>
//               <p className="font-semibold py-3">Location: {event.location}</p>
//               <p className="font-semibold py-3">
//               Maximum Participants: {event.maxParticipants}
//               </p>
//               <p className="font-semibold py-3">Event Type: {event.eventType}</p>
//               <p className="font-semibold py-3">Event Visibility: {event.visibility}</p>
//               <p className="font-semibold py-3">Event Description: {event.description}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;


import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import JoinLeaveToggle from "@/components/JoinLeaveToggle";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";

// Modify the Layout
const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();

  // Fetch the event details
  const event = await db.event.findFirst({
    where: { name: slug },
    include: { posts: { include: { author: true } }, joinEvent: true }
  });

  if (!event) return notFound();

  // Check if user has already joined the event
  const joinEvent = session?.user
    ? await db.joinEvent.findFirst({
        where: { event: { name: slug }, user: { id: session.user.id } },
      })
    : undefined;

  const isJoinEvent = !!joinEvent;
  const memberCount = event.joinEvent.length;
  const isEventFull = memberCount >= event.maxParticipants;

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <p className="font-semibold py-3">About E/{event.name}</p>
              <div className="flex justify-between gap-x-4 py-3">
                <dd className="text-gray-500">Created</dd>
                <dd className="text-gray-700">
                  <time dateTime={event.createdAt.toDateString()}>
                    {format(event.createdAt, "MMM d, yyyy")}
                  </time>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Members</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">{memberCount}</div>
                </dd>
              </div>
              {event.creatorId === session?.user.id ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <p className="text-gray-500">You Created this event</p>
                </div>
              ) : null}

              {event.creatorId !== session?.user.id ? (
                <JoinLeaveToggle
                  isJoined={isJoinEvent}
                  eventId={event.id}
                  eventName={event.name}
                  isEventFull={isEventFull} // Pass if the event is full
                />
              ) : null}

              <Link
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full mb-6",
                })}
                href={`/r/${slug}/submit`}
              >
                Create Post
              </Link>
            </dl>
            <div className="px-6 py-4">
              <p className="font-semibold py-3">Additional Event Information</p>
              <p className="font-semibold py-3">
                Start Date:{" "}
                {format(new Date(event.startDateTime), "MMM d, yyyy HH:mm")}
              </p>
              <p className="font-semibold py-3">
                End Date:{" "}
                {format(new Date(event.endDateTime), "MMM d, yyyy HH:mm")}
              </p>
              <p className="font-semibold py-3">
                RSVP Deadline:{" "}
                {format(new Date(event.rsvpDeadline), "MMM d, yyyy HH:mm")}
              </p>
              <p className="font-semibold py-3">Location: {event.location}</p>
              <p className="font-semibold py-3">
                Maximum Participants: {event.maxParticipants}
              </p>
              <p className="font-semibold py-3">Event Type: {event.eventType}</p>
              <p className="font-semibold py-3">Event Visibility: {event.visibility}</p>
              <p className="font-semibold py-3">Event Description: {event.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
