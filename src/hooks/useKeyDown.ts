import { useEffect } from "react";
import { useBoard } from "src/hooks";

export function useKeyDown(element: HTMLElement) {
  const { moveDown, moveLeft, moveRight, moveUp } = useBoard();
  useEffect(() => {
    let fired = false;
    function handleKeyDown({ key }: KeyboardEvent) {
      if (fired) return;
      fired = true;
      switch (key) {
        case "ArrowLeft":
          return moveLeft();
        case "ArrowRight":
          return moveRight();
        case "ArrowUp":
          return moveUp();
        case "ArrowDown":
          return moveDown();
      }
    }
    function handleKeyUp() {
      fired = false;
    }
    element.addEventListener("keydown", handleKeyDown);
    element.addEventListener("keyup", handleKeyUp);
    return () => {
      element.removeEventListener("keydown", handleKeyDown);
      element.removeEventListener("keyup", handleKeyUp);
    };
  }, [element, moveDown, moveLeft, moveRight, moveUp]);
}
