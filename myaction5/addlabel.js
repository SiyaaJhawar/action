import axios from 'axios';
import fetch from 'node-fetch';
import '../action4/defectid.js';

const jiraUsername = process.env.JIRA_USERNAME;
const jiraapitoken = process.env.JIRA_API_TOKEN;

async function compareCommitCommentWithJiraIssue() {
  try {
    const defectIds = global.defectIds;
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
      console.log(`Response: ${response.status} ${response.statusText}`);
      return response.json(); // Parse the response as JSON
    })
    .then(data => {
      if (data.issues && data.issues.length > 0) {
        const issueKeys = data.issues.map(issue => issue.key); // Extract the keys of all the issues
        console.log(`Found the following issue keys: ${issueKeys.join(', ')}`);

        const issueKeyRegex = /[A-Z]+\-\d+/g; // Generic regex for matching issue keys
        const matchingIssueKeys = issueKeys.filter(issueKey => {
          return defectIds.some(defectId => issueKey.match(issueKeyRegex).includes(defectId.replace("DEF", "WFL-")));
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
          })
          .then(response => {
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



