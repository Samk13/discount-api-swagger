

const postDiscountParams = [
  {
    param_key: 'title',
    required: true,
    type: 'string',
    validator_functions: [(param) => {return param.length > 4}]
  },
  {
    param_key: 'description',
    required: false,
    type: 'string',
    validator_functions: [(param) => {return param.length > 4}]
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
    validator_functions: [(param) => {return param.length > 4}]
  },
  {
    param_key: 'currency',
    required: false,
    type: 'string',
    validator_functions: [(param) => {return param.length > 1}]
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
]

module.exports = {
  postDiscountParams
}