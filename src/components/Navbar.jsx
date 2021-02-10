import React, { useState } from 'react';

export const useDarkLocalStorage = (initialValue) => {
  // for the defaults, use existing value if it exists, otherwise use a new setting as default
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem('darkToggle');
    console.log("useDarkLocalStorage Set: " + item);
    return item ? JSON.parse(item) : initialValue;
  })

  // code to actually change the state value & local storage value
  const setValue = value => {
    setStoredValue(value);
    window.localStorage.setItem('darkToggle', JSON.stringify(value));
  }

  return [storedValue, setValue];
}

const Navbar = (props) => {
  const toggleMode = e => {
    e.preventDefault();
    props.setDarkMode(!props.darkMode);
    
    console.log("useDarkLocalStorage Chg: " + window.localStorage.darkToggle);
  };
  return (
    <nav className="navbar">
      <h1>Crypto Tracker</h1>
      <div className="dark-mode__toggle">
        <div
          onClick={toggleMode}
          className={props.darkMode ? 'toggle toggled' : 'toggle'}
        />
      </div>
    </nav>
  );
};

export default Navbar;
