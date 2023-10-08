import React from 'react'
import { useState } from 'react';

function Todos() {
    const [data, setData]= useState([]);
  
  const submitbtn=(e)=>{
  e.preventdefault()
  setData(e.target.value)
  }
  
    <>
      <div className="conatiner">
        <form>
          <label htmlfor="inputtext">List</label>
          <input type="text" value={data} onChange={(e)=>{e.target.value}} name="" id="inputtext" />
          <button type="submit" onClick={submitbtn} ></button>
        </form>
      </div>
    </>;
  }

export default Todos