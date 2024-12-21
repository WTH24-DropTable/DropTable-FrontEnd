"use client"
import React from "react";
import Webcam from "react-webcam";


export default function Onboarding(){
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
  return <>
      <div className="flex justify-center flex-col items-center h-screen w-screen fixed top-0 left-0 bg-[#00000055] backdrop-blur z-10">
        <div className="text-center font-bold text-xl m-20px"> Lets Get You Into Our<br/>Database</div>
        <div className="overflow-hidden h-1/2 aspect-square rounded-full flex justify-center items-center grow">
          <Webcam audio={false}
  height = {100 + '%'}
  width = {100 + '%'}
    screenshotFormat="image/jpeg"
  videoConstraints={{width: 1280,
   height: 720,
   facingMode: "user"}}
  style={{height:'100%'}}
    />
        </div>
      </div>
    </>

}
