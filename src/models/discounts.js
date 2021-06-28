const { nanoid } = require("nanoid");
const idLength = 8

const fetchAllDiscountCodes = async (req) => {
  try {
    const discount_codes = await req.app.db.get("discount_codes")
    return discount_codes

  } catch(error) {
    throw new Error(error)
  }
}

const writeDiscount = async (req) => {
  try {
    const discountCode = {
      id: nanoid(idLength),
      description: req.body.description,
      title: req.body.title,
      discount_type: req.body.discount_type,
      freeShipping: req.body.freeShipping,
      currency: req.body.currency,
      expired: req.body.expired,
      amount: req.body.amount,
      usedBy: req.body.usedBy,
      created: new Date(Date.now()),
      edited: null
    };
    const result = []
    const copies = req.body.copies &&  parseInt(req.body.copies) || 1;
      for (let i = 0; i < copies ; i++){
        result.push({
          ...discountCode,
          id: nanoid(idLength),
          created: new Date(Date.now())
        })
      }
      await req.app.db
      .get("discount_codes")
      .push(...result)
      .write();
      return result

  } catch (error) {
    throw new Error(error)
  }
}
const fetchDiscountById = async (req) => {
  try {
    const discount_code = await req.app.db
      .get("discount_codes")
      .find({ id: req.params.id })
      .value();
    return discount_code

  } catch (error) {
    throw new Error(error)
  }
}

const writeDiscountEdit = async (req) => {
  try {
    await req.app.db
    .get("discount_codes")
    .find({ id: req.params.id })
    .assign({
      ...req.body,
      edited: new Date(Date.now())
    })
    .write();
    return await req.app.db
    .get("discount_codes")
    .find({ id: req.params.id })

  } catch (error) {
    throw new Error(error)
  }
}

const destroyDiscountCode = async (req) => {
  try {
    await req.app.db
    .get("discount_codes")
    .remove({ id: req.params.id })
    .write();
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  fetchAllDiscountCodes,
  destroyDiscountCode,
  writeDiscountUpdate: writeDiscountEdit,
  fetchDiscountById,
  writeDiscount
}