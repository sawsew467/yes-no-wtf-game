import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppInterface } from "../../App";

interface IProps {
  setPlayerList: React.Dispatch<React.SetStateAction<AppInterface["player"][]>>;
  setRound: React.Dispatch<React.SetStateAction<number>>;
}

function index({ setPlayerList, setRound }: IProps) {
  const [isStart, setIsStart] = useState(false);
  const startGame = () => {
    setIsStart(!isStart);
    setPlayerList([])
    window.localStorage.setItem("playerList", JSON.stringify([]));
  };
  return (
    <>
      <div className="max-w-[800px] flex flex-col items-center mx-auto">
        <h1 className="text-4xl py-20 text-center px-2">Yes No WTF Game</h1>
        <p className="text-center mb-20 px-2">
          Yes or No is a fun and addicting game, perfect for playing on your own
          or with friends or family, This game contains hundreds of the best
          hand picked Yes or No questions. Vote which option you prefer and view
          real time statistics on what option was the most popular.
        </p>
        {!isStart ? (
          <button
            className="px-4 py-2 bg-slate-600 text-white rounded-sm"
            onClick={startGame}
          >
            Start Game
          </button>
        ) : (
          <Link to="/create-game">
            <button
              className="px-4 py-2 bg-slate-600 text-white rounded-sm"
              onClick={() => setIsStart(!isStart)}
            >
              Add player
            </button>
          </Link>
        )}
      </div>
    </>
  );
}

export default index;
