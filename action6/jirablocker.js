import fetch from 'node-fetch';

const jiraUsername = process.env.JIRA_USERNAME;
const jiraapitoken = process.env.JIRA_API_TOKEN;
fetch('https://swgup.atlassian.net/rest/api/3/search?filter=allissues', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          `${jiraUsername}:${jiraapitoken}`
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

