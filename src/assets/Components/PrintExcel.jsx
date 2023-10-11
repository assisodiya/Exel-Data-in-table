import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

function PrintExcel() {
  const [excelData, setExcelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [headerFrom15thObject, setHeaderFrom15thObject] = useState([]);



  
  useEffect(() => {
    filterData();
  }, [excelData]);

  const filterData = () => {
    setFilteredData(excelData.slice(-20, -12));
 
  };




  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const jsonData = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );
        setExcelData(jsonData);
        setFilteredData(jsonData);
           console.log(jsonData)
       
        if (jsonData.length > 14) {
            setHeaderFrom15thObject(Object.keys(jsonData[14]));
          } else {
            setHeaderFrom15thObject([]);
          }
        };

      reader.readAsBinaryString(file);
    }
    filterData();
  };



  




  return (
    <div>
      <div>
        <h2>Upload Excel File</h2>
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileUpload}
        />
        {/* <button onClick={() =>filterData() }>
          Filter Selected Rows
        </button> */}
      </div>
      <table id="customers">
        <thead>
        <tr>
            <th>Header from 15th Object:</th>
            {headerFrom15thObject.map((header, index) => (
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
  );
}

export default PrintExcel;
