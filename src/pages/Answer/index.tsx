import React, { useEffect, useState } from "react";
import { getAnswerAPI } from "../../apis";
import { AppInterface } from "../../App";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

interface IProps {
  playerList: AppInterface["player"][];
  setPlayerList: React.Dispatch<React.SetStateAction<AppInterface["player"][]>>;
  round: number;
}

function index({ playerList, setPlayerList, round }: IProps) {
  const [result, setResult] = useState<boolean[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  useEffect(() => {
    getAnswerAPI()
      .then((res) => {
        const boolValue = res.data.answer == "yes";
        if (result.length < round) {
          setResult([...result, boolValue]);
          setPlayerList(
            playerList.map((player, index) => {
              return {
                ...player,
                results: [...result, boolValue],
              };
            })
          );
        } else {
          setIsloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [result]);
  return (
    <>
      <div className="p-2 w-screen">
        <h1 className="text-4xl text mb-16 sm:text-start text-center">Yes No WTF Game</h1>
        <div className="flex flex-row text-lg items-end justify-center sm:justify-start font-medium mb-16">
          <p className="text-lg">Player:&nbsp;</p>
          <p className="text-lg text-red-500">{playerList[0].name}</p>
          ,&nbsp;
          <p className="text-lg text-green-500">{playerList[1].name}</p>
        </div>
        <div className="flex sm:flex-row flex-col flex-wrap w-full justify-start gap-10">
          {Array.from(Array(round), (x, index) => index + 1).map(
            (question, index) => (
              <div className="sm:w-[30%] w-full flex flex-col mb-8  justify-center">
                <span>Round {question}:</span>
                {isLoading ? (
                  <Skeleton count={1}></Skeleton>
                ) : (
                  <div className="flex flex-col p-2 bg-[#d5d5d5]">
                    <p className="text-lg">
                      Result: {result[index] ? "Yes" : "No"}
                    </p>
                    <p className="text-lg flex flex-row">
                      Winner:&nbsp;
                      {playerList[0].answers[index] == +result[index] && (
                        <p className="text-lg text-red-500">
                          {playerList[0].name} &nbsp;
                        </p>
                      )}
                      {playerList[1].answers[index] == +result[index] && (
                        <p className="text-lg text-green-500">
                          {playerList[1].name}
                        </p>
                      )}
                      {playerList[0].answers[index] != +result[index] &&
                        playerList[1].answers[index] != +result[index] && (
                          <p className="text-lg">empty</p>
                        )}
                    </p>

                    {/* {!isLoading && (
                    <>
                      <p className="text-lg">
                        Result: {result[index] ? "Yes" : "No"}
                      </p>
                      <p className="text-lg flex flex-row">
                        Winner:&nbsp;
                        {playerList[0].answers[index] == +result[index] && (
                          <p className="text-lg text-red-500">
                            {playerList[0].name} &nbsp;
                          </p>
                        )}
                        {playerList[1].answers[index] == +result[index] && (
                          <p className="text-lg text-green-500">
                            {playerList[1].name}
                          </p>
                        )}
                        {
                          (playerList[0].answers[index] != +result[index] && playerList[1].answers[index] != +result[index]) && (
                            <p className="text-lg">
                              empty
                            </p>
                          )
                        }
                      </p>
                    </>
                  )} */}
                  </div>
                )}
              </div>
            )
          )}
        </div>
        <Link to="/result">
        <button className="text-lg py-1 px-4 bg-black text-white mx-auto w-full sm:w-1/4">
          Summary
        </button>
        </Link>
      </div>
    </>
  );
}

export default index;