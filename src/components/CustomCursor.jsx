import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use a ref to track visibility inside event callbacks without
  // re-registering listeners every time isVisible changes.
  // Bug fixed: the original used [isVisible] as a dep, causing
  // the effect to tear down and re-attach listeners on every
  // mouse-enter/leave, creating a brief window with no listeners.
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Only activate on fine-pointer devices (mouse, not touch)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    const handleElementHover = (e) => {
      const target = e.target.closest(
        "a, button, input, select, textarea, .interactive",
      );
      setIsHovering(!!target);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleElementHover);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleElementHover);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []); // Empty deps: listeners registered once, visibility managed via ref

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot — snaps instantly to cursor position */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          backgroundColor: "#C5A028",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 400 /* --z-cursor */,
          mixBlendMode: "difference",
        }}
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />

      {/* Outer ring — follows with spring lag */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          border: "1px solid rgba(197, 160, 40, 0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 399 /* just below inner dot */,
        }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering
            ? "rgba(197, 160, 40, 0.1)"
            : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />
    </>
  );
}
