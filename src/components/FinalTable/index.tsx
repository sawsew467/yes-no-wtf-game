import React from "react";
import { Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

interface DataType {
  id: string;
    name: string;
    createAt: string;
    answers: string;
    results: string;
    score: number;
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
    title: "No",
    dataIndex: "id",
    defaultSortOrder: "descend",
    sorter: (a, b) => +a.id - +b.id,
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Date",
    dataIndex: "createAt",
  },
  {
    title: "Answers",
    dataIndex: "answers",
  },
  {
    title: "Results",
    dataIndex: "results",
  },
  {
    title: "Score",
    dataIndex: "score",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.score - b.score,
  },
];

function Summary({ playerResult }: IProps) {
  return (
    <>
        <Table columns={columns} dataSource={playerResult} pagination={false}></Table>
    </>
  );
}

export default Summary;
