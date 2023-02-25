<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { is_empty } from '/src/lib/general';

	export let personal_info = {
		name: '',
		email: '',
		phone: '',
		complete: false
	};

	$: dispatch('info_change', {
		personal_info: {
			...personal_info,
			complete:
				!is_empty(personal_info.name) &&
				!is_empty(personal_info.email) &&
				!is_empty(personal_info.phone)
		}
	});

	const empty_warn_text = 'This field is required';
</script>

<h1 class="text-3xl font-bold text-marine_blue">Personal info</h1>
<p class=" text-cool_gray mt-2">Please provide your name, email address, and phone number.</p>
<form class="flex flex-col gap-y-4 mt-8">
	<div class="flex flex-col gap-y-1">
		<div class=" flex justify-between items-end">
			<label for="name" class="text-marine_blue">Name</label>
			<span class=" text-red-500 font-bold text-sm"
				>{is_empty(personal_info.name) ? empty_warn_text : ''}</span
			>
		</div>
		<input
			type="text"
			placeholder="e.g. Stephen King"
			name="name"
			id="name"
			bind:value={personal_info.name}
			class={`h-10 px-3 border rounded border-inherit text-marine_blue focus:outline-none ${
				is_empty(personal_info.name) ? 'focus:border-red-500' : 'focus:border-purplish_blue'
			} cursor-pointer`}
		/>
	</div>
	<div class="flex flex-col gap-y-1">
		<div class=" flex justify-between items-end">
			<label for="email" class="text-marine_blue">Email Address</label>
			<span class=" text-red-500 font-bold text-sm"
				>{is_empty(personal_info.email) ? empty_warn_text : ''}</span
			>
		</div>
		<input
			type="email"
			placeholder="e.g. stephenking@lorem.com"
			name="email"
			id="email"
			bind:value={personal_info.email}
			class={`h-10 px-3 border rounded border-inherit text-marine_blue focus:outline-none ${
				is_empty(personal_info.email) ? 'focus:border-red-500' : 'focus:border-purplish_blue'
			} cursor-pointer`}
		/>
	</div>
	<div class="flex flex-col gap-y-1">
		<div class=" flex justify-between items-end">
			<label for="phone" class="text-marine_blue">Phone Number</label>
			<span class=" text-red-500 font-bold text-sm"
				>{is_empty(personal_info.phone) ? empty_warn_text : ''}</span
			>
		</div>
		<input
			type="text"
			placeholder="e.g. +1 234 567 890"
			name="phone"
			id="phone"
			bind:value={personal_info.phone}
			class={`h-10 px-3 border rounded border-inherit text-marine_blue focus:outline-none ${
				is_empty(personal_info.phone) ? 'focus:border-red-500' : 'focus:border-purplish_blue'
			} cursor-pointer`}
		/>
	</div>
</form>
