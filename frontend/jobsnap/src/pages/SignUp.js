'use client';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const [bio, setBio] = useState('');

    const notifySuccess1 = () => toast.success("Sign up successful!");
    const notifyError1 = () => toast.error("An error occurred. Please try again.");

    const notifyEmail = () => toast.error("The email is already in use.");
    const notifyPhoneStudent = () => toast.error("The phone number is already used.");

    const notifyPhoneEmployer = () => toast.error("The phone number is already used.");


    const [universityName, setUniversityName] = useState('');
    const [universityEmail, setUniversityEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [studentFirstName, setStudentFirstName] = useState('');
    const [studentLastName, setStudentLastName] = useState('');


    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [employerFirstName, setEmployerFirstName] = useState('');
    const [employerLastName, setEmployerLastName] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {

            const emailResponse = await fetch(`http://localhost:8080/api/check-email?email=${email}`);
            const emailData = await emailResponse.json();
            if (emailData.exists) {
                notifyEmail();
                return;
            }


            const phoneResponse = await fetch(`http://localhost:8080/api/check-phone?phone=${role === 'student' ? phone : companyPhone}`);
            const phoneData = await phoneResponse.json();


            if (phoneData.exists === "Student") {
                notifyPhoneStudent();
                return;
            } else if (phoneData.exists === "Employer") {
                notifyPhoneEmployer();
                return;
            } else if (phoneData.exists === "No") {

            }


            const body = {
                email,
                password,
                role,
                universityName: role === 'student' ? universityName : undefined,
                universityEmail: role === 'student' ? universityEmail : undefined,
                phone: role === 'student' ? phone : undefined,
                firstName: role === 'student' ? studentFirstName : role === 'employer' ? employerFirstName : undefined,
                lastName: role === 'student' ? studentLastName : role === 'employer' ? employerLastName : undefined,
                companyName: role === 'employer' ? companyName : undefined,
                companyEmail: role === 'employer' ? companyEmail : undefined,
                companyPhone: role === 'employer' ? companyPhone : undefined,
                bio
            };

            console.log(body);


            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });


            if (!response.ok) {
                const error = await response.json();
                alert(error.message || "Failed to sign up");
            } else {
                notifySuccess1();
                // Redirecționează utilizatorul după 2 secunde
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            notifyError1();
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-10">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="bio">
                            Bio
                        </label>
                        <input
                            type="bio"
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="student">Student</option>
                            <option value="employer">Employer</option>
                        </select>
                    </div>

                    {role === 'student' && (
                        <>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="studentFirstName">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="studentFirstName"
                                    value={studentFirstName}
                                    onChange={(e) => setStudentFirstName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="studentLastName">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="studentLastName"
                                    value={studentLastName}
                                    onChange={(e) => setStudentLastName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="universityName">
                                    University Name
                                </label>
                                <input
                                    type="text"
                                    id="universityName"
                                    value={universityName}
                                    onChange={(e) => setUniversityName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="universityEmail">
                                    University Email
                                </label>
                                <input
                                    type="email"
                                    id="universityEmail"
                                    value={universityEmail}
                                    onChange={(e) => setUniversityEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {role === 'employer' && (
                        <>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="employerFirstName">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="employerFirstName"
                                    value={employerFirstName}
                                    onChange={(e) => setEmployerFirstName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="employerLastName">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="employerLastName"
                                    value={employerLastName}
                                    onChange={(e) => setEmployerLastName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="companyName">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="companyEmail">
                                    Company Email
                                </label>
                                <input
                                    type="email"
                                    id="companyEmail"
                                    value={companyEmail}
                                    onChange={(e) => setCompanyEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="companyPhone">
                                    Company Phone
                                </label>
                                <input
                                    type="text"
                                    id="companyPhone"
                                    value={companyPhone}
                                    onChange={(e) => setCompanyPhone(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-indigo-600">Log in</Link>
                </p>
                <ToastContainer />
            </div>
        </div>
    );
}
