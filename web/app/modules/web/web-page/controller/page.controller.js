const mongoose = require('mongoose');
const Page = mongoose.model('Page');

const about = (request, reply) => {
    let promise = Page.findOne({ 'slug': 'about' });
    promise
        .then((page) => {
            let meta = {
                title: page.title,
                description: ''
            }
            return reply.view('web/html/web-page/about', { page: page, meta: meta });
        })
        .catch((err) => {
            request.log(['error'], err);
            return reply.continue();
        });
}

const faq = (request, reply) => {
    let promise = Page.findOne({ 'slug': 'faq' });
    promise
        .then((page) => {
            let meta = {
                title: page.title,
                description: ''
            }
            return reply.view('web/html/web-page/default', { page: page, meta: meta });
        })
        .catch((err) => {
            request.log(['error'], err);
            return reply.continue();
        });
}

const term = (request, reply) => {
    let promise = Page.findOne({ 'slug': 'terms' });
    promise
        .then((page) => {
            let meta = {
                title: page.title,
                description: ''
            }
            return reply.view('web/html/web-page/default', { page: page, meta: meta });
        })
        .catch((err) => {
            request.log(['error'], err);
            return reply.continue();
        });
}

const help = (request, reply) => {
    let promise = Page.findOne({ 'slug': 'help' });
    promise
        .then((page) => {
            let meta = {
                title: page.title,
                description: ''
            }
            return reply.view('web/html/web-page/default', { page: page, meta: meta });
        })
        .catch((err) => {
            request.log(['error'], err);
            return reply.continue();
        });
}

const support = (request, reply) => {
    let promise = Page.findOne({ 'slug': 'support' });
    promise
        .then((page) => {
            let meta = {
                title: page.title,
                description: ''
            }
            return reply.view('web/html/web-page/default', { page: page, meta: meta });
        })
        .catch((err) => {
            request.log(['error'], err);
            return reply.continue();
        });
}

const error404 = (request, reply) => {
    let promise = Page.findOne({ 'slug': 'error404' });
    promise
        .then((page) => {
            let meta = {
                title: page.title,
                description: ''
            }
            return reply.view('web/html/web-page/404', { page: page, meta: meta }).code(404);
        })
        .catch((err) => {
            request.log(['error'], err);
            return reply.continue();
        });
}

const html = (request, reply) => {
    const slug = request.params.slug || request.payload.slug;
    return reply.view('web/html/web-html/' + slug);
}

export default {
    about,
    faq,
    term,
    help,
    support,
    error404,
    html
}