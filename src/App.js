import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [shortData, setShortData] = useState([])

  useEffect(() => {
    async function fetchShortData(){
    const response = await fetch("/NEH2020sGrant_Short.json")
      const result = await response.json()
        console.log(result.Grants.Grant)
        setShortData(result.Grants.Grant)
  }
  fetchShortData()



  
}, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <table>
      <thead>
      <tr>
        <th>Project Title</th>
        <th>Institution</th>
        <th>Institution Country</th>
        <th>Institution State</th>
        <th>Division</th>
        <th>Primary Discipline</th>
        <th>Year Awarded</th>
      </tr>

      </thead>
      <tbody>
      {shortData.map((g) => (
      <tr>
        <td key = {`${g.ProjectTitle}_${g.ProjectTitle}`}>{g.ProjectTitle}</td>
        <td key = {`${g.ProjectTitle}_${g.Institution}`}>{g.Institution}</td>
        <td key = {`${g.ProjectTitle}_${g.InstCountry}`}>{g.InstCountry}</td>
        <td key = {`${g.ProjectTitle}_${g.InstState}`}>{g.InstState}</td>
        <td key = {`${g.ProjectTitle}_${g.Division}`}>{g.Division}</td>
        <td key = {`${g.ProjectTitle}_${g.PrimaryDiscipline}`}>{g.PrimaryDiscipline}</td>
        <td key = {`${g.ProjectTitle}_${g.YearAwarded}`}>{g.YearAwarded}</td>
      </tr>
      ))}
      </tbody>
    </table>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    
  );
}

export default App;
