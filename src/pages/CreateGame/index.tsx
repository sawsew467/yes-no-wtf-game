import React, { useState } from "react";
import { useNavigate } from "react-router";
import AddNameModal from "@/components/AddNameModal";
import { AppInterface } from "@/App";

interface IProps {
  playerList: AppInterface["player"][];
  setPlayerList: React.Dispatch<React.SetStateAction<AppInterface["player"][]>>;
  setRound: React.Dispatch<React.SetStateAction<number>>;
}

function index({ playerList, setPlayerList, setRound }: IProps) {
  const navigate = useNavigate();
  const [isShowAddNameModal, setIsShowAddNameModal] = useState(true);
  const [inputValue, setInputValue] = useState<string>("");
  const validate = (): boolean => {
    if (+inputValue > 100 || +inputValue < 1) {
      alert("The round is not valid!");
      return false;
    }
    if (isNaN(+inputValue)) {
      alert("Please enter a number!");
      return false;
    }
    return true;
  };
  const handleStart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setPlayerList(
      playerList.map((player, index) => {
        return {
          ...player,
          answers: Array(+inputValue).fill("EMPTY"),
        };
      })
    );
    setRound(+inputValue);
    navigate("/submit-answer");
  };
  return (
    <>
      <div className="max-w-[800px] flex flex-col items-center mx-auto px-2">
        <h1 className="text-4xl py-20 text-center">Yes No WTF Game</h1>
        <p className="text-center mb-20">
          Yes or No is a fun and addicting game, perfect for playing on your own
          or with friends or family, This game contains hundreds of the best
          hand picked Yes or No questions. Vote which option you prefer and view
          real time statistics on what option was the most popular.
        </p>
        {isShowAddNameModal && playerList.length < 2 ? (
          <AddNameModal
            setIsShowAddNameModal={setIsShowAddNameModal}
            playerList={playerList}
            setPlayerList={setPlayerList}
          ></AddNameModal>
        ) : (
          <>
            <div className="flex flex-col sm:w-[400px] w-full">
              <div className="flex flex-row border-2 border-black">
                <div className="border-r-2 border-black w-1/2 py-2 text-center">
                  No.
                </div>
                <div className=" w-1/2 py-2 text-center">Player</div>
              </div>
              {playerList.map((player, index) => (
                <div
                  className="flex flex-row border-2  border-t-0 border-black"
                  key={player.id}
                >
                  <div className="border-r-2 border-black w-1/2 py-2 text-center">
                    {index + 1}
                  </div>
                  <div className=" w-1/2 py-2 text-center">{player.name}</div>
                </div>
              ))}
            </div>
            {playerList.length <= 1 && (
              <button
                className="py-2 sm:w-[400px] w-full text-center text-white bg-[#686868] mt-4 text-xl"
                onClick={() => setIsShowAddNameModal(true)}
              >
                Add more player
              </button>
            )}
            <form className="flex flex-col sm:w-[400px] w-full mt-4">
              <label>Total round</label>
              <div className="flex flex-row">
                <input
                  placeholder="The number of round..."
                  className="w-4/5 border-[1px] border-black rounded-sm py-1 outline-none pl-2"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                ></input>
                {playerList.length >= 2 ? (
                  <button
                    className="w-1/5 bg-black text-white"
                    onClick={(e) => handleStart(e)}
                  >
                    Start
                  </button>
                ) : (
                  <button
                    className="w-1/5 bg-slate-500 text-white cursor-not-allowed"
                    onClick={(e) => e.preventDefault()}
                  >
                    Start
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default index;
