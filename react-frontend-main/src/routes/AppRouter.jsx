import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Select from "../pages/Select";
import Chart from "../pages/Chart";
import PrivateRoute from "../components/PrivateRoute";

const AppRouter = () => {
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-orange-200">
        <Header />
        <main className="relative h-screen flex-grow mb-20">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            
            <Route element={<PrivateRoute />}>
              <Route path="/select" element={<Select />} />
              <Route path="/chart/:code" element={<Chart />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;