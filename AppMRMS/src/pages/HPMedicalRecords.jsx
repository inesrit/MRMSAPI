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


function HPMedicalRecords() {


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
  const handleOpen = (medicalRecordId) => {
    setOpen(true);
    setSelectedMedicalRecordId(medicalRecordId);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedMedicalRecordId(null);
  };

  const [medicalRecords, setMedicalRecords] = useState([]);

  const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState(null);

  const [patients, setPatients] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    medicalrecordid: '',
    recordDate: '',
    recordName: '',
    recordType: '',
    recordResult: ''
  });

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  



  const handleCreateRecord = async (event) => {
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
        recordDate: formData.recordDate,
        recordName: formData.recordName,
        recordType: formData.recordType,
        recordResult: formData.recordResult
      };
      console.log(requestBody)
      // Send POST request to create medical record
      await axios.post('http://localhost:8080/api/v1/medical-record/create', requestBody, {
        withCredentials: true
      });
      // Close modal after successful submission
      handleClose();
    } catch (error) {
      console.error('Error creating medical record:', error);
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
    const fetchMedicalRecords = async () => {
      try {
        const userIdCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('userId='))
          .split('=')[1];
        const response = await axios.get(`http://localhost:8080/api/v1/medical-record/all-user-records?userId=${userIdCookie}`, {
          withCredentials: true
        });
        setMedicalRecords(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    fetchMedicalRecords();
  }, []);


  const updateMedicalRecord = async (medicalrecordid, nameInput, recordTypeInput, recordResultInput) => {
    try {

      const index = medicalRecords.findIndex(medical_record => medical_record.medicalrecordid === medicalrecordid);
      console.log(index)

      if (index !== -1) {
        const updatedMedicalRecord = {
          ...medicalRecords[index], 
          recordName: nameInput,
          recordType: recordTypeInput,
          recordResult: recordResultInput
        };

        await axios.put(`http://localhost:8080/api/v1/medical-record/update`, updatedMedicalRecord);

        setMedicalRecords(prevMedicalRecords => {
          const newMedicalRecords = [...prevMedicalRecords];
          newMedicalRecords[index] = updatedMedicalRecord;
          return newMedicalRecords;
        });

        handleClose();
      } else {
        console.error('Medical record not found for update');
      }
    } catch (error) {
      console.error('Error updating medical record:', error);
      // Handle error
    }
  };

  const deleteMedicalRecord = async (medicalrecordid) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/medical-record/delete?medicalRecordId=${medicalrecordid}`);
      setMedicalRecords(prevMedicalRecords => prevMedicalRecords.filter(medical_record => medical_record.medicalrecordid !== medicalrecordid));
    } catch (error) {
      console.error('Error deleting medical record', error);
    }
  };



  const handleSubmit = async (event, medicalrecordid) => {
    event.preventDefault();
    console.log(medicalrecordid)
    const nameInput = event.target.elements.recordName.value;
    const recordTypeInput = event.target.elements.recordType.value;
    const recordResultInput = event.target.elements.recordResult.value;

    await updateMedicalRecord(medicalrecordid, nameInput, recordTypeInput, recordResultInput);
  };

  const handleDeleteRecord = async (medicalrecordid) => {
    await deleteMedicalRecord(medicalrecordid);
  };


  const medicalRecordsJSX = medicalRecords.map((medical_record, index) => (
    <tr key={index} style={{ border: '' }}>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{index + 1}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{medical_record.patient.patientName}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{medical_record.user.username}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{medical_record.recordName}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{medical_record.recordType}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{medical_record.recordDate}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{medical_record.recordResult}</p>
      </td>
      <td>
        <div className="justify-content-center flex items-center">
          <button className="text-success dasboard-action-icon" onClick={() => handleOpen(medical_record.medicalrecordid)}>
            {/* <i className="lni lni-pencil" /> */}
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <Modal
            open={selectedMedicalRecordId !== null}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form class="max-w-sm mx-auto" onSubmit={(event) => handleSubmit(event, selectedMedicalRecordId)}>
                {/* Input fields for visit type and comments */}
                <div class="mb-5">
                  <label for="visit-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Record Name</label>
                  <input type="text" id="record-name" name="recordName" class="..." placeholder="Check-Up" required />
                </div>
                <div class="mb-5">
                  <label for="visit-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Record Type</label>
                  <input type="text" id="record-type" name="recordType" class="..." placeholder="Check-Up" required />
                </div>
                <div class="mb-5">
                  <label for="comments" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Record Result</label>
                  <input type="text" id="record-result" name="recordResult" class="..." placeholder="Any concerns..." required />
                </div>
                <button type="submit" class="...">Submit</button>
              </form>
            </Box>
          </Modal>
          <button className="text-success dasboard-action-icon" onClick={() => handleDeleteRecord(medical_record.medicalrecordid)}>
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
                          <h2 class="font-semibold text-gray-700 text-2xl" >Medical Records</h2>
                          <span class="text-xs text-gray-500">View medical records</span>
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
                              <Box sx={style}>
                                <form class="max-w-sm mx-auto" onSubmit={handleCreateRecord}>
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
                                    <label for="appLocation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                      Record Name
                                    </label>
                                    <input
                                      type="text"
                                      id="record-name"
                                      name="recordName"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Check-Up"
                                      value={formData.recordName}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                  <div class="mb-5">
                                    <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                      Record Date
                                    </label>
                                    <input
                                      type="date"
                                      id="date"
                                      name="recordDate"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      value={formData.recordDate}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                  <div class="mb-5">
                                    <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                      Record Type
                                    </label>
                                    <input
                                      type="text"
                                      id="record-type"
                                      name="recordType"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      value={formData.recordType}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                  <div class="mb-5">
                                    <label for="comments" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                      Record Result
                                    </label>
                                    <input
                                      type="text"
                                      id="record-result"
                                      name="recordResult"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Any concerns..."
                                      value={formData.recordResult}
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
                                                <h6>Record Name</h6>
                                              </th>
                                              <th class="px-3 py-3">
                                                <h6>Record Type</h6>
                                              </th>
                                              <th class="px-3 py-3">
                                                <h6>Date</h6>
                                              </th>
                                              <th class="px-3 py-3">
                                                <h6>Record Result</h6>
                                              </th>
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

                                            {medicalRecordsJSX}


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

export default HPMedicalRecords
