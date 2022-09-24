
import Users_Rsidebar from "./Users_Rsidebar";

function RightSideBar(){
   
    return(
        <div className="layout__right-sidebar">
            <div className="who-to-follow">
            
              <div className="who-to-follow__heading">
                Who to follow
            </div>
                <Users_Rsidebar />
                <Users_Rsidebar />
                <Users_Rsidebar />
       

        </div>
            </div>


           
    )
}

export default RightSideBar;