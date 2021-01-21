---
title: txml transform stream
---

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