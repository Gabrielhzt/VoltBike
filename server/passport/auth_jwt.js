const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pool = require('../database');
const passport = require('passport');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretkey';

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(jwt_payload)
    
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [jwt_payload.sub]);

        if (result.rows.length > 0) {
            return done(null, result.rows[0]);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.error('Error in JWT strategy:', error);
        return done(error, false);
    }
}));