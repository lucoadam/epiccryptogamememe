import React from 'react'

const Generating = () => {
    return (
        <div
        className='flex justify-center items-center mt-4'
        style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)),url(./GeneratingBackground.jpg)",
            backgroundSize: "contain",
            backgroundPosition: "center",
            height: "400px",
            width: "280px"
        }}
       >
         <img src="./loading.svg" alt="loading" className="w-20 h-20" />
        </div>
    )
}

export default Generating
