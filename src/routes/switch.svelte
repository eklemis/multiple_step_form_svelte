<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let monthly_on = true;
	let default_class = 'h-4 w-4 cursor-pointer';
	let on_class = default_class + ' ' + 'bg-white rounded-full';
	let off_class = default_class + ' ' + 'bg-transparent rounded-2';
	$: monthly_selected = monthly_on ? on_class : off_class;
	$: yearly_selected = !monthly_on ? on_class : off_class;

	const switch_click = () => {
		monthly_on = !monthly_on;
		dispatch('switch_change', { monthly_on });
	};
</script>

<div
	class="flex justify-between items-center h-6 w-11 px-1 bg-marine_blue border rounded-xl cursor-pointer"
>
	<button class={monthly_selected} on:click={switch_click} />
	<button class={yearly_selected} on:click={switch_click} />
</div>
