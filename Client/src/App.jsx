import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useLazyQuery,
} from "@apollo/client";
import { Header } from "./Header";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import countState from "./states/countState.js";

import QueueRoom from "./components/queueRoom.jsx"
import DoctorRoom from "./components/doctorRoom.jsx";
import Navigation from "./components/navigation.jsx";
import listDoctor from "./data/dataDoctor.js";


const client = new ApolloClient({
  // uri: 'http://localhost:3001/graphql',
  uri: "http://172.17.31.16:3001/graphql",
  cache: new InMemoryCache(),
});

const store = configureStore({
  reducer: {
    count: countState,
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Provider store={store}>
      <Navigation />
      {/* <AppTest /> */}
    </Provider>
    </ApolloProvider>
  );
}

const AppTest = () => {
  const [data1, setData] = useState([]);

  const dispatch = useDispatch();


  let [diseases, setDiseases] = useState([]);

  const GetDisease = useLazyQuery(gql`
    query abvb($gugu: String!) {
      getDisease(diseaseNameorID: $gugu) {
        diseaseName
      }
    }
  `,
  {
    variables: {
      gugu: "DN0001"
    },
  }
  );

  useEffect(() => {
    const get = async () => {
      const {data } = await GetDisease[0]();
      setData(data.getDisease.diseaseName);
    }
    get();
  }, []);
  return (
    <ApolloProvider client={client}>

    </ApolloProvider>
  );
};

export default App;
