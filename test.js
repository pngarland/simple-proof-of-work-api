const { spawn } = require('child_process');
const got = require('got');
const test = require('tape');

const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});

test(`/verify returns "True" for valid input`, (t) => {
  t.plan(3);

  child.stdout.on('data', _ => {
    (async () => {
      const response = await got.put('http://127.0.0.1:5000/verify',
        {
          body: JSON.stringify({c: 'iBeat', n: 16, w: 62073}),
          method: 'PUT',
          'content-type': 'application/json'
        }
      );
      child.kill();

      t.false(response.error);
      t.equal(response.statusCode, 200);
      t.equal(response.body.result, 'True');
    })();
  });
});

