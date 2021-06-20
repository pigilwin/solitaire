

const create = (on: any, config: any) => {
  require('@cypress/code-coverage/task')(on, config);
  return config;
}

export default create;