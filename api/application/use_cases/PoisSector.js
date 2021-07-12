import Operation from "@/application/Operation"
const { Assertion } = require("@/infrastructure/lib/support")

class PoisSector extends Operation {
  constructor(proxy) {
    super()
    this.coreRepo = proxy.coreRepo
  }

  async execute(query) {
    // Invariantes
    const distance = Assertion.isNumber(+query.distance, "Falta distance")

    let coords = Assertion.isString(query.coords, "Falta coords")

    coords = JSON.parse(coords)
    const { SUCCESS, ERROR } = this.outputs

    try {
      let points = []

      // Filtrar por categorias si hay catId
      if (typeof query.catId !== "undefined") {
        let catId = query.catId

        // Si no es array, convertirlo a array
        if (typeof catId === "string") {
          catId = [+catId]
        }

        // Asegurar es array
        Assertion.isArray(catId, "Falta catId")

        points = await this.coreRepo.poisFilterCat(coords, distance, catId)
      } else {
        points = await this.coreRepo.poisFilter(coords, distance)
      }

      return this.emit(SUCCESS, points)
    } catch (error) {
      return this.emit(ERROR, error)
    }
  }
}

PoisSector.setOutputs()
export default PoisSector
