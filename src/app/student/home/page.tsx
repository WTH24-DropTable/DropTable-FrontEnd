"use client";

import Image from "next/image";
import Head from "next/head";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "../../../../public/types/User";
import { MedicalCertificate } from "../../../../public/types/MedicalCertificate";
import Onboarding from "@/components/onboarding";
import formatDate from "@/utils/formatDate";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [medicalCertificates, setMedicalCertificates] = useState<MedicalCertificate[] | null>([]);
  const [mcFile, setMcFile] = useState<File | null>(null);
  const [mcError, setMCError] = useState<string | null>(null);
  const [userIsNew, setUserIsNew] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const setUserNotNew = () => setUserIsNew(false);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id === undefined || id === null) {
      router.push("/login");
    } else {
      axios.get(`http://localhost:8080/api/users/students/${id}`).then((res) => {
        if (res.status === 200) {
          console.log(res.data.student);
          setUser(res.data.student);
          setUserIsNew(res.data.student.isNew);
        }
      });

      axios.get(`http://localhost:8080/api/medicalcertificate/${id}`).then((res) => {
        if (res.status === 200) {
          setMedicalCertificates(res.data.mcList);
        }
      })
    }
  }, [])

  const handleMCUpload = async () => {
    const form = new FormData();
    form.append("userId", sessionStorage.getItem("id")!);
    if (mcFile) {
      form.append("mc", mcFile);
    } else {
      setMCError("Attach a File first!");
      return;
    }

    axios.post(`http://localhost:8080/api/medicalcertificate/upload`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }).then((res) => {
      if (res.status === 200) {
        alert("Successfully uploaded Medical Certificate!");
        setIsModalOpen(false);
      }
    });
  }

  if (user === null) {
    return <></>;
  }
  
  return (
    <>
        <div className="bg-black-900 font-barlow text-gray-700 h-screen p-6">
          <div className="flex h-full">
            {/* Left Container: Today's Lessons */}
            <div className="w-1/5 flex flex-col">
              <h2 className="text-lblue text-2xl font-bold mb-2">Today's lessons</h2>
              <div className="bg-gray-800 p-4 h-full rounded-lg">
                <div className="space-y-4">
                  {[...Array(2)].map((_, index) => (
                    <div
                      key={index}
                      className="text-sm flex justify-between items-center border-b border-white pb-2"
                    >
                      <div className="text-gray-400">12:00 to 13:00</div>
                      <div className="flex flex-col">
                        <span className="text-white">DEVELOPING AMONGUS</span>
                        <span className="text-gray-400 text-xs">IPL, OAL</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Container */}
            <div className="w-4/5 flex flex-col space-y-6 ml-6">
              {/* Right Top Container */}
              <div className="h-1/2 flex space-x-6">
                <div className="flex flex-col w-2/5">
                  <h2 className="text-lblue text-2xl font-bold mb-4">
                    Attendance Summary
                  </h2>
                  <div className="bg-gray-800 p-4 h-full rounded-lg">
                    <div className="space-y-4">
                      {[
                        { name: "DEVELOPING AMONGUS", score: 5 },
                        { name: "DEVELOPING AMONGTHEM", score: 7 },
                        { name: "DEVELOPING AMONGUS", score: 7 },
                      ].map((lesson, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <div>
                            <span className="text-white">{lesson.name}</span>
                            <span className="block text-gray-400 text-xs">
                              IPL, OAL
                            </span>
                          </div>
                          <span
                            className={`${
                              lesson.score >= 7 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {lesson.score}/10
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-3/5">
                  <h2 className="text-lblue text-2xl font-bold mb-4">
                      Student Information
                  </h2>
                  <div className="h-full flex items-center justify-between bg-gray-800 rounded-lg">
                      <div className="flex w-2/5 flex-col items-center justify-center">
                        <Image src={user.profilePic ? user.profilePic : "https://placehold.co/400"} alt="Profile Picture" width={150} height={150} className="rounded-full m-3 aspect-square object-cover" />
                        <div className="text-white font-bold text-xl">
                          {user.name}
                        </div>
                        <div className="text-gray-400 text-lg">{user.role}</div>
                      </div>
                      <div className="flex justify-center flex-col w-3/5 h-full w-full rounded-r-lg bg-gray-900 space-y-2 text-sm text-center">
                        <div>
                          <span className="font-bold text-white text-2xl">999/1000</span>
                          <p className="text-gray-400 text-lg">Attendance</p>
                        </div>
                        <div>
                          <span className="font-bold text-white text-2xl">{medicalCertificates?.filter((mc) => mc.status === "approved").length}/{medicalCertificates?.length}</span>
                          <p className="text-gray-400 text-lg">
                            Medical Certificates Approved
                          </p>
                        </div>
                        <div>
                          <span className="font-bold text-white text-2xl">{medicalCertificates?.filter((mc) => mc.status === "pending").length}</span>
                          <p className="text-gray-400 text-lg">Medical Certificates Pending</p>
                        </div>
                      </div>
                  </div>
                </div>
              </div>

              {/* Right Bottom Container */}
              <div className="flex h-1/2 space-x-6">
                <div className="flex flex-col w-3/5">
                  <h2 className="text-lblue text-2xl font-bold mb-4">
                      Attendance by Week
                  </h2>
                  <div className="h-full bg-gray-800 p-4 rounded-lg">
                    <table className="w-full text-sm text-left text-gray-400">
                      <thead>
                        <tr>
                          <th className="pb-2">Week</th>
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                            (day) => (
                              <th key={day} className="pb-2">
                                {day}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-white py-1">24/12/13 - 24/12/20</td>
                          {["7/10", "7/10", "7/10", "7/10", "7/10", "-", "-"].map(
                            (score, index) => (
                              <td
                                key={index}
                                className={`${
                                  score === "-" ? "text-gray-400" : "text-green-500"
                                } py-1`}
                              >
                                {score}
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex flex-col w-2/5">
                  <h2 className="text-lblue text-2xl font-bold mb-4">
                    Medical Certificates
                  </h2>
                  <div className="h-full bg-gray-800 p-4 rounded-lg">
                    <div className="space-y-4">
                     {medicalCertificates?.length === 0 && (<p className="text-white">No Medical Certificates so far!</p>)} 
                     {medicalCertificates?.map((mc, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <div>
                            <p className="text-white">{formatDate(Number(mc.startDate))}</p>
                            <p className="block text-gray-400"><span className="font-medium">Duration: </span>{mc.duration} Day(s)</p>
                          </div>
                          <span
                            className={`font-bold ${
                              mc.status === 'approved'
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {mc.status}
                          </span>
                        </div>
                     ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Submit MC Button */}
            <button onClick={openModal} className="fixed bottom-8 right-8 bg-purple text-white text-xl font-barlow font-bold px-10 py-3 rounded-xl shadow-lg hover:bg-yellow hover:text-purple transition duration-300">
              Submit Medical Certificate
            </button>

          {/* Submit MC Modal */}
          {isModalOpen && (
            <div className="font-barlow fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-gray-800 flex flex-col justify-between items-center p-6 rounded-lg w-2/5 text-center">
              <button
                  onClick={closeModal}
                  className="place-self-start text-white hover:text-gray-300 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h2 className="text-white text-2xl font-bold mb-4">
                  Upload Medical Certificate
                </h2>
                <div className="flex flex-col justify-center border-dashed border-2 border-gray-400 p-6 rounded-md mb-4 w-5/6">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white text-2xl">+</span>
                    </div>
                    <p className="text-gray-400">Drag and Drop Here</p>
                    <p className="text-gray-400">or</p>

                    <div className="flex items-center space-x-4 mt-2">
                        <label 
                          htmlFor="fileInput" 
                          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded shadow-md transition duration-300"
                        >
                          Upload File
                        </label>
                        <input 
                          id="fileInput" 
                          type="file" 
                          accept="image/*" 
                          className="hidden"
                          onChange={(e) => setMcFile(e.target.files![0])} 
                        />
                        {mcFile && (
                          <span className="text-neutral-300 text-sm">{mcFile.name}</span>
                        )}
                      </div>
                  </div>
                </div>
                <button 
                  className="bg-green-700 hover:bg-green-800 text-white w-5/6 rounded-lg py-3 mb-4"
                  onClick={() => handleMCUpload()}
                >
                    Submit
                </button>
                <p className="text-red-500 text-left font-medium">{ mcError }</p>
              </div>
            </div>
          )}
          </div>
        </div>
        { userIsNew && <Onboarding setUserNotNew={setUserNotNew} /> }
    </>
  );
}
