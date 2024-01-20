import { useEffect } from "react";
import Footer from "../components/Footer";
import AddPatientForm from "../components/Lobby/Form";
import NavBar from "../components/NavBar";
import { gql, useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import React from "react";
import Table from "../components/Lobby/Table";

function useQueryParamater() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function LobbyScreen() {
  const query = useQueryParamater();
  const [AddPatient] = useMutation(
    gql`
      mutation CreatePatient(
        $age: Int!
        $diseaseID: String!
        $gender: String!
        $message: String
        $name: String!
      ) {
        createPatient(
          patientInput: {
            name: $name
            age: $age
            diseaseID: $diseaseID
            gender: $gender
            message: $message
          }
        )
      }
    `
  );

  useEffect(() => {
    const createPatient = async () => {
      if (query.get("name") !== null) {
        const newPatient = {
          name: query.get("name"),
          age: parseInt(query.get("age")),
          diseaseID: query.get("disease"),
          gender: query.get("gender"),
          message: query.get("message"),
        };
        const { data } = await AddPatient({
          variables: newPatient,
        });
        if (data) {
          window.location.href = `/Lobby`;
        }
      } 
    };
    createPatient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <NavBar screen="Lobby" />
      <section className="section-padding">
        <AddPatientForm />
      </section>
      <Table />
      <footer className="site-footer section-padding">
      <Footer />
      </footer>
    </>
  );
}

export default LobbyScreen;
