import { Link } from 'react-router-dom';
import Pic from './../assets/Medical-health-logo-design-on-transparent-background-PNG.png'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faFileAlt, faUser, faSignOutAlt, faChevronLeft, faBars,
    faCog, faComments, faSearch, faCalendarCheck, faReceipt, faFileMedical, faListCheck
}
    from "@fortawesome/free-solid-svg-icons"

/**
 * Navbar component
 * 
 * This adds the navbar on the side of the page
 * 
 * @author Ines Rita
 */
function HPNavbar() {

    const navigate = useNavigate();

    async function logOut(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/v1/user/logout", {
            }).then((res) => {
                document.cookie = 'patientDetails=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                console.log(res.data);
            }, fail => {
                console.error(fail); // Error!
            });
            navigate('/hpsignin');
        }
        catch (err) {
            alert(err);
        }
    }

    let [profileDivOpen, setprofileDivOpen] = useState(false)



    return (
        <>



            <header className="header" style={{ border: '1px solid rgba(82, 86, 94, 0.2)' }}>
                <div className="container-fluid  dashboard2-header">
                    <div className="dashboard-header2-row">
                        <div className="col-lg-5 col-md-5 col-12 dashboard-header2-row2">
                            <div className="header-left d-flex align-items-center">
                                <div className="dashboard2-header-logo">
                                    <img src="/images/output-onlinepngtools.png" alt />
                                </div>
                                <div className="menu-toggle-btn mr-15 dashboard2-menu-toggle-btn">

                                </div>
                                <div className="header-search d-none d-md-flex">
                                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">MRMS</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-12 dashboard-header2-row3">
                            <div className="header-right">
                                <div className="header-left d-flex align-items-center  header-search-mobile">
                                    <div className="header-search d-md-flex">
                                        <form action="#">
                                            <input type="text" placeholder="Search..." />
                                            {/* <button><i class="lni lni-search-alt"></i></button> */}
                                        </form>
                                    </div>
                                </div>

                                {/* profile start */}
                                <div className="profile-box ml-15">
                                    <button className="dropdown-toggle bg-transparent border-0"
                                        type="button" id="profile"
                                        onClick={() => {
                                            setprofileDivOpen(!profileDivOpen);
                                        }}
                                        data-bs-toggle="dropdown"
                                        aria-expanded={profileDivOpen ? "true" : "false"} >

                                        <div className="profile-info" >
                                            <div className="info">
                                                <div className="image">
                                                    <img src="/images/profile-image.png" alt />
                                                </div>
                                                <div className="profile-dropdown-username">
                                                    <h6 className="fw-500 ">Adam Joe</h6>
                                                    {/* <p>Admin</p> */}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                    <ul className={`dropdown-menu dropdown-menu-end ${profileDivOpen ? 'show' : ''} userBox`}


                                        aria-labelledby="profile">
                                        <li>
                                            <div className="author-info flex items-center justify-content-center !p-1">

                                                <div className="content text-center">
                                                    <h4 className="text-medium" style={{ fontSize: 16 }}>Adam Joe</h4>
                                                    <a className href="#" style={{ fontSize: 14 }}>Email@gmail.com</a>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="divider" />


                                        <li className="divider" />

                                        <li onClick={logOut}>
                                            <a href="/hpsignin">
                                                {/* <i className="lni lni-exit" style={{ fontSize: 18 }} />  */}
                                                <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: 18 }} />
                                                Log Out </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* profile end */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>





            {/* side nav bar */}
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <a href="https://flowbite.com/" class="flex items-center ps-2.5 mb-5">
                        <img src={Pic} class="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">MRMS</span>
                    </a>
                    <ul class="space-y-2 font-medium">
                        <li>
                            <a href="/patientlist" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span class="flex-1 ms-3 whitespace-nowrap">Patient List</span>
                            </a>
                        </li>
                        <li>
                            <a href="/prescriptions" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faFileAlt} className="" />
                                <span class="flex-1 ms-3 whitespace-nowrap">Medical records</span>
                                {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
                            </a>
                        </li>
                        <li>
                            <a href="/hpappointments" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faCalendarCheck} className="" />
                                <span class="flex-1 ms-3 whitespace-nowrap">Appointments</span>
                                {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
                            </a>
                        </li>
                        <li>
                            <a href="/prescriptions" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faFileMedical} className="" />
                                <span class="flex-1 ms-3 whitespace-nowrap">Prescriptions</span>
                                {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
                            </a>
                        </li>
                        <li>
                            <a href="/hpaccess" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faListCheck} className="custom-middle-icon" />
                                <span class="flex-1 ms-3 whitespace-nowrap">Manage Access</span>
                            </a>
                        </li>
                        <li onClick={logOut}>
                            <a href="/hpsignin" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faSignOutAlt} className="custom-middle-icon" />
                                <span class="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

        </>
    )
}

export default HPNavbar