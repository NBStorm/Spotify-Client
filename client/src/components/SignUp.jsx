import React, { useState } from "react";
import { assets } from "../assets/assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");

    const [noMarketing, setNoMarketing] = useState(false);
    const [shareData, setShareData] = useState(false);

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumberOrSymbol = /[\d!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~\-]/.test(password);
    const isLongEnough = password.length >= 10;

    const isStep1Valid = email && hasLetter && hasNumberOrSymbol && isLongEnough && name;
    const handleSignup = async () => {
        setLoading(true);
        setError("");

        try {
            const signupResponse = await fetch("http://127.0.0.1:8000/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: name
                }),
            });

            if (!signupResponse.ok) {
                const errorData = await signupResponse.json();
                throw new Error(errorData.detail || errorData.message || "Signup failed");
            }

            const loginResponse = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: name,
                    password: password,
                }),
            });

            const loginData = await loginResponse.json();
            if (!loginResponse.ok) {
                throw new Error(loginData.detail || "Login after signup failed");
            }

            localStorage.setItem("access", loginData.access);
            localStorage.setItem("refresh", loginData.refresh);

            navigate("/");
            alert('Tạo tài khoản thành công!');
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 text-white py-14">
            <Link to="/">
                <img
                    src={assets.spotify_logo}
                    alt="Spotify"
                    className="w-10 h-10 mb-10 filter invert"
                />
            </Link>
            <div className="w-full max-w-md">
                {step === 1 && (
                    <>
                        <div className="text-4xl font-bold mb-10 text-center">Sign up to start listening</div>

                        <label className="block mb-3 text-base font-semibold">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@domain.com"
                            className="w-full p-4 rounded bg-zinc-900 border border-zinc-700 mb-6 focus:outline-none"
                        />

                        <label className="block mb-3 text-base font-semibold">Password</label>
                        <div className="relative mb-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                className="w-full p-4 rounded bg-zinc-900 border border-zinc-700 focus:outline-none pr-12"
                            />
                            <div
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </div>
                        </div>

                        <div className="text-base mb-6">
                            <p className="font-semibold mb-2">Your password must contain at least</p>
                            <ul className="space-y-1">
                                <li className={hasLetter ? "text-green-400" : ""}>• 1 letter</li>
                                <li className={hasNumberOrSymbol ? "text-green-400" : ""}>• 1 number or special character</li>
                                <li className={isLongEnough ? "text-green-400" : ""}>• 10 characters</li>
                            </ul>
                        </div>

                        <label className="block text-base font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-4 mb-10 rounded bg-zinc-900 border border-zinc-700 focus:outline-none"
                        />

                        <button
                            onClick={() => setStep(2)}
                            className="w-full bg-green-500 text-black py-4 rounded-full font-semibold hover:bg-green-400 mb-10 disabled:opacity-50"
                            disabled={!isStep1Valid}
                        >
                            Next
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="flex items-center text-green-500 font-semibold mb-6">
                            <button onClick={() => setStep(1)} className="mr-3 text-2xl">←</button>
                            <span>Step 2 of 2</span>
                        </div>

                        <h2 className="text-3xl font-bold mb-8">Terms & Conditions</h2>

                        <label className="block bg-zinc-900 p-5 rounded mb-5 cursor-pointer">
                            <input
                                type="checkbox"
                                className="mr-3 accent-green-500"
                                checked={noMarketing}
                                onChange={() => setNoMarketing(!noMarketing)}
                            />
                            I would prefer not to receive marketing messages from Spotify
                        </label>

                        <label className="block bg-zinc-900 p-5 rounded mb-8 cursor-pointer">
                            <input
                                type="checkbox"
                                className="mr-3 accent-green-500"
                                checked={shareData}
                                onChange={() => setShareData(!shareData)}
                            />
                            Share my registration data with Spotify’s content providers for marketing purposes.
                        </label>

                        <p className="text-sm text-gray-400 mb-4">
                            By clicking on sign-up, you agree to Spotify’s <span className="underline text-green-500 cursor-pointer">Terms and Conditions of Use</span>.
                        </p>
                        <p className="text-sm text-gray-400 mb-10">
                            To learn more about how Spotify collects, uses, shares and protects your personal data,
                            see <span className="underline text-green-500 cursor-pointer">Spotify’s Privacy Policy</span>.
                        </p>

                        {/* <button
                            className="w-full bg-green-500 text-black py-4 rounded-full font-semibold hover:bg-green-400"
                        >
                            Sign up
                        </button> */}
                        {error && (
                            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
                        )}
                        <button
                            onClick={handleSignup}
                            className="w-full bg-green-500 text-black py-4 rounded-full font-semibold hover:bg-green-400 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign up"}
                        </button>



                    </>
                )}
            </div>

            <p className="text-sm text-gray-500 text-center mt-16 max-w-md px-4">
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="#" className="underline">Privacy Policy</a> and{" "}
                <a href="#" className="underline">Terms of Service</a> apply.
            </p>
        </div>
    );
}



