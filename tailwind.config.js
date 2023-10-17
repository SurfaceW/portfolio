/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,md,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,md,mdx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}

