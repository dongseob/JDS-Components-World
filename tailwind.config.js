/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                "fade-in": {
                    "0%": {
                        opacity: "0",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
                "fade-in-down": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-20px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "zoom-in": {
                    "0%": {
                        opacity: "0",
                        transform: "scale(0)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "scale(1)",
                    },
                },
            },
            animation: {
                "fade-in": "fade-in .5s ease-in",
                "fade-in-down": "fade-in-down .5s ease-in",
                "zoom-in": "zoom-in .5s ease-in",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
