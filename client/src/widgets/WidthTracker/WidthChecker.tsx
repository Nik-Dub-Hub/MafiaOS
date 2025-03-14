import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const MAX_ALLOWED_WIDTH = 768; 

export default function WidthChecker() {
  const navigate = useNavigate();
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MAX_ALLOWED_WIDTH && !isRedirected) {
        navigate("/tooWide");
        setIsRedirected(true);
      } else if (window.innerWidth <= MAX_ALLOWED_WIDTH && isRedirected) {
        navigate(-1);
        setIsRedirected(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate, isRedirected]);

  return null;
}
