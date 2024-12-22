"use client"
import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
import axios from "axios";

interface IOnboarding {
  setUserNotNew: () => void;
}
export default function Onboarding({ setUserNotNew, load }: IOnboarding){
  const router = useRouter();
  const [imgsrc,setImgsrc]=useState("")
  const [imgCaptured, setimgCaptured]=useState(false)
  const [disableButton, setDisableButton] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const webcamRef = useRef<Webcam | null>(null);

  const capture = useCallback(
    () => {
      if (webcamRef.current) {
        const screenshot = webcamRef.current.getScreenshot();
        if (screenshot) {
          setImgsrc(screenshot);
          setimgCaptured(true);
        }
      }
    },
    [webcamRef]
  );

  const handleComplete = async () => {
    setDisableButton(true);
    const imageBlob = await fetch(imgsrc).then(r => r.blob());
    const form = new FormData();
    form.append('profilePic', imageBlob);
    form.append('userId', sessionStorage.getItem('id')!);
    
    axios.post(`http://localhost:8080/api/users/uploadImage`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((res) => {
      if (res.status === 200) {
        setUploadSuccess(true);
        setUserNotNew();
        load()
      }
    });
  }

  useEffect(() => {
    if (!sessionStorage.getItem('id')) {
      router.push("/login");
    }
  }, [])

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
              className='h-full aspect-square overflow-hidden object-cover' />
          }
        </div>
        <div className="text-center text-[#949494]">Make sure we can see your face<br/> in good lighting!</div>
        <button className="bg-purple text-white p-2 px-10 mt-10 rounded" onClick={()=>{imgCaptured?setimgCaptured(false):capture()}}>{imgCaptured?'Retake':'Snap!'}</button>
        { imgCaptured ? <button className="bg-[#318848] text-white p-2 px-10 m-10 rounded" onClick={() => handleComplete()} disabled={disableButton}>{ uploadSuccess ? "Success!" : "Submit!" }</button> : ""}
      </div>
    </>

}
