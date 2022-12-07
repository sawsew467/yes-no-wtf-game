import React, { useEffect, useState } from "react";
import { AppInterface } from "@/App";
import Table from "@/components/FinalTable";
import SummaryTable from "@/components/SummaryTable";
import { Form, Input } from "antd";

interface IProps {
  playerList: AppInterface["player"][];
}

interface IState {
  playerResult: {
    id: string;
    name: string;
    createdAt: string;
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
        results: player.results.join(", "),
        answers: player.answers.join(", "),
        score: player.answers.filter(
          (answer, index) => player.answers[index] === player.results[index]
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
    const playersName = playerResult.map((item: any) =>
      item.name.toLowerCase()
    );
    const filterArr = playerResult.filter((item: any, index: number) =>
      playersName[index].includes(searchInput.toLowerCase())
    );

    setFilterPlayerList(filterArr);
  };

  return (
    <>
      <div className="p-2 w-screen flex flex-col gap-8">
        <h1 className="text-4xl mt-16 sm:text-start text-center">
          Yes No WTF Game
        </h1>
        <h2 className="text-4xl text-center">Final result</h2>
        <div className="self-start flex flex-row sm:justify-start justify-center items-center w-full gap-2">
          <label className="">Search: </label>
          <input
            placeholder="Player's name"
            className="w-[300px] border-[1px] border-[#d9d9d9] rounded-md px-2 py-1 outline-none "
            onChange={(e) => handleSearch(e.target.value)}
          ></input>
        </div>
        <Table playerResult={filterPlayerList}></Table>
        <SummaryTable playerResult={playerResult}></SummaryTable>
        <div className="text-center text-xl font-semibold">{winnerMessage}</div>
      </div>
    </>
  );
}

export default index;
