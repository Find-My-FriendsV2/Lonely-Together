import { FC } from 'react'
import { Button } from './ui/Button'

interface JoinLeaveToggleProps {
  
}

const JoinLeaveToggle: FC<JoinLeaveToggleProps> = ({}) => {
    const isJoined = false
  return isJoined ? (
  <Button className='w-full mt-1 md-4'>Leave Event</Button>
) : (
  <Button className='w-full mt-1 md-4'>Join Event</Button>
)
}

export default JoinLeaveToggle