import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contacts from "./components/contacts/createcontacts";
import DisplayContacts from "./components/contacts/displaycontacts";
import UpdateContacts from "./components/contacts/updatecontacts";
import Chart from "./components/chartsandmaps/chart";
import Sidebar from "./components/sidebar/sidebar";
import Body from "./components/chartsandmaps/body";

const App: React.FC = () => {
  return (
    <div className='flex flex-row h-screen'>
      
      <BrowserRouter>
      <Sidebar />
        <Routes>
          <Route path="/" element={<DisplayContacts />} />
          <Route path="/adduser" element={<Contacts />} />
          <Route path="/updateuser" element={<UpdateContacts />} />
          <Route path="/covidgraph" element={<Chart />} />
          <Route path="/map" element={<Body />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
