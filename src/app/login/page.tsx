"use client"
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        await axios.post(
            "http://localhost:8080/api/auth/login",
            {
                studentId: studentId,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            if (res.status === 200) {
                const data = res.data;
                sessionStorage.setItem("id", data.id);
                if (data.role === "student") {
                    router.push("/student/home");
                } else if (data.role === "lecturer") {
                    router.push("/lecturer/home");
                } else if (data.role === "admin") {
                    router.push("/admin/home");
                }
            } else {
                setError(res.data.error); // Uncommon case since 200 means success
            }
        })
        .catch((error) => {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.error);
            }
        });
    };
    

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
            <section className="bg-gray-900 h-screen flex items-center justify-center">
                <div className="bg-gray-800 h-1/2 rounded-xl shadow-xl flex w-[90%] max-w-4xl overflow-hidden">
                    {/* Left Section */}
                    <div className="flex-1 relative bg-purple">
                    <img
                        src="/npstock.jpg"
                        alt="NP Stock Photo"
                        className="object-cover w-full h-full"
                    />
                    </div>

                    {/* Right Section */}
                    <div className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl mb-3 font-bold font-barlow text-white">Login</h1>
                            <h1 className="text-lg font-barlow text-white">Sign in to your Account</h1>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Student ID"
                                className="w-full my-2 p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple focus:outline-none"
                                onChange={(e) => setStudentId(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full my-2 p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple focus:outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <label className="text-gray-400 text-right">
                            <a href="#" className="font-barlow text-purple-500 hover:underline">
                                Forgot Password?
                            </a>
                        </label>
                        <button
                            type="submit"
                            className="font-barlow w-full py-3 bg-purple rounded-lg text-white font-bold hover:bg-purple transition"
                            onClick={() => handleLogin()}
                        >
                            Login
                        </button>
                        {error && (
                            <div className="text-red-500">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
