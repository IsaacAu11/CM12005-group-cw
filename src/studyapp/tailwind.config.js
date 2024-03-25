/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/routes/**/*.svelte", "./src/components/**/*.svelte"],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                'custom': { // src: https://daisyui.com/theme-generator/
                    "primary": "#DAD7CD",
                    "secondary": "#ffffff",
                    "accent": "#E0E0E0",
                    "neutral": "#CEF3FF",
                    "base-100": "#E0E0E0",
                    "info": "#E6D7FF",
                    "success": "#91B78F",
                    "warning": "#FFE5CE",
                    "error": "#FFE8FD",
                },
            }
        ],
    },
}

