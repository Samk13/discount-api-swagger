const { nanoid } = require("nanoid");
const idLength = 8;

const getAllDiscountCodes = (req, res) => {
  const discount_codes = req.app.db.get("discount_codes");

  res.send(discount_codes);
}

const getDiscountCodeById = (req, res) => {
  const discount_code = req.app.db.get("discount_codes").find({ id: req.params.id }).value();

  if(!discount_code){
    res.sendStatus(404)
  }

  res.send(discount_code);
}


const setDiscountCode = (req, res) => {
  try {
    const discountCode = {
      id: nanoid(idLength),
      ...req.body,
    };

    req.app.db.get("discount_codes").push(discountCode).write();

    res.send(discountCode)
  } catch (error) {
    return res.status(500).send(error);
  }
}

const updateDiscountCode = (req, res) => {
  try {
    req.app.db
      .get("discount_codes")
      .find({ id: req.params.id })
      .assign(req.body)
      .write();

    res.send(req.app.db.get("discount_codes").find({ id: req.params.id }));
  } catch (error) {
    return res.status(500).send(error);
  }
}

const deleteDiscountCode = (req, res) => {
  req.app.db.get("discount_codes").remove({ id: req.params.id }).write();

  res.sendStatus(200);
}


module.exports = {
  getAllDiscountCodes,
  getDiscountCodeById,
  updateDiscountCode,
  deleteDiscountCode,
  setDiscountCode,
}