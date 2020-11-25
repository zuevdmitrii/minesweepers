import "jasmine"
import {Generator} from '../src/Classes/Generator'

describe("Generator", () => {

  it("Keep safty start", () => {
    const result = Generator(10, 10, 1, 0, 0)
    const zero = result[0][0] 
    expect(!zero || zero.value > -1).toBe(true);
  });

  it("Calc count of bombs", () => {
    const countOfBombsNeed = 5
    const result = Generator(10, 10, countOfBombsNeed, 0, 0)
    let countOfBombs = 0
    result.forEach(row => {
      row.forEach(cell => {
        if (cell && cell.value === -1) {
          countOfBombs++
        }
      })
    })
    expect(countOfBombsNeed === countOfBombs).toBe(true);
  });

});