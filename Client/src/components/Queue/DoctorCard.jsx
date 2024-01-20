import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

function DoctorCard() {
  const { data, loading, error } = useQuery(
    gql`
      query {
        getDoctors {
          id
          PhyID
          name
          maxCapacity
          patients {
            PhyID
          }
        }
      }
    `
  );

  if (loading || error) return <></>;

  const doctors = data.getDoctors;

  return (
    <>
      {doctors.map((doctor) => (
        <div key={doctor.id} className="col-xl-3 col-md-6 mb-4">
          <Link to={`/doctor?DoctorID=${doctor.id}`}>
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                      {`Doctor ${doctor.name}`}
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          {" "}
                          {`${doctor.patients.length} / ${doctor.maxCapacity}`}{" "}
                        </div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            style={{
                              width: `${
                                (doctor.patients.length / doctor.maxCapacity) *
                                100
                              }%`,
                            }}
                          ></div>
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
        </div>
      ))}
    </>
  );
}

export default DoctorCard;
