import { useEffect, useState } from 'react';
import { GoArrowUp } from 'react-icons/go';

function ScrollTop() {
  const [tabPosition, setTabPosition] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const element = document.getElementById('tabs');

    const domRect = element?.getBoundingClientRect();
    setTabPosition(domRect?.top || 0);

    const updatePosition = () => setShowScrollTop(window.pageYOffset > tabPosition);

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  const handleScroll = () => window.scrollTo(0, 0);

  return (
    <div
      className={`scroll-top ${showScrollTop ? 'show' : ''}`}
      onClick={handleScroll}
      data-testid="scroll-top"
      onKeyPress={() => {}}
      role="none"
    >
      <GoArrowUp className="icon" />
    </div>
  );
}

export default ScrollTop;
