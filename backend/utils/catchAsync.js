module.exports = (fxn) => (req, res, next) => {
    Promise.resolve(fxn(req, res, next)).catch(next);
};