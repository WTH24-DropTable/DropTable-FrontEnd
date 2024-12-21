"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import CreateClass from "@/components/createClass";
import { Class } from "../../../../public/types/Class";
import { ClassOccurances } from "../../../../public/types/ClassOccurances";
import { useRouter } from "next/navigation";
import axios from "axios";
import formatDate from "@/utils/formatDate";
import { User } from "../../../../public/types/User";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [classes, setClasses] = useState<Class[] | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [classOccurances, setClassOccurances] = useState<ClassOccurances[] | null>(null);

  const hideCreateClass = () => setShowCreateClass(false);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id === undefined || id === null) {
      router.push("/login");
    } else {
      axios.get(`http://localhost:8080/api/users/${id}`).then((res) => {
        if (res.status === 200) {
          setUser(res.data.student);
        }
      });

      axios.get(`http://localhost:8080/api/class/lecturer/${id}`).then((res) => {
        if (res.status === 200) {
          setClasses(res.data.classes);
          console.log(res.data.classes)
        }
      });
    }
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      axios.get(`http://localhost:8080/api/class/occurrences/${selectedClassId}`).then((res) => {
        if (res.status === 200) {
          setClassOccurances(res.data.occurrences);
        }
      })
    }
  }, [selectedClassId])

  return (
    <>
        <div className="min-h-screen bg-gray-800 text-white font-barlow p-6">
          <div className="flex flex-row items-center">
            <h1 className="text-5xl font-bold text-lblue my-8">Welcome, { user?.name } </h1>
            <button
              className="ml-auto bg-lblue text-white px-6 py-2 h-fit rounded-lg font-bold hover:bg-blue-500 transition"
              onClick={() => setShowCreateClass(true)}
            >
              Create Class
            </button>
          </div>

          <div className="flex mt-6">
            <div className="w-1/4 mr-6">
              <h2 className="text-3xl font-semibold text-lblue mb-4">Classes</h2>
              <div className="space-y-4">
                {classes?.map((item, index) => (
                  <div
                    className="bg-gray-600 p-8 rounded-xl cursor-pointer"
                    key={index}
                    onClick={() => setSelectedClassId(item.id)}
                  >
                    <p className="text-xl font-bold">{ item.className }</p>
                    <p className="text-lg">{ item.name } - { item.duration } hrs</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Section */}
            <div className="flex-1">
              { !selectedClassId && <h2 className="text-3xl font-semibold text-white mb-4 p-3 rounded-lg bg-gray-400 h-full">Select a Class to View Schedule</h2> }
              { selectedClassId && (
                <div className="flex-1">
                    <h2 className="text-3xl font-semibold text-lblue mb-4">
                      { classes?.find((classItem) => classItem.id === selectedClassId)?.name } - { classes?.find((classItem) => classItem.id === selectedClassId)?.className }
                    </h2>
                  <div className="bg-gray-600 p-6 rounded-xl space-y-6">
                    {classOccurances?.map((item, index) => (
                      <div
                        key={index} className="flex justify-between cursor-pointer"
                        onClick={() => router.push(`/lecturer/classlist?classId=${selectedClassId}&dateTime=${item.dateTime}`)}
                      >
                        <div>
                          <p className="text-xl text-gray-400">{formatDate(item.dateTime)}</p>
                        </div>
                        <p className={`text-xl font-bold ${(item.expectedAttendees - item.attendees.length > ((item.expectedAttendees - item.attendees.length) / 2) ? "text-red-500" : "text-green-500")}`}>{item.attendees.length}/{item.expectedAttendees}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showCreateClass && <CreateClass hideCreateClass={hideCreateClass} />}
    </>
  );
}
