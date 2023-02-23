/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: '375px',
			md: '768px',
			lg: '1024px',
			xl: '1440px'
		},
		extend: {
			colors: {
				marine_blue: '#02295a',
				purplish_blue: '#473dff',
				pastel_blue: '#adbeff',
				light_blue: '#bfe2fd',
				strawberry_red: '#ed3548',
				cool_gray: '#9699ab',
				light_gray: '#d6d9e6',
				magnolia: '#f0f6ff',
				alabaster: '#fafbff'
			}
		},
		fontFamily: {
			sans: ['Ubuntu', 'sans-serif']
		}
	},
	plugins: []
};
