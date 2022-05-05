const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { isLoggedIn, isAuthor, validateReview, isReviewAuthor } = require('../middleware');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


router.post('/', validateReview, isLoggedIn, catchAsync(reviews.createReview));

router.delete('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;