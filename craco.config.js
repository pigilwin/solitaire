module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    webpack: {
        module: {
            rules: [
                {
                    test: /\.worker\.ts$/,
                    use: { 
                        loader: "worker-loader" 
                    },
                },
            ],
        },
    }
}