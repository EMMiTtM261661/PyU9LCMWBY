// 代码生成时间: 2025-10-10 03:41:32
// Dependencies
const fs = require('fs');
const path = require('path');
const THREE = require('three');

/**
 * Function to check if a file exists
 * @param {string} filePath - The path to the file
 * @returns {Promise<boolean>} - Whether the file exists or not
 */
function fileExists(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

/**
 * Function to read a file
 * @param {string} filePath - The path to the file
 * @returns {Promise<string>} - The contents of the file
 */
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

/**
 * Function to write a file
 * @param {string} filePath - The path to the file
 * @param {string} data - The data to write to the file
 * @returns {Promise<void>} - Resolves when the file is written
 */
function writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Function to backup a file
 * @param {string} sourcePath - The path to the source file
 * @param {string} backupPath - The path to the backup file
 * @returns {Promise<void>} - Resolves when the backup is complete
 */
function backupFile(sourcePath, backupPath) {
    return readFile(sourcePath)
        .then(data => writeFile(backupPath, data))
        .catch(err => {
            console.error('Error backing up file:', err);
            throw err;
        });
}

/**
 * Function to sync two directories
 * @param {string} sourceDir - The path to the source directory
 * @param {string} targetDir - The path to the target directory
 * @returns {Promise<void>} - Resolves when the sync is complete
 */
function syncDirectories(sourceDir, targetDir) {
    return new Promise((resolve, reject) => {
        fs.readdir(sourceDir, { withFileTypes: true }, (err, files) => {
            if (err) {
                reject(err);
            } else {
                Promise.all(files.map(file => {
                    const sourceFilePath = path.join(sourceDir, file.name);
                    const targetFilePath = path.join(targetDir, file.name);

                    return fileExists(targetFilePath)
                        .then(exists => {
                            if (exists) {
                                return backupFile(targetFilePath, targetFilePath + '.bak');
                            }
                            return Promise.resolve();
                        })
                        .then(() => backupFile(sourceFilePath, targetFilePath));
                })).then(resolve).catch(reject);
            }
        });
    });
}

// Example usage
const sourceDirectory = './source';
const targetDirectory = './target';

syncDirectories(sourceDirectory, targetDirectory)
    .then(() => console.log('Sync complete'))
    .catch(err => console.error('Sync failed:', err));
