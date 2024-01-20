import { Formik, Field } from "formik";
import { useQuery, gql } from "@apollo/client";
import ProfileImage from "../../assets/profile.png";
import * as Yup from "yup";

const validationSchema = Yup.object({
  patient_id: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  age: Yup.number().required("Required"),
  gender: Yup.string().required("Required"),
  disease: Yup.string().required("Required"),
  message: Yup.string(),
});

const EditPatientForm = (props) => {
  // eslint-disable-next-line react/prop-types
  const { Patient, PatientID } = props;

  const initialValues = {
    // eslint-disable-next-line react/prop-types
    name: Patient.name,
    // eslint-disable-next-line react/prop-types
    age: Patient.age,
    // eslint-disable-next-line react/prop-types
    message: Patient.message,
    patient_id: PatientID,
  };

  const { data, loading, error } = useQuery(
    gql`
      query {
        getDiseases {
          Diseases {
            diseaseID
            diseaseName
          }
        }
      }
    `
  );

  let Diseases = [];

  if (!error) {
    if (!loading) {
      Diseases = data?.getDiseases?.Diseases;
    }
  }

  const Genders = [
    {
      ID: 1,
      value: "male",
    },
    {
      ID: 2,
      value: "female",
    },
  ];

  const handleSubmit = async (values) => {
    return values;
  };

  return (
    <div className="container">
      <div className="row">
        <img
          src={ProfileImage}
          className="img-fluid"
          alt=""
          style={{
            width: "300px",
            height: "auto",
            margin: "auto",
            display: "block",
          }}
        />
        <div className="col-lg-8 col-8 mx-auto">
          <div className="booking-form">
            <h2 className="text-center mb-lg-3 mb-2">Add Patient Form</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <form>
                <div className="row">
                <Field
                      type="text"
                      name="patient_id"
                      id="patient_id"
                      className="form-control"
                      placeholder="Patient ID"
                      required
                      hidden
                      />
                  <div className="col-lg-6 col-12">
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-12">
                    <Field
                      type="number"
                      name="age"
                      id="age"
                      className="form-control"
                      placeholder="Age"
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-12">
                    <Field
                      as="select"
                      name="gender"
                      className="form-control"
                      required
                    >
                      {Genders.map((gender) =>
                        // eslint-disable-next-line react/prop-types
                        gender.value == Patient.gender ? (
                          <option
                            key={gender.value}
                            value={gender.value}
                            hidden
                            selected
                          >
                            {gender.value}
                          </option>
                        ) : (
                          <option key={gender.value} value={gender.value}>
                            {gender.value}
                          </option>
                        )
                      )}
                    </Field>
                  </div>

                  <div className="col-lg-6 col-12">
                    <Field
                      as="select"
                      name="disease"
                      className="form-control"
                      required
                    >
                      {Diseases.map((disease) =>
                        // eslint-disable-next-line react/prop-types
                        disease.diseaseID == Patient.disease.diseaseID ? (
                          <option
                            key={disease.diseaseID}
                            value={disease.diseaseID}
                            hidden
                            selected
                          >
                            {disease.diseaseName}
                          </option>
                        ) : (
                          <option
                            key={disease.diseaseID}
                            value={disease.diseaseID}
                          >
                            {disease.diseaseName}
                          </option>
                        )
                      )}
                    </Field>
                  </div>

                  <div className="col-lg-12 col-12">
                    <Field
                      as="textarea"
                      className="form-control"
                      rows="5"
                      id="message"
                      name="message"
                      placeholder="Additional Message"
                      value={initialValues.message}
                    />
                  </div>

                  <div className="col-lg-3 col-md-4 col-6 mx-auto text-center">
                    <button
                      type="submit"
                      className="form-control"
                      id="submit-button"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPatientForm;
