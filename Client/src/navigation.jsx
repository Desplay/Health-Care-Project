import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LobbyScreen from "./screens/LobbyScreen";
import QueueScreen from "./screens/QueueScreen";
import DoctorScreen from "./screens/DoctorScreen";
import EditPatient from "./screens/EditPatient";

export default function Navigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/Lobby" element={<LobbyScreen />} />
                <Route path="QueueRoom" element={<QueueScreen />} />
                <Route path="/Doctor" element={<DoctorScreen />} />
                <Route path="/EditPatient" element={<EditPatient />} />
            </Routes>
        </BrowserRouter>
    )
}