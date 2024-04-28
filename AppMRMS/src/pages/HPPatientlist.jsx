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
  faFileAlt, faUser, faSignOutAlt, faChevronLeft, faBars, faPlus, faCircleXmark, faUpRightFromSquare,
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

function HPPatientlist() {

  const [patients, setPatients] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const handlePatientDetails = (patientid) => {
    console.log(patientid)
    navigate("/hp-patient-dashboard", { state: { id: patientid }});
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

  const filteredPatients = patients.filter(patient =>
    patient.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const patientListJSX = filteredPatients.map((patient, index) => (
    <tr key={index} style={{ border: '' }}>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{index + 1}</p>
      </td>
      <td class="border-b border-gray-200 bg-white px-3 py-3 text-lg">
        <p>{patient.patientName}</p>
      </td>
      <td>
        <div className="justify-content-center flex items-center">
          <button className="text-success dasboard-action-icon"  onClick={() => handlePatientDetails(patient.patientid)} >
            {/* <i className="lni lni-trash-can" /> */}
            <FontAwesomeIcon icon={faUpRightFromSquare} />
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
                          <div className="flex items-center space-x-4">
                            <input type="text" placeholder="Search patient..." class=" text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value); console.log('Search query:', e.target.value);}}  />
                            <button class="flex items-center gap-2 rounded-md bg-teal-400 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-teal-500" >
                              <FontAwesomeIcon icon={faSearch} />
                              Search
                            </button>
                            </div>
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
                                            <tr class="bg-teal-400 text-centre text-xs font-semibold uppercase tracking-widest text-white">
                                              <th class="px-5 py-3">
                                                <h6>#</h6>
                                              </th>
                                              <th class="px-5 py-3">
                                                <h6>Patient</h6>
                                              </th>
                                              <th class="px-5 py-3">
                                                <h6>Action</h6>
                                              </th>
                                              {/* <th>
                                                <h6>Action</h6>
                                            </th> */}
                                            </tr>
                                            {/* end table row*/}
                                          </thead>
                                          <tbody class="text-gray-500">

                                            {patientListJSX}


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

export default HPPatientlist
