<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let selected_adn_ids = [];
	export let yearly_factor = 1;
	export let starting_addons = [];

	const all_addons = starting_addons.map((adn) => ({
		...adn,
		per_month: adn.per_month * yearly_factor,
		selected: selected_adn_ids.includes(adn.id)
	}));

	const addons_change = () => {
		let selected_addons = all_addons.filter((adn) => adn.selected);
		dispatch('addons_change', {
			selected_addons
		});
	};
</script>

<h2 class="text-3xl font-bold text-marine_blue">Pick add-ons</h2>
<p class=" text-cool_gray mt-2">Add-ons help enhance your gaming experience.</p>
<ul class="flex flex-col gap-y-4 mt-8">
	{#each all_addons as adn, idx ('addon-' + idx)}
		<li
			class={`flex items-center justify-start gap-x-4 border rounded-md p-4  w-full ${
				adn.selected ? 'border-marine_blue' : ''
			}`}
		>
			<input
				name={adn.id}
				type="checkbox"
				value={adn.id}
				class="w-5 h-5 rounded border-light_gray checked:purplish_blue"
				bind:checked={all_addons[idx].selected}
				on:change={addons_change}
			/>
			<div>
				<p class="font-bold text-marine_blue">{adn.title}</p>
				<p class=" text-cool_gray">{adn.desc}</p>
			</div>
			<span class="block absolute right-20 text-purplish_blue">+${adn.per_month}/mo</span>
		</li>
	{/each}
</ul>
