const express = require("express");

const router = express.Router();

router.post(
  "/generate-description",

  async (req, res) => {

    try {

      const {
        title,
        category,
      } = req.body;

      const result = `

📝 Product Description:
The ${title} is a premium product in the ${category} category designed with modern technology, excellent durability, and user-friendly performance.

🏷 SEO Tags:
${title}, ${category}, premium ${category}, best ${title}, online shopping

📢 Marketing Caption:
Upgrade your experience with the new ${title} — smarter, faster, and designed for modern customers.

`;

      res.json({
        result,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "AI generation failed",
      });

    }

  }
);

module.exports = router;