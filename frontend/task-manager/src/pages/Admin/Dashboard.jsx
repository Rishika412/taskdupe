import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosinstance";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import moment from "moment";
import { addThousandsSeparator } from "../../utils/helper";
import InfoCard from "../../components/Cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../components/layouts/TaskListTable";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";
const COLORS=["#8D51FF","#00B8DB","#7BCE00"];


const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

// Prepare Chart Data Function
const prepareChartData = (data) => {
  const taskDistribution = data?.taskDistribution || null;
  const taskPriorityLevels = data?.taskPriorityLevels || null ;

  const taskDistributionData = [
    { status: "Pending", count: taskDistribution.Pending || 0 },
    { status: "In Progress", count: taskDistribution.InProgress || 0 },
    { status: "Completed", count: taskDistribution.Completed || 0 },
  ];

  setPieChartData(taskDistributionData);

  const priorityLevelData = [
    { priority: "Low", count: taskPriorityLevels.Low || 0 },
    { priority: "Medium", count: taskPriorityLevels.Medium || 0 },
    { priority: "High", count: taskPriorityLevels.High || 0 },
  ];

  setBarChartData(priorityLevelData);
};

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);

      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };
  const onSeeMore=()=>{
    navigate('')
  }

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div className="col-span-3">
          <h2 className="text-xl md:text-2xl">
            Good Morning! {user?.name}
          </h2>
          <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
            {moment().format("dddd Do MMM YYYY")}
          </p>
        </div>
      

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        <InfoCard
          icon={<IoMdCard />}
          label="Total Tasks"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.All || 0
          )}
          color="bg-blue-500"
        />
        <InfoCard
          icon={<IoMdCard />}
          label="Pending Tasks"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.Pending || 0
          )}
          color="bg-violet-500"
        />
        <InfoCard
          icon={<IoMdCard />}
          label="In Progress Tasks"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.InProgress || 0
          )}
          color="bg-cyan-500"
        />
        <InfoCard
          icon={<IoMdCard />}
          label="Completed Tasks"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.Completed || 0
          )}
          color="bg-lime-500"
        />
      </div>
      </div>
      

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
  <div>
    <div className="card">
      <div className="flex items-center justify-between">
      <h5 className="font-medium">Task Distribution</h5>
      </div>
      <CustomPieChart
      data={pieChartData}
      colors={COLORS}
      />
      </div>
      </div>
     <div>
    <div className="card">
      <div className="flex items-center justify-between">
      <h5 className="font-medium">Task Priority Levels</h5>
      </div>
      <CustomBarChart
      data={barChartData}
      />
      </div>
      </div>
  <div className="md:col-span-2">
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Tasks</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
 
      <TaskListTable tableData={dashboardData?.recentTasks || []} />
    </div>
  </div>
</div>


    </DashboardLayout>
  );
};

export default Dashboard;
