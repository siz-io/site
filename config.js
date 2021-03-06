// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path')
var env = process.env
var isDev = ((env.NODE_ENV || 'development') === 'development')
var conf = {}
var hbs = require(path.join(env.GHOST_SOURCE, 'node_modules', 'express-hbs'))
var cheerio = require(path.join(env.GHOST_SOURCE, 'node_modules', 'cheerio'))

var themeHandler = require(path.join(env.GHOST_SOURCE, 'core', 'server', 'middleware', 'theme-handler'))
var oldGhostLocals = themeHandler.ghostLocals
themeHandler.ghostLocals = function (req, res, next) {
  oldGhostLocals(req, res, function () {})
  res.locals.isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(req.headers['user-agent'])
  next()
}

hbs.registerHelper('env', function (param) {
  return env[param]
})

hbs.registerHelper('contentAndAds', function (options) {
  var content = hbs.handlebars.helpers.content.call(this, options)
  var $ = cheerio.load(content.toHTML())

  if (options.data.root.isMobile) {
    $('.instagram-media').after('<div class="ad ad-criteo-bellow-video">' + hbs.handlebars.partials['ads/criteo']({id: 328682}) + '</div>')
    $('iframe').after('<div class="ad ad-criteo-bellow-video">' + hbs.handlebars.partials['ads/criteo']({id: 328682}) + '</div>')
    $('.fb-video').after('<div class="ad ad-criteo-bellow-video">' + hbs.handlebars.partials['ads/criteo']({id: 328682}) + '</div>')

    $('.instagram-media').before('<div class="ad ad-criteo-above-video">' + hbs.handlebars.partials['ads/criteo']({id: 320766}) + '</div>')
    $('iframe').before('<div class="ad ad-criteo-above-video">' + hbs.handlebars.partials['ads/criteo']({id: 320766}) + '</div>')
    $('.fb-video').before('<div class="ad ad-criteo-above-video">' + hbs.handlebars.partials['ads/criteo']({id: 320766}) + '</div>')
  } else {
    $('.instagram-media').after(hbs.handlebars.partials['ads/taboola']({mode: 'thumbnails-b', id: 'taboola-end-of-article-thumbnails', placement: 'End of Article Thumbnails'}))
    $('iframe').after(hbs.handlebars.partials['ads/taboola']({mode: 'thumbnails-b', id: 'taboola-end-of-article-thumbnails', placement: 'End of Article Thumbnails'}))
    $('.fb-video').after(hbs.handlebars.partials['ads/taboola']({mode: 'thumbnails-b', id: 'taboola-end-of-article-thumbnails', placement: 'End of Article Thumbnails'}))

    $('.instagram-media').before('<div class="ad ad-criteo-desktop-above-video">' + hbs.handlebars.partials['ads/criteo']({id: 322879}) + '</div>')
    $('iframe').before('<div class="ad ad-criteo-desktop-above-video">' + hbs.handlebars.partials['ads/criteo']({id: 322879}) + '</div>')
    $('.fb-video').before('<div class="ad ad-criteo-desktop-above-video">' + hbs.handlebars.partials['ads/criteo']({id: 322879}) + '</div>')
  }
  return new hbs.SafeString($.html())
})

hbs.registerHelper('sentenceExcerpt', function (options) {
  options.hash.words = 1000
  var excerpt = hbs.handlebars.helpers.excerpt.call(this, options)
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
