import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  createdAt: string;
  answers: string;
  results: string;
  score: number;
}

interface IProps {
  playerResult: {
    id: string;
    name: string;
    createdAt: string;
    answers: string;
    results: string;
    score: number;
  }[];
}

function Summary({ playerResult }: IProps) {
  const dateSort = () => {
    let dateA: number = 0;
    let dateB: number = 0;
    if (playerResult[0]?.createdAt) {
      dateA = new Date(playerResult[0]?.createdAt).getTime();
      dateB = new Date(playerResult[1]?.createdAt).getTime();
    }
    return dateB - dateA;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "id",
      sorter: (a, b) => +a.id - +b.id,
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      width: "20%",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      sorter: () => dateSort(),
      width: "20%",
    },
    {
      title: "Answers",
      dataIndex: "answers",
      width: "20%",
    },
    {
      title: "Results",
      dataIndex: "results",
      width: "20%",
    },
    {
      title: "Score",
      dataIndex: "score",
      sorter: (a, b) => a.score - b.score,
      width: "10%",
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={playerResult.map((player) => {
          return {
            key: player.id,
            ...player,
          };
        })}
        pagination={false}
      ></Table>
    </>
  );
}

export default Summary;
