/**
 * Home page
 * 
 * This is the main landing page for the application
 * 
 * @author Ines Rita
 */

import Notfound404 from './../assets/404.avif'

function Notfound() {
    return (
        <>

<div class="flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900">
    <div class="block md:max-w-lg">
        <img src={Notfound404} alt="404 image"/>
    </div>
    <div class="text-center xl:max-w-4xl">
        <h1 class="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">Page not found</h1>
        <p class="mb-5 text-base font-normal text-gray-500 md:text-lg dark:text-gray-400">Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.</p>
        
    </div>
</div>


        </>
    )
}
 
export default Notfound
 