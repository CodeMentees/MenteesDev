import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/** Scrolls window to top on new route visits, but preserves scroll position on back/forward navigation */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Skip scrolling to top if the user uses the browser back/forward buttons
    if (navType !== "POP") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, navType]);

  return null;
}
