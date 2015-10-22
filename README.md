# Siz Site
## Environment variables
- `NODE_ENV`
- `GHOST_URL`
- `MAIL_SERVICE`
- `MAIL_USER`
- `MAIL_PASSWORD`
- `MAIL_FROM`
- `DB_HOST`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_NAME`

## Commands
### Run locally
`docker run --rm -p 8080:2368 -v $(pwd):/var/lib/ghost ghost`

### Elastic Beanstalk
Use the CLI as described [here](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) Main commands :
- `eb init` set things up
- `eb use <environment>` associate current git branch with an EB environment for deployment
- `eb deploy` ... deploy

## Useful links
- Uses [Ghost](https://ghost.org/)
- Theme based on [Webkid's](https://github.com/wbkd/ghost-wbkd)
