"use client"

import { FC } from 'react'
import { User } from 'next-auth'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from './ui/dropdown-menu'
import UserAvatar from './UserAvatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'


interface UserAcountNavigationProps {
  user: Pick< User, 'name' |'image' | 'email'>
}

const UserAcountNavigation: FC<UserAcountNavigationProps> = ({user}) => {

  const handleSignnOut = (event: { preventDefault: any }) =>{
    event.preventDefault
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`
    })
  }
  return <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar 
            className='h-8 w-8'
            user={{
              name: user.name || null,
              image: user.image || null
            }} 
            />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white' align='end'>
              <div className='flex items-center justify-start gap-2 p-2'>
                <div className='flex flex-col space-y-1 leading-none'>
                  {user.name && <p className='font-medium'>{user.name}</p>}
                  {user.email && <p className='w-[200px] truncate text-sm text-zinc-700'>{user.email}</p>}
                </div>
              </div>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href='/'>feed</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/r/create'>create an event</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/settings'>Settings</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onSelect={handleSignnOut}className='cursor-pointer'>
                Sign Out
              </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
}

export default UserAcountNavigation