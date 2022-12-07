import moment from "moment";
import React, { useEffect, useState } from "react";
import { AppInterface } from "@/App";

interface IProps {
  setIsShowAddNameModal: React.Dispatch<React.SetStateAction<boolean>>;
  playerList: AppInterface["player"][];
  setPlayerList: React.Dispatch<React.SetStateAction<AppInterface["player"][]>>;
}

function AddNameModal({
  setIsShowAddNameModal,
  playerList,
  setPlayerList,
}: IProps) {
  const [name, setName] = useState<string>("");
  const validate = (name: string): boolean => {
    if (name === "") {
      alert("Please enter player's name!");
      return false;
    }
    const format = /[ `!@#$%^&*()_+-=[\]{};':"|,.<>/?~]/;
    if (format.test(name)) {
      alert("Player's name is not valid!");
      return false;
    }
    return true;
  };
  const handleOk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!validate(name)) {
      return;
    }
    setPlayerList([
      ...playerList,
      {
        id: `${playerList.length + 1}`,
        name: name,
        createdAt: moment().format("LLL"),
        answers: [],
        results: [],
      },
    ]);
    setIsShowAddNameModal(false);
  };
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsShowAddNameModal(false);
  };
  return (
    <div className="flex flex-col border-2 border-black sm:w-[400px] w-full">
      <p className="py-2 text-2xl text-center border-b-2 border-black">
        Please enter a new game
      </p>
      <form className="p-4 flex flex-col">
        <label>New name</label>
        <input
          placeholder="Enter name..."
          className="border-[1px] border-black rounded-sm px-2 py-1 outline-none "
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></input>
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 border-[1px] border-slate-700"
            onClick={(e) => handleOk(e)}
          >
            OK
          </button>
          <button
            className="flex-1 border-[1px] border-slate-700"
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNameModal;
