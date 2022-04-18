const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require("../services/user");
const config = require("config");


// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('jwtPrivateKey'),
};

const initialize =  () => {
    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(options, async function(jwtPayload, done) {
        try{
            const exists = await User.checkExists(jwtPayload);
            if (exists && exists.userFound && exists.user) {
                return done(null, exists.user);
            } else {
                return done(null, false);
            }
        }catch(err){
                return done(err, false);
        }
        
    }));
}

module.exports = initialize;