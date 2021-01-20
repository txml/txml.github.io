---
title: the APIs of the fastest xml parser - txml
---

### **txml.parse** *(xmlString, options)*
1. **xmlString** is the XML to parse.
2. **options** is optional 
    - **searchId** an ID of some object. that can be queried. Using this is incredible fast. 
    - **filter** a method, to filter for interesting nodes, use it like Array.filter.
    - **simplify** to simplify the object, to an easier access.
    - **pos** where to start parsing.
    - **keepComments** if you want to keep comments in your data (keeped as string including `<!-- -->`) (default false)
    - **keepWhitespace** keep whitespaces like spaces, tabs and line breaks as string content (default false)
    - **noChildNodes** array of nodes, that have no children and don't need to be closed. Default is working good for html. For example when parsing rss, the link tag is used to really provide an URL that the user can open. In html however a link text is used to bind css or other resource into the document. In HTML it does not need to get closed. so by default the noChildNodes containes the tagName 'link'. Same as 'img', 'br', 'input', 'meta', 'link'. That means: when parsing rss, it makes to set `noChildNodes` to [], an empty array.
```js
txml.parse(`<user is='great'>
    <name>Tobias</name>
    <familyName>Nickel</familyName>
    <profession>Software Developer</profession>
    <location>Shanghai / China</location>
</user>`);
// will return an object like: 
[{
    "tagName": "user",
    "attributes": {
        "is": "great"
    },
    "children": [{
            "tagName": "name",
            "attributes": {},
            "children": [ "Tobias" ]
        }, {
            "tagName": "familyName",
            "attributes": {},
            "children": [ "Nickel" ]
        }, {
            "tagName": "profession",
            "attributes": {},
            "children": [ "Software Developer" ]
        }, {
            "tagName": "location",
            "attributes": {},
            "children": [ "Shanghai / China" ]
        }
    ]
}];  
```  

### **txml.simplify** *(tXml_DOM_Object)* 
Same purpose of simplify, to make the data easier accessible. It is modeled after PHP
s [simplexml](https://www.php.net/manual/en/function.simplexml-load-string). You can quickly access properties. However, some attributes might be lost. Also some string values can be lost. For details see [Issue 19](https://github.com/TobiasNickel/tXml/issues/19).
This method is used with the `simplify` parsing option.
1. **tXml_DOM_Object** the object to simplify.
```js
txml.simplify(txml.parse(`<user is='great'>
    <name>Tobias</name>
    <familyName>Nickel</familyName>
    <profession>Software Developer</profession>
    <location>Shanghai / China</location>
</user>`));
// will return an object like: 
{
    "user": {
        "name": "Tobias",
        "familyName": "Nickel",
        "profession": "Software Developer",
        "location": "Shanghai / China",
        "_attributes": {
            "is": "great"
        }
    }
}
```

### **txml.simplifyLostLess** *(tXml_DOM_Object)* 
This version is not the same as in PHP simple_xml. But therefor, you do not lose any information. If there are attributes, you get an _attribute property, even if there is only one of a kind, it will be an array with one item, for consistent code.

### **txml.filter** *(tXml_DOM_Object, f)* 
This method is used with the filter parameter, it is used like Array.filter. But it will traverse the entire deep tree.
1. **tXml_DOM_Object** the object to filter.
2. **f** a function that returns true if you want this elements in the result set.
```js
const dom = txml.parse(`
<html>
    <head>
        <style>
            p { color: "red" }
        </style>
    </head>
    <body>
        <p>hello</p>
    </body>
</html>`);
const styleElement = data.filter(dom, node=>node.tagName.toLowerCase() === 'style')[0];
```

### **txml.getElementById** (xml, id) 
To find an element by ID. If you are only interested for the information on, a specific node, this is easy and fast, because not the entire xml text need to get parsed, but only the small section you are interested in.
1. **xml** the xml string to search in.
2. **id** the id of the element to find
**returns** return one node

### **txml.getElementsByClassName** (xml, className) 
Find the elements with the given class, without parsing the entire xml into a tDOM. So it is very fast and convenient. returns a list of elements. 
1. **xml** the xml string to search in.
2. **className** the className of the element to find

### **txml.transformStream** (offset, parseOptions?)
1. offset optional you to set short before the first item.
    usually files begin with something like "<!DOCTYPE osm><osm>"
    so the offset need to be before the first item starts so that 
    between that item and the offset is no "<" character.
    alternatively, pass a string, containing this preamble.
2. options optional, similar to the parse methods options.
return transformStream.
```js
const xmlStream = fs.createReadStream('your.xml')
  .pipe(txml.transformStream());
for await(let element of xmlStream) {
  // your logic here ...
}
```
The transform stream is great, because when your logic within the processing loop is slow, the file read stream will also run slower, and not fill up the RAM memory. For a more detailed explanation read [here](https://tnickel.de/2019/10/15/2019-10-for-async-on-nodejs-streams/)
