<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient'
	import { goto } from '$app/navigation';

	let loading = false
	let email: string = "";
	let password: string = "";
	let confirmpassword: string = "";

	const handleRegister = async () => {
		if(password != confirmpassword) {
			console.log("passwords do not match");
			return;
		}

		loading = true
		await supabaseClient.auth.signUp({
			email: email as string,
			password: password as string
		}).then(({data,error}) => {
			if (error instanceof Error) {
				alert(error.message)
				return;
			}
			loading = false
			goto("/dashboard")
		});
	}
</script>

<section class="main-background h-[100vh]">
		<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
			<a href="#" class="flex items-center mb-6 text-2xl font-semibold text-white">
				<img class="w-16 h-16 mr-2" src="src/assets/logo.png" alt="logo">
				Green Bee    
			</a>
			<div class="w-full secondary-background rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
						Register an Account
					</h1>
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-white">Your email</label>
						<input bind:value="{email}" type="email" name="email" id="email" class="focus:outline-none focus:ring focus:ring-green-300 third-background border-none text-gray-400 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required>
					</div>
					<div>
						<label for="password" class="block mb-2 text-sm font-medium text-white ">Password</label>
						<input bind:value="{password}"  type="password" name="password" id="password" placeholder="••••••••" class="focus:outline-none focus:ring focus:ring-green-300 third-background text-gray-400 border-none sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required>
					</div>
					<div>
						<label for="confirmpassword" class="block mb-2 text-sm font-medium text-white ">Confirm Password</label>
						<input bind:value="{confirmpassword}" type="password" name="confirmpassword" id="confirmpassword" placeholder="••••••••" class="focus:outline-none focus:ring focus:ring-green-300 third-background text-gray-400 border-none sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required>
					</div>
					<button on:click="{handleRegister}" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center third-background hover:bg-primary-700 focus:ring-primary-800">Register</button>
					<p class="text-sm font-light text-gray-400">
						Have an account? <a href="/login" class="font-medium hover:underline text-primary-500">Sign in!</a>
					</p>
				</div>
			</div>
		</div>
  </section>
  <style>
	.main-background {
		background-color: #1C1C1C;
	}
	.secondary-background {
		background-color: #333333;
	}
	.third-background {
		background-color: #3D3D3D;
	}
  </style>
