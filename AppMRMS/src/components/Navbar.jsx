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
function Navbar() {

    const navigate = useNavigate();

    async function logOut(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/v1/patient/logout", {
            }).then((res) => {
                document.cookie = 'patientDetails=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                console.log(res.data);
            }, fail => {
                console.error(fail); // Error!
            });
            navigate('/signin');
        }
        catch (err) {
            alert(err);
        }
    }

    let [profileDivOpen, setprofileDivOpen] = useState(false)


    return (
        <>

            <script src="../path/to/flowbite/dist/flowbite.js"></script>




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
                                        <li>
                                            <a href="/patientdashboard">
                                                {/* <i className="lni lni-user" style={{ fontSize: 18 }} />  */}
                                                <FontAwesomeIcon icon={faUser} style={{ fontSize: 18 }} />
                                                Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/settings">
                                                {/* <i className="lni lni-cog" style={{ fontSize: 18 }} />  */}
                                                <FontAwesomeIcon icon={faCog} style={{ fontSize: 18 }} />
                                                Settings </a>
                                        </li>
                                        <li className="divider" />

                                        <li onClick={logOut}>
                                            <a href="/signin">
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
            

            <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <a href="" class="flex items-center ps-2.5 mb-5">
                        <img src={Pic} class="h-6 me-3 sm:h-7" alt="Logo" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">MRMS</span>
                    </a>
                    <ul class="space-y-2 font-medium">
                        <li>
                            <a href="/patientdashboard" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faUser} />
                                <span class="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/medical-records" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faFileAlt} className="" />
                                <span class="flex-1 ms-3 whitespace-nowrap">Medical records</span>
                                {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
                            </a>
                        </li>
                        <li>
                            <a href="/appointments" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
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
                            <a href="/access" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faListCheck} className="custom-middle-icon" />
                                <span class="flex-1 ms-3 whitespace-nowrap">Manage Access</span>
                            </a>
                        </li>
                        <li>
                            <a href="/settings" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faCog} className="custom-middle-icon" />
                                <span class="flex-1 ms-3 whitespace-nowrap">Profile Settings</span>
                                {/* <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">5</span> */}
                            </a>
                        </li>
                        <li onClick={logOut}>
                            <a href="/signin" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
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

export default Navbar