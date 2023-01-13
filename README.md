User Authentication with NodeJS & PassportJs

A simple app to authenticate users using passport, google-auth

Dependencies & Middlewares

dotenv
ejs
express
express-session
helmet": "^6.0.1
mongoose": "^6.7.5
mongoose-encryption,
mongoose-findorcreate
passport
passport-google-oauth20
passport-local": 
passport-local-mongoose




Before using passport-google-oauth20, you must register an application with Google. If you have not already done so, a new project can be created in the Google Developers Console. Your application will be issued a client ID and client secret, which need to be configure with passport. You will also need to configure a redirect URI which matches the route in your application.
