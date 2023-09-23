import React from 'react'
import { useCanvas } from './CanvasContext'
import deleteicon from './images/deleteicon.png'
import './Canvas.css'
export const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas()

  return <button class="button" onClick={clearCanvas}  >Clear</button>
}