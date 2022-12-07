import { Route, Routes } from "react-router";
import CreateGame from "./pages/CreateGame";
import Home from "./pages/Home";
import SubmitAnswer from "./pages/SubmitAnswer";
import Answer from "./pages/Answer";
import FinalResult from "./pages/FinalResult";
import { useEffect, useState } from "react";

export interface AppInterface {
  player: {
    id: string;
    name: string;
    createAt: string;
    answers: number[];
    results: boolean[];
  };
  playerList: AppInterface["player"][];
  round: number;
}

function App() {
  const [playerList, setPlayerList] = useState<AppInterface["playerList"]>(
    JSON.parse(`${window.localStorage.getItem("playerList")}`) ?? []
  );
  console.log(playerList);

  const [round, setRound] = useState<AppInterface["round"]>(
    JSON.parse(`${window.localStorage.getItem("round")}`) ?? 0
  );
  useEffect(() => {
    window.localStorage.setItem("playerList", JSON.stringify(playerList));
    window.localStorage.setItem("round", JSON.stringify(round));
  }, [playerList, round]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home setPlayerList={setPlayerList} setRound={setRound}></Home>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <Home setPlayerList={setPlayerList} setRound={setRound}></Home>
          }
        ></Route>
        <Route
          path="/create-game"
          element={
            <CreateGame
              playerList={playerList}
              setPlayerList={setPlayerList}
              setRound={setRound}
            ></CreateGame>
          }
        ></Route>
        <Route
          path="/submit-answer"
          element={
            <SubmitAnswer
              playerList={playerList}
              setPlayerList={setPlayerList}
              round={round}
            ></SubmitAnswer>
          }
        ></Route>
        <Route
          path="/answer"
          element={
            <Answer
              playerList={playerList}
              setPlayerList={setPlayerList}
              round={round}
            ></Answer>
          }
        ></Route>
        <Route path="/result" element={<FinalResult playerList={playerList}></FinalResult>}></Route>
      </Routes>
    </>
  );
}

export default App;
