import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="w-1/5 border-4 border-indigo-500/75 bg-gray-200
    h-screen fixed flex-grow flex flex-col items-center justify-center"
    >
      <Link to="/" className="bg-purple-400 text-slate-50 p-2 rounded-full m-5">
        Contacts
      </Link>
      <Link to="/map" className="bg-purple-400 text-slate-50 p-2 rounded-full m-5">
        Charts and Maps
      </Link>
    </div>
  );
};

export default Sidebar;
