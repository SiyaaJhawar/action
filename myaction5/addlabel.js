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

        // Find the matching keys and add the label
        for (let key of issueKeys) {
          for (let id of defectIds) {
            if (key === id) {
              console.log(`Match found: ${key}`);
              // Add the label to the issue
              axios({
                method: 'post',
                url: `https://swgup.atlassian.net/rest/api/3/issue/${key}/labels`,
                headers: {
                  'Authorization': `Basic ${Buffer.from(
                    `${jiraUsername}:${jiraapitoken}`
                  ).toString('base64')}`,
                  'Content-Type': 'application/json'
                },
                data: {
                  "update": {
                    "labels": [
                      {
                        "add": "found-in-commit"
                      }
                    ]
                  }
                }
              })
              .then(response => {
                console.log(`Label added to issue ${key}`);
              })
              .catch(error => {
                console.error(`Error adding label to issue ${key}: ${error}`);
              });
            }
          }
        }
      }
    })
    .catch(error => {
      console.error(`Error fetching issues from Jira: ${error}`);
    });
  } catch (error) {
    console.error(`Error comparing commit comments with Jira issues: ${error}`);
  }
}

compareCommitCommentWithJiraIssue();




