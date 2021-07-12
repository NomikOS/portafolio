const qs = require("qs")

export function params(options) {
  return {
    params: options,
    paramsSerializer: (params) => {
      return qs.stringify(params, {
        indices: false,
      })
    },
  }
}
