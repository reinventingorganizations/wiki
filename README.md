# Reinventing Organisations Wiki FR

The wiki content is versioned in the repository itself as markdown files in the `content` folder.
The markdown files are then transformed with [Eleventy](https://www.11ty.dev/) to an HTML site.
To administer the content, [Netlify CMS](https://www.netlifycms.org/) is used.
The website is then hosted on Netlify.

## Running locally

To run the website locally `node` and `npm` needs to be installed.
The recomended way to do is with [`nvm`](https://github.com/nvm-sh/nvm).

After having the repository clonned run the following comands to get started:

```
npm install
npm start
```

This will start a development server running on [http://localhost:8080].

To test Netlify CMS locally, additionaly the following command needs to be run in a separate terminal window:

```
npx netlify-cms-proxy-server
```

This will start a small server, adding the possibility to edit the markdown files from the browser in Netlify CMS.

Netlify CMS can then be opened with [http://localhost:8080/admin/]
