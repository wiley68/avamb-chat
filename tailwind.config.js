const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		width: {
			72: '28rem',
			80: '30rem',
		},
	},
	plugins: [
		// add custom variant for expanding sidebar
		plugin(({ addVariant, e }) => {
			addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
				modifySelectors(
					({ className }) =>
						`.sidebar-expanded .${e(
							`sidebar-expanded${separator}${className}`
						)}`
				)
			})
		}),
	],
}
