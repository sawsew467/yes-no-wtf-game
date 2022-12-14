import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppInterface } from "@/App";

interface IProps {
  playerList: AppInterface["player"][];
  setPlayerList: React.Dispatch<React.SetStateAction<AppInterface["player"][]>>;
  round: number;
}

function index({ playerList, setPlayerList, round }: IProps) {
  const [turn, setTurn] = useState<number>(
    JSON.parse(`${window.localStorage.getItem("turn")}`) ?? 0
  );
  const [answerList, setAnswerList] = useState<string[]>(
    playerList[turn].answers ?? Array(round).fill("EMPTY")
  );
  const navigate = useNavigate();
  const submitAnswer = () => {
    if (turn === 0) {
      setTurn(1);
      let newPlayerList = playerList;
      setPlayerList(newPlayerList);
      setAnswerList(playerList[1].answers ?? Array(round).fill("EMPTY"));
      window.localStorage.setItem("playerList", JSON.stringify(playerList));
      window.localStorage.setItem("turn", JSON.stringify(1));
    } else {
      let newPlayerList = playerList;
      setPlayerList(newPlayerList);
      window.localStorage.setItem("playerList", JSON.stringify(playerList));
      window.localStorage.setItem("turn", JSON.stringify(0));
      navigate("/answer");
    }
  };
  const handleYesClick = (pos: number) => {
    setAnswerList(
      answerList.map((answer, index) => {
        if (index === pos) {
          if (answerList[pos] !== "YES") {
            return "YES";
          } else {
            return "EMPTY";
          }
        } else {
          return answer;
        }
      })
    );
  };
  const handleNoClick = (pos: number) => {
    setAnswerList(
      answerList.map((answer, index) => {
        if (index === pos) {
          if (answerList[pos] !== "NO") {
            return "NO";
          } else {
            return "EMPTY";
          }
        } else {
          return answer;
        }
      })
    );
  };
  useEffect(() => {
    const newPlayerList = playerList.map((player, index) => {
      if (index === turn) {
        return {
          ...player,
          answers: answerList,
          results: [],
        };
      } else {
        return {
          ...player,
        };
      }
    });
    setPlayerList(newPlayerList);
    window.localStorage.setItem("playerList", JSON.stringify(newPlayerList));
  }, [answerList]);
  return (
    <>
      <div className="p-2 w-screen">
        <h1 className="text-4xl text my-16 sm:text-start text-center">
          Yes No WTF Game
        </h1>
        <div className="text-lg font-medium mb-16">
          <p className="text-lg sm:text-start text-center">
            {turn === 0 ? playerList[0].name : playerList[1].name}
            's turn
          </p>
        </div>
        <div className="flex sm:flex-row flex-col flex-wrap w-full justify-start sm:gap-10 gap-2 sm:mb-8 mb-2">
          {Array.from(Array(round), (x, index) => index + 1).map(
            (question, index) => (
              <div
                className="sm:w-[30%] w-full flex flex-col sm:mb-8 mb-2"
                key={index}
              >
                <span>Round {question}:</span>
                <div className="flex flex-row justify-between">
                  {answerList[index] === "YES" ? (
                    <button
                      className="w-[49%] text-white text-lg px-2 py-1 border-2 border-black bg-green-500"
                      onClick={() => handleYesClick(index)}
                    >
                      <i className="fa-solid fa-check mr-2"></i>
                      YES
                    </button>
                  ) : (
                    <button
                      className="w-[49%] text-green-500 text-lg px-2 py-1 border-2 border-black"
                      onClick={() => handleYesClick(index)}
                    >
                      <i className="fa-solid fa-check mr-2"></i>
                      YES
                    </button>
                  )}
                  {answerList[index] === "NO" ? (
                    <button
                      className="w-[49%] text-white text-lg px-2 py-1 border-2 border-black bg-red-500"
                      onClick={() => handleNoClick(index)}
                    >
                      <i className="fa-solid fa-check mr-2"></i>
                      NO
                    </button>
                  ) : (
                    <button
                      className="w-[49%] text-red-500 text-lg px-2 py-1 border-2 border-black"
                      onClick={() => handleNoClick(index)}
                    >
                      <i className="fa-solid fa-check mr-2"></i>
                      NO
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
        <button
          className="text-lg py-1 px-4 bg-black text-white mx-auto w-full sm:w-1/4"
          onClick={submitAnswer}
        >
          Submit answer
        </button>
      </div>
    </>
  );
}

export default index;
