import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: userName,
                    password: password
                }),
            });

            const contentType = response.headers.get("content-type");
            let data = {};

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                throw new Error("Server did not return valid JSON");
            }

            if (!response.ok) {
                throw new Error(data.detail || "Login failed");
            }

            // Lưu token
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black flex items-center justify-center p-4">
            <div className="bg-neutral-900 text-white p-8 rounded-lg w-full max-w-md shadow-md">
                <div className="flex justify-center mb-6">
                    <Link to="/">
                        <img src={assets.spotify_logo} alt="Spotify" className="w-10 h-10 filter invert" />
                    </Link>
                </div>

                <h2 className="text-2xl font-bold text-center mb-6">Log in to Spotify</h2>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="text-sm font-semibold">Username</label>
                        <input
                            type="text"
                            className="w-full p-3 mt-1 rounded bg-zinc-800 border border-gray-700 focus:outline-none"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full p-3 mt-1 rounded bg-zinc-800 border border-gray-700 focus:outline-none pr-10"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
                            >
                                {!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-black font-semibold py-3 rounded-full hover:bg-green-400 transition"
                    >
                        Log In
                    </button>
                </form>

                <div className="text-center mt-4">
                    <a href="#" className="text-sm text-white underline hover:text-gray-300">
                        Forgot your password?
                    </a>
                </div>

                <div className="text-center text-sm text-gray-400 mt-6">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-white underline hover:text-gray-300">
                        Sign up for Spotify
                    </Link>
                </div>
            </div>
        </div>
    );
}



