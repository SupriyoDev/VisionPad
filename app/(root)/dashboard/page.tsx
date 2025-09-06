"use client";

import DashHeader from "@/components/shared/dash-header";
import FileTable from "@/components/shared/file-table";

const Dashboard = () => {
  return (
    <div className=" ">
      <DashHeader />
      <div className=" mt-10 pr-20">
        <FileTable />
      </div>
    </div>
  );
};

export default Dashboard;
