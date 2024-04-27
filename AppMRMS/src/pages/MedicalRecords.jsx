/**
 * Home page
 * 
 * This is the main landing page for the application
 * 
 * @author Ines Rita
 */

import Pic from './../assets/Medical-health-logo-design-on-transparent-background-PNG.png'
import Navbar from '../components/Navbar'
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


function MedicalRecords() {


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

  const [medicalRecords, setMedicalRecords] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
         const patientIdCookie = document.cookie
         .split('; ')
         .find(row => row.startsWith('patientId='))
         .split('=')[1];
        const response = await axios.get(`http://localhost:8080/api/v1/medical-record/all-patient-records?patientId=${patientIdCookie}`, {
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

export default MedicalRecords
