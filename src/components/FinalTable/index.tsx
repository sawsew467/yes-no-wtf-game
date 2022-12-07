import React from "react";
import { Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  date: string;
  answers: string[];
  results: string[];
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
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.date - b.date,
  },
  {
    title: "Answers",
    dataIndex: "answers",
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.date - b.date,
  },
  {
    title: "Results",
    dataIndex: "results",
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.date - b.date,
  },
  {
    title: "Score",
    dataIndex: "score",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.score - b.score,
  },
];

// const onChange: TableProps<DataType>["onChange"] = (
//   pagination,
//   filters,
//   sorter,
//   extra
// ) => {
//   console.log("params", pagination, filters, sorter, extra);
// };

function Summary({ playerResult }: IProps) {
  return (
    <>
      {/* <Space> */}
        <Table columns={columns} dataSource={playerResult} pagination={false}></Table>
      {/* </Space> */}
    </>
  );
}

export default Summary;
