// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Register from "./pages/Register";
// // import Dashboard from "./pages/Dashboard";
// // import CheckIn from "./pages/CheckIn";

// // ReactDOM.createRoot(document.getElementById("root")).render(
// //   <BrowserRouter>
// //     <Routes>
// //       <Route path="/" element={<Register />} />
// //       <Route path="/dashboard" element={<Dashboard />} />
// //       <Route path="/checkin" element={<CheckIn />} />
// //     </Routes>
// //   </BrowserRouter>
// // );

// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import CheckIn from "./pages/CheckIn";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/checkin" element={<CheckIn />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css"; // Import normal CSS
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CheckIn from './pages/CheckIn'

// Pages
const Home = () => <h2 className="home">Welcome to BUGBUSTERS</h2>;
const Contact = () => <h2 className="page">Contact Us Page</h2>;

export default function App() {
  return (
    <Router>
      {/* Header */}
      <header className="header">
        <h1 className="logo">BUGBUSTERS</h1>
        <nav className="nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Homepage
          </NavLink>
          <NavLink 
            to="/register" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Register
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/checkin" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            CheckIn
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Contact Us
          </NavLink>
        </nav>
      </header>

      {/* Routes */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Sample Website © 2025 BUGBUSTERS</p>
      </footer>
    </Router>
  );
}


