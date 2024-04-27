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


function HPAppointments() {


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
  const handleOpen = (appointmentId) => {
    setOpen(true);
    setSelectedAppointmentId(appointmentId);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedAppointmentId(null);
  };

  const [appointments, setAppointments] = useState([]);

  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const [patients, setPatients] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    patientid: '',
    visitType: '',
    appLocation: '',
    appDate: '',
    appTime: '',
    appComments: ''
  });

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

 
  



  const handleCreateAppointment = async (event) => {
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
        visitType: formData.visitType,
        appLocation: formData.appLocation,
        appDate: formData.appDate,
        appTime: formData.appTime,
        appComments: formData.appComments
      };
      console.log(requestBody)
      // Send POST request to create appointment
      await axios.post('http://localhost:8080/api/v1/appointment/create', requestBody, {
        withCredentials: true
      });
      // Close modal after successful submission
      handleClose();
    } catch (error) {
      console.error('Error creating appointment:', error);
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
        console.error('Error fetching appointments:', error);
      }
    };

    fetchPatients();
  }, []);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userIdCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('userId='))
          .split('=')[1];
        const response = await axios.get(`http://localhost:8080/api/v1/appointment/all-user-appointments?userId=${userIdCookie}`, {
          withCredentials: true
        });
        setAppointments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const updateAppointmentStatus = async (appointmentId, status, setAppointments) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/appointment/update-status?appointmentId=${appointmentId}&status=APPROVED`);

      setAppointments(prevAppointments => {
        return prevAppointments.map(appointment => {
          if (appointment.appointmentid === appointmentId) {
            return { ...appointment, appStatus: status };
          } else {
            return appointment;
          }
        });
      });

    } catch (error) {
      console.error('Error updating appointment status:', error);
      // Handle error
    }
  };

  const updateAppointmentStatusToDenied = async (appointmentId, setAppointments) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/appointment/update-status?appointmentId=${appointmentId}&status=DENIED`);

      // Update the appointments state directly
      setAppointments(prevAppointments => {
        return prevAppointments.map(appointment => {
          if (appointment.appointmentid === appointmentId) {
            return { ...appointment, appStatus: 'DENIED' };
          } else {
            return appointment;
          }
        });
      });
    } catch (error) {
      console.error('Error updating appointment status to DENIED:', error);
      // Handle error
    }
  };

  const updateAppointment = async (appointmentId, visitType, comments) => {
    try {

      const index = appointments.findIndex(appointment => appointment.appointmentid === appointmentId);
      console.log(index)
      // Make sure the appointment is found
      if (index !== -1) {
        // Create the updated appointment object
        const updatedAppointment = {
          ...appointments[index], // Get the existing appointment
          visitType: visitType,
          appComments: comments
        };

        // Send the PUT request to update the appointment
        await axios.put(`http://localhost:8080/api/v1/appointment/update`, updatedAppointment);

        setAppointments(prevAppointments => {
          const newAppointments = [...prevAppointments];
          newAppointments[index] = updatedAppointment;
          return newAppointments;
        });

        handleClose();
      } else {
        console.error('Appointment not found for update');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      // Handle error
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/appointment/delete?appointmentId=${appointmentId}`);
      setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.appointmentid !== appointmentId));
    } catch (error) {
      console.error('Error deleting access', error);
    }
  };


  const handleUpdateStatus = async (appointmentId) => {
    await updateAppointmentStatus(appointmentId, 'APPROVED', setAppointments);
  };


  const handleUpdateStatusToDenied = async (appointmentId) => {
    await updateAppointmentStatusToDenied(appointmentId, setAppointments);
  };

  const handleSubmit = async (event, appointmentId) => {
    event.preventDefault();
    console.log(appointmentId)
    const visitTypeInput = event.target.elements.visitType.value;
    const commentsInput = event.target.elements.comments.value;

    await updateAppointment(appointmentId, visitTypeInput, commentsInput);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    await deleteAppointment(appointmentId);
  };


  const appointmentsJSX = appointments.map((appointment, index) => (
    <tr key={index} style={{ border: '' }}>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{index + 1}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{appointment.patient.patientName}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{appointment.user.username}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{appointment.visitType}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{appointment.appLocation}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{appointment.appDate}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{appointment.appTime}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{appointment.appComments}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <span className={`status-btn ${appointment.appStatus === 'PENDING' ? 'active-btn' : (appointment.appStatus === 'APPROVED' ? 'success-btn' : 'close-btn')}`}>
          {appointment.appStatus}
        </span>
      </td>
      <td>
        <div className="justify-content-center flex items-center">
          <button className="text-success dasboard-action-icon" onClick={() => handleUpdateStatus(appointment.appointmentid)}>
            {/* <i className="lni lni-eye" /> */}
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
          <button className="text-success dasboard-action-icon" onClick={() => handleOpen(appointment.appointmentid)}>
            {/* <i className="lni lni-pencil" /> */}
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <Modal
            open={selectedAppointmentId !== null}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form class="max-w-sm mx-auto" onSubmit={(event) => handleSubmit(event, selectedAppointmentId)}>
                {/* Input fields for visit type and comments */}
                <div class="mb-5">
                  <label for="visit-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Visit Type</label>
                  <input type="text" id="visit-type" name="visitType" class="..." placeholder="Check-Up" required />
                </div>
                <div class="mb-5">
                  <label for="comments" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comments</label>
                  <input type="text" id="comments" name="comments" class="..." placeholder="Any concerns..." required />
                </div>
                <button type="submit" class="...">Submit</button>
              </form>
            </Box>
          </Modal>
          <button className="text-success dasboard-action-icon" onClick={() => handleUpdateStatusToDenied(appointment.appointmentid)}>
            {/* <i className="lni lni-trash-can" /> */}
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <button className="text-success dasboard-action-icon" onClick={() => handleDeleteAppointment(appointment.appointmentid)}>
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
                          <h2 class="font-semibold text-gray-700 text-2xl" >Appointments</h2>
                          <span class="text-xs text-gray-500">View appointments</span>
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
                                <form class="max-w-sm mx-auto" onSubmit={handleCreateAppointment}>
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
                                      Visit Type
                                    </label>
                                    <input
                                      type="text"
                                      id="visit-type"
                                      name="visitType"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Check-Up"
                                      value={formData.visitType}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                  <div class="mb-5">
                                    <label for="appLocation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                      Location
                                    </label>
                                    <input
                                      type="text"
                                      id="visit-type"
                                      name="appLocation"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Check-Up"
                                      value={formData.appLocation}
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
                                      name="appDate"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      value={formData.appDate}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                  <div class="mb-5">
                                    <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                      Time
                                    </label>
                                    <input
                                      type="time"
                                      id="time"
                                      name="appTime"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      value={formData.appTime}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                  <div class="mb-5">
                                    <label for="comments" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                      Comments
                                    </label>
                                    <input
                                      type="text"
                                      id="comments"
                                      name="appComments"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Any concerns..."
                                      value={formData.appComments}
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
                                                <h6>Visit Type</h6>
                                              </th>
                                              <th class="px-3 py-3">
                                                <h6>Location</h6>
                                              </th>
                                              <th class="px-3 py-3">
                                                <h6>Date</h6>
                                              </th>
                                              <th class="px-3 py-3">
                                                <h6>Time</h6>
                                              </th>
                                              <th class="px-3 py-3">
                                                <h6>Comments</h6>
                                              </th>
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

                                            {appointmentsJSX}


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

export default HPAppointments
