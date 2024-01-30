import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Auction from "./Auction";
import BinddingDetails from "./BinddingDetails";
import Map from "./Map";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="/auction/:id" Component={Auction} />
        <Route path="/map" Component={Map} />
        <Route path="/bidding-details/:id" Component={BinddingDetails} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
