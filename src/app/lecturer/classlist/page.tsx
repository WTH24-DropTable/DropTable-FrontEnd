'use client';

import Image from "next/image";

export default function Home() {

  const data = [
    { index: 1, name: 'Alfred Kang Jing Rui', class: 'M01', status: 'PRESENT' },
    { index: 2, name: 'Ethan Chew Ming Hong', class: 'M01', status: 'PRESENT' },
    { index: 3, name: 'Jerick Seng Kay Kang', class: 'M01', status: 'ABSENT' },
    { index: 4, name: 'Rafol Emmanuel Legaspi', class: 'M01', status: 'PRESENT' },
    { index: 5, name: 'Hervin Darmawan Sie', class: 'M01', status: 'ABSENT' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'ABSENT':
        return 'bg-red-100 text-red-700';
      case 'PRESENT':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
        <div className="h-screen w-screen bg-white font-barlow text-dblue flex">
          {/* Left Container */}
          <div className="w-1/6 bg-gray-100 p-4">
            <div className="text-lg font-semibold mb-4">Lecturer</div>
            <div className="text-sm">Dr. Jane Doe</div>
          </div>

          <div className="flex-1 relative">
            <div className="flex items-center p-4 bg-black text-white text-lg font-semibold">
              <button 
                className="mr-4 text-white bg-transparent hover:bg-gray-700 p-2 rounded-lg"
                onClick={() => window.history.back()} // Back button functionality
              >
                ← Back
              </button>
              Developing Dynamic Applications - M01
            </div>

            <div className="absolute top-4 right-4 bg-purple text-white px-4 py-2 rounded-lg shadow-lg cursor-pointer">
              Scan Attendance
            </div>

            <div className="p-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-2">Index</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Class</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.index} className="border-b">
                      <td className="p-2">{item.index}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.class}</td>
                      <td className={`p-2 rounded-lg text-center ${getStatusClass(item.status)}`}>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </>
  );
}
