//import User from '../api/api-user/model/user.model';
const Glob = require('glob');
const Path = require('path');
let models = Glob.sync(BASE_PATH + "/app/modules/*/*/model/*.js", {});
models.forEach((item) => {
    require(Path.resolve(item));
});
const mongoose = require('mongoose');


const User = mongoose.model('User');
const Post = mongoose.model('Post');

const resolvers = () => ({
    Query: {
        getUserById(root, {id}) {
            return User.findById(id).then((response) => response);
        },

        getUserByEmail(root, {email}) {
            return User.findOne({email}).then((response) => response);
        },
        getPostBySlug(root, {slug}) {
            return Post.findOne({slug}).then((response) => response);
        }
    },
    Mutation: {
        createUser(root, args) {
            const user = new User(args);
            return user.save().then((response) => response);
        },
    },
});

module.exports = resolvers;