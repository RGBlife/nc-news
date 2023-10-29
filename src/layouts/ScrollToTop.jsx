import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowScrollToTopBtn(true);
      } else {
        setShowScrollToTopBtn(false);
      }
    });
  }, []);

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showScrollToTopBtn ? (
        <button onClick={backToTop} className="active:bg-[#b42a56] text-white font-semibold h-[45px] w-[45px] hover:bg-[#c42e5e] focus:ring hover:shadow-lg shadow-md rounded-full bg-[#D83367] fixed z-20 right-6 bottom-10">
          ↑
        </button>
      ) : null}
    </>
  );
};

export default ScrollToTop;
