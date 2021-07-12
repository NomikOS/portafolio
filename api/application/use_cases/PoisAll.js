import Operation from "@/application/Operation"

class PoisAll extends Operation {
  constructor(proxy) {
    super()
    this.coreRepo = proxy.coreRepo
  }

  async execute(query) {
    const { SUCCESS, ERROR } = this.outputs

    try {
      const points = await this.coreRepo.poisAll()

      return this.emit(SUCCESS, points)
    } catch (error) {
      return this.emit(ERROR, error)
    }
  }
}

PoisAll.setOutputs()
export default PoisAll
