/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{html,ts,ejs}"],
	theme: {
		extend: {
			fontFamily: {
				"small-heading": ["Montserrat", "sans-serif"],
				body: ["Raleway", "sans-serif"],
				heading: ["Poppins", "sans-serif"],
			},
			colors: {
				mehandi: "#283618",
				"selected-mehandi": "hsl(74,32%,32%)",
			},
		},
	},
	plugins: [
		require("prettier-plugin-tailwindcss"),
		require("tailwindcss-elevation"),
	],
};
4;
