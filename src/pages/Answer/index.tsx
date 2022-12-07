import React, { useEffect, useState } from "react";
import { getAnswerAPI } from "@/apis/";
import { AppInterface } from "@/App";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface IProps {
  playerList: AppInterface["player"][];
  setPlayerList: React.Dispatch<React.SetStateAction<AppInterface["player"][]>>;
  round: number;
}

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#000" }} spin />
);

function index({ playerList, setPlayerList, round }: IProps) {
  const [result, setResult] = useState<string[]>(
    JSON.parse(`${window.localStorage.getItem("playerList")}`)[0].results ?? []
  );
  const [isLoading, setIsloading] = useState<boolean>(true);
  useEffect(() => {
    getAnswerAPI()
      .then((res) => {
        if (result.length < round) {
          setResult([...result, res.data.answer.toUpperCase()]);
          setPlayerList(
            playerList.map((player, index) => {
              return {
                ...player,
                results: [...result, res.data.answer.toUpperCase()],
              };
            })
          );
          window.localStorage.setItem(
            "playerList",
            JSON.stringify(
              playerList.map((player, index) => {
                return {
                  ...player,
                  results: [...result, res.data.answer.toUpperCase()],
                };
              })
            )
          );
        } else {
          setIsloading(false);
        }
      })
      .catch((err) => {
        alert("Sorry, some error occurred :((");
      });
  }, [result]);
  return (
    <>
      <div className="p-2 w-screen">
        <h1 className="text-4xl text my-16 sm:text-start text-center">
          Yes No WTF Game
        </h1>
        <div className="flex flex-row text-lg items-end justify-center sm:justify-start font-medium mb-16">
          <p className="text-lg">Player:&nbsp;</p>
          <div className="text-lg text-red-500">{playerList[0].name}</div>
          ,&nbsp;
          <div className="text-lg text-green-500">{playerList[1].name}</div>
        </div>
        <div className="flex sm:flex-row flex-col flex-wrap w-full justify-start sm:gap-10 gap-2 sm:mb-8 mb-2">
          {Array.from(Array(round), (x, index) => index + 1).map(
            (question, index) => (
              <div
                className="sm:w-[30%] w-full flex flex-col  justify-center"
                key={index}
              >
                <span>Round {question}:</span>
                {isLoading ? (
                  <Skeleton count={1} height={72}></Skeleton>
                ) : (
                  <div className="flex flex-col p-2 bg-[#d5d5d5] mt-1">
                    <p className="text-lg">Result: {result[index]}</p>
                    <div className="text-lg flex flex-row">
                      Winner:&nbsp;
                      {playerList[0].answers[index] == result[index] && (
                        <div className="text-lg text-red-500">
                          {playerList[0].name} &nbsp;
                        </div>
                      )}
                      {playerList[1].answers[index] == result[index] && (
                        <div className="text-lg text-green-500">
                          {playerList[1].name}
                        </div>
                      )}
                      {playerList[0].answers[index] != result[index] &&
                        playerList[1].answers[index] != result[index] && (
                          <div className="text-lg">empty</div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
        {!isLoading ? (
          <Link to="/result">
            <button className="text-lg py-1 px-4 bg-black text-white mx-auto w-full sm:w-1/4">
              Summary
            </button>
          </Link>
        ) : (
          <>
            <button className="text-lg py-1 px-4 bg-[#ccc] text-black mx-auto w-full sm:w-1/4 flex flex-row justify-center gap-2 mr-auto ml-0 cursor-not-allowed">
              <Spin indicator={antIcon} />
              Loading
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default index;
