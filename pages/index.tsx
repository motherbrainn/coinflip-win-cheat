import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

enum Winner {
  HEADS = "heads",
  TAILS = "tails",
}

const Home: NextPage = () => {
  const hKeyHold = useRef(false);
  const tKeyHold = useRef(false);

  const [winner, setWinner] = useState<null | string>(null);

  const onCoinflip = () => {
    if (hKeyHold.current === true && tKeyHold.current === false) {
      setWinner(Winner.HEADS);
    }
    if (tKeyHold.current === true && hKeyHold.current === false) {
      setWinner(Winner.TAILS);
    }
    if (
      (hKeyHold.current === false && tKeyHold.current === false) ||
      (hKeyHold.current === true && tKeyHold.current === true)
    ) {
      Math.floor(Math.random() * 2)
        ? setWinner(Winner.HEADS)
        : setWinner(Winner.TAILS);
    }
  };

  useEffect(() => console.log("winner: ", winner), [winner]);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "h") {
        hKeyHold.current = true;
      }
      if (event.key === "t") {
        tKeyHold.current = true;
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "h") {
        hKeyHold.current = false;
      }
      if (event.key === "t") {
        tKeyHold.current = false;
      }
    });
  }, []);

  return (
    <div>
      <button onClick={onCoinflip}>Flip Coin</button>
      {winner && <div>{`Winner: ${winner}`}</div>}
    </div>
  );
};

export default Home;
