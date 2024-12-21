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

  const getStatusClass = (status: any) => {
    switch (status) {
      case 'ABSENT':
        return 'bg-red-400 text-red-900';
      case 'PRESENT':
        return 'bg-green-400 text-green-900';
      default:
        return 'bg-gray-400 text-gray-900';
    }
  };

  return (
    <>
        <div className="h-screen w-screen bg-gray-800 font-barlow text-dblue flex">
          <div className="flex-1 relative">
            <div className="h-24 flex items-center p-4 bg-purple text-white text-lg font-semibold">
              <button 
                className="mr-4 text-white bg-transparent hover:bg-gray-700 p-4 rounded-lg"
                onClick={() => window.history.back()}
              >
                ← Back
              </button>
              Developing Dynamic Applications - M01
            </div>

            <div className="absolute top-4 right-4 bg-yellow text-lg text-gray-600 font-bold px-4 py-2 rounded-lg shadow-lg cursor-pointer">
              Scan Attendance
            </div>

            <div className="p-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-white border-gray-400">
                    <th className="p-4">Index</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Class</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.index} className="border-b border-gray-700">
                      <td className="p-4 text-white">{item.index}</td>
                      <td className="p-4 text-white">{item.name}</td>
                      <td className="p-4 text-white">{item.class}</td>
                      <td>
                        <div className={`w-1/2 rounded-3xl font-bold text-center ${getStatusClass(item.status)}`}>{item.status}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Right Container */}
          <div className="w-1/5 bg-gray-700 text-white p-4 flex justify-between flex-col">
            <div className="flex flex-col justify-center items-center h-5/6">
              <div className="text-3xl font-semibold mb-4">Attendance</div>
              <div className="text-8xl text-green-500">54%</div>            
            </div>
            <div className="flex flex-col h-1/6 justify-end">
                  <div className="flex">
                    <Image src={"/pfpPlaceholder.png"} alt="Profile Picture" width={75} height={75} className="rounded-full m-3"/>
                    <div className="flex justify-center flex-col">
                      <div className="text-2xl font-semibold mb-1">Mr Donovan Koh</div>
                      <div className="text-lg">Lecturer</div>    
                    </div>        
                  </div>
            </div>
          </div>
        </div>
    </>
  );
}
