exports.validateSchema = (schema) => (req, res, next) => {
    try{
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        next();
    }catch(e){
        return res.status(400).json({
            message: e.errors[0].message || "Schema validation failed",
            success: false,
        })
    };
};