# Note:

- Files can be manually addded in this directory.
- Files can be deleted manually from this directory.

## To override files previously generated
1. Delete the files from `public/img` manually first

## This directory has uncompressed files

Node and this App expect to find images in the `public/img` directory. In order to have compressed images there, you must

1. Place them here in `img`
1. Open the console and run
1. `node src/services/compressImages.js`
1. Check the output and ensure the compressed files are now on `public/img`