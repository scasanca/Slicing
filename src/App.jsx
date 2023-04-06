import React from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./Component/Search";
import Sidebar from "./Component/Sidebar";
import Dashboard from "./dashboard/Dashboard";
import Index from "./routes/Index";
import Table from "./dashboard/Table";

const App = () => {
  return (
    <div>
      {/* <BrowserRouter>
     <Routes>
      <Route path='/'       element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
     </Routes>
     </BrowserRouter> */}
      {/* <Search /> */}
      {/* <Sidebar /> */}
      {/* <Dashboard/> */}
      <Index />
      {/* <Table/> */}
      {/* <Tambah /> */}
    </div>
  );
};

export default App;
