<script>
	import Switch from './switch.svelte';
	import { createEventDispatcher } from 'svelte';
	import { num_to_type } from '/src/lib/biling';
	import ArcadeIcon from '/src/lib/images/icon-arcade.svg';
	import AdvancedIcon from '/src/lib/images/icon-advanced.svg';
	import ProIcon from '/src/lib/images/icon-pro.svg';

	const dispatch = createEventDispatcher();

	export let yearly_factor;

	// 0 = none, 1 = arcade, 2 = advanced, 3 = pro
	export let selected_type = 0;
	export let monthly_selected = true;
	const change_selected_type = (new_type_num) => {
		//if click again on the same type, unselect
		if (new_type_num === selected_type) {
			selected_type = 0;
		} else {
			selected_type = new_type_num;
		}
	};
	const monthly_price = {
		arcade: 9,
		advanced: 12,
		pro: 15,
		none: 0
	};

	const yearly_price = {
		arcade: monthly_price.arcade * yearly_factor,
		advanced: monthly_price.advanced * yearly_factor,
		pro: monthly_price.pro * yearly_factor,
		none: 0
	};

	$: price = monthly_selected ? monthly_price : yearly_price;
	$: dispatch('is_yearly_change', {
		is_yearly: !monthly_selected
	});
	$: new_biling_plan = num_to_type(selected_type);
	$: dispatch('biling_plan_change', {
		biling_plan: new_biling_plan,
		monthly_charge: price[new_biling_plan]
	});
</script>

<h1 class="text-3xl font-bold text-marine_blue">Select your plan</h1>
<p class=" text-cool_gray mt-2">You have the option of monthly or yearly billing.</p>
<ul class="flex flex-col gap-y-4 mt-8 md:flex-row md:gap-x-4">
	<li class="flex w-full md:h-48">
		<button
			class={`flex gap-x-4 items-center border rounded-md p-4 cursor-pointer w-full md:h-full md:flex-col md:items-start md:justify-between ${
				selected_type === 1 ? 'border-purplish_blue' : ''
			}`}
			on:click={() => change_selected_type(1)}
		>
			<img src={ArcadeIcon} alt="" class="w-12 h-12 rounded-full" />
			<div class="flex flex-col items-start">
				<p class=" text-md text-marine_blue font-medium">Arcade</p>
				<span class=" text-cool_gray">${price.arcade}/mo</span>
			</div>
		</button>
	</li>
	<li class="flex w-full">
		<button
			class={`flex gap-x-4 items-center border rounded-md p-4 cursor-pointer w-full md:h-full md:flex-col md:items-start md:justify-between ${
				selected_type === 2 ? 'border-purplish_blue' : ''
			}`}
			on:click={() => change_selected_type(2)}
		>
			<img src={AdvancedIcon} alt="" class="w-12 h-12 rounded-full" />
			<div class="flex flex-col items-start">
				<p class=" text-md text-marine_blue font-medium">Advanced</p>
				<span class=" text-cool_gray">${price.advanced}/mo</span>
			</div>
		</button>
	</li>
	<li class="flex w-full">
		<button
			class={`flex gap-x-4 items-center border rounded-md p-4 cursor-pointer w-full md:h-full md:flex-col md:items-start md:justify-between ${
				selected_type === 3 ? 'border-purplish_blue' : ''
			}`}
			on:click={() => change_selected_type(3)}
		>
			<img src={ProIcon} alt="" class="w-12 h-12 rounded-full" />
			<div class="flex flex-col items-start">
				<p class=" text-md text-marine_blue font-medium">Pro</p>
				<span class=" text-cool_gray">${price.pro}/mo</span>
			</div>
		</button>
	</li>
</ul>
<div class="flex gap-x-2 mt-10 justify-center items-center rounded-md bg-magnolia h-12">
	<span>Monthly</span>
	<Switch
		monthly_on={monthly_selected}
		on:switch_change={(ev) => (monthly_selected = ev.detail.monthly_on)}
	/> <span>Yearly</span>
</div>
