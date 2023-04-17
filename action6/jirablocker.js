
import fetch from 'node-fetch';

const jiraUsername = process.env.JIRA_USERNAME;
const jiraApiToken = process.env.JIRA_API_TOKEN;


const jql_blocker = 'filter=allissues and label=blocker';
const jql_all = 'filter=allissues';
const jira_url = 'https://swgup.atlassian.net/rest/api/3/search?filter=allissues';
const auth = 'Basic ' + Buffer.from('jiraUsername:JiraApiToken').toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

const checkIssues = async () => {
  try {
    const response1 = await fetch(`${jira_url}?jql=${jql_blocker}`, { headers });
    const blocker_issues = (await response1.json()).total;

    const response2 = await fetch(`${jira_url}?jql=${jql_all}`, { headers });
    const all_issues = (await response2.json()).total;

    if (blocker_issues > 0 || all_issues > 0) {
      console.log('No go');
    } else {
      console.log('Go');
    }
  } catch (error) {
    console.error(error);
  }
};

checkIssues();
