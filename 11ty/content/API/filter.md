---
title: txml filter
---
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