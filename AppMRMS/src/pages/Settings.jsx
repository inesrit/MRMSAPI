import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './../components/Navbar';
function Settings() {
    // Initial state with all fields initialized to avoid undefined values
    const [patientDetails, setPatientDetails] = useState({
        patientName: "",
        email: "",
        password: "",
        address: "",
        contactNumber: "",
        birthDate: "",  // Use null for date input if initial value should represent no selection
        weight: "",
        height: "",
        healthcareId: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPatientDetails() {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/patient/details', {
                    withCredentials: true
                });
                const patientData = response.data;
                console.log(response.data)
                setPatientDetails({
                    ...patientDetails,
                    ...Object.keys(patientDetails).reduce((acc, key) => {
                        acc[key] = patientData[key] || "";
                        return acc;
                    }, {})
                });
            } catch (err) {
                console.error("Error fetching patient details:", err);
            }
        }
        fetchPatientDetails();
    }, []);

    async function saveDetails(event) {
        console.log(patientDetails);
        event.preventDefault();
        try {
            const response = await axios.put("http://localhost:8080/api/v1/patient/update", patientDetails, {
                    withCredentials: true
                });
            alert("Details Updated Successfully");
            navigate('/settings');
        } catch (err) {
            alert(err.message);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPatientDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function deleteAccount() {
        try {
            
            const response = await axios.delete('http://localhost:8080/api/v1/patient/delete', {
                withCredentials: true
            });
            navigate('/signin');
        } catch (err) {
            console.error("Error deleting account:", err);
            alert("An error occurred while deleting the account");
        }
    }

    return (
        <>
            <Navbar />
            <div className="p-4 sm:ml-64">
                <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
                    <div className="mb-4 col-span-full xl:mb-2">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Patient Profile Settings</h1>
                    </div>
                    <div className="col-span-2">
                        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                            <h3 className="mb-4 text-xl font-semibold dark:text-white">General Information</h3>
                            <form onSubmit={saveDetails}>
                                <div className="grid grid-cols-6 gap-6">
                                    { /* Each input field */ }
                                    <InputField
                                        id="patientName"
                                        name="patientName"
                                        label="Name"
                                        type="text"
                                        placeholder="Full Name"
                                        value={patientDetails.patientName}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="example@company.com"
                                        value={patientDetails.email}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        id="password"
                                        name="password"
                                        label="New Password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={patientDetails.password}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        id="address"
                                        name="address"
                                        label="Address"
                                        type="text"
                                        placeholder="123 Main St"
                                        value={patientDetails.address}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        id="contactNumber"
                                        name="contactNumber"
                                        label="Phone Number"
                                        type="text"
                                        placeholder="555-1234"
                                        value={patientDetails.contactNumber}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        id="birthDate"
                                        name="birthDate"
                                        label="Birthdate"
                                        type="date"  // Changed to 'date' for proper date input
                                        value={patientDetails.birthDate}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        id="weight"
                                        name="weight"
                                        label="Weight"
                                        type="text"
                                        placeholder="e.g., 70 kg"
                                        value={patientDetails.weight}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        id="height"
                                        name="height"
                                        label="Height"
                                        type="text"
                                        placeholder="e.g., 180 cm"
                                        value={patientDetails.height}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        id="healthcareId"
                                        name="healthcareId"
                                        label="Healthcare ID"
                                        type="text"
                                        placeholder="e.g., 123456789"
                                        value={patientDetails.healthcareId}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        id="emergencyContactName"
                                        name="emergencyContactName"
                                        label="Emergency Contact Name"
                                        type="text"
                                        placeholder="Jane Doe"
                                        value={patientDetails.emergencyContactName}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        id="emergencyContactNumber"
                                        name="emergencyContactNumber"
                                        label="Emergency Contact Number"
                                        type="text"
                                        placeholder="555-4321"
                                        value={patientDetails.emergencyContactNumber}
                                        onChange={handleChange}
                                    />
                                    <div className="col-span-6 sm:col-span-full">
                                        <button type="submit" className="text-white bg-teal-400 hover:bg-teal-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save all</button>
                                    </div>
                                    <div class="col-span-6 sm:col-full">
                                     <button class="text-white bg-teal-400 hover:bg-teal-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={deleteAccount}>Delete Account</button>
                                     </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


function InputField({ id, name, label, type, placeholder, value, onChange }) {
    return (
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={placeholder}
                required
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Settings;