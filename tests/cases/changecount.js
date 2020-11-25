const wait = async (timeout) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

const changecount = async ({ By, Key, until }, driver, pushToLog, url) => {
  pushToLog('Open App')
  await driver.get(url)
  driver
    .manage()
    .window()
    .maximize()
  pushToLog('Find Grid')
  await driver.wait(until.elementLocated(By.className('grid'), 2000))

  let inputRows = await driver.findElement(By.id('rows-input'))
  inputRows.click()
  await wait(100)
  await inputRows.sendKeys(Key.chord(Key.CONTROL, "a"))
  await inputRows.sendKeys('10')

  let inputCols = await driver.findElement(By.id('cols-input'))
  inputCols.click()
  await wait(100)
  await inputCols.sendKeys(Key.chord(Key.CONTROL, "a"))
  await inputCols.sendKeys('10')


  await wait(5000)
  
  const cells = await driver.findElements(By.className('grid__cell'))
  pushToLog('Check count of elements')
  if (cells.length !== 100) {
    throw new Error(`SSR is wrong cells = ${cells.length}, but should be 100`)
  }
}

module.exports = changecount