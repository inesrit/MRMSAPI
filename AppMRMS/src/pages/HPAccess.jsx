/**
 * Home page
 * 
 * This is the main landing page for the application
 * 
 * @author Ines Rita
 */

import Pic from './../assets/Medical-health-logo-design-on-transparent-background-PNG.png'
import Navbar from '../components/HPNavbar'
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faFileAlt, faUser, faSignOutAlt, faChevronLeft, faBars, faPlus,
    faCog, faComments, faSearch, faCalendarCheck, faReceipt, faFileMedical, faPencil, faTrashCan, faCloudUpload, faCircleCheck
}
    from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function HPAccess() {


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [access, setAccess] = useState([]);

    const [patients, setPatients] = useState([]);

    const navigate = useNavigate();
    
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        selectedPatientId: null
    });

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };






    const handleCreateAccess = async (event) => {
        event.preventDefault();

        try {
            // Retrieve user ID from cookie
            const userIdString = document.cookie
                .split('; ')
                .find(row => row.startsWith('userId='))
                .split('=')[1];

            const userId = parseInt(userIdString);
            console.log(formData.selectedPatientId)

            // Construct the URL with query parameters
            const url = `http://localhost:8080/api/v1/access-requests/create?userId=${userId}&patientId=${formData.selectedPatientId}`;

            // Send a GET request with the constructed URL
            await axios.post(url, null, {
                withCredentials: true
            });

            // Close modal after successful submission
            handleCloseModal();
        } catch (error) {
            console.error('Error creating access:', error);
            // Handle error
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name,value)
        setFormData({
            ...formData,
            [name]: value
        });
    };





    useEffect(() => {
        const fetchAccess = async () => {
            try {
                const userIdCookie = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('userId='))
                    .split('=')[1];
                const response = await axios.get(`http://localhost:8080/api/v1/access-requests/all-user-requests?userId=${userIdCookie}`, {
                    withCredentials: true
                });
                setAccess(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching access:', error);
            }
        };

        fetchAccess();
    }, []);

    useEffect(() => {
        const fetchPatients = async () => {
            try {

                const response = await axios.get(`http://localhost:8080/api/v1/patient/all`, {
                    withCredentials: true
                });
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching access:', error);
            }
        };

        fetchPatients();
    }, []);




    const accessJSX = access.map((access, index) => (
        <tr key={index} style={{ border: '' }}>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <p>{index + 1}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <p>{access.patient.patientName}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <p>{access.user.username}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <span className={`status-btn ${access.status === 'PENDING' ? 'active-btn' : (access.status === 'APPROVED' ? 'success-btn' : 'close-btn')}`}>
                    {access.status}
                </span>
            </td>
        </tr>
    ));

    return (
        <>

            <Navbar />

            <div class="p-4 sm:ml-64">

                <div style={{ overflowX: "hidden" }}>
                    {/* Section: Design Block */}
                    <section className="text-center" style={{ backgroundColor: '#f5f6f7', paddingTop: 0, paddingBottom: 0 }}>
                        {/* Background image */}
                        {/* <div class="p-5 bg-image dashboard2-img"></div> */}
                        {/* Background image */}
                        <div className="col-md-12 m-auto">
                            <div className="card shadow-5-strong" style={{ marginTop: 0, background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                                <div className="container dashboard-2-container py-0">
                                    <div className="row d-flex justify-content-center my-0">
                                        {/* <h1 class="fw-bold mb-5 wow fadeInUp">DashBoard</h1> */}



                                        <div id="dashboard-2-column2" className=" dashboard-2-column2 px-0" style={{ display: '' }}>


                                            <div class="flex items-center justify-between pt-8 px-8">
                                                <div>
                                                    <h2 class="font-semibold text-gray-700 text-2xl" >Access Requests</h2>
                                                    <span class="text-xs text-gray-500">View access requests</span>
                                                </div>
                                                <div class="flex items-center justify-between">
                                                    <div class="ml-10 space-x-8 lg:ml-40">
                                                        <button class="flex items-center gap-2 rounded-md bg-teal-400 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-teal-500" onClick={handleOpenModal}>
                                                            <FontAwesomeIcon icon={faPlus} />

                                                            Create
                                                        </button>
                                                        <Modal
                                                            open={openModal}
                                                            onClose={handleCloseModal}
                                                            aria-labelledby="modal-modal-title"
                                                            aria-describedby="modal-modal-description"
                                                        >
                                                            <Box sx={{ style }}>
                                                                <form className="max-w-sm mx-auto" onSubmit={handleCreateAccess}>
                                                                    <div className="mb-5">
                                                                        <label htmlFor="patient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                            Select Patient
                                                                        </label>
                                                                        <select
                                                                            id="patient"
                                                                            name="selectedPatientId"
                                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            value={formData.selectedPatientId}
                                                                            onChange={handleChange}
                                                                            required
                                                                        >
                                                                            <option value="">Select a patient</option>
                                                                            {patients.map(patient => (
                                                                                <option key={patient.patientid} value={patient.patientid}>
                                                                                     {patient.patientName}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                    <button
                                                                        type="submit"
                                                                        className="text-white bg-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-400 dark:hover:bg-teal-500 dark:focus:ring-teal-600"
                                                                    >
                                                                        Submit
                                                                    </button>
                                                                </form>
                                                            </Box>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="card-body dashboard-second-ca">
                                                {/* ======== main-wrapper start =========== */}
                                                <main className="main-wrapper" style={{}}>
                                                    <section className="section" style={{ paddingTop: 10, paddingBottom: 20 }}>
                                                        {/* <div className="container-fluid"> */}



                                                        {/* =====================Order Table===================== */}
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="card-style mb-3">
                                                                    <h3 className="text-start mb-3">  </h3>
                                                                    <div class="overflow-y-hidden rounded-lg border">
                                                                        <div class="overflow-x-auto">

                                                                            <div className="table-wrapper table-responsive">
                                                                                <table class="w-full">
                                                                                    <thead>
                                                                                        <tr class="bg-teal-400  text-xs font-semibold uppercase tracking-widest text-white">
                                                                                            <th class="px-3 py-3">
                                                                                                <h6>#</h6>
                                                                                            </th>
                                                                                            <th class="px-3 py-3">
                                                                                                <h6>Patient</h6>
                                                                                            </th>
                                                                                            <th class="px-3 py-3">
                                                                                                <h6>Provider</h6>
                                                                                            </th>
                                                                                            <th class="px-3 py-3">
                                                                                                <h6>Status</h6>
                                                                                            </th >
                                                                                            {/* <th>
                                                <h6>Action</h6>
                                            </th> */}
                                                                                        </tr>
                                                                                        {/* end table row*/}
                                                                                    </thead>
                                                                                    <tbody class="text-gray-500">

                                                                                        {accessJSX}


                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                        {/* end table */}
                                                                    </div>
                                                                </div>
                                                                {/* end card */}
                                                            </div>
                                                            {/* end col */}
                                                        </div>


                                                        {/* </div> */}

                                                    </section>



                                                </main>


                                            </div>
                                        </div>










                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>




                </div>
            </div>




        </>
    )
}

export default HPAccess
