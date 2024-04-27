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


function Access() {


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

  const navigate = useNavigate();


    useEffect(() => {
      const fetchAccess = async () => {
          try {
              const patientIdCookie = document.cookie
                  .split('; ')
                  .find(row => row.startsWith('patientId='))
                  .split('=')[1];
              const response = await axios.get(`http://localhost:8080/api/v1/access-requests/all-patient-requests?patientId=${patientIdCookie}`, {
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

  const updateAccessStatus = async (id, status, setAccess) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/access-requests/update-status?requestId=${id}&status=APPROVED`);

      setAccess(prevAccess => {
        return prevAccess.map(access => {
          if (access.id === id) {
            return { ...access, status: status };
          } else {
            return access;
          }
        });
      });

    } catch (error) {
      console.error('Error updating acesss status:', error);
    }
  };

  const updateAccessStatusToDenied = async (id, setAccess) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/access-requests/update-status?requestId=${id}&status=DENIED`);

      setAccess(prevAccess => {
        return prevAccess.map(access => {
          if (access.id === id) {
            return { ...access, status: 'DENIED' };
          } else {
            return access;
          }
        });
      });
    } catch (error) {
      console.error('Error updating access status to DENIED:', error);
    }
  };

  const deleteAccess = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/access-requests/revoke-access?requestId=${id}`);
      setAccess(prevAccess => prevAccess.filter(access => access.id !== id));
    } catch (error) {
      console.error('Error deleting access', error);
    }
  };


  const handleUpdateStatus = async (id) => {
    await updateAccessStatus(id, 'APPROVED', setAccess);
  };


  const handleUpdateStatusToDenied = async (id) => {
    await updateAccessStatusToDenied(id, setAccess);
  };

  const handleDeleteAccess = async (id) => {
    await deleteAccess(id);
  };

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
        <td>
        <div className="justify-content-center flex items-center">
          <button className="text-success dasboard-action-icon" onClick={() => handleUpdateStatus(access.id)}>
            {/* <i className="lni lni-eye" /> */}
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
          <button className="text-success dasboard-action-icon" onClick={() => handleUpdateStatusToDenied(access.id)}>
            {/* <i className="lni lni-trash-can" /> */}
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <button className="text-success dasboard-action-icon" onClick={() => handleDeleteAccess(access.id)}>
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
                          <h2 class="font-semibold text-gray-700 text-2xl" >Access Requests</h2>
                          <span class="text-xs text-gray-500">View access requests</span>
                        </div>
                        <div class="flex items-center justify-between">
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
                                            <tr class="bg-teal-400 text-xs font-semibold uppercase tracking-widest text-white">
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

export default Access
