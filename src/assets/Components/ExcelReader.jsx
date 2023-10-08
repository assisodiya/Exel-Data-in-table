import React, { useState } from 'react';
import * as XLSX from 'xlsx';
function ExcelReader() {
  const [excelData, setExcelData] = useState([]);
  const [sheetName, setSheetName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Assuming the first sheet in the Excel file
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      setSheetName(sheetName);
      setExcelData(parsedData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2>Upload an XLSX File</h2>
      <input type="file" accept= ".xlsx, .xls, .csv"   onChange={handleFileUpload} />

      {excelData.length > 0 && (
        <div>
          <h2>Sheet Name: {sheetName}</h2>
          <table  id="customers">
            <thead scope="row">
              <tr >
                {excelData.length > 0 &&
                  Object.keys(excelData[0]).map((header, index) => (
                    <th key={index}>{header}</th> 
                  ))}
              </tr>
              
            </thead>
            <tbody >
              {excelData.map((row, rowIndex) => (
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

export default ExcelReader;