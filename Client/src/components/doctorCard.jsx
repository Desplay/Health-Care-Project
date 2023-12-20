import { Route,Routes,Link } from "react-router-dom";
import DoctorRoom from "./doctorRoom";
import "./css/bootstrap-icons.css"
import "./css/bootstrap-icons.min.css"
import "./css/bootstrap.min.css"
import "./css/sb-admin-2.min.css"
import "./css/sb-admin-2.css"
import "./css/templatemo-medic-care.css"
import "./css/sb-admin-2.css"
import "./css/sb-admin-2.min.css"

export default function DoctorCard(doctor) {
    console.log(doctor)
    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <Link to = "/doctor?ID=${doctor.doctor.ID}">
                <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    {doctor.doctor.name}
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800"></div>
                                    </div>
                                    <div className="col">
                                        <div className="progress progress-sm mr-2">
                                            <div className="progress-bar bg-info" role="progressbar" width="0%" ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-user-md fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

        <Routes>
            <Route path={`/doctor?ID=${doctor.doctor.ID}`} element={<DoctorRoom doctor={doctor.doctor} ID={doctor.doctor.ID}/>}/>
        </Routes>

    </div>

    
    )

}
