import Pic from './../assets/Medical-health-logo-design-on-transparent-background-PNG.png'
import { Link } from 'react-router-dom';
import {  useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
/**
 * sign up page
 * 
 * @author Ines Rita
 */
function HPSignup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const navigate = useNavigate();


  async function save(event) {
      event.preventDefault();
      try {
        await axios.post("http://localhost:8080/api/v1/user/save", {
        username: username,
        email: email,
        password: password,
        location: location,
        contactNumber: contactNumber
        });
        alert("User Registation Successfull");
        navigate('/hpsignin');

      } catch (err) {
        alert(err);
      }
    }




  return (
      

  <section class="h-screen">
      <div class="h-full">
        {/* <!-- Left column container with background--> */}
        <div
          class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div
            class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="w-full"
              alt="Sample image" />
          </div>
    
          {/* <!-- Right column container --> */}
          <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src={Pic} alt="logo"/>
          MRMS     
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  If you are a patient, please  <a href="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">use this link</a>

                  </p>
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
              <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                      <input type="email" name="email" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jane" required=""
                      value={username}
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                      />
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your E-mail</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                      
                      value={email}
                      onChange={(event) => {
                      setEmail(event.target.value);
                      }}
                      />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      />
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Location</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City, Country" required=""
                      
                      value={location}
                      onChange={(event) => {
                      setLocation(event.target.value);
                      }}
                      />
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Contact Number</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""
                      
                      value={contactNumber}
                      onChange={(event) => {
                      setContactNumber(event.target.value);
                      }}
                      />
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={save} >Create an account</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>

                  </p>
              </form>
          </div>
      </div>
  </div>

        </div>
      </div>
    </section>

  )
}

export default HPSignup
