const buildName = __dirname.replace(/\//g, ' ').split(' ')[
  __dirname.replace(/\//g, ' ').split(' ').length - 2
]

const fs = require('fs')
const path = require('path')
const ssr = require('./cases/ssr')
const changecount = require('./cases/changecount')

let hasError = false
const logs = []
function pushToLog(msg, error, skipHistory) {
  logs.push(`${new Date().toJSON()}: ${msg}`)
  console.log(`${new Date().toJSON()}: ${msg}`)
  if (error) {
    logs.push(`ERROR: ${new Date().toJSON()}: ${error}`)
    console.log(`ERROR: ${new Date().toJSON()}: ${error}`)
    hasError = true
  }
}

const runQueue = async function(SELENIUM, driver, i, tests) {
  if (tests[i]) {
    try {
      pushToLog(tests[i].title + ' started...', undefined, true)
      await tests[i].test(SELENIUM, driver, pushToLog, process.argv[2])
    } catch (e) {
      driver.quit()
      console.log(e)
      pushToLog('Something wrong', e.message, true)
      return
    }
    await runQueue(SELENIUM, driver, i + 1, tests)
  } else {
    driver.quit()
  }
}

const run = async function(SELENIUM, getDriver) {
  const testList = [
    {
      title: 'SSR',
      test: ssr,
    },
    {
      title: 'change count',
      test: changecount,
    }
  ]

  const driver = await getDriver(buildName)
  await runQueue(SELENIUM, driver, 0, testList)

  const pathBase = process.argv[3] || '.'
  const result = logs.join('\n')
  if (result.indexOf('ERROR:') > -1) {
    const fileName = path.join(pathBase, `errors.txt`)
    console.log('Create file to: ', fileName)
    console.log(result)
    fs.writeFileSync(fileName, result, { encoding: 'UTF-8' })
  }
}

module.exports = run