import { useState } from 'react';
import ReactCardFlip from "react-card-flip";
import ChangeMode from './loop.svg'
import './App.css';

function App() {
  const [jsonTransform, setJsonTransform] = useState('');
  const [csv, setCSV] = useState('');
  const [csvTransform, setCsvTransform] = useState('');
  const [json, setJSON] = useState();
  const [json2csv, setJSON2CSV] = useState(false)
  
  const jsonChange = (event) =>{
    setJsonTransform(event.target.value)
  }

  const csvChange = (event) =>{
    setCsvTransform(event.target.value);
  }

  const transformJSON = (event) =>{
    event.preventDefault()
    try{
      const test = JSON.parse(jsonTransform)
      let keys = Object.keys(test);
      let values = Object.values(test);
      let text = `${keys.join(",")},${values.join(",")}`;
      setCSV(text)
    }catch(error){
      alert(error)

    }
    console.log(csv);
  }
  const transformCSV = (event) =>  {
    event.preventDefault()
    const arrayCSV= csvTransform.split(',');
    let objectJSON={}
    for (let index = 0; index < arrayCSV.length/2; index++) {
      objectJSON[arrayCSV[index]]= arrayCSV[index+(arrayCSV.length/2)];
    }
    console.log(objectJSON)
    setJSON(JSON.stringify(objectJSON));

  }

  const clearContents = (event) => {
    event.preventDefault()
    setJsonTransform('');
    setCSV('');
  }

  const fileLoadJSON = (event) => {
    event.preventDefault();
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      setJsonTransform(text);
    };
    reader.readAsText(event.target.files[0]);
  }

  const fileLoadCSV = (event) => {
    event.preventDefault();
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      setCsvTransform(text);
    };
    reader.readAsText(event.target.files[0]);
  }



  const saveFile =() =>{
    try{
      if(csv===''){
        const error = "There is no content to be saved";
        throw  error;
      }
      const data = `data:,${csv}`;
      const filename = 'file.csv';
      const aTag = document.createElement('a');
  
      aTag.href = data;
      aTag.download = filename;
      aTag.click();
    }catch(error){
      alert(error);
    }
   
  }
  const toggleMode = (event) =>{
    event.preventDefault()
    setJSON2CSV(!json2csv);
  }

  return (
    <div className='flip-card'>

      <ReactCardFlip isFlipped={json2csv}>
        <div className="front">
          <h1>JSON-2-CSV</h1>
          <h2>The objective of JSON2CSV is to help bridge the gap between JSON and CSV by converting JSON to CSV to make it easier to review data in a spreadsheet.
            It allows the user to paste JSON into a text box to generate its equivalent CSV.</h2>
          <div className="transform-container">
            <div className='box-container'>
            <h2>Please input your JSON text here</h2>
            <input className='input-container' type="text" name="jsontext" value={jsonTransform} placeholder='{name:value}' onChange={jsonChange}></input>
            <button onClick={transformJSON}>Convert</button>
          </div>
          <div className='box-container'>
            <h2>You will see your text transformed to CSV Here</h2>
            <input className='input-container' type="text" name="CSV" value={csv} placeholder=''></input>
            <button onClick={clearContents}>Clear</button>
            <button onClick={saveFile}>Save CSV file into computer</button>
          </div>
          <div className='box-container'>
            <h2>You can also upload a file to be converted to CSV</h2>
            <input  type="file" name="JSONfile" accept=".json" onChange={fileLoadJSON}></input>
          </div>
          <button className='changeStyle-button' onClick={toggleMode}><img src={ChangeMode} alt="change"/></button>
          
          </div> 
        </div>
        
        <div className='back'>
          <h1>CSV-2-JSON</h1>
          <h2>In CSV2JSON you'll start by copying the JSON2CSV app you created and then modify it to allow CSV to JSON conversion as well the JSON to CSV conversion that's already present.
            In additional to providing a useful function, this challenge will also give you practice in modifying existing applications to add new functionality.
          </h2>
          <div className="transform-container "> 
            <div className='box-container'>
              <h2>Please input your CSV text here</h2>
              <input className='input-container' type="text" name="csvtext" value={csvTransform} placeholder='name1, name2, name3, value1, value2, value3' onChange={csvChange}></input>
              <button onClick={transformCSV}>Convert</button>
            </div>
            <div className='box-container'>
              <h2>You will see your text transformed to JSON Here</h2>
              <input className='input-container' type="text" name="jsontransformed" value={json} placeholder=''></input>
              <button onClick={clearContents}>Clear</button>
            </div>
            <div className='box-container'>
            <h2>You can also upload a file to be converted to JSON</h2>
            <input  type="file" name="CSV" accept=".csv" onChange={fileLoadCSV}></input>
          </div>
          <button className='changeStyle-button' onClick={toggleMode}><img src={ChangeMode} alt="change"/></button>
          </div>
        </div>
      </ReactCardFlip>
      
    </div>
  );
}

export default App;
