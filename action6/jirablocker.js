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
  console.log(`Response: ${response.status} ${response.statusText}`);
  return response.json();
})
.then(json => {
  if (json.issues.length === 0) {
    console.log("Jira list is empty. Go.");
  } else {
    console.log("Jira list is non-empty. No-Go.");

    // Add code to handle the non-empty list here
    // For example, you can display the Jira issues to the user
    json.issues.forEach(issue => {
      console.log(issue.key, issue.fields.summary);
      // Do something with the Jira issues here
    });
    console.log(`There are ${json.issues.length} Jira issues.`);
  }
})
.catch(err => console.error(err));


