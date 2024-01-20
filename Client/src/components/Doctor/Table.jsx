import { gql, useMutation } from "@apollo/client";

function Table(props) {

  // eslint-disable-next-line react/prop-types
  const patients = props.patients;
  // eslint-disable-next-line react/prop-types
  const DoctorID = props.DoctorID;

  const [RemovePatient] = useMutation(
    gql`
      mutation DeletePatient($PatientID: String!) {
        deletePatient(patientID: $PatientID)
      }
    `
  );

  const [DonePatient] = useMutation(
    gql`
      mutation DoneFirstPatient($Doctor_id: String!) {
        doneFirstPatient(Doctor_id: $Doctor_id)
      }
    `,
  );

  // eslint-disable-next-line react/prop-types
  if(patients && patients.length == 0) return <></>;

  const handleRemovePatient = async (patientID) => {
    await RemovePatient({
      variables: {
        PatientID: patientID,
      },
    });
  };

  const handleDonePatient = async (doctorID) => {
    await DonePatient({
      variables: {
        Doctor_id: doctorID,
      },
    });
  }

  return (
    <>
      <div className="container-fluid" id="TablePatients">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <div className="card-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="m-0 font-weight-bold text-primary">
                <i className="fas fa-table"></i>
                Patients Treated
              </h4>
              <div className="my-2">
                <a 
                href="" 
                className="btn btn-primary btn-icon-split"
                onClick={async () => {
                  await handleDonePatient(DoctorID);
                  window.location.reload();   
                }}
                >
                  <span className="text">
                    Done First Patient
                  </span>
                  <span className="icon text-white-50 d-flex justify-content-center align-items-center">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="dataTables_wrapper dt-bootstrap4">
                <div className="row">
                  <div className="col-sm-12">
                    <table
                      className="table table-bordered dataTable"
                      id="dataTable"
                      width="100%"
                      cellSpacing="0"
                      role="grid"
                      aria-describedby="dataTable_info"
                    >
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
                      <tbody>
                        {/* eslint-disable-next-line react/prop-types */}
                        {patients.map((patient, index) =>
                          index == 0 ? (
                            <tr key={patient.patientID}>
                              <td style={{ fontWeight: "bold", color: "red" }}>
                                {index + 1}
                              </td>
                              <td style={{ fontWeight: "bold", color: "red" }}>
                                {patient.PhyID}
                              </td>
                              <td style={{ fontWeight: "bold", color: "red" }}>
                                {patient.name}
                              </td>
                              <td style={{ fontWeight: "bold", color: "red" }}>
                                {patient.age}
                              </td>
                              <td style={{ fontWeight: "bold", color: "red" }}>
                                {patient.gender}
                              </td>
                              <td style={{ fontWeight: "bold", color: "red" }}>
                                {patient.createdAt}
                              </td>
                              <td style={{ fontWeight: "bold", color: "red" }}>
                                {patient.disease.diseaseName}
                              </td>
                              <td style={{ fontWeight: "bold", color: "red" }}>
                                {patient.message}
                              </td>
                              <td style={{ fontWeight: "bold", color: "red" }}>
                                Now Treading
                              </td>
                            </tr>
                          ) : (
                            <tr key={patient.patientID}>
                              <td> {index + 1} </td>
                              <td> {patient.PhyID} </td>
                              <td> {patient.name} </td>
                              <td> {patient.age} </td>
                              <td> {patient.gender} </td>
                              <td> {patient.createdAt} </td>
                              <td> {patient.disease.diseaseName} </td>
                              <td> {patient.message} </td>
                              <td>
                                <a
                                  href=""
                                  onClick={async () => {
                                    await handleRemovePatient(
                                      patient.patientID
                                    );
                                    window.location.reload();
                                  }}
                                >
                                  Remove
                                </a>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
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
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
