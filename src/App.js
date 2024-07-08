import "./App.css";
// import HomePage from "./components/BreadCrumb/HomePage";
// import CurrencyConvertor from "./components/Currency-Convertor/CurrencyConvertor";
// import ProgressBar from "./components/Progress-Bar/ProgressBar";
// import { useState, useEffect } from "react";
// import RealAutocomplete from "./components/Real-World-Autocomplete/RealAutocomplete";
import ListTransfer from "./components/ListTransfer/ListTransfer";

function App() {
  //For Progress bar
  // const [value, setValue] = useState(25);
  // useEffect(() => {
  //   setInterval(() => {
  //     setValue((val) => val + 1);
  //   }, 100);
  // }, []);
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      {/* <CurrencyConvertor /> */}
      {/* <ProgressBar value={value} /> */}
      {/* <RealAutocomplete /> */}
      {/* <HomePage /> */}
      <ListTransfer />
    </div>
  );
}

export default App;
