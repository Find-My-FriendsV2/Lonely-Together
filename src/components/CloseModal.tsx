'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/Button'

// interface CloseModalProps {}

const CloseModal = ({}) => {
  const router = useRouter()

  return (
    <Button variant='subtle' className='h-6 w-6 p-0 rounded-md' onClick={() => router.back()}>
      <X aria-label='close modal' className='h-4 w-4' />
    </Button>
  )
}

export default CloseModal
// 'use client'

// import { useState } from 'react';
// import { X } from 'lucide-react';
// import { Button } from './ui/Button';

// const CloseModal = () => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   if (!isModalOpen) {
//     return null;
//   }

//   return (
//     <div className="modal">
//       {/* Modal content here */}
//       <Button variant='subtle' className='h-6 w-6 p-0 rounded-md' onClick={closeModal}>
//         <X aria-label='close modal' className='h-4 w-4' />
//       </Button>
//     </div>
//   );
// };

// export default CloseModal;
