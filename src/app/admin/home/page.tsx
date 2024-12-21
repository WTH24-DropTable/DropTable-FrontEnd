'use client';

import Image from "next/image";
import React, { useState } from "react";

export default function Home() {

  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(
    1
  );

  const certificates = [
    {
      id: 1,
      name: "HillBilly Willy",
      status: "Pending",
      date: "21st Dec",
      time: "12:20pm",
      department: "Data Science",
    },
    {
      id: 2,
      name: "BillHilly Milly",
      status: "Approved",
      date: "20th Dec",
      time: "9:00am",
      department: "Software Engineering",
    },
    {
      id: 3,
      name: "Diddly Dilly",
      status: "Denied",
      date: "20th Dec",
      time: "8:00am",
      department: "Enterprise Computing",
    },
  ];

  return (
    <>
      <div className="flex h-screen bg-gray-900 font-barlow text-white">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-800 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Medical Certificates</h1>
          <button className="bg-gray-700 py-1 px-3 rounded text-sm">
            Sort ↑↓
          </button>
        </div>
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCertificate(cert.id)}
              className={`p-4 rounded-lg cursor-pointer ${
                cert.id === selectedCertificate
                  ? "bg-gray-700"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">{cert.name}</div>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    cert.status === "Pending"
                      ? "bg-yellow text-gray-900"
                      : cert.status === "Approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {cert.status}
                </span>
              </div>
              <div className="text-sm">{cert.date}</div>
              <div className="text-sm">{cert.time}</div>
              <div className="text-sm text-gray-400">{cert.department}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MC Details Section */}
      <div className="w-2/3 h-full p-6">
        <div className="flex flex-col bg-gray-800 h-full p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              {certificates.find((c) => c.id === selectedCertificate)?.name}
            </h2>
            <div className="text-gray-400">
              {
                certificates.find((c) => c.id === selectedCertificate)
                  ?.department
              }
            </div>
          </div>
          <div className="bg-gray-900 p-4 h-full rounded-lg text-gray-300">
            <h3 className="text-lg font-bold">Medical Certificate</h3>
            <Image src={"/mcPlaceholder.jpg"} alt="Medical Certificate" width={720} height={720} className="p-4"/>
            <p className="mt-2 text-sm">
              Dear Ms. Joana Cruz,
              <br />
              This is to certify that Jean Berry was examined on August 13,
              2024. After a comprehensive examination, no medical conditions or
              health issues have been identified that would interfere with their
              daily activities...
            </p>
            <div className="mt-4 text-sm">
              <p>Start Date: 20th Dec, 12:00pm</p>
              <p>End Date: 23rd Dec, 12:00pm</p>
              <p>Duration: 3 days</p>
              <p>Submitted on: 21st Dec, 12:20pm</p>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
              Approve
            </button>
            <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              Deny
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
