import TableDoctorRoom from "./tableDoctorRoom";
import listDoctor from "../data/dataDoctor";
import Navigation from "./navigation";

export default function DoctorRoom(doctor) {
    return (
        <div >
            <section>
                <div className="container">
                    {/* <img src="{% static './images/profile.png' %}" className="img-fluid" alt="" style="margin: auto; display: block; width: 300px; height: auto; padding-bottom: 10px;" /> */}
                    <h2 className="text-center mb-lg-3 mb-2 text-uppercase"> Doctor {doctor.doctor.name} </h2>
                </div>
            </section>
            <p>Doctor Room</p>
            <Navigation />
            <TableDoctorRoom />
        </div>
); 
}
