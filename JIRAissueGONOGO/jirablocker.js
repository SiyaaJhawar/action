
import fetch from 'node-fetch';

const jiraUsername = process.env.JIRA_USERNAME;
const jiraApiToken = process.env.JIRA_API_TOKEN;

const jql = 'project=SWT AND filter=10001';
const jira_url = process.env.JIRA_URL;
const auth = 'Basic ' + Buffer.from(`${jiraUsername}:${jiraApiToken}`).toString('base64');

const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

const checkIssues = async () => {
  try {
   
    const response = await fetch(`${jira_url}?jql=${jql}`, { headers });
    const json = await response.json();

   if (json.issues === undefined || json.issues.length === 0) {
      console.log('go');
    } else if (Object.keys(json).length === 0) {
      console.log('GO');
    } else {
      console.log('NOGO');
    }
  } catch (error) {
    console.error(error);
  }
};

checkIssues();
