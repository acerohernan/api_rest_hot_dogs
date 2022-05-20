const {object, string, number} = require("zod");

exports.createSessionSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).email("Please enter a valid email"),
        password: string({
            required_error: "Password is required"
        })
    })
});

exports.signUpSchema = object({
    body: object({
        username: string({
            required_error: "Username is required"
        }),
        email: string({
            required_error: "Email is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "The password must have 6 characters at least."),
        re_password: string({
            required_error: "Password confirmation is required"
        })
    }).refine((data) => data.password === data.re_password, {
        path: ["re_password"],
        message: "Passwords do not match"
    })
});

exports.closeSessionSchema = object({
    body: object({
        userId: number({
            required_error: "User id is required",
            invalid_type_error: "User id must be a number"
        })
    })
});