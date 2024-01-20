import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { gql, useQuery } from "@apollo/client";
import ProfileImage from '../assets/profile.png';
import Table from "../components/Doctor/Table";

function useQueryParamater() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function DoctorScreen() {
  const query = useQueryParamater();
  const DoctorID = query.get("DoctorID");

  const { data, loading, error } = useQuery(
    gql`
      query GetDoctorById($DoctorID: String!) {
        getDoctorById(Doctor_id: $DoctorID) {
          id
          PhyID
          name
          maxCapacity
          patients {
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
      }
    `, {
      variables: {
        DoctorID
      }
    }
  );

  if (loading || error) return <></>;

  const Doctor = data.getDoctorById;

  return (
    <>
      <NavBar />
      <section >
        <div className="container">
        <img src={ProfileImage} className="img-fluid" alt=""
                    style={
                        {
                            margin: "auto",
                            display: "block",
                            width: "300px",
                            height: "auto",
                            paddingBottom: "10px"
                        }
                    } />
                <h2 className="text-center mb-lg-3 mb-2 text-uppercase"> Doctor {Doctor.name} </h2>
        </div>
        <Table patients={Doctor.patients} DoctorID={DoctorID} />
        </section>
        <footer className="site-footer section-padding">
          <Footer />
        </footer>
    </>
  );
}

export default DoctorScreen;
