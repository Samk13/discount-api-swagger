
const { maxCopies, strMinLength } = require("../config/general")

const postDiscountParams = [
  {
    param_key: 'title',
    required: true,
    type: 'string',
    validator_functions: [(param) => {return param.length > strMinLength}]
  },
  {
    param_key: 'description',
    required: false,
    type: 'string',
    validator_functions: [(param) => {return param.length > strMinLength}]
  },
  {
    param_key: 'freeShipping',
    required: false,
    type: 'boolean',
    validator_functions: [(param) => {return typeof param === "boolean"}]
  },
  {
    param_key: 'discount_type',
    required: true,
    type: 'string',
    validator_functions: [(param) => {return param.length > strMinLength}]
  },
  {
    param_key: 'currency',
    required: false,
    type: 'string',
    validator_functions: [
      (param) => {
        const currency = ["SEK", "DKK", "EUR", "GBP", "NOK", "PLN", "USD"]
        if (currency.indexOf(param) === -1) {
          return false
        }
        return true
      }]
  },
  {
    param_key: 'expired',
    required: true,
    type: 'boolean',
    validator_functions: [(param) => {return typeof param === "boolean"}]
  },
  {
    param_key: 'amount',
    required: true,
    type: 'string',
    validator_functions: [(param) => {return param.length > 1}]
  },
  {
    param_key: 'copies',
    required: false,
    type: 'string',
    validator_functions: [(param) => {return parseInt(param) > 0 && parseInt(param) < maxCopies }]
  },
]

module.exports = {
  postDiscountParams
}