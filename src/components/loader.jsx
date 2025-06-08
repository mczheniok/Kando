"use client"

import { useState,useEffect } from "react"

const loading = ({time=200}) => {
  const [show,setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, time);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center align-center" style={{width: "100%",height: "100%",visibility: show?"visible":"hidden"}} >
      <div className="loader"></div>
    </div>
  )
}

export default loading