import { useState } from 'react';
import './App.css';

function App() {
  const [json, setJson] = useState('');
  const [csv, setCSV] = useState('');
  const jsonChange = (event) =>{
    setJson(event.target.value)
  }

  const transformJSON = (event) =>{
    event.preventDefault()
    try{
      const test = JSON.parse(json)
      let keys = Object.keys(test);
      let values = Object.values(test);
      let text = `${keys.join(",")}\n${values.join(",")}`;
      setCSV(text)
    }catch(error){
      alert(error)

    }
    console.log(csv);
  }

  const clearContents = (event) => {
    event.preventDefault()
    setJson('');
    setCSV('');
  }
  const fileLoad = (event) => {
    event.preventDefault();
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      setJson(text);
    };
    reader.readAsText(event.target.files[0]);
  }

  const saveFile =() =>{
    const data = `data:,${csv}`;
    const filename = 'file.csv';
    const aTag = document.createElement('a');

    aTag.href = data;
    aTag.download = filename;
    aTag.click();
  }

  return (
    <>
    <div className="App">
      <h1>JSON-2-CSV</h1>
      <h2>The objective of JSON2CSV is to help bridge the gap between JSON and CSV by converting JSON to CSV to make it easier to review data in a spreadsheet.
         It allows the user to paste JSON into a text box to generate its equivalent CSV.</h2>
    </div>
    <div className="transform-container">
        <div className='box-container'>
          <h2>Please input your JSON text here</h2>
          <input className='input-container' type="text" name="jsontext" value={json} placeholder='{name:value}' onChange={jsonChange}></input>
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
          <input  type="file" name="CSV" accept=".json" onChange={fileLoad}></input>
        </div>
    </div>
    </>
  );
}

export default App;
