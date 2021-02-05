const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { CryptoJS } = require("crypto-js");

const { handleValidationErrors } = require("../../utils/validation");
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { User, Entry, Category, Prompt } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

// finds all entries
router.get(
  "/:id/entries",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const entries = await Entry.findAll({
      where: { userId: user.id },
      include: [Category],
    });
    res.json(entries);
  })
);

// post an encryted entry
router.post(
  "/:id/entries",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { title, text, encryption_key } = req.body;
    const entry = await Entry.Create({ title, text, encryption_key });

    const encrytedEntry = (text) => {
      const passphrase = "persephone";
      console.log(encrytedEntry, entry);
      return CryptoJS.AES.encrypt(text, passphrase).toString();
    };
    res.json({ entry });
  })
);
// router.post(
//   "/entries",
//   restoreUser,
//   asyncHandler(async (req, res) => {
//     const { title, text, encryption_key } = req.body;
//     const entry = await Entry.Create({ title, text, encryption_key });

//     const encrytedEntry = (text) => {
//       const passphrase = "persephone";
//       console.log(encrytedEntry, entry);
//       return CryptoJS.AES.encrypt(text, passphrase).toString();
//     };
//     res.json({ entry });
//   })
// );

module.exports = router;
