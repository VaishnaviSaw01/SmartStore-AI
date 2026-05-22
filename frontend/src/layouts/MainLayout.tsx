import Sidebar from "../components/Sidebar";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="bg-[#fcf9f8] min-h-screen flex">
      <Sidebar />

      <div className="ml-[280px] flex-1">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;