<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let summary;
	export let total_per_month = 0;

	const request_change = () => {
		dispatch('request_change');
	};
</script>

<h2 class="text-3xl font-bold text-marine_blue">Finishing up</h2>
<p class=" text-cool_gray mt-2">Double-check everything looks OK before confirming.</p>
<ul class="mt-6 bg-magnolia py-6 px-4 rounded-lg">
	<li class="flex items-center justify-between border-light_gray border-b pb-3 mb-4">
		<div>
			<p class="capitalize text-marine_blue font-medium">
				{summary.biling_plan}({summary.is_yearly ? 'Yearly' : 'Monthly'})
			</p>
			<button
				class="underline cursor-pointer text-cool_gray hover:text-purplish_blue"
				on:click={request_change}>Change</button
			>
		</div>
		<span class="text-marine_blue font-medium">${summary.monthly_charge}/mo</span>
	</li>
	{#each summary.addons as addon, idx ('addon-' + idx)}
		<li class="flex items-center justify-between mb-2">
			<p class="text-cool_gray">{addon.title}</p>
			<span class="text-marine_blue">+${addon.per_month}/mo</span>
		</li>
	{/each}
</ul>
<div class="flex items-center justify-between py-6 px-4">
	<p class="text-cool_gray">Total (per month/year)</p>
	<span>+${total_per_month}/mo</span>
</div>
