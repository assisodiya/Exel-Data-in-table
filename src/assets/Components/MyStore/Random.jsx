import React, { useState, useEffect } from 'react';
import * as XLSX from "xlsx";

function Random() {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Load the Excel file
    const workbook = XLSX.readFile('your-excel-file.xlsx');

    // Assuming the data is in the first sheet (index 0)
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the Excel sheet to JSON format
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    setData(jsonData);
  }, []);

  useEffect(() => {
    // Randomly select four rows
    const randomRows = [];
    while (randomRows.length < 4 && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      randomRows.push(data[randomIndex]);
      // Remove the selected row from the data to avoid duplicates
      data.splice(randomIndex, 1);
    }
    setTableData(randomRows);
  }, [data]);

  return (
    <div>
      <h1>Random Excel Rows</h1>
      <table>
        <thead>
          <tr>
            {Object.keys(tableData[0] || {}).map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
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

export default Random;
