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
      ...req.body,
      id: nanoid(idLength),
      created: new Date(Date.now()),
      edited: null
    };

    await req.app.db
      .get("discount_codes")
      .push(discountCode)
      .write();

    return discountCode
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

const writeDiscountUpdate = async (req) => {
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
  writeDiscountUpdate,
  fetchDiscountById,
  writeDiscount
}