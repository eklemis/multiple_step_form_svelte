<script>
	import '../app.css';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let order;
	export let title;
	export let action_name;
	export let selected_num;
	function activate_menu() {
		dispatch('menu_click', {
			order: order
		});
	}
	$: sel_class =
		selected_num === order || (order === 4 && selected_num === 5)
			? 'bg-light_blue text-marine_blue'
			: 'text-magnolia';
</script>

<a class="flex items-center gap-x-5 cursor-pointer" href={'#'} on:click={activate_menu}>
	<span
		class={`flex w-10 h-10 items-center justify-center border font-bold rounded-full md:w-12 md:h-12 ${sel_class}`}
		>{order}</span
	>
	<div class="md:flex md:flex-col md:items-start">
		<p class="uppercase text-cool_gray hidden md:inline">{title}</p>
		<p class="uppercase font-bold text-magnolia hidden md:inline">{action_name}</p>
	</div>
</a>
