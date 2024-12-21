import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
            href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
            />
        </Head>
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
                {/* Right Top Left: Attendance Summary */}
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

                {/* Right Top Right: Student Information */}
                <div className="w-3/5 bg-gray-800 p-4 rounded-lg">
                  <h2 className="text-lblue text-lg font-bold mb-4">
                    Student Information
                  </h2>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-gray-500 mb-4"></div>
                      <div className="text-white font-bold text-lg">
                        Nameless man
                      </div>
                      <div className="text-gray-400 text-sm">Student</div>
                    </div>
                    <div className="space-y-2 text-sm text-center">
                      <div>
                        <span className="font-bold text-white">500/1000</span>
                        <p className="text-gray-400">Attendance</p>
                      </div>
                      <div>
                        <span className="font-bold text-white">5/10</span>
                        <p className="text-gray-400">
                          Medical Certificates Approved
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-white">5</span>
                        <p className="text-gray-400">Medical Certificates Pending</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Bottom Container */}
              <div className="flex h-1/2 space-x-6">
                {/* Right Bottom Left: Attendance by Week */}
                <div className="w-3/5 bg-gray-800 p-4 rounded-lg">
                  <h2 className="text-lblue text-lg font-bold mb-4">
                    Attendance by Week
                  </h2>
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

                {/* Right Bottom Right: Medical Certificates */}
                <div className="w-2/5 bg-gray-800 p-4 rounded-lg">
                  <h2 className="text-lblue text-lg font-bold mb-4">
                    Medical Certificates
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        date: "24/12/13",
                        reason:
                          "Left my cat at home and forgot to bring my pokemon cards",
                        status: "REJECTED",
                      },
                      {
                        date: "24/12/13",
                        reason: "Forgot my grandma",
                        status: "ACCEPTED",
                      },
                    ].map(({ date, reason, status }, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm"
                      >
                        <div>
                          <span className="text-white">{date}</span>
                          <span className="block text-gray-400">{reason}</span>
                        </div>
                        <span
                          className={`font-bold ${
                            status === "ACCEPTED"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
