import "./css/bootstrap-icons.css"
import "./css/bootstrap-icons.min.css"
import "./css/bootstrap.min.css"
import "./css/sb-admin-2.min.css"
import "./css/sb-admin-2.css"
import "./css/templatemo-medic-care.css"
import "./css/sb-admin-2.css"
import "./css/sb-admin-2.min.css"

import  { Route, Routes, Link } from "react-router-dom";
// import Lobby from "./lobby";
import QueueRoom from "./queueRoom"

export default function Navigation () {
    return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
        <div className="container">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                    <Link to = "/Lobby" className="nav-link">Lobby Room</Link>
                    {/* <a className="nav-link" href="/queue-room">Lobby Room </a> */}
                </li>
                <li className="nav-item">
                    <Link to = "/QueueRoom" className="nav-link">Queue Room</Link>
                </li>
                </ul>
            </div>
        </div>
        <Routes>
            <Route path="/QueueRoom" element={<QueueRoom/>}/>
            {/* <Route path="/Lobby" element={<Lobby/>}/> */}
        </Routes>
        
    </nav>
    )
}