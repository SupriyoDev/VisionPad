import SideNav from "@/components/shared/side-nav";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <div className="grid grid-cols-4">
        <div className=" w-full h-full col-span-1">
          <SideNav />
        </div>
        <div className="col-span-3">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
