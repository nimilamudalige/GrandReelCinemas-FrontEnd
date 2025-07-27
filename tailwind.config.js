export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#e50914', // Netflix-style red
                secondary: '#221f1f', // Dark gray for background
                accent: '#f5c518', // IMDb-style yellow for ratings
            },
            fontFamily: {
                sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
                mono: ['"Fira Code"', 'monospace']
            },
            boxShadow: {
                'card': '0 4px 20px rgba(0, 0, 0, 0.4)',
            },
        },
    },
    plugins: [],
}
