const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin([
        'import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'true' // change importing css to less true is less css is css
        }
    ], config,);

    config = rewireLess.withLoaderOptions({
        modifyVars: {
            "@primary-color": "#D0404E"
        },
        javascriptEnabled: true
    })(config, env);
    
    return config;
};