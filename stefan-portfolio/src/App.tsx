import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainComponent from "./assets/Components/MainComponent";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<MainComponent />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
