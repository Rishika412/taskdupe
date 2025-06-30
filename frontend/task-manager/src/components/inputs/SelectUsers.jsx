import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuUserPlus, LuUsers } from "react-icons/lu";
import AvatarGroup from "../Avatargroup";

import Modal from "../Modal";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Toggle user selection
  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Confirm assignment
  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  // Show selected user avatars or names
  const selectedUserAvatars = allUsers.filter((user) =>
    selectedUsers.includes(user._id)).
    map((user)=>user.profileImageUrl);
    useEffect(()=>{
        getAllUsers();
    },[]);
  


  useEffect(() => {
    if(selectedUsers.length===0){
    setTempSelectedUsers([]);
  }
  return ()=>{};
},
   [selectedUsers]);

  return (
  <div className="space-y-4 mt-2">
    {selectedUserAvatars.length === 0 && (
      <button className="card-btn" onClick={() => setIsModalOpen(true)}>
        <LuUsers className="text-sm" /> Add Members
      </button>
    )}

    {selectedUserAvatars.length > 0 && (
      <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
      </div>
    )}

    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Select Users"
    >
  <div className="space-y-4 h-[60vh] overflow-y-auto">
    {allUsers.map((user) => (
      <div
        key={user._id}
        className="flex items-center gap-4 p-3 border-b border-gray-200"
      >
        <img
          src={user.profileImageUrl || "/default-avatar.png"}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-medium text-gray-800 dark:text-white">
            {user.name}
          </p>
          <p className="text-[13px] text-gray-500">{user.email}</p>
        </div>
        <input
          type="checkbox"
          checked={tempSelectedUsers.includes(user._id)}
          onChange={() => toggleUserSelection(user._id)}
          className="w-4 h-4 text-primary border-gray-300 rounded"
        />
      </div>
    ))}
  </div>

  {/* Optional Modal Footer */}
  <div className="mt-4 flex justify-end gap-2">
    <button
      onClick={() => setIsModalOpen(false)}
      className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
    >
      Cancel
    </button>
    <button
      onClick={handleAssign}
      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Assign
    </button>
  </div>
</Modal>

  </div>
);

};

export default SelectUsers;

