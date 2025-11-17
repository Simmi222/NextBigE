import React, { PropsWithChildren } from 'react'

export default function Card({children, ...rest}: PropsWithChildren<any>){
  return (
    <div className="card" {...rest}>
      {children}
    </div>
  )
}
