import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "./lenis";

/** Jump to the top on route change (instant, hidden behind the page transition). */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop(true);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
