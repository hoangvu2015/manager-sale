import fs from "fs";

const home = (request, reply) => {
    let data = require(SAMPLE_DATA_PATH + 'home.json');

    reply.view('web/html/web-home/index', {
        data,
        title: 'BZ CMS | Hapi ' + request.server.version,
        message: 'Welcome to BZ CMS'
    });
}

export {
    home
}