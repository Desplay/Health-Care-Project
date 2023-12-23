
export default function TableQueue() {
    
    // const popPatient = useLazyQuery (gql``)
    // async function movePatient() {
    //     await popPatient[0]()
    //     return
    // }

    return (
        <div className="container-fluid" id="TablePatients">
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="m-0 font-weight-bold text-primary">Disease level table</h4>


                <div  role="form" id="form" name="form">
                <button type="submit" id="submit-button" className="btn btn-primary btn-icon-split form-control" >
                    <span className="text">Put patients to Doctor Room</span>
                    <span className="icon text-white-50">
                    <i className="fas fa-arrow-right"></i>
                    </span>
                </button>
                </div>


            </div>
            <div className="card-body">
                <div className="table-responsive">
                <div className="dataTables_wrapper dt-bootstrap4">
                    <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Time Add</th>
                                <th>Disease</th>
                                <th>Additional message</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Time Add</th>
                                <th>Disease</th>
                                <th>Additional message</th>
                                <th></th>
                            </tr>
                        </tfoot>
                        <tbody></tbody>
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
