/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				md: '4rem',
				lg: '8rem',
				xl: '16rem',
				'2xl': '32rem',
			},
		},
		extend: {
			animation: {
				'spin-slow': 'spin 2s linear infinite',
			},
			backgroundImage: {
				primaryDotted: 'radial-gradient(#33323E 1px, #13111C 1px)',
			},
			backgroundSize: {
				primaryDottedSize: '50px 50px',
			},
			colors: {
				primary: '#13111C',
				secondary: '#181622',
				accent: '#853BCE',
				'accent-brighter': '#A667E4',
			},
		},
	},
	plugins: [],
};
