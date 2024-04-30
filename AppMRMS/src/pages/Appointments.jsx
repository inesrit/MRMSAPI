/**
 * Home page
 * 
 * This is the main landing page for the application
 * 
 * @author Ines Rita
 */

import Pic from './../assets/Medical-health-logo-design-on-transparent-background-PNG.png'
import Navbar from './../components/Navbar'
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


function Appointments() {


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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [appointments, setAppointments] = useState([]);

  const [users, setUsers] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    userid: '',
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
      
      const patientIdString = document.cookie
        .split('; ')
        .find(row => row.startsWith('patientId='))
        .split('=')[1];

      const patientId = parseInt(patientIdString);
      const userId = parseInt(formData.userid);
      // Prepare request body
      const requestBody = {
        patientId: patientId,
        userId: userId,
        visitType: formData.visitType,
        appLocation: formData.appLocation,
        appDate: formData.appDate,
        appTime: formData.appTime,
        appComments: formData.appComments
      };

      console.log(requestBody)

      // Send POST request to create appointment
      const response = await axios.post('http://localhost:8080/api/v1/appointment/create', requestBody, {
        withCredentials: true
      });
      

      // Close modal after successful submission
      handleCloseModal();

    } catch (error) {
      console.error('Error creating appointment:', error);
      if (error.response && error.response.data ) {
        const errorMessage = error.response.data;
        if (errorMessage === "Invalid appointment time") {
          alert("Invalid appointment time. Appointments can only be booked between 9am-5pm.");
        } else if (errorMessage === "Overlapping appointment found") {
          const availableTimesResponse = await axios.get(`http://localhost:8080/api/v1/appointment/get-user-available-times?userId=${formData.userid}&date=${formData.appDate}`);
          const availableTimes = availableTimesResponse.data;
          alert(`Overlapping appointment found. These are the available times: ${availableTimes.join(', ')}`);
        }
      } else {
        alert("An unexpected error occurred while creating the appointment. Please try again later.");
      }
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
    const fetchUsers = async () => {
      try {
        const patientIdCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('patientId='))
          .split('=')[1];
        const response = await axios.get(`http://localhost:8080/api/v1/access-requests/all-patient-requests-approved?patientId=${patientIdCookie}`, {
          withCredentials: true
        });
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const patientIdCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('patientId='))
          .split('=')[1];
        const response = await axios.get(`http://localhost:8080/api/v1/appointment/all-patient-appointments?patientId=${patientIdCookie}`, {
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
                                      Select Provider
                                    </label>
                                    <select
                                      id="userid"
                                      name="userid"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      value={formData.userid}
                                      onChange={handleChange}
                                      required
                                    >
                                      <option value="">Select a user</option>
                                      {users.map(user => (
                                        <option key={user.userid} value={user.userid}>
                                          {user.username}
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

export default Appointments
