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
        // Utilisez await pour attendre la réponse de la requête
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [jwt_payload.sub]);

        // Vérifiez si la requête a renvoyé des résultats
        if (result.rows.length > 0) {
            // Retournez l'utilisateur trouvé
            return done(null, result.rows[0]);
        } else {
            // Aucun utilisateur trouvé
            return done(null, false);
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error('Error in JWT strategy:', error);
        return done(error, false);
    }
}));