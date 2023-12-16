<script context="module">
	export const tabContextId = new Set();
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	
	export let selectedId: any;
	
	const selectedTab = writable(selectedId);
	
	$: selectedTab.set(selectedId);

	setContext(tabContextId, {
		selectTab: (tabId: any) => selectedId = tabId,
		selectedTab,
	});
</script>

<div class="tabs">
	<slot></slot>
</div>