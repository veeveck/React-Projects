import "./App.css";
import CurrencyConvertor from "./components/Currency-Convertor/CurrencyConvertor";
import ProgressBar from "./components/Progress-Bar/ProgressBar";
import { useState, useEffect } from "react";

function App() {
  const [value, setValue] = useState(25);
  useEffect(() => {
    setInterval(() => {
      setValue((val) => val + 1);
    }, 100);
  }, []);
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      {/* <CurrencyConvertor /> */}
      <ProgressBar value={value} />
    </div>
  );
}

export default App;
