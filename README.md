Changes to use LPi URLs are in this branch: https://github.com/liturgicalpublications/pdfjs-dist-viewer-min/tree/edit-url-whitelist

OD obtains the package from the branch above, not the main branch.

NOTE: If any changes need to be made to this to be pulled into LPi's projects, the commit hash in `yarn.lock` in LPi's projects must be updated by running `yarn upgrade pdfjs`. Otherwise changes will not be pulled in, and an old commit will be used.

# PDF.js Minified Distribution With Viewer

PDF.js is a Portable Document Format (PDF) library that is built with HTML5.
Its goal is to create a general-purpose, web standards-based platform for
parsing and rendering PDFs.

This is a pre-built version of the PDF.js source code.  I was unable to find
a distribution of PDF.js that was both minified and included the viewer.html
component.  This is essentially just the files produced by running:
`gulp minified` against the upstream repo.

See https://github.com/mozilla/pdf.js for learning and contributing.
