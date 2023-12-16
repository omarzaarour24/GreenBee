<!--I cant figure out why I need to keep this to have it working in general, but dont remove this-->

<!-- drawer init and toggle -->
<!-- <div class="text-center">
    <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
    Show right drawer
    </button>
 </div> -->
 
 <!-- drawer component -->
 <div id="drawer-right-example" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
     <h5 id="drawer-right-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>Right drawer</h5>
    <button type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
       <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
       <span class="sr-only">Close menu</span>
    </button>
    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">Supercharge your hiring by taking advantage of our <a href="#" class="text-blue-600 underline dark:text-blue-500 hover:no-underline">limited-time sale</a> for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design job board.</p>
    <div class="grid grid-cols-2 gap-4">
       <a href="#" class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Learn more</a>
       <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get access <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>
    </div>
 </div>


 <script lang="ts">
	    import { goto } from '$app/navigation'
      import { onMount } from 'svelte';
      import { getUserSession } from '../../lib/supabaseSession';

      let userSession: any = {};

      onMount(async () => {
        await getUserSession().then((_) => {
          userSession = _.data.user;
          console.log(userSession?.app_metadata.role);
        });
    });
 </script>
 <body class="relativ overflow-hidden max-h-screen">
   <main class="ml-30 max-h-screen overflow-auto">
     <div class=" py-8">
       <div class="max-w-6xl mx-auto">
         <div class="custom-light-background rounded-3xl p-8 mb-5">
           <h1 class="text-3xl font-bold mb-10">Welcome to Green Bee's management system for your solar panels!</h1>
 
           <hr class="my-10">
 
           <div class="grid grid-cols-2 gap-x-20">
             <div>
               <h2 class="text-2xl font-bold mb-4">Stats</h2>
 
               <div class="grid grid-cols-2 gap-4">
                 <div class="col-span-2">
                   <div class="p-4 bg-green-100 rounded-xl">
                     <div class="font-bold text-xl text-gray-800 leading-none">Good day, {userSession.app_metadata?.role}, <br>{userSession.app_metadata?.customer?.name ?? 'Uknown'}</div>
                     <div class="mt-5">
                       <button type="button" on:click="{() => {goto('/converter')}}" class="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition">
                         Add Converter
                       </button>
                     </div>
                   </div>
                 </div>
                 <div class="p-4 bg-yellow-100 rounded-xl text-gray-800">
                   <div class="font-bold text-2xl leading-none">20</div>
                   <div class="mt-2">Tickets open</div>
                 </div>
                 <div class="p-4 bg-yellow-100 rounded-xl text-gray-800">
                   <div class="font-bold text-2xl leading-none">5,5</div>
                   <div class="mt-2">Tracked hours</div>
                 </div>
                 <div class="col-span-2">
                   <div class="p-4 bg-purple-100 rounded-xl text-gray-800">
                     <div class="font-bold text-xl leading-none">Your daily throughput</div>
                     <div class="mt-2">3.345kWh</div>
                   </div>
                 </div>
               </div>
             </div>
             <div>
               <h2 class="text-2xl font-bold mb-4">Your latest notif.</h2>
               <div class="space-y-4">
                 <div class="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                   <div class="flex justify-between">
                     <div class="text-gray-400 text-xs">Customer Name</div>
                     <div class="text-gray-400 text-xs">4h</div>
                   </div>
                   <a class="font-bold hover:text-yellow-800 hover:underline">Converter has an issue with Cable.</a>
                   <div class="text-sm text-gray-600">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                       <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                     </svg>Open
                   </div>
                 </div>
                 <div class="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                   <div class="flex justify-between">
                     <div class="text-gray-400 text-xs">Customer Name</div>
                     <div class="text-gray-400 text-xs">7d</div>
                   </div>
                   <a class="font-bold hover:text-yellow-800 hover:underline">New installation required</a>
                   <div class="text-sm text-gray-600">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                       <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                     </svg>Open
                   </div>
                 </div>
                 <div class="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                   <div class="flex justify-between">
                     <div class="text-gray-400 text-xs">Status Change</div>
                     <div class="text-gray-400 text-xs">2h</div>
                   </div>
                   <a class="font-bold hover:text-yellow-800 hover:underline">Converter ID status: Offline</a>
                 </div>
 
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </main>
 </body>