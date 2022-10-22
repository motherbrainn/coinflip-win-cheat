import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

enum Winner {
  HEADS = "heads",
  TAILS = "tails",
}

const Home: NextPage = () => {
  const hKeyHold = useRef(false);
  const tKeyHold = useRef(false);

  const firstHover = useRef(false);

  const animationTime = 1000;

  const coin = useRef<null | HTMLElement>(null);

  const [winner, setWinner] = useState<null | string>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const onHover = () => {
    if (firstHover.current === false) {
      firstHover.current = true;
      setModalOpen(true);
    }
  };

  const startAnimation = () => {
    setWinner(null);
    coin.current?.classList.add("animate");

    setTimeout(() => {
      coin.current?.classList.remove("animate");
    }, animationTime);
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
    }, animationTime);
  };

  useEffect(() => {
    coin.current = document.getElementById("coin");

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
        <div className="banner">
          <p>WHATS YOUR IQ?? CLICK TO FIND OUT!</p>
        </div>
        <h1>coinflip</h1>
        <h2>click coin to flip!</h2>
        <div
          className={"coin flip silver"}
          id="coin"
          onClick={onCoinflip}
          onMouseEnter={onHover}
        ></div>
        {winner ? <h2>{`Winner: ${winner}`}</h2> : <h2>???</h2>}
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className="modal">
          <h1 style={{ color: "red" }}>WARNING!</h1>
          <h2 style={{ color: "red" }}>YOUR COMPTER MAY BE INFECTED:</h2>
          <p>
            `System Detected <strong style={{ color: "red" }}>(2)</strong>{" "}
            Potentially <ins style={{ color: "green" }}>Malicious</ins> Viruses:
            <ins style={{ fontStyle: "italic", color: "green" }}> Rootkit</ins>
            <strong>.Sirefef.Spy</strong> and <strong>Trojan.FakeAV-</strong>{" "}
            <ins style={{ fontStyle: "italic", color: "green" }}>DOWNLOAD.</ins>{" "}
            Your Personal &{" "}
            <ins style={{ fontStyle: "italic", color: "green" }}>
              Financial Information
            </ins>
            <strong> MAY NOT BE SAFE.</strong>
          </p>
          <h2 style={{ color: "red" }}>
            To Remove Viruses, Call Tech Support Online Now:
          </h2>
          <h1>1 (866) 527-4049</h1>
          <p>
            <ins style={{ fontStyle: "italic", color: "green" }}>
              High Priority Virus Removal.
            </ins>{" "}
            Call Line
          </p>
          <button onClick={() => setModalOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
