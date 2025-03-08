import { useState, useEffect } from "react";

const ScrollToTop = () => {
    const [showButton, setShowButton] = useState(false);
    const btnScrollHold = 200;
  
    useEffect(() => {
      const handleScroll = () => {
        setShowButton(window.scrollY > btnScrollHold);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            className={`btn_arriba ${showButton ? "d-block" : ""}`}
            onClick={scrollToTop}
        >
            <i className="bi bi-arrow-up" />
        </button>
    );
}

export default ScrollToTop;