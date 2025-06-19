const rateLimit = require('express-rate-limit')

const dailyLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
     max: 2, // limit each IP to 2 requests per 24 hours
  message: {
    status: 429,
    error: "❌ You’ve reached your daily limit. Please try again tomorrow.",
  },
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // disable the `X-RateLimit-*` headers
})

module.exports = dailyLimiter