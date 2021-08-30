if (process.env.NODE_ENV === 'production') {
    // use minified verion for production
    module.exports = require('pdfjs-dist/build/pdf.worker.min')
} else {
    module.exports = require('pdfjs-dist/build/pdf.worker')
}
