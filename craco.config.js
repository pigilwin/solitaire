const WorkerPlugin = require('worker-plugin');

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
        plugins: [
            new WorkerPlugin()
        ]
    }
}