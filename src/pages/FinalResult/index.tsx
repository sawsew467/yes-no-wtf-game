import React, { useEffect, useState } from "react";
import { AppInterface } from "../../App";
import Table from "../../components/FinalTable";
import SummaryTable from "../../components/SummaryTable";

interface IProps {
  playerList: AppInterface["player"][];
}

interface IState {
  playerResult: {
    id: string;
    name: string;
    createAt: string;
    answers: string;
    results: string;
    score: number;
  }[];
}

function index({ playerList }: IProps) {
  const [playerResult, setPlayerResult] = useState<IState["playerResult"]>(
    playerList.map((player, index) => {
      return {
        ...player,
        results: player.results
          .map((result, index) => (result === true ? "YES" : "NO"))
          .join(", "),
        answers: player.answers
          .map((answer, index) => {
            if (answer == 1) {
              return "YES";
            } else if (answer == 0) {
              return "NO";
            } else {
              return "empty";
            }
          })
          .join(", "),
        score: player.answers.filter(
          (answer, index) => player.answers[index] === +player.results[index]
        ).length,
      };
    })
  );
  const showWinner = () => {
    if (playerResult[0].score > playerResult[1].score) {
      return `The winner is: ${playerResult[0].name}`;
    } else if (playerResult[0].score < playerResult[1].score) {
      return `The winner is: ${playerResult[1].name}`;
    } else {
      return `The match is drawn!`;
    }
    return "";
  };
  return (
    <>
      <div className="p-2 w-screen flex flex-col">
        <h1 className="text-4xl mb-16">Yes No WTF Game</h1>
        <h2 className="text-4xl text-center">Final result</h2>
        <input
          placeholder="Search by player's name"
          className="w-[300px] border-[1px] border-black rounded-sm px-2 py-1 outline-none "
        ></input>
        {/* <div className="mt-4 flex flex-col w-full">
          <div className="flex flex-row w-full">
            <div className="w-1/12 py-2 text-center border-[1px] border-black">
              No.
            </div>
            <div className="w-2/12 py-2 text-center border-[1px] border-l-0 border-black">
              Player
            </div>
            <div className="w-4/12 py-2 text-center border-[1px] border-l-0 border-black">
              Date
            </div>
            <div className="w-2/12 py-2 text-center border-[1px] border-l-0 border-black">
              Answer
            </div>
            <div className="w-2/12 py-2 text-center border-[1px] border-l-0 border-black">
              Result
            </div>
            <div className="w-1/12 py-2 text-center border-[1px] border-l-0 border-black">
              Score
            </div>
          </div>
          {playerResult.map((player, index) => (
            <div className="flex flex-row w-full" key={player.id}>
              <div className="w-1/12 py-2 text-center border-[1px] border-t-0 border-black">
                {index}
              </div>
              <div className="w-2/12 py-2 text-center border-[1px] border-t-0 border-l-0 border-black">
                {player.name}
              </div>
              <div className="w-4/12 py-2 text-center border-[1px] border-t-0 border-l-0 border-black">
                {player.createAt}
              </div>
              <div className="w-2/12 py-2 text-center border-[1px] border-t-0 border-l-0 border-black">
                {player.answers}
              </div>
              <div className="w-2/12 py-2 text-center border-[1px] border-t-0 border-l-0 border-black">
                {player.results}
              </div>
              <div className="w-1/12 py-2 text-center border-[1px] border-t-0 border-l-0 border-black">
                {player.score}
              </div>
            </div>
          ))}
        </div> */}
        <Table playerResult={playerResult}></Table>
        <SummaryTable playerResult={playerResult}></SummaryTable>
        <div className="text-center">{showWinner()}</div>
      </div>
    </>
  );
}

export default index;
