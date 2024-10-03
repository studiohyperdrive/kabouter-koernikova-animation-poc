// follow cwebp install instructions from https://www.npmjs.com/package/cwebp

const fs = require('fs');
const path = require('path');
const cwebp = require('cwebp').CWebp;

const baseDir = './public/assets/stories';

function convertImagesToWebP(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${dir}:`, err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Error getting stats for file ${filePath}:`, err);
                    return;
                }

                if (stats.isDirectory()) {
                    convertImagesToWebP(filePath);
                } else if (stats.isFile() && ['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase())) {
                    const outputFilePath = filePath.replace(/\.(png|jpe?g)$/, '.webp');
                    const encoder = new cwebp(filePath);
                    encoder.write(outputFilePath, (err) => {
                        if (err) {
                            console.error(`Error converting ${filePath} to WebP:`, err);
                        } else {
                            console.log(`Converted ${filePath} to ${outputFilePath}`);
                        }
                    });
                }
            });
        });
    });
}

function updateImageExtensions(rootDir) {
    fs.readdir(rootDir, (err, stories) => {
        if (err) throw err;

        stories.forEach(story => {
            const storyPath = path.join(rootDir, story);
            if (fs.statSync(storyPath).isDirectory()) {
                fs.readdir(storyPath, (err, subdirs) => {
                    if (err) throw err;

                    subdirs.forEach(subdir => {
                        const subdirPath = path.join(storyPath, subdir);
                        if (fs.statSync(subdirPath).isDirectory()) {
                            const dataFile = path.join(subdirPath, 'data.json');
                            if (fs.existsSync(dataFile)) {
                                const data = fs.readFileSync(dataFile, 'utf8');
                                let jsonData = JSON.parse(data);

                                if (jsonData.assets) {
                                    jsonData.assets.forEach(asset => {
                                        if (asset.p && !asset.p.startsWith('aud_')) {
                                            const ext = path.extname(asset.p).toLowerCase();
                                            if (ext !== '.webp') {
                                                asset.p = asset.p.replace(ext, '.webp');
                                            }
                                        }
                                    });

                                    fs.writeFileSync(dataFile, JSON.stringify(jsonData), 'utf8');
                                }
                            }
                        }
                    });
                });
            }
        });
    });
}

convertImagesToWebP(baseDir);
updateImageExtensions(baseDir);
