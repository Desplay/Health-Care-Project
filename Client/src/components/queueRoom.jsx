import DoctorCard from "./doctorCard.jsx";
import listDoctor from './../data/dataDoctor.js';
import TableQueue from "./tableQueue.jsx";
import Navigation from "./navigation.jsx"

function QueueRoom() {
    return (
        <div >
            <Navigation />
            <div className="container-fluid">
                <div className="row" >
                    {listDoctor.map((doctor) => (
                            <DoctorCard key = {doctor.ID} doctor={doctor} />
                    ))}
                    <TableQueue />
                </div>
            </div>
        </div>
    )
}

export default QueueRoom;
