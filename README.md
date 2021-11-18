# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### How to crawl manually with Algolia

1. Clone this repository locally and create two files at root:

   #### .env

   ```
   APPLICATION_ID=YOUR_APP_ID
   API_KEY=YOUR_API_KEY
   ```

   The api key is defined in the algolia dashboard with 3 operations allowed: `addObject`, `editSettings`, `deleteIndex`

   #### config.json

   The contents of this file can be copied from the [official docusaurus 2 repo](https://github.com/algolia/docsearch-configs/blob/master/configs/docusaurus-2.json). Change index_name, start_urls & sitemap_urls accordingly.

2. Run the docker script locally inside the repository. \*You need to have `docker` and `jq` locally installed
   ```
   docker run -it --env-file=.env -e "CONFIG=$(cat ./config.json | jq -r tostring)" algolia/docsearch-scraper
   ```
3. Check the updated `index_name` inside the algolia console.

### Deployment

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
