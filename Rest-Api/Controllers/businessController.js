const businessController = require('express').Router();

const { catchAsyncError } = require('../Util/errorParser');

businessController.get('/register', catchAsyncError(async (req, res) => {

}))

module.exports = businessController;