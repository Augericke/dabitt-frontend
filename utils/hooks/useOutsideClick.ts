import React, { useEffect } from "react";

// Trigger callback if a click occurs outside of react element
export const useOutsideClick = (
  ref: React.RefObject<any>,
  callback: () => void,
) => {
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [callback, ref]);
};
