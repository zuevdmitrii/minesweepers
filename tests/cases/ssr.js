const ssr = async ({ By, Key, until }, driver, pushToLog, url) => {
  pushToLog('Open App')
  await driver.get(url)
  driver
    .manage()
    .window()
    .maximize()
  pushToLog('Find Grid')
  await driver.wait(until.elementLocated(By.className('grid__cell'), 2000))
  const cells = await driver.findElements(By.className('grid__cell'))
  pushToLog('Check count of elements')
  if (cells.length !== 3721) {
    throw new Error(`SSR is wrong cells = ${cells.length}, but should be 100`)
  }
}

module.exports = ssr