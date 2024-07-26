// "use client"
// import { FC, startTransition } from 'react'
// import { Button } from './ui/Button'
// import { useMutation } from '@tanstack/react-query'
// import { CreateJoinEventPayload } from '@/lib/validators/event'
// import axios, { AxiosError } from 'axios'
// import { useRouter } from 'next/navigation'
// import { toast } from '@/hooks/use-toast'
// import { useCustomToasts } from '@/hooks/use-custom-toast'

// interface JoinLeaveToggleProps {
//     eventId: string
//     eventName: string
//     isJoined: boolean
// }

// const JoinLeaveToggle: FC<JoinLeaveToggleProps> = ({
//     eventId,
//     eventName,
//     isJoined
// }) => {
//     const { loginToast } = useCustomToasts()
//     const router = useRouter()

//     const {mutate: joinEvent, isLoading: isJoinLoading} = useMutation({
//         mutationFn: async () => {
//             const payload : CreateJoinEventPayload = {
//                 eventId,
//             }
//             // '/api/event/joinevent'
            // const {data} = await axios.post('/api/event/joinevent', payload)
            // return data as string
//         },
//         onError: (err) => {
//             if (err instanceof AxiosError) {
//                 if(err.response?.status === 401) {
//                     return loginToast()
//                 }
//             }
//             return toast({
//                 title: 'There was a problem',
//                 description: 'Something went wrong, please try again',
//                 variant: 'destructive',
//             })
//         },
//         onSuccess: () => {
//             startTransition(() => {
//                 router.refresh()
//             })
//             return toast({
//                 title: 'Joined',
//                 description: `You have now joined ${eventName}`,
//             })
//         },

//     })

    // const {mutate: leaveEvent, isLoading: isLeaveLoading} = useMutation({
    //     mutationFn: async () => {
    //         const payload : CreateJoinEventPayload = {
    //             eventId,
    //         }
    //         // '/api/event/joinevent'
    //         const {data} = await axios.post('/api/event/leaveevent', payload)
    //         return data as string
    //     },
    //     onError: (err) => {
    //         if (err instanceof AxiosError) {
    //             if(err.response?.status === 401) {
    //                 return loginToast()
    //             }
    //         }
    //         return toast({
    //             title: 'There was a problem',
    //             description: 'Something went wrong, please try again',
    //             variant: 'destructive',
    //         })
    //     },
    //     onSuccess: () => {
    //         startTransition(() => {
    //             router.refresh()
    //         })
    //         return toast({
    //             title: 'Left',
    //             description: `You have now left ${eventName}`,
    //         })
    //     },

    // })


//   return isJoined ? (
//   <Button onClick={() => leaveEvent()} isLoading={isLeaveLoading} className='w-full mt-1 md-4'>Leave Event</Button>
// ) : (
//   <Button isLoading={isJoinLoading} onClick={() => joinEvent()} className='w-full mt-1 md-4'>Join Event</Button>
// )
// }

// export default JoinLeaveToggle


"use client"
import { FC, startTransition } from 'react'
import { Button } from './ui/Button'
import { useMutation } from '@tanstack/react-query'
import { CreateJoinEventPayload } from '@/lib/validators/event'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { useCustomToasts } from '@/hooks/use-custom-toast'

interface JoinLeaveToggleProps {
  isJoined: boolean;
  eventId: string;
  eventName: string;
  isEventFull: boolean; // Add this prop
}

const JoinLeaveToggle: FC<JoinLeaveToggleProps> = ({ isJoined, eventId, eventName, isEventFull }) => {
  const { loginToast } = useCustomToasts();
  const router = useRouter()

  const { mutate: joinEvent, isLoading: isJoining } = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/event/joinevent', { eventId });
      return response.data as string;
      // const {data} = await axios.post('/api/event/joinevent', payload)
      // return data as string
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 403) {
        return toast({
          title: 'Event is full',
          description: 'No more participants can join this event.',
          variant: 'destructive',
        });
      }
      if (err.response?.status === 401) {
        return loginToast();
      }
      toast({
        title: 'There was an error',
        description: 'Could not join the event',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
    })
      toast({
        title: 'Joined Event',
        description: 'You have successfully joined the event.',
      });
    },
  });

  const {mutate: leaveEvent, isLoading: isLeaveLoading} = useMutation({
    mutationFn: async () => {
        const payload : CreateJoinEventPayload = {
            eventId,
        }
        // '/api/event/joinevent'
        const {data} = await axios.post('/api/event/leaveevent', payload)
        return data as string
    },
    onError: (err) => {
        if (err instanceof AxiosError) {
            if(err.response?.status === 401) {
                return loginToast()
            }
        }
        return toast({
            title: 'There was a problem',
            description: 'Something went wrong, please try again',
            variant: 'destructive',
        })
    },
    onSuccess: () => {
        startTransition(() => {
            router.refresh()
        })
        return toast({
            title: 'Left',
            description: `You have now left ${eventName}`,
        })
    },

})


  return (
    isJoined ? (
      <Button onClick={() => leaveEvent()} isLoading={isLeaveLoading} className='w-full mt-1 md-4'>Leave Event</Button>
    ) : (
      <Button isLoading={isJoining} onClick={() => joinEvent()} className='w-full mt-1 md-4' disabled={isEventFull}>Join Event</Button>
    )
  );
};

export default JoinLeaveToggle;















// "use client"

// import { FC } from 'react';
// import { Button } from './ui/Button';
// import { useMutation } from '@tanstack/react-query';
// import axios, { AxiosError } from 'axios';
// import { toast } from '@/hooks/use-toast';
// import { useCustomToasts } from '@/hooks/use-custom-toast';

// interface JoinLeaveToggleProps {
//   isJoined: boolean;
//   eventId: string;
//   eventName: string;
//   isEventFull: boolean;
// }

// const JoinLeaveToggle: FC<JoinLeaveToggleProps> = ({ isJoined, eventId, eventName, isEventFull }) => {
//   const { loginToast } = useCustomToasts();

//   const { mutate: joinEvent, isLoading: isJoining } = useMutation({
//     mutationFn: async () => {
//       const response = await axios.post('/api/join-event', { eventId });
//       return response.data as string;
//     },
//     onError: (err: AxiosError) => {
//       if (err instanceof AxiosError) {
//         if (err.response?.status === 403) {
//           return toast({
//             title: 'Event is full',
//             description: 'No more participants can join this event.',
//             variant: 'destructive',
//           });
//         }
//         if (err.response?.status === 401) {
//           return loginToast();
//         }
//       }
//       toast({
//         title: 'There was an error',
//         description: 'Could not join the event',
//         variant: 'destructive',
//       });
//     },
//     onSuccess: (data) => {
//       toast({
//         title: 'Joined Event',
//         description: 'You have successfully joined the event.',
//       });
//     },
//   });

//   return (
//     <Button
//       variant="outline"
//       className="w-full"
//       onClick={() => joinEvent()}
//       isLoading={isJoining}
//       disabled={isEventFull}
//     >
//       {isEventFull ? 'Event Full' : isJoined ? 'Leave Event' : 'Join Event'}
//     </Button>
//   );
// };

// export default JoinLeaveToggle;
