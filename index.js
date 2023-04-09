const { init, cloneInstance, on } = require('i18next')

function i18next(options) {
    init(options)

    async function i18nextMiddleware(ctx, next) {
        const userLocale = ctx.session?.locale ?? ctx.from.language_code
        const i18next = cloneInstance({ initImmediate: false, lng: userLocale })

        on('languageChanged', (lng) => {
            ctx.session.locale = lng
        })

        ctx.i18next = i18next

        await next()
    }

    return i18nextMiddleware
}

function match(resourceKey, templateData) {
    return (text, ctx) => {
        return (text && ctx?.i18next && text === ctx.i18next.t(resourceKey, templateData)) ? [text] : null
    }
}

function reply(resourceKey, extra) {
    return (ctx) => {
        return ctx.reply(ctx.i18next.t(resourceKey), extra)
    }
}

module.exports = { i18next, match, reply }