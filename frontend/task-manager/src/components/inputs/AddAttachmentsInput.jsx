import React, { useState } from "react";
import { LuPaperclip } from "react-icons/lu";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  // Add a new attachment
  const handleAddOption = () => {
    if (option.trim() === "") return;
    setAttachments([...attachments, option.trim()]);
    setOption("");
  };

  // Delete an attachment
  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
  };

  return (
    <div className="space-y-3">
      {/* List of attachments */}
      {attachments.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-50 border border-gray-100 px-3 py-2 rounded-md"
        >
          <div className="flex-1 flex items-center gap-3">
            <LuPaperclip className="text-gray-400" />
            <p className="text-xs text-black break-all">{item}</p>
          </div>
          <button className="cursor-pointer" onClick={() => handleDeleteOption(index)}>
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      {/* Input to add a new attachment */}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex-1 flex items-center gap-3 border border-gray-200 rounded-md px-3 py-2">
          <LuPaperclip className="text-gray-400" />
          <input
            type="text"
            placeholder="Add File Link"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="w-full text-[13px] text-black outline-none bg-white"
          />
        </div>
        <button className="card-btn text-nowrap flex items-center gap-1" onClick={handleAddOption}>
          <HiMiniPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
