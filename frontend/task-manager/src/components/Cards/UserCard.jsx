import React from "react";

const UserCard = ({ userInfo }) => {
  return (
    <div className="user-card p-4 bg-white rounded shadow border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userInfo?.profileImageUrl || "/default-avatar.png"}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <div>
            <p className="text-sm font-medium">{userInfo?.name}</p>
            <p className="text-xs text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-gray-50";
      case "Completed":
        return "text-indigo-500 bg-gray-50";
      default:
        return "text-violet-500 bg-gray-50";
    }
  };

  return (
    <div className={`flex-1 p-4 rounded shadow ${getStatusTagColor()}`}>
      <span className="text-[20px] font-bold">{count}</span>
      <br />
      <span className="text-[12px] font-medium">{label}</span>
    </div>
  );
};

export { StatCard, UserCard };
