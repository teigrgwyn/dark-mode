import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Charts from "./components/Charts";
import Navbar, { useDarkLocalStorage } from "./components/Navbar";

import "./styles.scss";

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [darkMode, setDarkMode] = useDarkLocalStorage(true);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => setCoinData(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className={darkMode ? "dark-mode App" : "App"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Charts coinData={coinData} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);





// const useToggle = (key, initialValue) => {
//   const [value, setValue] = useLocalStorage(key, initialValue);
//   const handleChanges = updatedValue => {
//     setValue(updatedValue);
//   }
//   return [value, setValue, handleChanges];
// }

// const useLocalStorage = (key, initialValue) => {
//   // use the value already stored if the key has already been saved to local storage for user instead of the initialValue set
//   const [storedValue, setStoredValue] = useState(() => {
//     const item = window.localStorage.getItem(key);
//     console.log("useLocalStorage:");
//     console.log(key);
//     return item ? JSON.parse(item) : initialValue;
//   })
//   const setValue = value => {
//     setStoredValue(value);
//     window.localStorage.setItem(key, JSON.stringify(value));
//   }
//   return [storedValue, setValue];
// }

// useInput(props.setDarkMode, !props.darkMode);