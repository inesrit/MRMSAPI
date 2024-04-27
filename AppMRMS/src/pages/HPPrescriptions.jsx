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
    faFileAlt, faUser, faSignOutAlt, faChevronLeft, faBars, faPlus, faCircleXmark,
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


function HPPrescriptions() {


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

    const [open, setOpen] = React.useState(false);
    const handleOpen = (prescriptionid) => {
        setOpen(true);
        setSelectedPrescriptionid(prescriptionid);
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedPrescriptionid(null);
    };

    const [prescriptions, setPrescriptions] = useState([]);


    const [selectedPrescriptionid, setSelectedPrescriptionid] = useState(null);

    const [patients, setPatients] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        prescriptionid: '',
        pxName: '',
        pxDose: '',
        pxFrequency: '',
        pxQuantity: '',
        pxCondition: '',
        pxDate: ''
    });

    const navigate = useNavigate();

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };






    const handleCreatePrescription = async (event) => {
        event.preventDefault();

        try {

            const userIdString = document.cookie
                .split('; ')
                .find(row => row.startsWith('userId='))
                .split('=')[1];

            const userId = parseInt(userIdString);
            const patientId = parseInt(formData.patientid);
            // Prepare request body
            const requestBody = {
                patientId: patientId, // or simply patientId,
                userId: userId,
                pxName: formData.pxName,
                pxDose: formData.pxDose,
                pxFrequency: formData.pxFrequency,
                pxQuantity: formData.pxQuantity,
                pxCondition: formData.pxCondition,
                pxDate: formData.pxDate
            };

            console.log(requestBody)
            await axios.post('http://localhost:8080/api/v1/prescription/create', requestBody, {
                withCredentials: true
            });

            const updatedPrescriptions = await fetchPrescriptions();
            setPrescriptions(updatedPrescriptions);
            // Close modal after successful submission

            handleCloseModal();

        } catch (error) {
            console.error('Error creating prescription:', error);
            // Handle error
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const userIdCookie = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('userId='))
                    .split('=')[1];
                const response = await axios.get(`http://localhost:8080/api/v1/access-requests/all-user-requests-approved?userId=${userIdCookie}`, {
                    withCredentials: true
                });
                setPatients(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);


    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const userIdCookie = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('userId='))
                    .split('=')[1];
                const response = await axios.get(`http://localhost:8080/api/v1/prescription/all-user-prescriptions?userId=${userIdCookie}`, {
                    withCredentials: true
                });
                setPrescriptions(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        };

        fetchPrescriptions();
    }, []);

    const updatePrescriptiontStatus = async (prescriptionid, status, setPrescriptions) => {
        try {
            await axios.put(`http://localhost:8080/api/v1/prescription/update-status?prescriptionId=${prescriptionid}&status=APPROVED`);
            setPrescriptions(prevPrescriptions => {
                return prevPrescriptions.map(prescription => {
                    if (prescription.prescriptionid === prescriptionid) {
                        return { ...prescription, pxStatus: status };
                    } else {
                        return prescription;
                    }
                });
            });

        } catch (error) {
            console.error('Error updating prescription status:', error);
            // Handle error
        }
    };

    const updatePrescriptionStatusToDenied = async (prescriptionid, setPrescriptions) => {
        try {
            await axios.put(`http://localhost:8080/api/v1/prescription/update-status?prescriptionId=${prescriptionid}&status=DENIED`);

            setPrescriptions(prevPrescriptions => {
                return prevPrescriptions.map(prescription => {
                    if (prescription.prescriptionid === prescriptionid) {
                        return { ...prescription, pxStatus: 'DENIED' };
                    } else {
                        return prescription;
                    }
                });
            });
        } catch (error) {
            console.error('Error updating prescription status to DENIED:', error);
            // Handle error
        }
    };

    const updatePrescription = async (prescriptionid, nameInput, doseInput, frequencyInput, quantityInput, conditionInput) => {
        try {

            const index = prescriptions.findIndex(prescription => prescription.prescriptionid === prescriptionid);
            console.log(index)
            if (index !== -1) {
                const updatedPrescription = {
                    ...prescriptions[index],
                    pxName: nameInput,
                    pxDose: doseInput,
                    pxFrequency: frequencyInput,
                    pxQuantity: quantityInput,
                    pxCondition: conditionInput
                };

                await axios.put(`http://localhost:8080/api/v1/prescription/update`, updatedPrescription);

                setPrescriptions(prevPrescriptions => {
                    const newPrescriptions = [...prevPrescriptions];
                    newPrescriptions[index] = updatedPrescription;
                    return newPrescriptions;
                });

                handleClose();
            } else {
                console.error('prescription not found for update');
            }
        } catch (error) {
            console.error('Error updating prescription:', error);
            // Handle error
        }
    };

    const deletePrescription = async (prescriptionid) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/prescription/delete?prescriptionId=${prescriptionid}`);
            setPrescriptions(prevPrescriptions => prevPrescriptions.filter(prescription => prescription.prescriptionid !== prescriptionid));
        } catch (error) {
            console.error('Error deleting access', error);
        }
    };


    const handleUpdateStatus = async (prescriptionid) => {
        await updatePrescriptiontStatus(prescriptionid, 'APPROVED', setPrescriptions);
    };


    const handleUpdateStatusToDenied = async (prescriptionid) => {
        await updatePrescriptionStatusToDenied(prescriptionid, setPrescriptions);
    };

    const handleSubmit = async (event, prescriptionid) => {
        event.preventDefault();
        console.log(prescriptionid)
        const nameInput = event.target.elements.pxName.value;
        const doseInput = event.target.elements.pxDose.value;
        const frequencyInput = event.target.elements.pxFrequency.value;
        const quantityInput = event.target.elements.pxQuantity.value;
        const conditionInput = event.target.elements.pxCondition.value;

        await updatePrescription(prescriptionid, nameInput, doseInput, frequencyInput, quantityInput, conditionInput);
    };

    const handleDeletePrescription = async (prescriptionid) => {
        await deletePrescription(prescriptionid);
    };


    const prescriptionsJSX = prescriptions.map((prescription, index) => (
        <tr key={index} style={{ border: '' }}>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <p>{index + 1}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <p>{prescription.patient.patientName}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <p>{prescription.user.username}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <p>{prescription.pxName}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <p>{prescription.pxDose}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <p>{prescription.pxFrequency}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <p>{prescription.pxQuantity}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <p>{prescription.pxCondition}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <p>{prescription.pxDate}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
                <span className={`status-btn ${prescription.pxStatus === 'PENDING' ? 'active-btn' : (prescription.pxStatus === 'APPROVED' ? 'success-btn' : 'close-btn')}`}>
                    {prescription.pxStatus}
                </span>
            </td>
            <td>
                <div className="justify-content-center flex items-center">
                    <button className="text-success dasboard-action-icon" onClick={() => handleUpdateStatus(prescription.prescriptionid)}>
                        {/* <i className="lni lni-eye" /> */}
                        <FontAwesomeIcon icon={faCircleCheck} />
                    </button>
                    <button className="text-success dasboard-action-icon" onClick={() => handleOpen(prescription.prescriptionid)}>
                        {/* <i className="lni lni-pencil" /> */}
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <Modal
                        open={selectedPrescriptionid !== null}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <form class="max-w-sm mx-auto" onSubmit={(event) => handleSubmit(event, selectedPrescriptionid)}>
                                {/* Input fields for visit type and comments */}
                                <div class="mb-5">
                                    <label for="px-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prescription Name</label>
                                    <input type="text" id="px-name" name="pxName" class="..." placeholder="Check-Up" required />
                                </div>
                                <div class="mb-5">
                                    <label for="px-dose" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dose</label>
                                    <input type="text" id="px-dose" name="pxDose" class="..." placeholder="Any concerns..." required />
                                </div>
                                <div class="mb-5">
                                    <label for="px-freq" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frequency</label>
                                    <input type="text" id="px-freq" name="pxFrequency" class="..." placeholder="Any concerns..." required />
                                </div>
                                <div class="mb-5">
                                    <label for="px-quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                    <input type="text" id="px-quantity" name="pxQuantity" class="..." placeholder="Any concerns..." required />
                                </div>
                                <div class="mb-5">
                                    <label for="px-condition" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Condition</label>
                                    <input type="text" id="px-condition" name="pxCondition" class="..." placeholder="Any concerns..." required />
                                </div>
                                <button type="submit" class="...">Submit</button>
                            </form>
                        </Box>
                    </Modal>
                    <button className="text-success dasboard-action-icon" onClick={() => handleUpdateStatusToDenied(prescription.prescriptionid)}>
                        {/* <i className="lni lni-trash-can" /> */}
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <button className="text-success dasboard-action-icon" onClick={() => handleDeletePrescription(prescription.prescriptionid)}>
                        {/* <i className="lni lni-trash-can" /> */}
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
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
                                                    <h2 class="font-semibold text-gray-700 text-2xl" >Prescriptions</h2>
                                                    <span class="text-xs text-gray-500">View prescriptions</span>
                                                </div>
                                                <div class="flex items-center justify-between">
                                                    <div class="ml-10 space-x-8 lg:ml-40">
                                                        <button class="flex items-center gap-2 rounded-md bg-teal-400 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-teal-500" onClick={handleOpenModal}>
                                                            <FontAwesomeIcon icon={faPlus} />

                                                            Create
                                                        </button>
                                                        <Modal
                                                            openModal={openModal}
                                                            onClose={handleCloseModal}
                                                            aria-labelledby="modal-modal-title"
                                                            aria-describedby="modal-modal-description"
                                                        >
                                                            <Box sx={style}>
                                                                <form class="max-w-sm mx-auto" onSubmit={handleCreatePrescription}>
                                                                    <div className="mb-5">
                                                                        <label htmlFor="patient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                            Select Patient
                                                                        </label>
                                                                        <select
                                                                            id="patientid"
                                                                            name="patientid"
                                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            value={formData.patientid}
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
                                                                    <div class="mb-5">
                                                                        <label for="visit-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                            Prescription Name
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="px-name"
                                                                            name="pxName"
                                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            placeholder="Check-Up"
                                                                            value={formData.pxName}
                                                                            onChange={handleChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div class="mb-5">
                                                                        <label for="appLocation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                            Dose
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="px-dose"
                                                                            name="pxDose"
                                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            placeholder="Check-Up"
                                                                            value={formData.pxDose}
                                                                            onChange={handleChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div class="mb-5">
                                                                        <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                            Frequency
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="px-frequency"
                                                                            name="pxFrequency"
                                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            value={formData.pxFrequency}
                                                                            onChange={handleChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div class="mb-5">
                                                                        <label for="comments" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                            Quantity
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="px-quantity"
                                                                            name="pxQuantity"
                                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            placeholder="Any concerns..."
                                                                            value={formData.pxQuantity}
                                                                            onChange={handleChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div class="mb-5">
                                                                        <label for="comments" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                            Condition
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="px-condition"
                                                                            name="pxCondition"
                                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            placeholder="Any concerns..."
                                                                            value={formData.pxCondition}
                                                                            onChange={handleChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div class="mb-5">
                                                                        <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                            Date
                                                                        </label>
                                                                        <input
                                                                            type="date"
                                                                            id="date"
                                                                            name="pxDate"
                                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            value={formData.pxDate}
                                                                            onChange={handleChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <button
                                                                        type="submit"
                                                                        class="text-white bg-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-400 dark:hover:bg-teal-500 dark:focus:ring-teal-600"
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
                                                                                        <tr class="bg-teal-400 text-left text-xs font-semibold uppercase tracking-widest text-white">
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
                                                                                                <h6>Prescription Name</h6>
                                                                                            </th>
                                                                                            <th class="px-3 py-3">
                                                                                                <h6>Dose</h6>
                                                                                            </th>
                                                                                            <th class="px-3 py-3">
                                                                                                <h6>Frequency</h6>
                                                                                            </th>
                                                                                            <th class="px-3 py-3">
                                                                                                <h6>Quantity</h6>
                                                                                            </th>
                                                                                            <th class="px-3 py-3">
                                                                                                <h6>Condition</h6>
                                                                                            </th>
                                                                                            <th class="px-3 py-3">
                                                                                                <h6>Date</h6>
                                                                                            </th >
                                                                                            <th class="px-3 py-3">
                                                                                                <h6>Status</h6>
                                                                                            </th >
                                                                                            <th class="px-3 py-3">
                                                                                                <h6>Action</h6>
                                                                                            </th>
                                                                                            {/* <th>
                                                <h6>Action</h6>
                                            </th> */}
                                                                                        </tr>
                                                                                        {/* end table row*/}
                                                                                    </thead>
                                                                                    <tbody class="text-gray-500">

                                                                                        {prescriptionsJSX}


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

export default HPPrescriptions
