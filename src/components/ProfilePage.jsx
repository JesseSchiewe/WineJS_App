import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import {auth} from "../Firebase";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const {displayName, email} = user;
  return (
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            //background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
          className="border border-blue-300"
        ></div>
        <div className = "md:pl-4">
        <h2>{displayName}</h2>
        <h3 className = "italic">{email}</h3>
        </div>
      </div>

      <div className="profilepagesignout">
        <button type="login" onClick = {() => {auth.signOut()}}>Sign out</button>
        {/* <a class="bn39" href="/"><span class="bn39span" onClick = {() => {auth.signOut()}}>Sign Out</span></a> */}
      </div>
    </div>
  ) 
};
export default ProfilePage;