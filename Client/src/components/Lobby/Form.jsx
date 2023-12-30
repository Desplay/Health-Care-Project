import { Formik, Field } from "formik";
import { useQuery, gql } from "@apollo/client";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  age: Yup.number().required("Required"),
  gender: Yup.string().required("Required"),
  disease: Yup.string().required("Required"),
  message: Yup.string(),
});

const AddPatientForm = () => {
  const initialValues = {
    name: "",
    age: "",
    gender: "",
    disease: "",
    message: "",
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
                      <option value="" hidden>
                        Choose your gender
                      </option>
                      {Genders.map((gender) => (
                        <option key={gender.value} value={gender.value}>
                          {gender.value}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <div className="col-lg-6 col-12">
                    <Field
                      as="select"
                      name="disease"
                      className="form-control"
                      required
                    >
                      <option value="" hidden>
                        Choose your disease
                      </option>
                      {Diseases.map((disease) => (
                        <option
                          key={disease.diseaseID}
                          value={disease.diseaseID}
                        >
                          {disease.diseaseName}
                        </option>
                      ))}
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

export default AddPatientForm;
