import React, { useState } from "react";
import * as XLSX from "xlsx";

function Exel() {
  const [excelData, setExcelData] = useState([]);
  const [objectkey, setObjectkey] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [randomColumnData, setRandomColumnData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      setExcelData(json);
      const randomColumn = generateRandomColumn(json);
      setRandomColumnData(randomColumn);
    };

    reader.readAsArrayBuffer(file);
  };

  
  const filterData = () => {
    if (objectkey != "") {
      const filtered = excelData.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(objectkey.toLowerCase())
        )
      );
      setFilteredData(filtered);
    } else {
      alert("Please Enter Value To Get Data From Our Database");
    }
  };

  const generateRandomColumn = (data) => {
    const randomColumn = [];

    // Randomly select one key from the first row (assuming first row contains keys)
    const keys = Object.keys(data[0]);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    for (let i = 0; i < data.length; i++) {
      randomColumn.push(data[i][randomKey]);
    }

    return randomColumn;
  };

  return (
    <div>
      <h2>Upload an Excel File</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        id="file"
        onChange={handleFileUpload}
      />

      <input
        type="text"
        value={objectkey}
        onChange={(e) => setObjectkey(e.target.value)}
        placeholder="Enter text to filter"
      />

      <button type="button" onClick={filterData}>
        Filter Exel Data
      </button>
      <h2>Randomly Selected Key:</h2>

      {randomColumnData.length > 0 && (
        <div>
          <h2>Random Column:</h2>
          <table id="customers">
            <thead>
              <tr>
                <th>Random Column</th>
              </tr>
            </thead>
            <tbody>
              {randomColumnData.map((value, index) => (
                <tr key={index}>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredData.length > 0 && (
        <div>
          <h2>Filtered Excel Data:</h2>
          <table id="customers">
            <thead>
              <tr>
                {Object.keys(filteredData[0]).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {excelData.length > 0 && (
        <div>
          <h2>Original Excel Data:</h2>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Exel;
