import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { animated, Transition, useSpring } from "react-spring";
import { Card, useBoard, useKeyDown } from "src/hooks";
import styled from "styled-components";

const VALUE_TO_COLOR = new Map([
  [2, "#eebf91"],
  [4, "#eeee91"],
  [8, "#bfee91"],
  [16, "#90ee90"],
  [32, "#91eebf"],
  [64, "#91eeee"],
  [128, "#91bfee"],
  [256, "#9191ee"],
  [512, "#bf91ee"],
  [1024, "#ee91ee"],
  [2048, "#ee91bf"],
  [4056, "#ee91bf"],
]);

const Item = styled.div<{ row: number; column: number; value?: number }>`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  border: 1px solid black;
  grid-column: ${({ column }) => `${column + 1}/${column + 2}`};
  grid-row: ${({ row }) => `${row + 1}/${row + 2}`};
`;

const GridRoot = styled.div<{ size: number }>`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: ${({ size }) => `repeat(${size}, 1fr)`};
  grid-template-rows: ${({ size }) => `repeat(${size}, 1fr)`};
  grid-gap: 5px;
  height: inherit;
`;

const CardItem: FunctionComponent<{
  card: Card;
  gridRef: HTMLDivElement;
}> = ({ card, gridRef }) => {
  const { value } = card;
  const [rect, setRect] = useState({ width: 0, height: 0 });
  const [styles, api] = useSpring(() => ({}));
  const element = useMemo(() => gridRef.children[card.index], [
    card.index,
    gridRef,
  ]);
  useEffect(() => {
    const { width, height } = element.getBoundingClientRect();
    setRect({ width, height });
  }, [card, gridRef, element]);
  useEffect(() => {
    const { x, y } = element.getBoundingClientRect();
    api.start({ to: { left: x, top: y } });
  }, [gridRef, card, api, element]);
  console.log(styles);
  return (
    <animated.div
      style={{
        ...styles,
        position: "absolute",
        background: VALUE_TO_COLOR.get(value),
        width: rect.width,
        height: rect.height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {value}
    </animated.div>
  );
};

const Cards: FunctionComponent<{
  cards: Card[];
  gridRef: HTMLDivElement;
}> = ({ cards, gridRef }) => {
  return (
    <Transition
      items={cards}
      keys={cards.map(({ id }) => id)}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      config={{ duration: 500 }}
    >
      {({ opacity }, card) => {
        return (
          <animated.div style={{ opacity }}>
            <CardItem key={card.id} card={card} gridRef={gridRef} />
          </animated.div>
        );
      }}
    </Transition>
  );
};

export const Grid: FunctionComponent<{ size: number }> = ({
  size: gridSize,
}) => {
  const [gridRef, setGridRef] = useState<HTMLDivElement | null>(null);
  useKeyDown(document.body);
  const { tiles, cards, size } = useBoard();

  return (
    <>
      <GridRoot
        size={size}
        style={{ width: gridSize, height: gridSize }}
        ref={setGridRef}
      >
        {tiles.map(({ row, column }, i) => (
          <Item key={i} row={row} column={column} />
        ))}
      </GridRoot>
      {gridRef && <Cards cards={cards} gridRef={gridRef} />}
    </>
  );
};
