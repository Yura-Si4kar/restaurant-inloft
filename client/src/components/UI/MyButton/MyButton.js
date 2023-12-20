import React from 'react'
import { Button } from 'react-bootstrap'

export default function MyButton({children, ...props}) {
  return (
      <Button {...props}>{ children }</Button>
  )
}
