import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <>
      <div className="w-full flex items-center justify-between h-[5rem] pb-2 border-b-2 border-black bg-slate-300">
        <h1 className="text-4xl font-extrabold ml-2 text-blue-500 italic">EmployeeTracker</h1>

        <div className="flex flex-row gap-10 mr-[18rem] text-lg font-bold">
          <Link
            to="/"
            className={`h-[50px] p-3 px-10 border rounded-lg ${
              window.location.pathname === '/' ? "bg-blue-500 text-white" : "border-black"
            }`}
          >
            Users
          </Link>

          <Link
            to="/teams"
            className={`h-[50px] p-3 px-10 border rounded-lg ${
              window.location.pathname === '/teams  ' ? "bg-blue-500 text-white" : "border-black"
            }`}
          >
            Teams
          </Link>
        </div>

        <div></div>
      </div>
    </>
  );
};

export default Navbar;
