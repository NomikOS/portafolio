import { apiHelper } from "./apiHelper"
import { params } from "../infrastructure/lib/utils.js"

describe("Api", () => {
  it("pois, vista inicial", async () => {
    const result = await apiHelper("get", "poisAll")
    expect(Array.isArray(result)).toBe(true)
    expect(typeof result[0].id === "number").toBe(true)
  })

  it("pois, vista sin filtros", async () => {
    const data = params({
      distance: 100,
      coords: JSON.stringify({
        latitude: -33.4266707,
        longitude: -70.6202899,
      }),
    })
    const result = await apiHelper("get", "poisSector", data)
    expect(Array.isArray(result)).toBe(true)
    expect(typeof result[0].id === "number").toBe(true)
  })

  it("pois, vista con filtros", async () => {
    const data = params({
      distance: 100,
      coords: JSON.stringify({
        latitude: -33.4266707,
        longitude: -70.6202899,
      }),
      catId: [10084, 10004],
    })
    const result = await apiHelper("get", "poisSector", data)
    expect(Array.isArray(result)).toBe(true)
    expect(typeof result[0].id === "number").toBe(true)
  })

  it("pois, vista con filtros una sola categoria", async () => {
    const data = params({
      distance: 100,
      coords: JSON.stringify({
        latitude: -33.4266707,
        longitude: -70.6202899,
      }),
      catId: 10004,
    })
    const result = await apiHelper("get", "poisSector", data)
    expect(Array.isArray(result)).toBe(true)
    expect(typeof result[0].id === "number").toBe(true)
  })
})
