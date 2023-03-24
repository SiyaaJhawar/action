const core = require('@actions/core');

try {
  const message = core.getInput('message');
  console.log(message);
} catch (error) {
  core.setFailed(error.message);
}

