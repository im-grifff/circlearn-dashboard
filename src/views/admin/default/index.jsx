import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import Card from "components/card";
import React from "react";

const Dashboard = () => {
  React.useEffect(() => {
    // get param query "token" from url and save to localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    token && localStorage.setItem("token", token);

    if (localStorage.getItem("token") === null) {
      window.location.href = "http://localhost:3000/login";
    }
  }, []);

  return (
    <div>
      <Card extra={"w-full h-full sm:overflow-auto px-6"}>
        {/* Welcome to Circlearn Dashboard */}
        <header className="relative flex h-20 items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Welcome to Circlearn Dashboard
          </div>
        </header>
      </Card>
      {/* Card widget */}
      {/* <div className="grid grid-cols-1 gap-5 mt-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<IoDocuments className="w-6 h-6" />}
          title={"Spend this month"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
        <Widget
          icon={<MdDashboard className="w-6 h-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="w-6 h-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        />
      </div>

      {/* 
      <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5 xl:grid-cols-2">
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>{" "}
      */}
    </div>
  );
};

export default Dashboard;
