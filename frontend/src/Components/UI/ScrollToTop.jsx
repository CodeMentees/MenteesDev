import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls window to top on every route change — fixes issue #5 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
