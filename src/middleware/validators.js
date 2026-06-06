const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    req.body = result.data;

    next();
  };
};

module.exports = validate;
