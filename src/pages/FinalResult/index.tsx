import React, { useEffect, useState } from "react";
import { AppInterface } from "../../App";
import Table from "../../components/FinalTable";
import SummaryTable from "../../components/SummaryTable";
import { Form, Input } from "antd";

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
  const [winnerMessage, setWinnerMessage] = useState<string>("");
  const [filterPlayerList, setFilterPlayerList] = useState<
    IState["playerResult"]
  >([]);
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
  useEffect(() => {
    setFilterPlayerList(playerResult);
    if (playerResult[0].score > playerResult[1].score) {
      setWinnerMessage(`The winner is: ${playerResult[0].name}`);
    } else if (playerResult[0].score < playerResult[1].score) {
      setWinnerMessage(`The winner is: ${playerResult[1].name}`);
    } else {
      setWinnerMessage(`The match is drawn!`);
    }
  }, []);

  const handleSearch = (searchInput: string) => {
    console.log("searchInput: ", searchInput);
    const playersName = playerResult.map((item: any) =>
      item.name.toLowerCase()
    );
    const filterArr = playerResult.filter((item: any, index: number) =>
      playersName[index].includes(searchInput.toLowerCase())
    );
    console.log(filterArr);

    setFilterPlayerList(filterArr);
  };

  return (
    <>
      <div className="p-2 w-screen flex flex-col gap-8">
        <h1 className="text-4xl mt-16">Yes No WTF Game</h1>
        <h2 className="text-4xl text-center">Final result</h2>
        {/* <input
          placeholder="Search by player's name"
          className="w-[300px] border-[1px] border-black rounded-sm px-2 py-1 outline-none "
        ></input> */}
        <div className="self-start">
          <label className="">Search: </label>
          <input
            placeholder="Player's name"
            className="w-[300px] border-[1px] border-[#d9d9d9] rounded-md px-2 py-1 outline-none "
            onChange={(e) => handleSearch(e.target.value)}
          ></input>
        </div>
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
        <Table playerResult={filterPlayerList}></Table>
        <SummaryTable playerResult={playerResult}></SummaryTable>
        <div className="text-center text-xl font-semibold">{winnerMessage}</div>
      </div>
    </>
  );
}

export default index;
