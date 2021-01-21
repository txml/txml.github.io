---
title: working with office documents
---

## Reading a word document, a .docx file
Word saves files as `.docx` files. Microsoft also installs with `wordpad` a free document editing software that can read and write `.docx` files with windows 10. Did you know that `.docx` files are also valid zip files? Just change the file ending and you can see what is inside. In our example however we don't need to change the file ending, we can simply parse the document with the `jszip` library.


```js
var fs = require("fs");
var JSZip = require("jszip");
const txml = require('txml')

// reading the document file with node.js
fs.readFile("wordpad.docx", async function(err, data) {
    if (err) throw err;
    // parsing the zip file with jszip
    const zip = await JSZip.loadAsync(data);
    
    // checking the content of the zip
    console.log(Object.keys(zip.files))
    
    // in docx files, the content is in word/document.xml
    const textContent = await zip.file("word/document.xml").async("string");
    
    // parse the document content
    const content = txml.parse(textContent, { keepWhitespace: true });

    console.log(JSON.stringify(content,undefined,'  '));
    const newContent = txml.stringify(content)

    // when we are finished we store 
    // 1. The content into zip
    // 2. create a buffer from the zip
    // 3. write the zip buffer into a file
    zip.file("word/document.xml", newContent, {string: true});
    const updatedZip = await zip.generateAsync({type: "nodebuffer"});
    fs.writeFileSync('wordpad2fromNode.docx',updatedZip);
});
```
It is easy to add or remove certain elements from the document and with that edit the content. Maybe you are not interested to read 
LibreOffice and OpenOffice store the documents as `.odt` files. They are also zip files.

```js
var fs = require("fs");
var JSZip = require("jszip");
const txml = require('txml')

// reading the file with node.js
fs.readFile("docUpdated4.odt", async function(err, data) {
    if (err) throw err;
    // parsing the document with jszip
    const zip = await JSZip.loadAsync(data);
    
    // inside the docx zip file, there is a content.xml, 
    // that contains the actual content in xml format
    const textContent = await zip.file("content.xml").async("string");
    const document = txml.parse(textContent, { keepWhitespace: true });
    console.log(textContent)
    
    // show the filenames inside the zip archive
    console.log(Object.keys(zip.files));

    // we read the officeText because it contains the content
    const officeText = txml.filter(document,(node) => node.tagName == 'office:text')[0];
    
    // append a new paragraph
    officeText.children.push(
    {
        "tagName": "text:p",
        "attributes": {
        "text:style-name": "P1"
        },
        "children": [
        "aaa"
        ]
    });

    // save the file
    zip.file("content.xml",  txml.stringify(document).split('>, {string: true});
    const updatedZip = await zip.generateAsync({type: "nodebuffer"});
    fs.writeFileSync('docUpdated5.odt',updatedZip);
});
```

## Summary
These examples illustrate how office documents can be read, manipulated and saved using node.js, txml and jszip.