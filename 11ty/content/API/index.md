---
title: API
---

## [txml.parse](/API/parse)
The heart of this library is the `parse` method. It will transform a string into javascript objects.

## [txml.simplify](/API/simplify), [txml.simplifyLostLess](/API/simplifyLostLess)
Two simplify methods make working with xml data more convenient. While the normal `simplify` is behaving exactly as PHPs simple XML module, the `lost less` implementation keeps all values within an array. As you use the data, you can decide to `map` or use the first element. 

## [txml.filter](/API/filter)
Filter is traversing the parsed DOM structure returning a flat array of found items. This is useful as an alternative to css selectors, not as convenient but still very powerful and fast.


## [txml.getElementById](/API/getElementById), [txml.getElementsByClassName](/API/getElementsByClassName)
With `getElementById` and `getElementsByClassName` you get the queried elements. However they work directly on the string. That allow them to parse only the elements of interest, not the entire xml or html document. The speed you can gain with these methods can go beyond 100 times faster.

## [txml.transformStream](/API/transformStream)
`transformStream` is the second implementation of parsing an xml stream in node.js the old implementation triggered `xml` events. With the use of `transformStream` you can parse a large xml stream even using the modern `for await` syntax.
