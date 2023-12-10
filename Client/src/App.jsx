import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { Header } from './Header';
import {Provider,  useDispatch , useSelector} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import countState from './states/countState.js'

const store = configureStore({
  reducer: {
    count: countState,
  },
});


function App() {
  return (
    <Provider store={store}>
      <AppTest />
      </Provider>
  )
}

const AppTest = () => {
  
  const count = useSelector((state) => state.count);

  const dispatch = useDispatch();
  
  const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache(),
  });  

  let [diseases, setDiseases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
        query: gql`
          query {
            getDiseases {
              Diseases {
                diseaseID
                diseaseName
                diseaseDescription
              }
            }
          }
        `
      })
      const result = [];
      data.getDiseases.Diseases.map((disease) => {
        result.push(disease);
      })
      if (result.length !== diseases.length)
        return setDiseases(result);
      for(let i = 0; i < result.length; i++) {
        if (result[i].diseaseID !== diseases[i].diseaseID)
          return setDiseases(result);
      }
    }
    fetchData();
  });

  return(
    <ApolloProvider client={client}>
      <Header item={count}/>
      <div>
      {diseases.map((disease) =>  <p> {disease.diseaseName} </p>)}
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </ApolloProvider>
  )
}

export default App
