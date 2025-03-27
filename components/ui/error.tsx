import { InfoIcon } from 'lucide-react'
import React, { ReactNode } from 'react'

const ErrorMessage = ({children}: {children: ReactNode}) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="text-center p-4 text-red-800 bg-red-200 rounded-sm flex items-centere justify-start gap-4 w-max">
        <InfoIcon className='text-red-800' size={24} /> {children}
      </div>
    </div>
  )
}

export default ErrorMessage