'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { User } from "../../../../public/types/User";
import axios from "axios";
import { ClassAttendance } from "../../../../public/types/ClassAttendance";
import { Class } from "../../../../public/types/Class";
import Link from "next/link";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const classId = searchParams.get('classId');
  const dateTime = searchParams.get('dateTime');
  const [students, setStudents] = useState<User[] | null>();
  const [attendance, setAttendance] = useState<ClassAttendance | null>();
  const [modClass, setModClass] = useState<Class | null>();

  useEffect(() => {
    if (!classId || !dateTime) {
      router.push('/lecturer/home');
    }

    axios.get(`http://localhost:8080/api/class/${classId}/students`).then((res) => {
      if (res.status === 200) {
        setStudents(res.data.students);
      }
    });

    axios.get(`http://localhost:8080/api/class/${classId}/attendance/${dateTime}`).then((res) => {
      if (res.status === 200) {
        setAttendance(res.data.attendance);
      }
    });

    axios.get(`http://localhost:8080/api/class/${classId}`).then((res) => {
      if (res.status === 200) {
        setModClass(res.data.class);
      }
    });
  }, []);

  // const data = [
  //   { index: 1, name: 'Alfred Kang Jing Rui', class: 'M01', status: 'PRESENT' },
  //   { index: 2, name: 'Ethan Chew Ming Hong', class: 'M01', status: 'PRESENT' },
  //   { index: 3, name: 'Jerick Seng Kay Kang', class: 'M01', status: 'ABSENT' },
  //   { index: 4, name: 'Rafol Emmanuel Legaspi', class: 'M01', status: 'PRESENT' },
  //   { index: 5, name: 'Hervin Darmawan Sie', class: 'M01', status: 'ABSENT' },
  // ];

  // const getStatusClass = (status: string) => {
  //   switch (status) {
  //     case 'ABSENT':
  //       return 'bg-red-400 text-red-900';
  //     case 'PRESENT':
  //       return 'bg-green-400 text-green-900';
  //     default:
  //       return 'bg-gray-400 text-gray-900';
  //   }
  // };

  return (
    <>
      <div className="min-h-screen w-full bg-gray-800 font-barlow text-dblue flex flex-col md:flex-row">
        {/* Left Container */}
        <div className="flex-1 relative">
          <div className="h-24 flex items-center p-4 bg-purple text-white text-base md:text-lg font-semibold">
            <button
              className="mr-4 text-white bg-transparent hover:bg-gray-700 px-2 md:px-4 py-2 md:py-4 rounded-lg"
              onClick={() => window.history.back()}
            >
              ← Back
            </button>
            <span>{modClass?.className} - {modClass?.name}</span>
          </div>

          <Link href={`http://localhost:3000/lecturer/scanAttendance?classId=${classId}&dateTime=${dateTime}`}>
            <div className="md:absolute flex top-4 right-4 bg-yellow md:text-xs text-xl md:text-lg text-gray-600 font-bold px-3 py-4 md:px-4 md:py-2 md:rounded-lg rounded-b-lg shadow-lg cursor-pointer justify-center items-center">
              Scan Attendance
            </div>
          </Link>

          <div className="p-4 md:p-6 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-white border-gray-400">
                  <th className="p-2 md:p-4 text-sm md:text-base">Index</th>
                  <th className="p-2 md:p-4 text-sm md:text-base">Name</th>
                  <th className="p-2 md:p-4 text-sm md:text-base">Status</th>
                </tr>
              </thead>
              <tbody>
                {students?.map((student, index) => (
                  <tr key={student.id} className="border-b border-gray-700">
                    <td className="p-2 md:p-4 text-white text-sm md:text-base">{index + 1}</td>
                    <td className="p-2 md:p-4 text-white text-sm md:text-base">{student.name}</td>
                    <td>
                      <div
                        className={`w-full md:w-1/2 rounded-3xl font-bold text-center py-1 ${
                          attendance?.attendees.some(
                            (studentAttendance) => studentAttendance.studentId === student.id
                          )
                            ? "bg-green-400 text-green-900"
                            : "bg-red-400 text-red-900"
                        }`}
                      >
                        {attendance?.attendees.some(
                          (studentAttendance) => studentAttendance.studentId === student.id
                        )
                          ? "Present"
                          : "Absent"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Container */}
        <div className="w-full lg:w-1/5 md:w-1/4 bg-gray-700 text-white p-4 flex flex-col items-center md:justify-between">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-xl md:text-3xl font-semibold mb-4">Attendance</div>
            <div className="text-6xl lg:text:5xl md:text-6xl text-green-500">
              {attendance?.attendees && attendance?.expectedAttendees
                ? ((attendance.attendees.length / attendance.expectedAttendees) * 100).toFixed(1)
                : 0}
              %
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
