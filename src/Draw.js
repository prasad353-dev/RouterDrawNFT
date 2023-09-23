import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  let ctx = null;

  useEffect(() => {
    ctx = canvasRef.current.getContext('2d');
    canvasRef.current.addEventListener('mousedown', startDrawing);
    canvasRef.current.addEventListener('mousemove', draw);
    canvasRef.current.addEventListener('mouseup', stopDrawing);
    canvasRef.current.addEventListener('mouseleave', stopDrawing);

    return () => {
      canvasRef.current.removeEventListener('mousedown', startDrawing);
      canvasRef.current.removeEventListener('mousemove', draw);
      canvasRef.current.removeEventListener('mouseup', stopDrawing);
      canvasRef.current.removeEventListener('mouseleave', stopDrawing);
    };
  }, []);

  const startDrawing = (e) => {
    setDrawing(true);
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  }

  const draw = (e) => {
    if (!drawing) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  }

  const stopDrawing = () => {
    setDrawing(false);
    ctx.closePath();
  }

  return (
    <div>
      <h1>Whiteboard</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        style={{ border: '1px solid black' }}
      ></canvas>
    </div>
  );
}

export default App;
