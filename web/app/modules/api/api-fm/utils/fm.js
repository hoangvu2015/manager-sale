const fs = require('fs');
const path = require('path');

function getStats(p) {
    var stats = fs.statSync(p);
    return {
        folder: stats.isDirectory(),
        size: stats.size,
        mtime: stats.mtime.getTime()
    }
};

function getDir(slug) {
    var rootDir = PUBLIC_PATH;
    if (slug !== "!/fm") {
        rootDir = PUBLIC_PATH + slug.replace("!/fm", "");
    }
    try {
        const files = fs.readdirSync(rootDir);
        var stats = [];
        for (var i = 0; i < files.length; ++i) {
            var fPath = path.join(rootDir, files[i]);
            var stat = getStats(fPath);
            stat.name = files[i];
            stats.push(stat);
        }
        return stats;
    } catch (err) {
        console.log(err, "err");
        return {};
    };
}

exports.list = (slug) => {
    return getDir(slug);
};