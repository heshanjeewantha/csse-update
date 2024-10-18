// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./components/Footer";
import Trashbins from "./components/TrashBin";
import AddTrashBin from "./components/AddTrashBin";
import UpdateTrashBin from "./components/UpdateTrashBin";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pickups from "./components/Pickups";
import AddPickup from "./components/AddPickup";
import UpdatePickup from "./components/UpdatePickup";
import BinDetails from "./components/BinDetails";
import Drivers from "./components/Drivers";
import Routesk from "./components/Routes";
import AddRoute from "./components/AddRoute";
import UpdateRoute from "./components/UpdateRoute";
import AddDriver from "./components/AddDriver";
import UpdateDriver from "./components/UpdateDriver";
import HomePage from "./components/Homepage";
import PaymentForm from "./components/PaymentForm"; // Import PaymentForm
import PaymentList from "./components/PaymentList";
import PaymentDetail from "./components/PaymentDetail"; // Import PaymentList

function App() {
  const { isLoading, error } = useAuth0();

  return (
    <Router>
      <div className="container">
        <NavBar />

        <main className="row justify-content-center my-4">
          <div className="col-12">
            {error && <p className="alert alert-danger">Authentication error</p>}
            {!error && isLoading && <p className="spinner-border text-primary">Loading...</p>}
            {!error && !isLoading && (
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/trashbins" element={<Trashbins />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add" element={<AddTrashBin />} />
                <Route path="/edit/:id" element={<UpdateTrashBin />} />
                <Route path="/pickups" element={<Pickups />} />
                <Route path="/addpickup" element={<AddPickup />} />
                <Route path="/editpickup/:id" element={<UpdatePickup />} />
                <Route path="/bin/:id" element={<BinDetails />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/routes" element={<Routesk />} />
                <Route path="/addroute" element={<AddRoute />} />
                <Route path="/editroute/:id" element={<UpdateRoute />} />
                <Route path="/adddriver" element={<AddDriver />} />
                <Route path="/editdriver/:id" element={<UpdateDriver />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/paymentform" element={<PaymentForm />} /> {/* Add PaymentForm route */}
                <Route path="/paymentlist" element={<PaymentList />} /> {/* Add PaymentList route */}
                <Route path="/paymentform/:id?" element={<PaymentForm />} />
                <Route path="/paymentdetail/:id" element={<PaymentDetail />} />
                <Route path="/paymentdetail" element={<PaymentDetail />} />
              </Routes>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Example components for routing
const Home = () => (
  <div>
    <HomePage />
  </div>
);

const About = () => (
  <div className="p-4">
    <h2>About Page</h2>
    <p>This is the about section of the website. You can learn more about us here.</p>
  </div>
);

const Blog = () => (
  <div className="p-4">
    <h2>Blog Page</h2>
    <p>Read our latest articles and updates here in the Blog section.</p>
  </div>
);

const Contact = () => (
  <div className="p-4">
    <h2>Contact Us Page</h2>
    <p>If you have any queries, feel free to contact us through this page.</p>
  </div>
);

export default App;
