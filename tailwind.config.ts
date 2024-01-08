export default {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            transitionProperty: {
                width: 'width',
                height: 'height',
                bg: 'background-color',
            },
            height: {
                88: '22rem',
                120: '30rem',
            },
        },
    },
    plugins: [],
};