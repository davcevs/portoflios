import { useState, useRef, ReactNode, CSSProperties } from "react";

interface DraggableProps {
  children: ReactNode;
  position?: { x: number; y: number };
  onStop?: (data: { x: number; y: number }) => void;
}

const Draggable = ({
  children,
  position = { x: 0, y: 0 },
  onStop,
}: DraggableProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(position);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const newX = e.clientX - rect.width / 2;
      const newY = e.clientY - rect.height / 2;
      setDragPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    if (onStop) {
      onStop(dragPosition);
    }
  };

  const style: CSSProperties = {
    position: "absolute",
    left: dragPosition.x,
    top: dragPosition.y,
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
  };

  return (
    <div
      ref={ref}
      style={style}
      onMouseDown={handleMouseDown}
      className="draggable-container"
    >
      {children}
    </div>
  );
};

export default Draggable;
