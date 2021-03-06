import mongoose from 'mongoose';
import async from 'async';
import Boom from 'boom';
import { paginator } from 'super-pagination';
import PostMid from '../middleware/post.middleware.js';

const Post = mongoose.model('Post');
const Category = mongoose.model('Category');




const list = async(request, reply) => {
    let config = request.server.configManager;
    let itemsPerPage = config.get('web.paging.itemsPerPage');
    let page = request.query.page || 1;

    let options = { status: 1 };
    if (request.pre.category) {
        options.category = request.pre.category._id;
    }

    if (request.query.keyword && request.query.keyword.length > 0) {
        let re = new RegExp(request.query.keyword, 'i');
        options.title = re;
    }
    async.parallel({
        posts: (callback) => {
            Post
                .find(options)
                .sort('-created')
                .populate('category')
                .lean()
                .paginate(page, itemsPerPage, callback);
        }

    }, (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }
        let items = result.posts[0];
        let total = result.posts[1];

        let categories = result.categories;
        let totalPage = Math.ceil(total / itemsPerPage);
        let pagination = new paginator().set({
            per_page: itemsPerPage,
            current_page: page,
            total: total,
            number_of_pages: totalPage,
            show_empty: false,
            url: '/posts' + PostMid.getPrelink(request)
        });
        let meta = {
            title: 'News',
            description: 'News description'
        }
        let dataRes = { posts: items, meta: meta, paginator: pagination.render() };

        return reply.view('web/html/web-post/list', dataRes);
    });
}

const view = (request, reply) => {
    let post = request.pre.post;
    if (!post) {
        return reply(Boom.notFound('Post is not be found'));
    }
    let meta = {}
    meta.title = post.attrs.title || post.title
    meta.description = post.attrs.description || post.teaser

    return reply.view('web/html/web-post/view', { post: post, meta: meta });
}

export default {
    list,
    view
};