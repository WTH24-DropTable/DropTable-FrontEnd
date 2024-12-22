import Image from "next/image";

export default function Home() {
  return (
    <div className="font-barlow min-h-screen bg-gray-800 text-gray-100 flex justify-center items-center flex-col">

      {/* Header Section */}
      <header className="flex items-start w-full p-8">
        <h1 className="text-3xl font-semibold text-white">ATTENDANCEGO!</h1>
      </header>

      {/* Hero Section */}
      <section className="relative w-11/12 h-[500px] flex flex-col items-center justify-center bg-gray-700 shadow-md rounded-lg">
        <h2 className="text-5xl font-extrabold text-center leading-tight mb-4">
          HUMAN RESOURCES HAS <br /> NEVER BEEN SIMPLER.
        </h2>
        <p className="text-md text-gray-400 text-center mb-8">
          FACE ID ATTENDANCE AUTOMATION, MEDICATION <br />
          CERTIFICATE VERIFICATION AUTOMATION...BLAH
        </p>
        <button className="px-12 py-4 rounded-md bg-yellow text-black font-semibold text-xl shadow-md hover:bg-yellow-400">
          Get started →
        </button>
      </section>

      <section className="mt-8 w-11/12">
        <img
          src="https://via.placeholder.com/1200x600?text=Placeholder+Image"
          alt="Placeholder"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </section>
    </div>
  );
}
