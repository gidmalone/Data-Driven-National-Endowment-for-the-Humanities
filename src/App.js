import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [shortData, setShortData] = useState([])
  const [useShortData, setuseShortData] = useState([])

  useEffect(() => {
    async function fetchShortData(){
    const response = await fetch("/NEH2020sGrant.json")
      const result = await response.json()
        setShortData(result.Grants.Grant)
  }
  fetchShortData()
}, [])

  useEffect(() => {setuseShortData([...shortData])}, [shortData])

  let changeVals = []


  //usa or foreign code
  const [usaFilt, setUsaFilt] = useState("N1")

  function USA(val){
    if(val == "U1"){
      setuseShortData(shortData.filter((response) => response.InstCountry === "USA"))
    }
    else if (val == "F1")
      setuseShortData(shortData.filter((response) => response.InstCountry !== "USA"))
    else{
      setuseShortData(shortData)
    }
  }

  const handleChangeUS = (event) => {
    //changeVals.push(event.target.value)
    setUsaFilt(event.target.value)
    USA(event.target.value)
  }



  //ky filter code
  const [KYFilt, setKYFilt] = useState("N2")

  function kySort(val){
    if(val == "K2"){
      setuseShortData(shortData.filter((response) => response.InstState === "KY"))
    }
    else{
      setuseShortData(shortData)
    }
  }

  const handleChangeKY = (event) => {
    setKYFilt(event.target.value)
    kySort(event.target.value)
  }



  //year sort code
  const [yrFilt, setYRFilt] = useState("N4")
  let copyShort = [...shortData]

  function yearSort(val){
    console.log(val)
    if(val == "N4"){
      setuseShortData(copyShort.sort((a, b) => a.YearAwarded - b.YearAwarded))
    }
    if(val == "O4"){
      setuseShortData(copyShort.sort((a, b) => b.YearAwarded - a.YearAwarded))
    }
    else
      setuseShortData(shortData)
  }

  const handleChangeYR = (event) => {
    setYRFilt(event.target.value)
    yearSort(event.target.value)
  }




  //divistion code
  function filtDiv(arr){
      let a = []
      for (let grant of shortData){
        if(grant){
          for(let i = 0; i<arr.length; i++){
            if(grant.Division == arr[i]){
              a.push(grant)
              
              }
          }
        }
      }
      if(a.length < 1)
        setuseShortData(shortData)
      else
        setuseShortData(a)
  }

    const [div, setDiv] = useState([])

    const handleChangeDiv = (event) => {
        let copy = [... div]
        let out = []
        let t = true
        for(let i = 0; i<copy.length; i++){
          if(copy[i] == event.target.value)
            t = false;
          else
            out.push(copy[i])
        }
        if(t){
          out.push(event.target.value)
        }
        setDiv(out)
        filtDiv(out)
  }



  //border code
  const [bdFilt, setBdFilt] = useState("N3")

  const handleChangeBorder = (event) => {
      border(event.target.value)
      setBdFilt(event.target.value)
  }

  function border(val){
      if(val == "B3")
        setuseShortData(shortData.filter((response) => response.InstState === "IL" || response.InstState === "IN" || response.InstState === "OH" || response.InstState === "WV" ||response.InstState === "VA" || response.InstState === "TN" || response.InstState === "MO"))
      else
        setuseShortData(shortData)
    }




    //test

    /*const bigClick = (event) => {
      if 
    }*/


  function reset(){
    setuseShortData(shortData)
    setUsaFilt("N1")
    setBdFilt("N3")
    setKYFilt("N2")
    setYRFilt("N4")
    setDiv([])
  }


  return (
    <div className="App">
      <header className="App-header">

        <h1>Grant Information</h1>

        {/*widgets*/}
      <div className="Widgets">


      <div className="Group1">{handleChangeUS}
        {/*USA or foreign*/}
        <div id = "usa">
        <form>
          <p>Select if you want to see USA or foreign grants</p>
          <label>
            <input type = "radio" name = "isForeign" value = "F1" checked = {usaFilt === "F1"} onChange = {handleChangeUS} />
            Foreign
          </label>
          <label>
            <input type = "radio" name = "isForeign" value = "U1" checked = {usaFilt === "U1"} onChange = {handleChangeUS} />
            USA
          </label>
          <label>
            <input type = "radio" name = "isForeign" value = "N1" checked = {usaFilt === "N1"} onChange = {handleChangeUS} />
            Both
          </label>
        </form>
        </div>

        {/*Ky or all states*/}
        <div id = "ky">
        <form>
          <p>Select if you want to see only Kentucky</p>
          <label>
            <input type = "radio" name = "isKY" value = "K2" checked = {KYFilt === "K2"} onChange = {handleChangeKY}/>
            KY
          </label>
          <label>
            <input type = "radio" name = "isKY" value = "N2" checked = {KYFilt === "N2"} onChange = {handleChangeKY}/>
            All States
          </label>
        </form>
        </div>
        </div>

        {/*Border states*/}
        <div id = "border">
          <div className="Group2">
        <form>
          <p>View Border States</p>
          <label>
            <input type = "radio" name = "border" value = "B3" checked = {bdFilt === "B3"} onChange = {handleChangeBorder}/>
            Border States
          </label>
          <label>
            <input type = "radio" name = "border" value = "N3" checked = {bdFilt === "N3"} onChange = {handleChangeBorder}/>
            All States
          </label>
        </form>
        </div>


        {/*year sort*/}
        <div id = "year">
        <form>
          <p>Select how you want it sorted</p>
          <label>
            <input type = "radio" name = "YR" value = "N4" checked = {yrFilt === "N4"} onChange = {handleChangeYR}/>
            Oldest to Newest 
          </label>
          <label>
            <input type = "radio" name = "YR" value = "O4" checked = {yrFilt === "O4"} onChange = {handleChangeYR}/>
            Newest to Oldest
          </label>
          {/*}
          <label>
            <input type = "radio" name = "YR" value = "NA" checked = {yrFilt === "NA"} onChange = {handleChangeYR}/>
            Default
          </label>*/}
        </form>
        </div>
        </div>


        {/*division selection*/}
        <div id = "division">
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
        </div> 

        {/* <button type="button" onClick={bigClick}> Set Filters</button>    */}

      </div>
            <button onClick = {reset} className = "Reset">Reset</button>

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
      <tr key = {g["@AppNumber"]}>
       <td className = "projT">{g.ProjectTitle}</td>
       <td>{g.Institution}</td>
       <td>{g.InstCountry}</td>
       <td>{g.InstState}</td>
       <td>{g.Division}</td>
       <td>{g.PrimaryDiscipline}</td>
       <td>{g.YearAwarded}</td>
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