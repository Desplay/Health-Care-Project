import { useQuery, gql, useMutation } from "@apollo/client";
function Table() {
  const { data, loading, error } = useQuery(
    gql`
      query {
        getPatientsInQueue {
          patientID
          PhyID
          age
          name
          gender
          disease {
            diseaseID
            diseaseName
            diseaseDescription
          }
          createdAt
          message
        }
      }
    `
  );

  const [RemovePatient] = useMutation(
    gql`
      mutation DeletePatient($PatientID: String!) {
        deletePatient(patientID: $PatientID)
      }
    `
  );
  

  if (loading || error) return <></>;

  const patients = data.getPatientsInQueue;
  if (patients.length === 0) return <></>;

  const handleMovePatientToDoctor = async () => {};

  const handleRemovePatient = async (patientID) => {
    await RemovePatient({
      variables: {
        PatientID: patientID,
      },
    });
  };

  return (
    <div className="container-fluid" id="TablePatients">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h4 className="m-0 font-weight-bold text-primary">
            Disease level table
          </h4>
          <a
            href=""
            onClick={handleMovePatientToDoctor}
            className="btn btn-primary btn-icon-split"
          >
            <span className="text">Move Patients</span>
            <span className="icon text-white-50 d-flex justify-content-center align-items-center">
              <i className="fas fa-arrow-right"></i>
            </span>
          </a>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="dataTables_wrapper dt-bootstrap4">
              <div className="row">
                <div className="col-sm-12">
                  <table
                    className="table table-bordered dataTable"
                    id="dataTable"
                    cellSpacing="0"
                    role="grid"
                    aria-describedby="dataTable_info"
                  >
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
                    <tbody>
                      {patients.map((patient, index) => (
                        <tr key={patient.patientID}>
                          <td>{index + 1}</td>
                          <td>{patient.PhyID}</td>
                          <td>{patient.name}</td>
                          <td>{patient.age}</td>
                          <td>{patient.gender}</td>
                          <td>{patient.createdAt}</td>
                          <td>{patient.disease.diseaseName}</td>
                          <td>{patient.message}</td>
                          <td>
                          <a
                              href=""
                              onClick={async () => {
                                await handleRemovePatient(patient.patientID);
                                window.location.reload();
                              }}
                            >
                              Remove
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
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
  );
}

export default Table;
