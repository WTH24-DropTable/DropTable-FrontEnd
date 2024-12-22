"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "../../../../public/types/User";
import { MedicalCertificate } from "../../../../public/types/MedicalCertificate";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [medicalCertificates, setMedicalCertificates] = useState<MedicalCertificate[] | null>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const [file, setFile] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (!id) {
      router.push("/login");
    } else {
      axios
        .get(`http://localhost:8080/api/users/students/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data.student);
          }
        })
        .catch((err) => console.error("Failed to fetch user:", err));

      axios
        .get(`http://localhost:8080/api/medicalcertificate/pending`)
        .then((res) => {
          if (res.status === 200) {
            setMedicalCertificates(res.data.mcList);
          }
        })
        .catch((err) => console.error("Failed to fetch certificates:", err));
    }
  }, [router]);

  if (user === null) {
    return <></>;
  }

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      axios.post("http://localhost:8080/api/admin/createUsers", formData)
        .then((response) => {
          console.log("File uploaded successfully", response);
          setFile(null);
        })
        .catch((error) => {
          console.error("Error uploading file", error);
        });
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 font-barlow text-white">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-800 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Medical Certificates</h1>
          <button className="bg-gray-700 py-1 px-3 rounded text-sm">Sort ↑↓</button>
        </div>
        <div className="space-y-4">
          {medicalCertificates?.map((cert) => (
            <div
              key={cert.id}
              onClick={() => {
                console.log("Certificate selected:", cert);
                if (cert.id) {
                  setSelectedCertificate(cert.id);
                  console.log(selectedCertificate)
                  console.log(medicalCertificates)
                } else {
                  console.error("Invalid Certificate ID:", cert);
                }
              }}
              className={`p-4 rounded-lg cursor-pointer ${
                cert.id === selectedCertificate
                  ? "bg-gray-700"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">{cert.patientName}</div>
                <span
                  className={`px-3 py-1 rounded-xl text-xs ${
                    cert.status === "pending"
                      ? "bg-yellow text-gray-900"
                      : cert.status === "approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                </span>
              </div>
              <div className="text-sm">Start: {new Date(Number(cert.startDate)).toLocaleString()}</div>
              <div className="text-sm text-gray-400">{cert.clinicName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MC Details Section */}
      <div className="w-2/3 h-full p-6">
        {selectedCertificate && medicalCertificates ? (
          <div className="flex flex-col bg-gray-800 h-full p-6 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                {
                  medicalCertificates.find((c) => c.id === selectedCertificate)
                    ?.patientName
                }
              </h2>
              <div className="text-gray-400">
                {
                  medicalCertificates.find((c) => c.id === selectedCertificate)
                    ?.clinicName
                }
              </div>
            </div>
            <div className="bg-gray-900 p-4 h-full rounded-lg text-gray-300">
              <h3 className="text-2xl p-2 font-bold">Medical Certificate</h3>
              <Image
                src={
                  medicalCertificates.find((c) => c.id === selectedCertificate)
                    ?.imageUrl || "/mcPlaceholder.jpg"
                }
                alt="Medical Certificate"
                width={720}
                height={720}
                className="p-4"
              />
              <div className="mt-4 text-xl">
                <p>
                <span className="font-bold">Start Date: </span>{
                      new Date(Number(
                        medicalCertificates.find((c) => c.id === selectedCertificate)
                          ?.startDate!
                      )).toLocaleString()
                }
                </p>
                <p>
                <span className="font-bold">Duration: </span>{
                    medicalCertificates.find((c) => c.id === selectedCertificate)
                      ?.duration || 0
                  } days
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button onClick={() => {
                axios
                .put(`http://localhost:8080/api/medicalcertificate/${selectedCertificate}/update`,{
                  status: "approved",
                })
                .then((res) => {
                  if (res.status === 200) {
                    console.log('MC Approved!')
                  }
                })
                .catch((err) => console.error("Failed to fetch certificate:", err));
              }} className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
                Approve
              </button>
              <button onClick={() => {
                axios
                .put(`http://localhost:8080/api/medicalcertificate/${selectedCertificate}/update`,{
                  status: "denied",
                })
                .then((res) => {
                  if (res.status === 200) {
                    console.log('MC Denied!')
                  }
                })
                .catch((err) => console.error("Failed to fetch certificate:", err));
              }} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                Deny
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Select a certificate to view details.</p>
        )}
        <button
          onClick={openModal}
          className="fixed bottom-8 left-8 bg-purple text-white text-xl font-barlow font-bold px-12 py-6 rounded-xl shadow-lg hover:bg-yellow hover:text-purple transition duration-300"
        >
          Upload Master Sheet
        </button>
      </div>

      {/* Upload Master Sheet Modal */}
      {isModalOpen && (
        <div className="font-barlow fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 flex flex-col justify-between items-center p-6 rounded-lg h-1/2 w-2/5 text-center">
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
            <h2 className="text-white text-2xl font-bold mb-4">Upload Master Sheet</h2>

            <div className="flex flex-col justify-center border-dashed border-2 border-gray-400 p-6 rounded-md mb-4 w-5/6 h-3/5">
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-2xl">+</span>
                </div>
                <p className="text-gray-400">Drag and Drop Here</p>
                <p className="text-gray-400">or</p>

                <label htmlFor="fileUpload" className="text-blue-500 underline cursor-pointer">
                  browse
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* File Preview */}
            {file && (
              <div className="my-4">
                  <p className="text-white">Selected file: {file.name}</p>
              </div>
            )}

            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white p-2 rounded mt-4"
            >
              Upload File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}