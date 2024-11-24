import { Sidebar } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HiChartPie, HiUser } from "react-icons/hi";
import { GoSignOut } from "react-icons/go";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { signOutSuccess } from "../redux/user/userSlice.js";

import { useNavigate } from "react-router-dom";

const DashSidebar = () => {
  const currentUser = useSelector((state) => state.user);

  const location = useLocation();

  const dispatch = useDispatch();

  const [tab, setTabs] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTabs(tabFromUrl);
    }
  }, [location.search]);
  console.log(tab);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        // Navigate to login page
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="my-2">
          {currentUser && (
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item active={tab === "dash"} icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
            </Link>
          )}

          <Link to="/dashboard?tab=profile">
            <Sidebar.Item active={tab === "profile"} icon={HiUser} label="User">
              Profile
            </Sidebar.Item>
          </Link>
          <Link onClick={handleSignOut}>
            <Sidebar.Item
              active={tab === "signout"}
              icon={GoSignOut}
              label="Sign out"
            >
              Sign out
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
export default DashSidebar;
