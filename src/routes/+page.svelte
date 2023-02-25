<script>
	import '../app.css';
	import MenuOpt from './menu_opt.svelte';
	import FirstPage from './first_page.svelte';
	import SecondPage from './second_page.svelte';
	import ThirdPage from './third_page.svelte';
	import FourthPage from './fourth_page.svelte';
	import ThankYou from './thank_you.svelte';
	import { type_to_num } from '/src/lib/biling';
	import { is_empty } from '/src/lib/general';

	export let selected_num = 1;
	let confirmed = false;
	let yearly_factor = 10;
	let summary = {
		biling_plan: '', //Arcade, Advanced, Pro
		is_yearly: false, //true if it is yearly plan
		monthly_charge: 0,
		addons: [] //Online service, Larger storage, Cutomizable profile
	};
	let personal_info = {
		name: '',
		email: '',
		phone: '',
		complete: false
	};
	$: personal_info.complete =
		!is_empty(personal_info.name) &&
		!is_empty(personal_info.email) &&
		!is_empty(personal_info.phone);

	const starting_addons = [
		{
			id: 'on_service',
			title: 'Online service',
			desc: 'Access to multiplayer games',
			per_month: 1,
			selected: false
		},
		{
			id: 'lg_storage',
			title: 'Larger storage',
			desc: 'Extra 1TB of cloud save',
			per_month: 2,
			selected: false
		},
		{
			id: 'cust_prof',
			title: 'Customizable Profile',
			desc: 'Custom theme on your profile',
			per_month: 2,
			selected: false
		}
	];

	const set_biling_plan = (biling_plan) => {
		summary.biling_plan = biling_plan;
	};
	const set_is_yearly = (is_yearly) => {
		summary.is_yearly = is_yearly;
		summary.addons = summary.addons.map((item, idx) => ({
			...item,
			per_month: is_yearly
				? starting_addons[idx].per_month * yearly_factor
				: starting_addons[idx].per_month
		}));
	};
	const set_monthly_charge = (monthly_charge) => {
		summary.monthly_charge = monthly_charge;
	};
	const set_addons = (new_addons) => {
		summary.addons = new_addons;
	};

	const change_menu = (new_num) => {
		if (!confirmed && personal_info.complete) {
			selected_num = new_num;
			if (selected_num === 5) {
				confirmed = true;
			}
		}
	};
	const go_back = () => {
		if (selected_num > 1) {
			change_menu(selected_num - 1);
		}
	};
	const go_next = () => {
		if (selected_num < 5) {
			change_menu(selected_num + 1);
		}
	};

	$: back_hidden = selected_num === 1 ? 'hidden' : '';
	$: next_hidden = selected_num === 4 ? 'hidden' : '';
	$: total_per_month =
		summary.monthly_charge +
		summary.addons.map((adn) => adn.per_month).reduce((prev, curr) => prev + curr, 0);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Multiple Form Step" />
</svelte:head>
<div
	class="bg-magnolia md:bg-light_grey md:flex md:bg-white md:min-w-4xl md:max-w-4xl md:w-4xl md:relative md:p-5 md:rounded-lg md:h-4/5 overflow-hidden"
>
	<nav class="h-44 md:w-[274px] md:h-full bg-purplish_blue md:rounded-xl">
		<ul
			class="flex justify-center gap-y-8 w-full p-10 md:rounded-xl md:flex-col md:justify-start h-full bg-cover md:bg-left-bottom bg-no-repeat bg-[url('/src/lib/images/bg-sidebar-mobile.svg')] md:bg-[url('/src/lib/images/bg-sidebar-desktop.svg')]"
		>
			<li>
				<MenuOpt
					order={1}
					title="step 1"
					action_name="your info"
					{selected_num}
					on:menu_click={() => change_menu(1)}
				/>
			</li>
			<li>
				<MenuOpt
					order={2}
					title="step 2"
					action_name="select plan"
					{selected_num}
					on:menu_click={() => change_menu(2)}
				/>
			</li>
			<li>
				<MenuOpt
					order={3}
					title="step 3"
					action_name="add-ons"
					{selected_num}
					on:menu_click={() => change_menu(3)}
				/>
			</li>
			<li>
				<MenuOpt
					order={4}
					title="step 4"
					action_name="summary"
					{selected_num}
					on:menu_click={() => change_menu(4)}
				/>
			</li>
		</ul>
	</nav>
	<main class="flex justify-center -mt-20 md:mt-0 md:p-0 md:w-[450px]">
		<section class="w-[375px] p-8 bg-white rounded-lg">
			{#if selected_num === 1}
				<FirstPage bind:personal_info />
			{:else if selected_num === 2}
				<SecondPage
					{yearly_factor}
					selected_type={type_to_num(summary.biling_plan)}
					monthly_selected={!summary.is_yearly}
					on:is_yearly_change={(ev) => set_is_yearly(ev.detail.is_yearly)}
					on:biling_plan_change={(ev) => {
						set_biling_plan(ev.detail.biling_plan);
						set_monthly_charge(ev.detail.monthly_charge);
					}}
				/>
			{:else if selected_num === 3}
				<ThirdPage
					{starting_addons}
					yearly_factor={summary.is_yearly ? 10 : 1}
					selected_adn_ids={summary.addons.map((adn) => adn.id)}
					on:addons_change={(ev) => {
						set_addons(ev.detail.selected_addons);
					}}
				/>
			{:else if selected_num === 4}
				<FourthPage
					{summary}
					{total_per_month}
					on:request_change={() => {
						change_menu(2);
					}}
				/>
			{:else if selected_num === 5}
				<ThankYou />
			{/if}
		</section>
	</main>
	<nav
		class="flex justify-between bg-white w-screen h-16 absolute left-0 bottom-0 p-4 md:w-[390px] md:left-[320px] md:bottom-5 md:px-9"
	>
		{#if selected_num < 4}
			<button
				class={`text-cool_gray absolute left-2 h-9 ${back_hidden} hover:text-marine_blue`}
				on:click={go_back}>Go Back</button
			>

			<button
				class={`bg-marine_blue w-28 absolute right-2 h-9 rounded px-3 text-light_blue ${next_hidden}`}
				on:click={go_next}>Next Step</button
			>
		{:else if selected_num === 4}
			<button
				class=" bg-purplish_blue w-28 absolute right-2 h-9 rounded px-3 text-white hover:bg-pastel_blue"
				on:click={go_next}>Confirm</button
			>
		{/if}
	</nav>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.magnolia);
	}
</style>
