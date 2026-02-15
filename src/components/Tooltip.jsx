import { useState, useEffect, useRef } from 'react';
import { X, Info, BookOpen } from 'lucide-react';

// Tooltip Component for hover/click interactions
export function Tooltip({ children, content, position = 'top', delay = 300, trigger = 'hover' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = triggerRect.top + scrollY - tooltipRect.height - 10;
          left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'bottom':
          top = triggerRect.bottom + scrollY + 10;
          left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'left':
          top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
          left = triggerRect.left + scrollX - tooltipRect.width - 10;
          break;
        case 'right':
          top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
          left = triggerRect.right + scrollX + 10;
          break;
        default:
          top = triggerRect.top + scrollY - tooltipRect.height - 10;
          left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
      }

      // Keep tooltip within viewport
      const padding = 10;
      if (left < padding) left = padding;
      if (left + tooltipRect.width > window.innerWidth - padding) {
        left = window.innerWidth - tooltipRect.width - padding;
      }
      if (top < padding) top = padding;
      if (top + tooltipRect.height > window.innerHeight + scrollY - padding) {
        top = triggerRect.bottom + scrollY + 10;
      }

      setTooltipPosition({ top, left });
    }
  }, [isVisible, position]);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible);
    }
  };

  return (
    <>
      <span
        ref={triggerRef}
        className="tooltip-trigger"
        onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
        onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
        onClick={handleClick}
        style={{ cursor: trigger === 'click' ? 'pointer' : 'default' }}
      >
        {children}
      </span>
      {isVisible && content && (
        <div
          ref={tooltipRef}
          className={`tooltip tooltip-${position}`}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
          onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
          onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
        >
          <div className="tooltip-content">
            {typeof content === 'string' ? (
              <p>{content}</p>
            ) : (
              content
            )}
          </div>
          {trigger === 'click' && (
            <button className="tooltip-close" onClick={hideTooltip}>
              <X size={14} />
            </button>
          )}
          <div className={`tooltip-arrow tooltip-arrow-${position}`}></div>
        </div>
      )}
    </>
  );
}

// Popover Component for detailed information
export function Popover({ children, title, content, position = 'bottom', isOpen, onClose }) {
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && popoverRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = triggerRect.top + scrollY - popoverRect.height - 15;
          left = triggerRect.left + scrollX + (triggerRect.width / 2) - (popoverRect.width / 2);
          break;
        case 'bottom':
          top = triggerRect.bottom + scrollY + 15;
          left = triggerRect.left + scrollX + (triggerRect.width / 2) - (popoverRect.width / 2);
          break;
        case 'left':
          top = triggerRect.top + scrollY + (triggerRect.height / 2) - (popoverRect.height / 2);
          left = triggerRect.left + scrollX - popoverRect.width - 15;
          break;
        case 'right':
          top = triggerRect.top + scrollY + (triggerRect.height / 2) - (popoverRect.height / 2);
          left = triggerRect.right + scrollX + 15;
          break;
        default:
          top = triggerRect.bottom + scrollY + 15;
          left = triggerRect.left + scrollX + (triggerRect.width / 2) - (popoverRect.width / 2);
      }

      // Keep popover within viewport
      const padding = 15;
      if (left < padding) left = padding;
      if (left + popoverRect.width > window.innerWidth - padding) {
        left = window.innerWidth - popoverRect.width - padding;
      }
      if (top < padding) top = padding;
      if (top + popoverRect.height > window.innerHeight + scrollY - padding) {
        top = triggerRect.top + scrollY - popoverRect.height - 15;
      }

      setPopoverPosition({ top, left });
    }
  }, [isOpen, position]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  return (
    <>
      <span ref={triggerRef} className="popover-trigger">
        {children}
      </span>
      {isOpen && (
        <div
          ref={popoverRef}
          className={`popover popover-${position}`}
          style={{
            top: `${popoverPosition.top}px`,
            left: `${popoverPosition.left}px`,
          }}
        >
          <div className="popover-header">
            {title && (
              <div className="popover-title">
                <Info size={16} />
                <span>{title}</span>
              </div>
            )}
            <button className="popover-close" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
          <div className="popover-content">
            {typeof content === 'string' ? (
              <p>{content}</p>
            ) : (
              content
            )}
          </div>
          <div className={`popover-arrow popover-arrow-${position}`}></div>
        </div>
      )}
    </>
  );
}

export default Tooltip;

