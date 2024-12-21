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
        <div className="min-h-screen bg-black text-white font-barlow p-6">
          <h1 className="text-5xl font-bold text-lblue my-8">Welcome, Donovan Koh</h1>

          <div className="flex mt-6">
            {/* Classes Section */}
            <div className="w-1/4 mr-6">
              <h2 className="text-3xl font-semibold text-lblue mb-4">Classes</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 p-8 rounded-xl">
                  <p className="text-xl">DEVELOPING DYNAMIC APPLICATIONS</p>
                  <p className="text-red-500 text-xl font-bold">CURRENT</p>
                  <p className="text-xl font-bold">M01</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-xl">
                  <p className="text-xl">DEVELOPING DYNAMIC APPLICATIONS</p>
                  <p className="text-xl font-bold">M02</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-xl">
                  <p className="text-xl">DEVELOPING DYNAMIC APPLICATIONS</p>
                  <p className="text-xl font-bold">M03</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-xl">
                  <p className="text-xl">DESIGNING USER EXPERIENCES</p>
                  <p className="text-xl font-bold">M01</p>
                </div>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="flex-1">
              <h2 className="text-3xl font-semibold text-lblue mb-4">
                Developing Dynamic Applications - M01
              </h2>
              <div className="bg-gray-800 p-6 rounded-xl space-y-6">
                {/* Schedule Items */}
                {[{
                  time: '12:00 - 13:00',
                  week: 'Week 08',
                  status: '24/25',
                  color: 'text-green-500'
                }, {
                  time: '13:00 - 15:00',
                  week: 'Week 08',
                  status: '23/25',
                  color: 'text-green-500'
                }, {
                  time: '12:00 - 13:00',
                  week: 'Week 09',
                  status: '0/25',
                  color: 'text-red-500'
                }, {
                  time: '13:00 - 15:00',
                  week: 'Week 09',
                  status: '0/25',
                  color: 'text-red-500'
                }].map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <p className="text-xl text-gray-400">{item.time}</p>
                      <p className="text-xl">{item.week} - Developing Dynamic Applications</p>
                    </div>
                    <p className={`text-xl font-bold ${item.color}`}>{item.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
