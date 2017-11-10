'use strict';

const Boom = require('boom');
const Joi = require('joi');
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const aguid = require('aguid');
const Nunjucks = require('nunjucks');
const FileManager = require('../utils/fm');
const fs = require('fs');

module.exports = {
    index,
    getFile,
    update,
    deleteFile
};

function index(request, reply) {
    const slug = request.payload.slug;
    const list = FileManager.list(slug);
    return reply(list);
}

function getFile(request, reply) {
    const fileName = request.url.query.fileName;
    if (fileName) {
        const file = fs.readFileSync(PUBLIC_PATH + fileName);
        return reply({
            status: true,
            file: file.toString()
        });
    }
    return reply({
        status: false
    });
}

function update(request, reply) {
    var { data, fileName } = request.payload;
    fs.writeFile(PUBLIC_PATH + fileName, JSON.stringify(data), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });


    var htmlFileName = fileName.replace(".json", ".html");
    let src = fs.readFileSync(`${TEMPLATES_PATH}email/html/api-sendmail/${htmlFileName}`);

    let env = Nunjucks.configure(TEMPLATES_PATH, {
        tags: {
            blockStart: '<%',
            blockEnd: '%>',
            variableStart: '<$',
            variableEnd: '$>',
            commentStart: '<#',
            commentEnd: '#>'
        }
    });

    let tpl = Nunjucks.compile(src.toString(), env);

    let content = tpl.render(data);

    fs.writeFile(PUBLIC_PATH + htmlFileName, content, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("HTMl file was saved!");
    });

    return reply({
        status: true,
        data: data
    })
}

function deleteFile(request, reply) {
    let fileName = request.url.query.fileName;
    try {
        fs.unlinkSync(PUBLIC_PATH + fileName);
        return reply({
            status: true,
            message: "Delete file successful!"
        });
    } catch (err) {
        return reply({
            status: false,
            message: "Delete file failed!"
        });
    }

}