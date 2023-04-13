import axios from 'axios';
import fetch from 'node-fetch';
import path from 'path';
import { getInput } from '@actions/core';

import { getDefectIds } from './action4/defectid.js';







const githubUrl = 'https://api.github.com/repos/SiyaaJhawar/action/commits/7ba17fe7086423a30485d2949cf32255bc2c479d/comments';
const jiraUsername = process.env.JIRA_USERNAME;
const jiraapitoken = process.env.JIRA_API_TOKEN;
const username = process.env.GITHUB_USERNAME;
const password = process.env.GITHUB_API_TOKEN;

const defectRegex = /([A-Z]{1}[A-Z]{2,})-\d+/g;

async function compareCommitCommentWithJiraIssue() {
  try {
const defectIds = await getDefectIds();
  console.log(`Found the following defect IDs in action4 module: ${defectIds}`);

  const response = await fetch('https://swgup.atlassian.net/rest/api/3/search?filter=allissues', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        `${jiraUsername}:${jiraapitoken}`
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  });
  console.log(`Response: ${response.status} ${response.statusText}`);
  const data = await response.json();

  if (data.issues && data.issues.length > 0) {
    const issueKeys = data.issues.map(issue => issue.key); // Extract the keys of all the issues
    console.log(`Found the following issue keys: ${issueKeys.join(', ')}`);

    // Check if any of the issue keys match a defect ID
    const regex = new RegExp(`(${defectIds.join('|')})`);
    console.log(`Regex pattern: ${regex}`);
    const matchingIssueKeys = issueKeys.filter(issueKey => regex.test(issueKey));
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
        console.log(`Response: ${response.status} ${response.statusText}`);
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
} catch (error) {
  console.error(error);
}

} 
compareCommitCommentWithJiraIssue();





