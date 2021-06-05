const create = (on: any, config: any) => {
  require('@cypress/code-coverage/task')(on, config);
  on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));
  return config;
}

export default create;