<script lang="ts">
	import { page } from '$app/stores'
	import Login from './login/+page.svelte'
	import Dashboard from './dashboard/+page.svelte'
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Green Bee</title>
	<meta name="description" content="Green Bee System" />
</svelte:head>


{#if data.session}
	<Dashboard />
{:else}
	<Login />
{/if}
