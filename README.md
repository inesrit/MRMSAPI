# MRMSAPI
Medical Records Management System

This is the Backend Java API of the system

![patientdashboard.png](patientdashboard.png)

## Overview
This is a web-based healthcare system designed to streamline the management of patient medical records. The system allows patients to schedule appointments, view their medical history, and communicate with healthcare providers. Healthcare providers can manage appointments, prescriptions, and medical records for their patientss.

## Features
- **Appointment Management:** Patients can request appointments. Healthcare providers can view and manage appointments for their patients.
- **Prescription Management:** Healthcare providers can create, update, view and cancel prescriptions for their patients.
- **Medical Record Management:** Patients can view their medical history, including past appointments, prescriptions, and medical procedures.
- **Access Requests: Healthcare** providers can request access to medical records. Patients can approve or deny access requests.

## Technologies Used
- **Frontend:** Javascript, Vite, React.js, Material-UI, Tailwind
- **Backend:** Spring Boot, Java, MySQL
- **Authentication and Authorization:** Spring Security
- **Data Access:** Spring Data JPA
- **API Integration:** Axios
- 
## Deployed Server
(there might be a dangerous site warning - please click more and visit link anyways)
- **API Backend URL:** https://mrms-96547282c657.herokuapp.com/api/v1
- **ReactApp Frontend URL:** https://appmrms-49191739e0bc.herokuapp.com/signup

## Remote Setup API
1. Clone the repository: **git clone https://github.com/inesrit/MRMSAPI.git**
2. Navigate to the project directory: **cd MRMSAPI**
3. Install dependencies:
- Backend: **./mvnw install**
4. Configure database connection to local MySQL database in **application.properties** file.
5. Modify src/main/java/com/example/MRMSAPI/Config/SecurityConfig.java corsConfigurationSource method allowed origins to local frontend server.
6. Inside package com.example.MRMSAPI.Controller: change all controller classes CrosssOrigin origins to local frontend server.
7. Run the backend server: **./mvnw spring-boot:run**

## Users already in the system
1. **Patient** (login through /signin)
   Email: johndoe@example.com
   Password: securepassword
2. **Healthcare Provider** (login through /hpsignin)
   Email: james@gmail.com
   Password: password1234

## Using it
1. Register as a patient or healthcare provider from **/signup or /hpsignup**
2. Log in to access the system from **/signin or /hpsignin**
3. From the landing page, use the naivgation bar links to access other pages and use the application.


## Example FLow - Prescription
With newly registered healthcare providers and patients, access needs to be granted so a patient can be associated and managed by a HP.
1. **Patient - Register:** Navigate to /signup to register as a patient.
2. **HP - Request Access:** Navigate to /hpsignup to register as a healthcare provider, /hpsignin to login, /hpaccess, create button, select desired patient and click to submit access request.
3. **Patient - Request Prescription:** Navigate to /signin to login, /access to accept HP access request and create association. Then navigate to /prescriptions and then the create button, fill the form and click submit. Refresh thepage and the prescription will be displayed waiting for healthcare rpovider approval.
4. **HP - Accept, Reject, Modify Prescription:** Navigate to /hpsignin to login, /hpprescriptions and the precriptions requested by patients will be displayed. Action button will be at the far end right of the row with options to accept, deny, or odify the details of the prescription.

