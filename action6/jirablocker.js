import fetch from 'node-fetch'; 
const jiraUsername = process.env.JIRA_USERNAME;
const jiraapitoken = process.env.JIRA_API_TOKEN;

const jiraUrl = 'https://swgup.atlassian.net/rest/api/3/search';
const jiraParams = {
  jql: 'filter=allissues AND labels=blocker', 
  maxResults: 0, 
};

// Fetch the Jira issues using the API
fetch(`${jiraUrl}?${new URLSearchParams(jiraParams)}`, {
  headers: {
    'Authorization': 'Basic ' + Buffer.from('jiraUsername:jiraapitoken').toString('base64'), // replace with your Jira email and API token
    'Content-Type': 'application/json',
  },
})
.then(response => response.json())
.then(data => {
  const totalIssues = data.total;
  if (totalIssues > 0) {
    console.log(`There are ${totalIssues} Jira issues with the "blocker" label.`);
  } else {
    console.log('There are no Jira issues with the "blocker" label.');
    console.log('go');
  }
})
.catch(error => {
  console.error('Error fetching Jira issues:', error);
});
