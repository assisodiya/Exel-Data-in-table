import React, { useState } from "react";
import * as XLSX from "xlsx";

function ExelRandom() {
  const [excelData, setExcelData] = useState([]);
  const [objectkey, setObjectkey] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [randomRows, setRandomRows] = useState([]);

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
      setRandomRows(generateRandomRows(json));
    };

    reader.readAsArrayBuffer(file);
  };

  const filterData = () => {
    if (objectkey !== "") {
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

  const generateRandomRows = (data) => {
    if (data.length > 0) {
      const randomRows = [];
      while (randomRows.length < 4) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomRow = data[randomIndex];
        randomRows.push(randomRow);
      }
      return randomRows;
    }
    return [];
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
        Filter Excel Data
      </button>

      {randomRows.length > 0 && (
        <div>
          <h2>Randomly Selected Rows:</h2>
          <table id="customers">
            <thead>
              <tr>
                {Object.keys(randomRows[0]).map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {randomRows.map((row, rowIndex) => (
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

      {filteredData.length > 0 && (
        <div>
          <h2>Filtered Excel Data:</h2>
          <table id="customers">
            <thead>
              <tr>
                {Object.keys(filteredData[0]).map((header) => (
                  <th key={header}>{header}</th>
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
    </div>
  );
}

export default ExelRandom;
