import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [shortData, setShortData] = useState([])
  const [useShortData, setuseShortData] = useState([])

  useEffect(() => {
    async function fetchShortData(){
    const response = await fetch("/NEH2020sGrant_Short.json")
      const result = await response.json()
        console.log(result.Grants.Grant)
        setShortData(result.Grants.Grant)
  }
  fetchShortData()
}, [])

  useEffect(() => {setuseShortData([...shortData])}, [shortData])
  
  const [usaFilt, setUsaFilt] = useState("N")

  function USA(val){
    if(val == "U"){
      setuseShortData(shortData.filter((response) => response.InstCountry === "USA"))
    }
    else if (val == "F")
      setuseShortData(shortData.filter((response) => response.InstCountry !== "USA"))
    else{
      setuseShortData(shortData)
    }
  }

  const handleChangeUS = (event) => {
    setUsaFilt(event.target.value)
    USA(event.target.value)
  }

  function yearSort(val){
    if(val == "N")
      setuseShortData(useShortData.sort((a, b) => a.YearAwarded - b.YearAwarded))
    if(val == "O")
      setuseShortData(useShortData.sort((a, b) => b.YearAwarded - a.YearAwarded))
  }

  const handleChangeYR = (event) => {
    yearSort(event.target.value)
  }

  function filtDiv(arr){
      let a = []
      for (let grant of shortData){
        console.log(grant.Division, arr)
        console.log(grant.Division in arr)
        if(grant){
          for(let i = 0; i<arr.length; i++){
            if(grant.Division == arr[i]){
              a.push(grant)
              console.log('hi')
              }
          }
        }
      }
      setuseShortData(a)
  }

    const [div, setDiv] = useState([])
    console.log(div);

    const handleChangeDiv = (event) => {
        let copy = [... div]
        copy.push(event.target.value)
        setDiv(copy)
        filtDiv(copy)
  }
  return (
    <div className="App">
      <header className="App-header">

        <form>
          <p>Select if you want to see USA or foreign grants</p>
          <label>
            <input type = "radio" name = "isForeign" value = "F" checked = {usaFilt === "F"} onChange = {handleChangeUS}/>
            Foreign
          </label>
          <label>
            <input type = "radio" name = "isForeign" value = "U" checked = {usaFilt === "U"} onChange = {handleChangeUS}/>
            USA
          </label>
          <label>
            <input type = "radio" name = "isForeign" value = "N" checked = {usaFilt === "N"} onChange = {handleChangeUS}/>
            Both
          </label>
        </form>

        <form>
          <p>Select how you want it sorted</p>
          <label>
            <input type = "radio" name = "YR" value = "N" onChange = {handleChangeDiv}/>
            Oldest to Newest
          </label>
          <label>
            <input type = "radio" name = "YR" value = "O" onChange = {handleChangeDiv}/>
            Newest to Oldest
          </label>
        </form>

        <form>
          <p>Select which divisions you want to see</p>
          <label>
            <input type = "checkbox" name = "div" value = "Preservation and Access" onChange = {handleChangeDiv}/>
            Preservation and Access
          </label>
          <label>
            <input type = "checkbox" name = "div" value = "Research Programs" onChange = {handleChangeDiv}/>
            Research Programs
          </label>
          <label>
            <input type = "checkbox" name = "div" value = "Public Programs" onChange = {handleChangeDiv}/>
            Public Programs
          </label>
          <label>
            <input type = "checkbox" name = "div" value = "Digital Humanities" onChange = {handleChangeDiv}/>
            Digital Humanities
          </label><label>
            <input type = "checkbox" name = "div" value = "Education Programs" onChange = {handleChangeDiv}/>
            Education Programs 
          </label>
          <label>
            <input type = "checkbox" name = "div" value = "Federal/State Partnership" onChange = {handleChangeDiv}/>
            Federal/State Partnership
          </label>
          <label>
            <input type = "checkbox" name = "div" value = "Agency-wide Projects" onChange = {handleChangeDiv}/>
            Agency-wide Projects 
          </label>
          <label>
            <input type = "checkbox" name = "div" value = "Data and Evaluation" onChange = {handleChangeDiv}/>
            Data and Evaluation
          </label>
          <label>
            <input type = "checkbox" name = "div" value = "Challenge Programs" onChange = {handleChangeDiv}/>
            Challenge Programs
          </label>
          <label>
            <input type = "checkbox" name = "div" value = "Collections and Infrastructure" onChange = {handleChangeDiv}/>
            Collections and Infrastructure
          </label>
          <label>
            <input type = "checkbox" name = "div" value = "Lifelong Learning" onChange = {handleChangeDiv}/>
            Lifelong Learning 
          </label>
        </form>


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
      {useShortData.map((g) => (
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
