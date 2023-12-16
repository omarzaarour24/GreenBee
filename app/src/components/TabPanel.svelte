<script lang="ts">
	import { getContext } from 'svelte';
	import { tabContextId } from './Tabs.svelte';

	export let id: any;
	
	const { selectedTab } = getContext(tabContextId) as any;
</script>

{#if $selectedTab === id}
	<slot></slot>
{/if}