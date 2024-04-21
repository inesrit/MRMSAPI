import Pic from './../assets/Medical-health-logo-design-on-transparent-background-PNG.png'
import blood from './../assets/rain.png'
import energy from './../assets/lighting.png'
import syringe from './../assets/syringe.png'
import pill from './../assets/pill.png'
import heart from './../assets/cardiogram.png'
import Navbar from './../components/Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faChartPie, faFileAlt, faShoppingBasket, faUser, faSignOutAlt, faChevronLeft, faBars,
    faCog, faComments, faSearch, faEye, faPencil, faTrashCan, faCloudUpload, faCheckCircle, faCalendarCheck, faReceipt, faFileMedical
}
    from "@fortawesome/free-solid-svg-icons"

/**
 * 
 * @author Ines Rita
 */
function Patientdashboard() {


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

                    <div className="card-body dashboard-second-ca">
                      {/* ======== main-wrapper start =========== */}
                      <main className="main-wrapper" style={{}}>
                        <section className="section" style={{ paddingTop: 10, paddingBottom: 20 }}>
                          {/* <div className="container-fluid"> */}



                          <div className="row">

                <div className="col-lg-6 col-12">
                    <div className="card-style settings-card-1 mb-30">

                        <div className="profile-info">
                            <div className="d-flex align-items-center justify-content-evenly mb-0 profile-info-card">
                                <div className="profile-image">
                                    <img src="/images/profile-image.png" alt />
                                    <div className="update-image">
                                        <input type="file" />
                                        <label htmlFor><FontAwesomeIcon icon={faCloudUpload} /></label>
                                    </div>



                                </div>



                                <div className="profile-meta col-md-8 col-12" style={{ textAlign: 'left' }}>

                                    {/* <h3 className="text-bold mb-2">John Doe</h3> */}

                                    <div className="row mb-2 profile-info-card-name">
                                        <h3 className="text-bold mb-2 profile-card-row-h3">John Doe</h3>
                                        <span className="status-btn active-btn profile-card-row-span"> Active</span>
                                    </div>

                                    <div className="row justify-content-between mb-2 profile-info-card-textCol">
                                        <p className="text-sm text-bold mb-0 profile-card-para"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Role: </strong> UI/UX Design</p>
                                        <p className="text-sm text-bold mb-0 profile-card-para"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Age: </strong> UI/UX Design</p>
                                    </div>
                                    <div className="row justify-content-between mb-2 profile-info-card-textCol">
                                        <p className="text-sm text-bold mb-0 profile-card-para"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Email: </strong> UI/UX Design</p>
                                        <p className="text-sm text-bold mb-0 profile-card-para"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Birth Date: </strong> UI/UX Design</p>
                                    </div>
                                    <div className="row justify-content-between mb-2 profile-info-card-textCol">
                                        <p className="text-sm text-bold mb-0 profile-card-para"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Phone No: </strong> UI/UX Design</p>
                                        <p className="text-sm text-bold mb-0 profile-card-para"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Status: </strong> UI/UX Design</p>
                                    </div>



                                    <p className="text-sm text-bold mb-2"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Work For: </strong> UI/UX Design</p>
                                    <p className="text-sm text-bold mb-2"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Address: </strong> UI/UX Design</p>



                                </div>
                            </div>



                            <div className="d-flex align-items-center  mb-2 profile-info-card-column2">
                                <div className="profile-meta col-md-5 col-12 profile-info-card-column2-text">

                                    <p className="text-sm text-bold mb-2"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Medical Insurance: </strong> None </p>
                                    <p className="text-sm text-bold mb-2"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Vision Insurance: </strong>  Yes </p>
                                    <p className="text-sm text-bold mb-2"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Dental Insurance: </strong> No </p>


                                </div>



                                <div className="profile-meta col-md-7 col-12" style={{ textAlign: 'left' }}>

                                    <span className="divider mt-0">
                                        <hr className="mt-0" />
                                    </span>





                                    <p className="text-sm text-bold mb-2"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Chat Id: </strong> UI/UX Design</p>
                                    <p className="text-sm text-bold mb-2"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Legacy Id: </strong> UI/UX Design</p>


                                    <p className="text-sm text-bold mb-2"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Patient Since: </strong> UI/UX Design</p>
                                    <p className="text-sm text-bold mb-2"> <strong className="text-gray text-sm" style={{ fontSize: '16px' }}>Preferred Provider: </strong> UI/UX Design</p>



                                </div>
                            </div>




                        </div>
                    </div>
                    {/* end card */}
                </div>


                <div className="col-md-6 col-12">
                    <div className="card-style mb-3">
                        {/* <h3 className="text-start mb-3"> Appointments </h3> */}
                        <div className="row justify-content-between mb-3">
                            <h3 className="text-start mb-0 dashboard-profile-heading"> Appointment </h3>
                            <a href="" className="btn btn-custom btn-inline mb-0 dashboard-profile-btn">Browse All</a>
                        </div>

                        <div className="table-wrapper table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <h6>Visit Type</h6>
                                        </th>
                                        <th>
                                            <h6>Date</h6>
                                        </th>
                                        <th>
                                            <h6>Provider</h6>
                                        </th>
                                        <th>
                                            <h6>Status</h6>
                                        </th>
                                        
                                    </tr>
                                    {/* end table row*/}
                                </thead>
                                <tbody>
                                    <tr style={{ border: '' }}>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="min-width">
                                            <p>xx-yy-zzzz</p>
                                        </td>
                                        <td className="min-width">
                                            <p>Esther Howard</p>
                                        </td>


                                        <td className="min-width">
                                            <span className="status-btn active-btn">Active</span>
                                        </td>
                                    </tr>
                                    {/* end table row */}


                                </tbody>
                            </table>
                            {/* end table */}
                        </div>
                    </div>
                    {/* end card */}
                </div>
                {/* end col */}
            </div>



            <div className="row">

                <div className="col-md-6 col-12">
                    <div className="card-style mb-3  dashboard-profile-card">
                        <div className="row justify-content-between mb-3">
                            <h4 className="text-start mb-0 dashboard-profile-heading"> Medical Records </h4>
                            <a href="" className="btn btn-custom btn-inline mb-0 dashboard-profile-btn">Browse All</a>
                        </div>
                        <div className="table-wrapper table-responsive" style={{ width: '100%' }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <h6>Date</h6>
                                        </th>
                                        <th>
                                            <h6>Name</h6>
                                        </th>
                                        <th>
                                            <h6>Result</h6>
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="">
                                            <p>xx-yy-zzzz</p>
                                        </td>
                                        <td className="">
                                            <p>25</p>
                                        </td>



                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="">
                                            <p>xx-yy-zzzz</p>
                                        </td>
                                        <td className="">
                                            <p>25</p>
                                        </td>



                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="">
                                            <p>xx-yy-zzzz</p>
                                        </td>
                                        <td className="">
                                            <p>25</p>
                                        </td>



                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="">
                                            <p>xx-yy-zzzz</p>
                                        </td>
                                        <td className="">
                                            <p>25</p>
                                        </td>



                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="">
                                            <p>xx-yy-zzzz</p>
                                        </td>
                                        <td className="">
                                            <p>25</p>
                                        </td>



                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="">
                                            <p>xx-yy-zzzz</p>
                                        </td>
                                        <td className="">
                                            <p>25</p>
                                        </td>



                                    </tr>


                                </tbody>
                            </table>
                            {/* end table */}
                        </div>
                    </div>
                    {/* end card */}
                </div>

                <div className="col-md-6 col-12">
                    <div className="card-style mb-3 dashboard-profile-card">
                        <div className="row justify-content-between mb-3">
                            <h4 className="text-start mb-0 dashboard-profile-heading"> Medications </h4>
                            <a href="" className="btn btn-custom btn-inline mb-0 dashboard-profile-btn">Browse All</a>
                        </div>

                        <div className="table-wrapper table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <h6>Medication Name</h6>
                                        </th>
                                        <th>
                                            <h6>Dose</h6>
                                        </th>
                                        <th>
                                            <h6>Frequency</h6>
                                        </th>
                                        <th>
                                            <h6>Condition</h6>
                                        </th>

                                    </tr>
                                    {/* end table row*/}
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="">
                                            <p>2 puff</p>
                                        </td>
                                        <td className="">
                                            <p>1 daily</p>
                                        </td>


                                        <td className="">
                                            <p>Flu</p>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="">
                                            <p>2 puff</p>
                                        </td>
                                        <td className="">
                                            <p>1 daily</p>
                                        </td>


                                        <td className="">
                                            <p>Flu</p>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="">
                                            <p>2 puff</p>
                                        </td>
                                        <td className="">
                                            <p>1 daily</p>
                                        </td>


                                        <td className="">
                                            <p>Flu</p>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="">
                                            <p>2 puff</p>
                                        </td>
                                        <td className="">
                                            <p>1 daily</p>
                                        </td>


                                        <td className="">
                                            <p>Flu</p>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="">
                                            <p>2 puff</p>
                                        </td>
                                        <td className="">
                                            <p>1 daily</p>
                                        </td>


                                        <td className="">
                                            <p>Flu</p>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Urgent</p>
                                        </td>
                                        <td className="">
                                            <p>2 puff</p>
                                        </td>
                                        <td className="">
                                            <p>1 daily</p>
                                        </td>


                                        <td className="">
                                            <p>Flu</p>
                                        </td>

                                    </tr>


                                </tbody>
                            </table>
                            {/* end table */}
                        </div>
                    </div>
                    {/* end card */}
                </div>

            </div>


                          {/* </div> */}

                        </section>



                      </main>


                    </div>
                  </div>


                  {/* <Profile/> */}

                  {/* <Outlet/> */}



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

export default Patientdashboard
