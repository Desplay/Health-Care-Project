import { Header } from "./HeadFoot/Header";
import { Footer } from "./HeadFoot/Footer";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const LobbyRoom = () => {
  const [datas, getDatas] = useState([]);
  const [socket, getSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://dadasd.com");
    setSocket(newSocket);
    newSocket.addEventListener("message", (event) => {
      const dataFromServer = JSON.parse(event.data);
      console.log("Dữ liệu từ server: ", dataFromServer);
      //xử lý dữ liệu nhận được từ server
    });
    return () => {
      newSocket.close();
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      full_name: "",
      age: "",
      gender: "",
      disease: "",
      additional_message: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(2, "Minimum 2")
        .max(30, "Maximum 30")
        .required("Required!"),
      age: Yup.string()
        .min(1, "Minimum 1")
        .max(30, "Maximum 3")
        .required("Required!"),
      gender: Yup.string().required("Required!"),
      disease: Yup.string().required("Required!"),
      disease: Yup.string().min(1, "Minimum 1").required("Required!"),
    }),
    onSubmit: (value) => {
      if (socket) {
        const dataWithTimestamp = { ...value, timestamp: new Date() };
        socket.send(JSON.stringify(value));
        setData((prevData) => [...prevData, dataWithTimestamp]);
      }
    },
  });

  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });
  const sicks = client.query({
    query: gql`
      query {
        getDiseases {
          Diseases {
            diseaseName
          }
        }
      }
    `,
  });
  const listSick = sicks.map((sick) => (
    <option value={formik.values.disease} onChange={formik.handeChange}>
      {sick}
    </option>
  ));
  const isTableVisible = datas.length > 0;

  return (
    <div>
      <Header />
      <main>
        <h1>Add Patients Form</h1>
        <form>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formik.values.full_name}
              onChange={formik.handeChange}
              placeholder="Full Name"
            />
            {formik.errors.full_name && formik.touched.full_name && (
              <p>{formik.errors.full_name}</p>
            )}
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formik.values.age}
              onChange={formik.handeChange}
              placeholder="Age"
            />
            {formik.errors.age && formik.touched.age && (
              <p>{formik.errors.age}</p>
            )}
          </div>
          <div>
            <label>Gender</label>
            <select id="gender" name="gender">
              <option values="none" selected disabled hidden>
                Choose your gender
              </option>
              <option
                value={formik.values.gender}
                onChange={formik.handeChange}
              >
                Male
              </option>
              <option
                value={formik.values.gender}
                onChange={formik.handeChange}
              >
                Female
              </option>
            </select>
            {formik.errors.gender && formik.touched.gender && (
              <p>{formik.errors.gender}</p>
            )}
          </div>
          <div>
            <label>Disease</label>
            <select id="disease" name="disease">
              <option values="none" selected disabled hidden>
                Choose your disease
              </option>
              {listSick}
            </select>
            {formik.errors.disease && formik.touched.disease && (
              <p>{formik.errors.disease}</p>
            )}
          </div>
          <div>
            <label>Additional Message</label>
            <textarea
              id="additional_message"
              name="additional_message"
              value={formik.values.additional_message}
              onChange={formik.handeChange}
              placeholder="Additional Message"
            ></textarea>
            {formik.errors.additional_message &&
              formik.touched.additional_message && (
                <p>{formik.errors.additional_message}</p>
              )}
          </div>
          <div>
            <button type="submit">SUBMIT</button>
          </div>
        </form>
        {isTableVisible && (
          <div>
            <h3>Disease level table</h3>
            <button className="move_patients">Move Patients</button>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Time Add</th>
                  <th>Disease</th>
                  <th>Additional message</th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.full_name}</td>
                    <td>{data.age}</td>
                    <td>{data.gender}</td>
                    <td>{data.timestamp.toLocaleString()}</td>
                    <td>{data.disease}</td>
                    <td>{data.additional_message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
