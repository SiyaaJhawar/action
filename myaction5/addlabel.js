
import fetch from 'node-fetch';
import * as core from '@actions/core';
import * as github from '@actions/github';

const jiraUsername = process.env.JIRA_USERNAME;
const jiraapitoken = process.env.JIRA_API_TOKEN;
const username = process.env.GITHUB_USERNAME;
const password = process.env.GITHUB_API_TOKEN;

const defectRegex = /([A-Z]{1}[A-Z]{2,})-\d+/g;

async function compareCommitCommentWithJiraIssue() {
  try {
    const runId = core.getInput('run_id');
    // Create a new GitHub API client with authentication
    const octokit = github.getOctokit(core.getInput('GITHUB_API_TOKEN'));

    // Call the GitHub API to get the workflow run details
    const { data } = await octokit.actions.getWorkflowRun({
      owner: 'SiyaaJhawar',
      repo: 'action',
      run_id: runId,
     
    });
    console.log(`Found the following defect IDs in commit comments: ${defectIds}`);
    console.log(`Username: ${jiraUsername}`);
    console.log(`Apitoken: ${jiraapitoken}`);

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
      return response.json(); // Parse the response as JSON
    })
    .then(data => {
      if (data.issues && data.issues.length > 0) {
        const issueKeys = data.issues.map(issue => issue.key); // Extract the keys of all the issues
        console.log(`Found the following issue keys: ${issueKeys.join(', ')}`);

        // Check if any of the issue keys match a defect ID
        const matchingIssueKeys = issueKeys.filter(issueKey => {
          const regex = new RegExp(`(${defectIds.join('|')})`);
          return regex.test(issueKey);
        });
        console.log(`Found matching issue keys: ${matchingIssueKeys.join(', ')}`);

        // Add label to the matching issues
        matchingIssueKeys.forEach(issueKey => {
      
         fetch(`https://swgup.atlassian.net/rest/api/2/issue/${issueKey}`, {
                   method: 'PUT',
                headers: {
        'Authorization': `Basic ${Buffer.from(
          `${jiraUsername}:${jiraapitoken}`
        ).toString('base64')}`,
        'Content-Type': 'application/json'
      },
 body: JSON.stringify({
    "update": {
      "labels": [
        {
          "add": "int-deploy"
        }
      ]
    }
  })
})  .then(response => {
            console.log(
              `Response: ${response.status} ${response.statusText}`
            );
            if (response.ok) {
              console.log(`Added label to issue ${issueKey}.`);
            } else {
              console.log(`Failed to add label to issue ${issueKey}.`);
            }
          })
          .catch(error => {
            console.error(`Error adding label to issue ${issueKey}:`, error);
          });
        });
      } else {
        console.log('No issues found in response.');
      }
    })
    .catch(error => {
      console.error('Error fetching issues:', error);
    });
  } catch (error) {
    console.error(error);
  }
}
compareCommitCommentWithJiraIssue();




