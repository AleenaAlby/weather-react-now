import React from "react";
import Weather from "./Weather";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Footer";
import './styles.css';

const App = () => {
    return (
        <div>
            <Weather />
            <Footer />
        </div>
    );
};

export default App;
