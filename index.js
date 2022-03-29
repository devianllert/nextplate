'use strict';

/**
 * This scripts recursively renames every file and directory in the script path
 * from camelCase and UpperCamelCase to dash-case
 *
 * Do a backup before executing this script
 *
 * @lecense MIT
 * @author Szymon Wygnański <s@finalclass.net>
 */

var fs = require('fs'),
    path = require('path');

function camelToDash(text) {
    return text.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function renameDir(dir) {
    var files = fs.readdirSync(dir),
        f,
        fileName,
        path,
        newPath,
        file;

    for (f = 0; f < files.length; f += 1) {
        fileName = files[f];
        path = dir + '/' + fileName;
        file = fs.statSync(path);
        newPath = dir + '/' + camelToDash(fileName);
        fs.renameSync(path, newPath);
        if (file.isDirectory()) {
            renameDir(newPath);
        }
    }
}

renameDir(path.join(__dirname, '/src'));
