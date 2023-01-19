import { useEffect, useState } from "react";

const useContextMenu = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [points, setPoints] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const handleClick = () => setClicked(false);
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      setClicked(true);
      setPoints([event.pageX, event.pageY]);
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    }
  }, []);

  return { clicked, setClicked, points, setPoints };
}

export default useContextMenu;
