<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import './styles.css'
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data: PageData;

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth')
		})
		return () => {
			subscription.unsubscribe()
		}
	})

	const capitalizeFirstLetter = (string: String | null) => {
		if(string === null) return
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const handleLogout = async () => {
      try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error
        console.log(error);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        goto(`/`)
      }
    }
</script>


{#if data.session}
<div class="flex custom-background">
	<div class="flex-none">
		<aside class="w-64 h-[100%] custom-border-right custom-text-color overflow-y-hidden" aria-label="Sidebar" >
			<!-- <div class="flex pt-4 px-4 justify-center">
				{data.session.user.app_metadata.userrole}
			</div> -->
			<div class="px-3 py-4 h-[100%] overflow-y-auto c">
			   <ul class="space-y-2">
				  <li>
					 <a href="dashboard" class="flex items-center p-2 text-base font-normal custom-text-color rounded-lg hover:bg-zinc-800">
						<svg aria-hidden="true" class="w-6 h-6 text-white transition duration-75 group-hover:custom-text-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
						<span class="{$page.url.pathname == '/dashboard' ? 'text-white ml-3' : 'ml-3 custom-text-color'}">Dashboard</span>
					 </a>
				  </li>
				  {#if data.session.user.app_metadata.role == "admin"}
				  <li>
					<a href="company" class="flex items-center p-2 text-base font-normal custom-text-color rounded-lg hover:bg-zinc-800">
					   <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-white transition duration-75 group-hover:custom-text-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
					   <span class="{$page.url.pathname == '/company' ? 'text-white ml-3' : 'ml-3 custom-text-color'}">Companies</span>
					</a>
				 </li>
				  {/if}
				 {#if data.session.user.app_metadata.role == "company admin" || data.session.user.app_metadata.role == "admin"}
				 <li>
					<a href="customer" class="flex items-center p-2 text-base font-normal custom-text-color rounded-lg hover:bg-zinc-800">
					   <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-white transition duration-75 group-hover:custom-text-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
					   <span class="{$page.url.pathname == '/customer' ? 'text-white ml-3' : 'ml-3 custom-text-color'}">Customers</span>
				   </a>
				 </li>
				 {/if}	
				 <li>
					<a href="converter" class="flex items-center p-2 text-base font-normal custom-text-color rounded-lg hover:bg-zinc-800">
					   <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-white transition duration-75 group-hover:custom-text-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
					   <span class="{$page.url.pathname == '/converter' ? 'text-white ml-3' : 'ml-3 custom-text-color'}">Converters</span>
					</a>
				 </li>
				  {#if data.session.user.app_metadata.role == "admin"}
				  <li>
					 <a href="user" class="flex items-center p-2 text-base font-normal custom-text-color rounded-lg hover:bg-zinc-800">
						<svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-white transition duration-75 group-hover:custom-text-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
						<span class="{$page.url.pathname == '/user' ? 'text-white ml-3' : 'ml-3 custom-text-color'}">Users</span>
					 </a>
				  </li>
				  {/if}
			   </ul>
			   <ul class="pt-4 mt-4 space-y-2 border-t border-gray-700">
				  <li>
					 <a href="help" class="flex items-center p-2 text-base font-normal custom-text-color transition duration-75 rounded-lg hover:bg-zinc-800 group">
						<svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-white transition duration-75 group-hover:custom-text-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"></path></svg>
						<span class="ml-3">Help</span>
					 </a>
				  </li>
				  <li>
					<span on:click="{handleLogout}" class="flex cursor-pointer items-center p-2 text-base font-normal custom-text-color transition duration-75 rounded-lg hover:bg-zinc-800 group">
					    <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-white transition duration-75 group-hover:custom-text-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
               			<span class="ml-3">Logout</span>
					</span>
				 </li>
				
			   </ul>
			   <img class="h-12 w-12 absolute bottom-2 left-1" src="src/assets/logo.png" alt="">
			</div>
			
		 </aside>
	</div>
	<div class="flex-1">
		<div class="flex custom-border-bottom py-5 px-4 " >
		 	<span style="color: #777777 !important;" class="mr-2">Dashboard</span><span style="color: #777777 !important;">/</span><span class="text-white ml-2"> {capitalizeFirstLetter($page.routeId)}</span>
		</div>
		<div class="slot-size text-white">
			<slot/>
		</div>
		<footer class="custom-secondary-text px-5 pb-5">
			© 2022 Green Bee
		</footer>
	</div>
</div>
{:else}
 <slot />
{/if}