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
    eventId: string
    eventName: string
    isJoined: boolean
}

const JoinLeaveToggle: FC<JoinLeaveToggleProps> = ({
    eventId,
    eventName,
    isJoined
}) => {
    const { loginToast } = useCustomToasts()
    const router = useRouter()

    const {mutate: joinEvent, isLoading: isJoinLoading} = useMutation({
        mutationFn: async () => {
            const payload : CreateJoinEventPayload = {
                eventId,
            }
            // '/api/event/joinevent'
            const {data} = await axios.post('/api/event/joinevent', payload)
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
                title: 'Joined',
                description: `You have now joined ${eventName}`,
            })
        },

    })

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




  return isJoined ? (
  <Button onClick={() => leaveEvent()} isLoading={isLeaveLoading} className='w-full mt-1 md-4'>Leave Event</Button>
) : (
  <Button isLoading={isJoinLoading} onClick={() => joinEvent()} className='w-full mt-1 md-4'>Join Event</Button>
)
}

export default JoinLeaveToggle