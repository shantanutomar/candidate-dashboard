import React from "react";
import './Loader.css'

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