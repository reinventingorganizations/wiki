const express = require('express')
const app = express()
const port = 80

const domain = "https://reinventingorganizationswiki.com/"

app.get('*', (req, res) => {
    const host = req.hostname;
    var url = req.originalUrl;
    var lang = 'en';
    const vals = host.split('.')
    const v1 = vals[0];
    const v2 = vals[vals.length -1];

    if (v1.length < 4)
        lang = v1;
    else if (v2.length < 4 && v2 !== 'com')
        lang = v2;
    url = domain + lang + url
    res.send(`
        <head>
            <meta http-equiv="refresh" content="0; URL="${url}" /> 
        </head>
        <body>
            <p>Haven't been redirected? <a href="${url}">Follow this link</a></p>
        </body>`);
})

app.listen(port, () => {
    console.log(`Redirect system running on port ${port}`)
})