
import axios from "axios";
import { useEffect } from 'react';

function App() {

  const fetchAPI = async()=>{
    const response = await axios.get("http://localhost:8080/api");
    console.log(response.data.fruits);
  }

  useEffect(()=>{
    fetchAPI();
  },[]);
}

export default App
