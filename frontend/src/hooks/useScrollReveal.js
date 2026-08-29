import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useScrollReveal — observes elements with .reveal / .reveal-stagger / .reveal-scale /
 * .reveal-left / .reveal-right classes and adds .revealed when they enter the viewport.
 * Runs on every route change so newly mounted pages get animated too.
 */
export default function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // Small delay so DOM has fully painted before we observe
    const timer = setTimeout(() => {
      const selectors = [".reveal", ".reveal-stagger", ".reveal-scale", ".reveal-left", ".reveal-right"];
      const elements = document.querySelectorAll(selectors.join(","));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target); // animate once
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 80);

    return () => clearTimeout(timer);
  }, [location.pathname]);
}
