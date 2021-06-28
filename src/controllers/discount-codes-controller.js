const { nanoid } = require("nanoid");
const idLength = 8;


const getAllDiscountCodes = async (req, res) => {
  try {
    const discount_codes = await req.app.db.get("discount_codes");
    res.send(discount_codes);

  } catch(error) {
    return res.status(500).send(error)
  }

}

const getDiscountCodeById = async (req, res) => {
  try {
    const discount_code = await req.app.db
      .get("discount_codes")
      .find({ id: req.params.id })
      .value();

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

    res.send(discountCode)
  } catch (error) {
    return res
      .status(500)
      .send(error)
  }
}

const updateDiscountCode = async (req, res) => {
  try {
    await req.app.db
      .get("discount_codes")
      .find({ id: req.params.id })
      .assign({
        ...req.body,
        edited: new Date(Date.now())
      })
      .write();

    res.send(await req.app.db
      .get("discount_codes")
      .find({ id: req.params.id })
    );
  } catch (error) {
    return res
      .status(500)
      .send(error);
  }
}

const deleteDiscountCode = async (req, res) => {
  await req.app.db
    .get("discount_codes")
    .remove({ id: req.params.id })
    .write();

  res.sendStatus(200);
}


module.exports = {
  getAllDiscountCodes,
  getDiscountCodeById,
  updateDiscountCode,
  deleteDiscountCode,
  setDiscountCode,
}