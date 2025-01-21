import DashboardComp1 from "../common/DashboardComp1.js";
import DashboardComp2 from "../common/DashboardComp2.js";
import DashboardComp3 from "../common/DashboardComp3.js";
import DashboardComp4 from "../common/DashboardComp4.js";
import DashboardComp5 from "../common/DashboardComp5.js";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-1 w-full md:w-[70%] flex-col gap-4">
        <DashboardComp1 />
        <DashboardComp2 />
      </div>
      <div className="flex w-full md:w-[30%] flex-col gap-4">
        <DashboardComp3 />
        <DashboardComp4 />
        <DashboardComp5 />
      </div>
    </>
  );
}
