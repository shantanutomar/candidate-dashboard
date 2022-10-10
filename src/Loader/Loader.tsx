import React from "react";
import './Loader.css'

/* Loader component showing a simple loader */
/* FUTURE IMPROVEMENTS: The component styling as per product design team can be improved */
const Loader: React.FC = () => {
    return (
        <>
            <div className="loader-container">
                <div></div>
                <div></div>
            </div>
            <div className='loader-text'>We're testing your patience!</div>
        </>
    )
}
export default Loader