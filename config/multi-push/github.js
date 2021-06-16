import inquirer from 'inquirer';
import Configstore from 'configstore';
import { Octokit } from "@octokit/rest";

export default class {
    constructor() {
        this.store = new Configstore(process.env.npm_package_name);
        this.api = null;
        this.user = null;
    }

    async getCommit(commit_sha) {
        return await this.api.request(`/repos/reinventingorganizations/wiki/commits/master`);
    }

    async getBranches(payload) {
        return await this.api.request('/repos/reinventingorganizations/wiki/branches');
    }

    getUser() {
        return this.user;
    }

    getToken() {
        return this.store.get('github_token');
    }

    setToken(token) {
        this.store.set('github_token', token);
    }

    setUser(user) {
        this.user = user;
    }

    async authenticate() {
        //1. try getting a token
        let token = this.getToken('github_token');
        //2. if it exists, authenticate with it
        if (token) {
            console.log("Token is found in config. Skipping prompt.")
            try {
                this.api = new Octokit({
                    auth: token,
                });

                // Get Github user.
                const { data } = await this.api.request('/user');
                this.setUser(data);
                return this.user;
            } catch (error) {
                throw error;
            }
        } else {
            //3. if no token is stored, prompt user for one
            const question = [{
                name: 'token',
                type: 'input',
                message: 'Enter your Github personal access token:',
                validate: function (value) {
                    if (value.length == 40) {
                        return true;
                    } else return 'Please enter a valid token.';
                }
            }];
            const answer = await inquirer.prompt(question);

            //4. authenticate with user's answer
            try {
                this.api = await new Octokit({
                    auth: answer.token,
                });
                //5. store the token for next time
                this.setToken(answer.token);
            } catch (error) {
                console.log(error);
            }
        }
    }
}