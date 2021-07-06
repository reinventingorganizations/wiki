import app from 'commander';
import Github from './github.js';

console.log("Welcome to Git multi branch push tool");

app
.command('* <commit>')
.description('run remote setup commands')
.action(async (commit_sha) => {
    let API = new Github();
    const user = await API.authenticate();
    const commit = await API.getCommit(commit_sha);

    console.log(`Welcome ${user.name} !`);
    console.log(commit);
});

app.parse(process.argv);

// show help if no arg is passed
if (!app.args.length) {
    app.help(); 
}

// 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