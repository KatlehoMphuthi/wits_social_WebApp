import "./rightsidebar.css";
import Users_Rsidebar from "./Users_Rsidebar";

function RightSideBar(){
   
    return(
        <div className="right_sidebarContainer">
            <div className="header_right">
                Who to follow?
            </div>
            <div className="user_container">
                <Users_Rsidebar />
            </div>

            <div className="user_container">
                <Users_Rsidebar />
            </div>

            <div className="user_container">
                <Users_Rsidebar />
            </div>

        </div>
    )
}

export default RightSideBar;