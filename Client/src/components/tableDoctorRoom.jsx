import "./css/bootstrap-icons.css"
import "./css/bootstrap-icons.min.css"
import "./css/bootstrap.min.css"
import "./css/sb-admin-2.min.css"
import "./css/sb-admin-2.css"
import "./css/templatemo-medic-care.css"
import "./css/sb-admin-2.css"
import "./css/sb-admin-2.min.css"

export default function TableDoctorRoom (){
    return (
        <div className="container-fluid" id="TablePatients">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <h4 className="m-0 font-weight-bold text-primary">
                            <i className="fas fa-table"></i>
                            Patients Treated
                        </h4>
                        <div className="my-2">
                            <form action="/doctor/submit?DoctorID={{Doctor.Doctor.ID}}" method="post">
                                <button type="submit" id="submit-button" className="btn btn-primary btn-icon-split form-control">
                                    <span className="text"> Done First patients and move next</span>
                                    <span className="icon text-gray-600">
                                        <i className="fas fa-arrow-right"></i>
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div className="dataTables_wrapper dt-bootstrap4">
                            <div className="row">
                                <div className="col-sm-12">
                                    <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info">
                                        <thead>
                                            <tr>
                                                <th> # </th>
                                                <th> ID </th>   
                                                <th> Name </th>
                                                <th> Age </th> 
                                                <th> Gender </th>  
                                                <th> Time Add </th>
                                                <th> Disease </th> 
                                                <th> Additional message </th>  
                                                <th> </th> 
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th> # </th>   
                                                <th> ID </th> 
                                                <th> Name </th>
                                                <th> Age </th> 
                                                <th> Gender </th>  
                                                <th> Time Add </th>
                                                <th> Disease </th> 
                                                <th> Additional message </th>  
                                                <th> </th> 
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}