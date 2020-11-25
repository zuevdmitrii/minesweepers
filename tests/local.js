const Selenium = require('selenium-webdriver')
const { Builder } = require('selenium-webdriver')
const run = require('./run')

console.log('START TEST')
console.log('Testing: ', process.argv[2])

run(
  Selenium,
  async title => {
    console.log('Start test:', title)
    let driver = await new Builder().forBrowser('chrome').build()

    return driver
  }
)