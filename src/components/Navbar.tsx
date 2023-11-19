
const Navbar = () => {
  return (
    <div className="w-full flex justify-between mt-8">
      <h1 className="text-4xl font-extrabold ml-2">EmployeeTracker</h1>

      <div className="flex flex-row gap-10 mr-[15rem] text-lg font-bold">
        <h1 className="p-3 px-10 border border-black rounded-lg ">Users</h1>

        <h1 className="p-3 px-10 border border-black rounded-lg ">Teams</h1>
      </div>

      <div></div>
    </div>
  );
};

export default Navbar;
