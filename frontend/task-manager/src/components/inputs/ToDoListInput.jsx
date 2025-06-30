import React, { useState } from "react";
import { HiOutlineTrash, HiMiniPlus } from "react-icons/hi2";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  // Add new task to the list
  const handleAddOption = () => {
    if (option.trim() === "") return;
    setTodoList([...todoList, option.trim()]);
    setOption("");
  };

  // Delete task from the list
  const handleDeleteOption = (index) => {
    const updatedList = todoList.filter((_, idx) => idx !== index);
    setTodoList(updatedList);
  };

  return (
    <div className="space-y-3">
      {/* List of tasks */}
      {todoList.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-50 border border-gray-100 px-3 py-2 rounded-md"
        >
          <p className="text-xs text-black">
            <span className="text-xs text-gray-400 font-semibold mr-2">
              {index + 1}.
            </span>
            {item}
          </p>

          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      {/* Input to add a task */}
      <div className="flex items-center gap-4 mt-4">
        <input
          type="text"
          placeholder="Enter Task"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="w-full text-sm text-black outline-none bg-white border border-gray-200 rounded-md px-3 py-2"
        />
        <button
          className="card-btn text-nowrap flex items-center gap-1"
          onClick={handleAddOption}
        >
          <HiMiniPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
