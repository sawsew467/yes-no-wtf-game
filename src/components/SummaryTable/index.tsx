import React from "react";
import { Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  totalScore: number;
  correctedPercent: number;
}

interface IProps {
  playerResult: {
    id: string;
    name: string;
    createAt: string;
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
    defaultSortOrder: "descend",
    sorter: (a, b) => a.correctedPercent - b.correctedPercent,
  },
  {
    title: "Total score",
    dataIndex: "totalScore",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.totalScore - b.totalScore,
  },
];

function SummaryTable({ playerResult }: IProps) {
  const round = JSON.parse(`${window.localStorage.getItem("round")}`) ?? 0;
  const data = playerResult.map((player, index) => {
    return {
      name: player.name,
      totalScore: player.score,
      correctedPercent: ((player.score * 1.0) / round).toFixed(2),
    };
  });
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} ></Table>
    </>
  );
}

export default SummaryTable;
