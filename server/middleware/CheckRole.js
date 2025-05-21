const Role = (roles = []) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role || !Array.isArray(roles)) {
            return res.status(403).send("Invalid request");
        }
        let role = req.user.role;
        if (roles.includes(role)) {
            return next();
        }

        return res.status(403).send("You are not authorized to perform this action");
    };
};

module.exports = Role;
