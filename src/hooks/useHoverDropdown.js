import { useState, useRef, useCallback } from 'react';

const useHoverDropdown = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimerRef = useRef(null);

  const handleMouseEnter = useCallback((menuName) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(menuName);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, 200); // 200ms debounce
  }, []);

  const handleClick = useCallback((menuName) => {
    setOpenMenu(prev => (prev === menuName ? null : menuName));
  }, []);

  return {
    openMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    closeTimerRef // Expose ref for external clearing if needed (e.g., on unmount)
  };
};

export default useHoverDropdown;