import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./view/Navabar";
import Sidebar from "./view/Sidebar";
import Home from "./view/Home";
import Questions from "./view/Question";
import Tags from "./view/Tags";
import Users from "./view/User";
import Footer from "./view/Footer";

function App() {
    return (
        <Router>
            <Navbar />
            <Container fluid>
                <div className="d-flex">
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Main Content */}
                    <div style={{ width: "80%" }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/questions" element={<Questions />} />
                            <Route path="/tags" element={<Tags />} />
                            <Route path="/users" element={<Users />} />
                        </Routes>
                    </div>
                </div>
            </Container>
            <Footer />
        </Router>
    );
}

export default App;
