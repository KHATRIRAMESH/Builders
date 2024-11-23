import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

const Dashboard = () => {
  const location = useLocation();

  const [tab, setTabs] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTabs(tabFromUrl);
    }
  }, [location.search]);
  console.log(tab);

  return (
    <div className="min-h-screen">
      <div>
        {/* sidebar */}
        <DashSidebar />
      </div>

      {/* {profile} */}
      {tab === "profile" && <DashProfile />}
    </div>
  );
};
export default Dashboard;
