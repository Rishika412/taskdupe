import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";
import SelectDropdown from "../../components/inputs/SelectDropdown";
import SelectUsers from "../../components/inputs/SelectUsers";
import TodoListInput from "../../components/inputs/ToDoListInput";
import AddAttachmentsInput from "../../components/inputs/AddAttachmentsInput";
import moment from "moment";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taskId } = location.state || {};

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });
  const [currentTask, setCurrentTask] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

 const createTask = async () => {
  setLoading(true);
  setError(null);

  try {
    const todoList = taskData.todoChecklist?.map((item) => ({
      text: item,
      completed: false,
    }));

    const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
      ...taskData,
      dueDate: new Date(taskData.dueDate).toISOString(),
      todoChecklist: todoList,
    });

    toast.success("Task created successfully!");
    clearData(); // Assuming this resets the form
  } catch (error) {
    console.error("Error creating task:", error);
    setLoading(false);
  } finally {
    setLoading(false);
  }
};

  const updateTask = async () => {
  setLoading(true);

  try {
    // Prepare updated todo checklist
    const prevTodoChecklist = currentTask?.todoChecklist || [];

    const todolist = taskData.todoChecklist?.map((item) => {
      const matchedTask = prevTodoChecklist.find((task) => task.text === item);

      return {
        text: item,
        completed: matchedTask ? matchedTask.completed : false,
      };
    });

    // Send update request to backend
    const response = await axiosInstance.put(
      API_PATHS.TASKS.UPDATE_TASK(taskId),
      {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      }
    );

    toast.success("Task Updated Successfully");
  } catch (error) {
    console.error("Error updating task:", error);
  } finally {
    setLoading(false);
  }
};

const handleSubmit = async () => {
  setError(null);

  // Input validation
  if (!taskData.title.trim()) {
    setError("Title is required.");
    return;
  }

  if (!taskData.description.trim()) {
    setError("Description is required.");
    return;
  }

  if (!taskData.dueDate) {
    setError("Due date is required.");
    return;
  }

  if (!taskData.assignedTo || taskData.assignedTo.length === 0) {
    setError("Task not assigned to any member.");
    return;
  }

  if (!taskData.todoChecklist || taskData.todoChecklist.length === 0) {
    setError("Add at least one todo task.");
    return;
  }

  // Submit logic
  try {
    if (taskId) {
      await updateTask();
    } else {
      await createTask();
    }
  } catch (err) {
    console.error("Submission Error:", err);
    setError("Something went wrong. Please try again.");
  }
};


  const getTaskDetailsByID = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));

    if (response.data) {
      const taskInfo = response.data;
      setCurrentTask(taskInfo);

      setTaskData((prevState) => ({
        ...prevState,
        title: taskInfo.title,
        description: taskInfo.description,
        priority: taskInfo.priority,
        dueDate: taskInfo.dueDate
          ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
          : null,
        assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
        todoChecklist: taskInfo?.todoChecklist?.map((item) => item?.text) || [],
        attachments: taskInfo?.attachments || [],
      }));
    }
  } catch (error) {
    console.error("Error fetching task by ID:", error);
  }
};


 const deleteTask = async () => {
  try {
    await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

    setOpenDeleteAlert(false);
    toast.success("Task deleted successfully");

    navigate('/admin/tasks');
  } catch (error) {
    console.error(
      "Error deleting task:",
      error.response?.data?.message || error.message
    );
    toast.error("Failed to delete task");
  }
};


  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID();
    }
    return ()=>{};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4 gap-4">
          {/* Main Form Section */}
          <div className="form-card col-span-3 bg-white p-5 rounded-md shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-red-500"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" />
                  Delete
                </button>
              )}
            </div>

            {/* Task Title */}
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                type="text"
                placeholder="Create App UI"
                className="form-input w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>

            {/* Description */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>
              <textarea
                placeholder="Describe task"
                className="form-input w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>

            {/* Priority, Due Date, Assign To */}
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-input w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                  value={taskData.dueDate || ""}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                />
              </div>

              <div className="col-span-12 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Assign To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) =>
                    handleValueChange("assignedTo", value)
                  }
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                TODO Checklist
              </label>
              <TodoListInput
                todoList={taskData.todoChecklist}
                setTodoList={(value) =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>
             <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Add attachments
              </label>
              <AddAttachmentsInput
                attachments={taskData.todoChecklist}
                setattachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>
            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}

            {/* Submit Button */}
            <div className="flex justify-end mt-7">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
  isOpen={openDeleteAlert}
  onClose={() => setOpenDeleteAlert(false)}
  title="Delete Task"
>
  <DeleteAlert
    content="Are you sure you want to delete this task?"
    onDelete={deleteTask}
  />
</Modal>

    </DashboardLayout>
  );
};

export default CreateTask;
