<header>

<div align="center">
<h1 align="center">telegraf-i18next</h1>
</div>

</header>

### Features

- Helps with localization for your bot.
- This module uses [i18next](https://www.npmjs.com/package/i18next).

### Resources
- [Getting started](#getting-started)
- Methods:
    * [i18next](#i18next)
    * [match](#match)
    * [reply](#reply)

## Getting started

### Installation

```shellscript
$ npm install telegraf telegraf-i18next
```
or
```shellscript
$ yarn add telegraf telegraf-i18next
```
or
```shellscript
$ pnpm add telegraf-i18next
```

### Example

```js
const { Telegraf, session } = require('telegraf');
const { i18next } = require('telegraf-i18next');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session({ defaultSession: () => ({ locale: 'en' }) }))

bot.use(i18next({
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    resources: {
        en: {
            translation: {
                hello: "Hello!",
                changeLanguage: "You have changed the language!",
                keyboard: { button: "Button Title!" },
                messageOnPress: "You clicked on the ({{ buttonName }}) button!" // You can also send some data (Interpolation).
            }
        },
        ru: {
            translation: {
                hello: "Привет!",
                changeLanguage: "Вы изменили язык!",
                keyboard: { button: "Название Кнопки!" },
                messageOnPress: "Вы нажали на кнопку ({{ buttonName }})!" // You can also send some data (Interpolation).
            }
        }
    }
}));

// how to change the language

bot.command('changeLanguage', async (ctx) => {
    let language = ctx.session.locale == "en" ? "ru" : "en";
    ctx.i18next.changeLanguage(language);
    return ctx.reply(ctx.i18next.t('changeLanguage'));
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
```

### i18next

```js
bot.use(i18next({
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    resources: {
        en: {
            translation: {
                hello: "Hello!",
                changeLanguage: "You have changed the language!",
                keyboard: { button: "Button Title!" },
                messageOnPress: "You clicked on the ({{ buttonName }}) button!" // You can also send some data (Interpolation).
            }
        },
        ru: {
            translation: {
                hello: "Привет!",
                changeLanguage: "Вы изменили язык!",
                keyboard: { button: "Название Кнопки!" },
                messageOnPress: "Вы нажали на кнопку ({{ buttonName }})!" // You can also send some data (Interpolation).
            }
        }
    }
}));
```

Other options you can look at [i18next](https://www.i18next.com/overview/configuration-options)

### reply

```js
const { reply } = require('telegraf-i18next')

bot.command('reply', reply('hello'));
```

### match

```js
const { match } = require('telegraf-i18next')

bot.command('keyboard', async (ctx) => {
    return ctx.reply('Keyboard:', Markup.keyboard([[ctx.i18next.t('hello')]])))
});

bot.hears(match(hello), reply('hello'));
```