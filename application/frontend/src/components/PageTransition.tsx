import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// Add to your global CSS
const pageTransitionStyles = `
  @keyframes slideFromTop {
    from { transform: translateY(-100vh); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .page-transition {
    animation: slideFromTop 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = pageTransitionStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
}
