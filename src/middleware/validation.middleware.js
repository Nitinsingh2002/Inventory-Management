// function validateRequest(req, res, next) {
//     // Validate form data
//     const { name, price, desc, imageUrl } = req.body;
//     let errors = [];

//     if (!name || name.trim() === "") {
//         errors.push("Name is required");
//     }

//     if (!price || parseFloat(price) < 1) {
//         errors.push("Price should be a valid number greater than 1");
//     }

//     if (!desc || desc.trim() === "") {
//         errors.push("Description is required");
//     }

//     // Validate image URL
//     try {
//         const validUrl = new URL(imageUrl);
//     } catch (err) {
//         errors.push("Enter a valid URL for the image");
//     }

//     if (errors.length > 0) {
//         return res.render('form', { errorMessage: errors[0] });
//     }
//     else {
//         next();
//     }
// }


// export default validateRequest;




//using express validator  read documentation of express validator if any issue comes













import { body, validationResult } from "express-validator";

async function validateRequest(req, res, next) {

    // setup rules for validation
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('price').isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
        body('imageUrl').custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Image is required")
            }
            return true;
        }),
        body('desc').notEmpty().withMessage("Description can't be empty")
    ];

    // asynchronously run the rules
    await Promise.all(rules.map((rule) => rule.run(req)))


    // check for validation errors
    let validationErrors = validationResult(req)


    if (!validationErrors.isEmpty()) {
        // Render form with the first error message if validation fails
        return res.render('form', { errorMessage: validationErrors.array()[0].msg });
    } else {
        // If no validation errors, proceed to the next middleware
        next();
    }
}

export default validateRequest;











