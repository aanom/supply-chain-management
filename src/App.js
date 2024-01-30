import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="/auction" Component={Dashboard} />
        <Route path="/bidding-details" Component={Dashboard} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
