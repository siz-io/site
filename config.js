// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path')
var env = process.env
var isDev = ((env.NODE_ENV || 'development') === 'development')
var conf = {}
var hbs = require(path.join(env.GHOST_SOURCE, 'node_modules', 'express-hbs'))
var cheerio = require(path.join(env.GHOST_SOURCE, 'node_modules', 'cheerio'))

hbs.registerHelper('env', function (param) {
  return env[param]
})

hbs.registerHelper('contentAndAds', function (argument) {
  var content = hbs.handlebars.helpers.content.call(this)
  var $ = cheerio.load(content.toHTML())
  $('iframe').after(hbs.handlebars.partials['ads/taboola']({mode: 'thumbnails-b', id: 'taboola-end-of-article-thumbnails', placement: 'End of Article Thumbnails'}))
  $('.fb-video').after(hbs.handlebars.partials['ads/taboola']({mode: 'thumbnails-b', id: 'taboola-end-of-article-thumbnails', placement: 'End of Article Thumbnails'}))
  return new hbs.SafeString($.html())
})

hbs.registerHelper('sentenceExcerpt', function (argument) {
  var excerpt = hbs.handlebars.helpers.excerpt.call(this)
  var sentenceExcerpt = excerpt.string.split(/(\?|\.|\!)(\s|$)/)
  return new hbs.SafeString(sentenceExcerpt[0] + sentenceExcerpt[1])
})

conf.server = {
  host: '0.0.0.0',
  port: '2368'
}

conf.paths = {
  contentPath: env.GHOST_CONTENT
}

conf.url = env.GHOST_URL || (isDev ? 'http://localhost:8080' : 'http://siz.io')

conf.mail = (env.MAIL_SERVICE || env.MAIL_USER || env.MAIL_PASSWORD) ? {
  transport: 'SMTP',
  options: {
    service: env.MAIL_SERVICE || 'Gmail',
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_PASSWORD
    }
  }
} : {}

conf.mail.from = env.MAIL_FROM

conf.fileStorage = false

conf.database = env.DB_HOST ? {
  client: 'mysql',
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME
  }
} : {
  client: 'sqlite3',
  connection: {
    filename: path.join(env.GHOST_CONTENT, '/data/ghost.db')
  }
}

module.exports = {
  production: conf,
  development: conf
}
