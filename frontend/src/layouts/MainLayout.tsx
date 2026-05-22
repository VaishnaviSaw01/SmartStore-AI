import Sidebar from "../components/Sidebar";

type Props = {
  children: React.ReactNode;
};

function MainLayout({
  children,
}: Props) {

  return (

    <div className="flex bg-[#f8fafc] min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        {children}

      </main>

    </div>

  );
}

export default MainLayout;