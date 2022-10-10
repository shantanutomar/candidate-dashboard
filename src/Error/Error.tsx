import React from "react";
import './Error.css'

/* FUTURE IMPROVEMENTS: The error component is very simple and can be customized */
const Error: React.FC = () => {
    return (
        <section className='error-container'>
            <img src="./images/error.png" alt="error" width='150px' height='100px'/>
            <div className='error-text'>Sorry our servers ran into a problem. We are working hard to fix the issue.</div>
        </section>
    )
}
export default Error