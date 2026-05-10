import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import SideBar from "./SideBar.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function DashBoard() {
  const user_id = useSelector(selectUser).user;
  const [userName, setUserName] = useState("name");

  useEffect(() => {
    async function getUserData() {
      const docRef = doc(db, "users", user_id);
      const userdata = await getDoc(docRef);
      if (userdata.exists()) {
        const data = userdata.data();
        setUserName(data.name);
      } else {
        console.log("No such document!");
      }
    }
    getUserData();
  }, [user_id]);

  return (
    <div className="dashBoardWrapper">
      <div className="dashBoardContainer">
        <SideBar />
        <div className="dashBoardMain">
          <div className="dashBoardTitle">Welcome {userName}</div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
