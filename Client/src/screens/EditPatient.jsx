import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AddPatientForm from "../components/Patient/Form";

function useQueryParamater() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function EditPatient() {
  const query = useQueryParamater();
  const patient_id = query.get("ID");

  
  const [EditPatient] = useMutation(
    gql`
      mutation EditPatient(
        $PatientID: String!
        $name: String!
        $age: Int!
        $gender: String!
        $diseaseID: String!
        $message: String!
      ) {
        editPatient(
          patientID: $PatientID
          patientInput: {
            name: $name
            age: $age
            gender: $gender
            diseaseID: $diseaseID
            message: $message
          }
        )
      }
    `,
  );

  useEffect(() => {

      if(query.get("name") !== null){
        const editPatient = async () => {
          const newPatient = {
            patient_id: query.get("patient_id"),
            name: query.get("name"),
            age: parseInt(query.get("age")),
            diseaseID: query.get("disease"),
            gender: query.get("gender"),
            message: query.get("message"),
          };
          const { data } = await EditPatient({
            variables: {
              PatientID: newPatient.patient_id,
              name: newPatient.name,
              age: newPatient.age,
              diseaseID: newPatient.diseaseID,
              gender: newPatient.gender,
              message: newPatient.message,
            }
          });
          if (data) {
            window.location.href = `/Lobby`;
          }
      }
      editPatient();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, loading, error } = useQuery(
    gql`
      query geDetailsPatient($PatientID: String!) {
        getDetailsPatient(patientID: $PatientID) {
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
    `,
    {
      variables: { PatientID: patient_id },
    }
  );


  if (loading || error) return <></>;

  const patient = data.getDetailsPatient;

  return (
    <>
      <NavBar />
      <section className="section-padding">
        <AddPatientForm Patient={patient} PatientID={patient_id}/>
      </section>
      <footer className="site-footer section-padding">
        <Footer />
      </footer>
    </>
  );
}

export default EditPatient;
