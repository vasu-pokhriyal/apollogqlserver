import { Octokit } from "octokit";
import * as dotenv from 'dotenv'
const env = dotenv.config().parsed
const octokit = new Octokit({ auth: env.PERSONAL_TOKEN });

export default {
    getAllRepos: async function (page) {
        try{
        let repositories = []
        let options = {
            per_page:2,
            page:page
        }
        const { data } = await octokit.request('GET /user/repos',options)

        data.map(function (item) {
            repositories.push({
                "name": item.name,
                "size": item.size,
                "owner": item.owner.login
            })
        })
        return repositories
    }catch(error){
        console.log("list all repositories ,error :", error)
    }
    },

    getRepo: async function (owner, name) {

        try {
            //fetch basic repo details
            let singleRepos = {}
            const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
                owner: owner,
                repo: name
            })

            //fetching yml file content

            // const result =await octokit.request(`GET /search/code?q=extension:yml+repo:{owner}/{name}`, {
            //     owner:owner,repo:name
            // })
           
                

            //fetching number of files
            let numFiles = 0;
            const content = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
                owner: owner,
                repo: name,
                path: '',
            });

            content.data.forEach((item) => {
                if (item.type === "file") {
                    numFiles++;
                }
            });


            //fetching active webhooks 
            let hooksObj = []
            let webhooks = await octokit.request('GET /repos/{owner}/{repo}/hooks', {
                owner: owner,
                repo: name
            })
            if (webhooks.data.length) {
                hooksObj = webhooks.data.map(function (item) {
                    if (item.active) {
                        return {
                            "id": item.id,
                            "type": item.type,
                            "name": item.name,
                            "url": item.url
                        }
                    }

                })
            }


            //generating response w.r.t schema
            singleRepos.name = data.name,
            singleRepos.size = data.size,
            singleRepos.isPrivate = data.private
            singleRepos.owner = data.owner.login
            singleRepos.webHooks = hooksObj
            singleRepos.totalFiles = numFiles
            return singleRepos
        } catch (error) {
            console.log("get single repository,error:", error)
        }


    }
}