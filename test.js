const octokit = new Octokit({
  auth: 'YOUR-TOKEN'
})

await octokit.request('GET /repos/{owner}/{repo}/git/commits/b63d854b9c2d60ba843e7da1106c8076fe203704}', {
  owner: 'SiyaaJhawar',
  repo: 'action',
  comment_id: 'b63d854b9c2d60ba843e7da1106c8076fe203704',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
    'Accept: application/vnd.github+json'
  }
})
