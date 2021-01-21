---
title: txml.parse
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
