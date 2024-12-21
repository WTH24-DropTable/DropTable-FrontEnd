"use client"
import React from "react";
import Webcam from "react-webcam";


export default function Onboarding(){
  const [imgsrc,setImgsrc]=React.useState("")
  const [imgCaptured, setimgCaptured]=React.useState(false)
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      setImgsrc( webcamRef.current.getScreenshot());
      setimgCaptured(true);
    },
    [webcamRef]
  );
  function handleCfm(){}
  return <>
      <div className="flex justify-center flex-col items-center h-screen w-screen fixed top-0 left-0 bg-[#00000055] backdrop-blur z-10">
        <div className="text-center font-bold text-xl m-7"> Lets Get You Into Our<br/>Database</div>
        <div className="overflow-hidden h-1/2 aspect-square rounded-full flex justify-center items-center mb-10">
        {imgCaptured?
          <img src={imgsrc}
  className='h-full aspect-square overfolow-hidden object-cover'
          />
          :
          <Webcam audio={false}
      height={100+'%'}
    screenshotFormat="image/jpeg"
      ref={webcamRef}
  videoConstraints={{width: 1280,
   height: 720,
   facingMode: "user"}}
  className='h-full aspect-square overfolow-hidden object-cover'
    />}
        </div>
        <div className="text-center text-[#949494]">make sure we can see your beautiful face<br/>and in good lighting</div>
        <button className="bg-purple text-white p-2 px-10 mt-10 rounded" onClick={()=>{imgCaptured?setimgCaptured(false):capture()}}>{imgCaptured?'Cancel':'Snap!'}</button>
    {imgCaptured?
        <button className="bg-[#318848] text-white p-2 px-10 m-10 rounded" onClick={handleCfm}>Go!</button>:""}
      </div>
    </>

}
