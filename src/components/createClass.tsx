"use client";
import { useState } from "react";
import { DateOccurances } from "../../public/types/DateOccurances";
import axios from "axios";

interface ICreateClass {
    hideCreateClass: () => void;
}

export default function CreateClass({ hideCreateClass }: ICreateClass) {
    const [studentList, setStudentList] = useState<File | null>();
    const [name, setName] = useState("");
    const [className, setClassName] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [duration, setDuration] = useState<Number>(1);
    const [numOfLessons, setNumOfLessons] = useState<Number>(0);
    const [occurance, setOccurance] = useState<DateOccurances>(DateOccurances.weekly);

    const [error, setError] = useState<string | null>(null);

    const handleCreateClass = () => {
        const form = new FormData();
        form.append("className", className);
        form.append("name", name);
        form.append("startDateTime", new Date(startDateTime).getTime().toString());
        form.append("duration", duration.toString());
        form.append("lessonCount", numOfLessons.toString());
        form.append("occurance", occurance.toString());
        form.append("file", studentList!);
        form.append("lecturerId", sessionStorage.getItem("id")!);

        axios.post("http://localhost:8080/api/class/create", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.status === 200) {
                alert("Class Created Successfully");
                setTimeout(() => {
                    hideCreateClass();
                }, 1000);
            }
        })
    }

    return (
        <div className="font-barlow fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-800 flex flex-col justify-between p-6 rounded-lg w-2/5 text-center max-h-[70vh] overflow-y-scroll">
              <button
                  onClick={() => hideCreateClass()}
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
                  Create a Class
                </h2>
                <div className="my-3 text-left flex flex-col items-start">
                    <h3 className="font-bold text-xl">Module Name</h3>
                    <input
                        type="text"
                        className="w-full bg-gray-700 rounded-lg p-2 mt-1"
                        placeholder="Data Structures & Algorithms"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                    />
                </div>
                <div className="my-3 text-left flex flex-col items-start">
                    <h3 className="font-bold text-xl">Class Name</h3>
                    <input
                        type="text"
                        className="w-full bg-gray-700 rounded-lg p-2 mt-1"
                        placeholder="P01"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="my-3 text-left flex flex-col items-start">
                    <h3 className="font-bold text-xl">Start Date and Time</h3>
                    <p className="text-neutral-300 mb-1">The First Lesson of your Class</p>
                    <input
                        type="datetime-local"
                        className="w-full bg-gray-700 rounded-lg p-2 mt-1"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                    />
                </div>
                <div className="my-3 text-left flex flex-col items-start">
                    <h3 className="font-bold text-xl">Duration (hrs)</h3>
                    <input
                        type="number"
                        className="w-full bg-gray-700 rounded-lg p-2 mt-1"
                        placeholder="2"
                        value={Number(duration)}
                        onChange={(e) => setDuration(Number(e.target.value))}
                    />
                </div>
                <div className="my-3 text-left flex flex-col items-start">
                    <h3 className="font-bold text-xl">Number of Lessons</h3>
                    <input
                        type="number"
                        className="w-full bg-gray-700 rounded-lg p-2 mt-1"
                        placeholder="2"
                        value={Number(numOfLessons)}
                        onChange={(e) => setNumOfLessons(Number(e.target.value))}
                    />
                </div>
                <div className="my-3 text-left flex flex-col items-start">
                    <h3 className="font-bold text-xl">Occurance</h3>
                    <select
                        className="w-full bg-gray-700 rounded-lg p-2 mt-1"
                        value={occurance}
                        onChange={(e) => setOccurance(e.target.value as unknown as DateOccurances)}
                    >
                        {Object.keys(DateOccurances).filter((key) => isNaN(Number(key))).map((key) => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </div>
                <div className="my-3 text-left flex flex-col items-start">
                    <h3 className="font-bold text-xl">Student List</h3>
                    <p className="text-neutral-300 mb-1">Upload your Student List as a <span className="italic">csv</span> file. Ensure that the Student ID and Student Name are inside.</p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <label 
                            htmlFor="fileInput" 
                            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded shadow-md transition duration-300"
                        >
                            Upload Student List
                        </label>
                        <input 
                            id="fileInput" 
                            type="file" 
                            accept="text/*" 
                            className="hidden"
                            onChange={(e) => setStudentList(e.target.files![0])} 
                        />
                        {studentList && (
                            <span className="text-neutral-300 text-sm">{studentList.name}</span>
                        )}
                    </div>
                </div>
                <button 
                  className="bg-green-700 hover:bg-green-800 text-white w-full rounded-lg py-3 mb-4"
                  onClick={() => handleCreateClass()}
                >
                    Create Class
                </button>
                <p className="text-red-500 text-left font-medium">{ error }</p>
            </div>
        </div>
    )
}