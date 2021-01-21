---
title: txml simplify
---
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