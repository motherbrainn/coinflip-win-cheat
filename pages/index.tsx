import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

enum Winner {
  HEADS = "heads",
  TAILS = "tails",
}

const Home: NextPage = () => {
  const hKeyHold = useRef(false);
  const tKeyHold = useRef(false);

  const coin = useRef<null | HTMLElement>(null);

  const [winner, setWinner] = useState<null | string>(null);

  const startAnimation = () => {
    setWinner(null);
    console.log("animation");
    coin.current?.classList.remove("coin");
    coin.current?.classList.add("coin2");

    setTimeout(() => {
      coin.current?.classList.remove("coin2");
      coin.current?.classList.add("coin");
    }, 1000);
    // test.style.animation = "spin 1s linear infinite";
  };

  const onCoinflip = () => {
    startAnimation();

    setTimeout(() => {
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
    }, 1000);
  };

  useEffect(() => {
    coin.current = document.getElementById("coin");

    console.log(coin.current);

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
      <div className="browser">
        <h1>coinflip</h1>
        <button onClick={onCoinflip}>Flip Coin</button>
        <div className={"coin flip silver"} id="coin"></div>
        {winner && <h2>{`Winner: ${winner}`}</h2>}
      </div>
    </div>
  );
};

export default Home;
