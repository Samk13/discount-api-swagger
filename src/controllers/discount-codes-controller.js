const {
  writeDiscount,
  fetchDiscountById,
  destroyDiscountCode,
  writeDiscountUpdate: writeDiscountEdit,
  fetchAllDiscountCodes,
} = require("../models/discounts")

const getAllDiscountCodes = async (req, res) => {
  try {
    res.send(await fetchAllDiscountCodes(req))
  } catch(error) {
    return res.status(500).send(error)
  }
}


const getDiscountCodeById = async (req, res) => {
  try {
    const discount_code = await fetchDiscountById(req)
    if(!discount_code){
      res.sendStatus(404)
    }

    res.send(discount_code)

  } catch (error) {
    return res.status(500).send(error)
  }
}


const setDiscountCode = async (req, res) => {
  try {
    res.send(await writeDiscount(req))
  } catch (error) {
    return res
      .status(500)
      .send(error)
  }
}

const updateDiscountCode = async (req, res) => {
  try {
    res.send(await writeDiscountEdit(req))
  } catch (error) {
    return res
      .status(500)
      .send(error);
  }
}




const deleteDiscountCode = async (req, res) => {
  try {
    await destroyDiscountCode(req)
    res.sendStatus(200)
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = {
  getAllDiscountCodes,
  getDiscountCodeById,
  updateDiscountCode,
  deleteDiscountCode,
  setDiscountCode,
}