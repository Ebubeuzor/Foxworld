import React from 'react'
import { useStateContext } from '../context/ContextProvider'

export default function Noticication() {

    const {notification} = useStateContext();

  return (
    <>
    {
        notification.show && (
            <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
            {notification.message}
        </div>)
    }
    </>
    
  )
}
