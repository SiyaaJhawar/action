const fetch = require('node-fetch');

fetch('', {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      'email@example.com:<api_token>'
    ).toString('base64')}`,
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.json();
  })
  .then(json => {
    json.issues.forEach(issue => {
      console.log(issue.key, issue.fields.summary);
    });
  })
  .catch(err => console.error(err));

