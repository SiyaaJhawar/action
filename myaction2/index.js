import fetch from "node-fetch";
import core from '@actions/core';
import github from '@actions/github';
import fs from "fs";
import connected from 'process';
import { Console } from "console";
import { Octokit } from "@octokit/rest";
//import { Octokit } from "@octokit/core";
import { createPullRequest } from "octokit-plugin-create-pull-request";
//const core = require('@actions/core');
//const github = require('@actions/github');
//const fs = require("fs");
//const { connected } = require('process');
//const fetch = require('node-fetch');
(async () => {

   // const MY_TOKEN = core.getInput('MY_TOKEN');
    
    try {
        //const octokit = new Octokit({
        //    auth: core.getInput('my-token')
         //   });

        //await github.context. we will call the blocker list here and conditionally set the flag workflow-continue
        const url = "https://dummy.restapiexample.com/api/v1/employees";
        const response = await fetch(url);
        const {status, data, message} = await response.json();
        data.forEach(element => {
            var keys = Object.keys(element);
            for (let i = 0; i < keys.length; i++) {
                var key = keys[i];
            }
        });

        var isBlockerExists = false;
        core.setOutput("workflow-continue", "Go");
        var blockerDetails = "";
        data.forEach(employee => {
            var keys = Object.keys(employee);

            if(employee["employee_age"] >=10){
                isBlockerExists = true;
                for (let i = 0; i < keys.length; i++) {
                    var key = keys[i];                    
                }
                blockerDetails += employee["employee_name"] + ' ' + employee["employee_age"] + ' ';
            }
        });
        
        if (isBlockerExists) {
            core.setOutput("workflow-continue", "noGo");
            core.setOutput("blockerDetails", blockerDetails);
        }
        
    } catch (error) {
        console.log(error);
        core.setFailed(error.message);
    }
})();
