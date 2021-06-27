const express = require("express");
const router = express.Router();


const {
  getAllDiscountCodes,
  getDiscountCodeById,
  updateDiscountCode,
  deleteDiscountCode,
  setDiscountCode
} = require("../../controllers/discount-codes-controller")


/**
 * @swagger
 * components:
 *   schemas:
 *     Discount_code:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - expired
 *         - amount
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the discount code
 *         title:
 *           type: string
 *           description: The Discount code title
 *         type:
 *           type: string
 *           description: The Discount_code type [percentage, freeShipping,buyoneGetOne]
 *         description:
 *           type: string
 *           description: description for the deal the user will get if he use the code
 *         expired:
 *           type: boolean
 *           description: If the coupon is been used
 *         freeShipping:
 *           type: boolean
 *           description: if the coupon offer free shipping
 *         currency:
 *           type: string
 *           description: the currency of the code
 *         amount:
 *           type: string
 *           description: The percentage of the discount
 *         usedBy:
 *           type: string
 *           description: the user who used this discount coupon
 *       example:
 *         id: d5fE_asz
 *         title: discount code
 *         description: description for the discount visible to the user
 *         type: percentage
 *         freeShipping: false
 *         expired: false
 *         currency: sek
 *         amount: 12
 *         usedBy: logedIn user
 *
 */

 /**
  * @swagger
  * tags:
  *   name: Discount code
  *   description: The Discount code managing API
  */

/**
 * @swagger
 * /api/discount_code:
 *   get:
 *     summary: Returns the list of all the Discount_codes
 *     tags: [Discount code]
 *     responses:
 *       200:
 *         description: The list of the Discount_code
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discount_code'
 */

router.get("/", getAllDiscountCodes);

/**
 * @swagger
 * /api/discount_code/{id}:
 *   get:
 *     summary: Get the discount_codes by id
 *     tags: [Discount code]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Discount_code id
 *     responses:
 *       200:
 *         description: The Discount_code description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount_code'
 *       404:
 *         description: The Discount_code was not found
 */

router.get("/:id", getDiscountCodeById);

/**
 * @swagger
 * /api/discount_code:
 *   post:
 *     summary: Create a new Discount_code
 *     tags: [Discount code]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Discount_code'
 *     responses:
 *       200:
 *         description: The Discount_code was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount_code'
 *       500:
 *         description: Some server error
 */

router.post("/", setDiscountCode);

/**
 * @swagger
 * /api/discount_code/{id}:
 *  put:
 *    summary: Update the Discount_code by the id
 *    tags: [Discount code]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Discount_code id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Discount_code'
 *    responses:
 *      200:
 *        description: The Discount_code was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Discount_code'
 *      404:
 *        description: The Discount_code was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", updateDiscountCode);

/**
 * @swagger
 * /api/discount_code/{id}:
 *   delete:
 *     summary: Remove the discount_code by id
 *     tags: [Discount code]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discount_code id
 *
 *     responses:
 *       200:
 *         description: The discount_code was deleted successfully
 *       404:
 *         description: The discount_code was not found
 */

router.delete("/:id", deleteDiscountCode);

module.exports = router;
