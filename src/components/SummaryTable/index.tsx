import React from "react";
import { Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

interface DataType {
  name: string;
  totalScore: number;
  correctedPercent: string;
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

const columns: ColumnsType<DataType> = [
  {
    title: "Summary",
    dataIndex: "name",
    defaultSortOrder: "descend",
  },
  {
    title: "Correct percent",
    dataIndex: "correctedPercent",
    sorter: (a, b) =>
      +a.correctedPercent.slice(0, -1) - +b.correctedPercent.slice(0, -1),
  },
  {
    title: "Total score",
    dataIndex: "totalScore",
    sorter: (a, b) => a.totalScore - b.totalScore,
  },
];

function SummaryTable({ playerResult }: IProps) {
  const round = JSON.parse(`${window.localStorage.getItem("round")}`) ?? 0;
  const data = playerResult.map((player, index) => {
    return {
      name: player.name,
      totalScore: player.score,
      correctedPercent: (((player.score * 1.0) / round) * 100).toFixed(2) + "%",
    };
  });
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false}></Table>
    </>
  );
}

export default SummaryTable;
