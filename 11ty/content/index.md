---
title: txml the small fast pure javascript xml parser that run everywhere
layout: main.ejs
---
tXml is a parser that is implemented with nothing but javascript. It can work just absolutely everywhere where javascript can. In bowser, node, PWA, worker, service worker, mini programs and more.

## So what does the parser do exactly? 

<code class="row">
  <div class="col-md-6 col-sm-12">
  It turns a string
<pre><code class="language-js">`&lt;xml is=&quot;awesome&quot;&gt;tXml&lt;/xml&gt;`
</code></pre>
  </div>
  <div class="col-sm-12 col-md-6">
  into objects
<pre><code class="language-js">{
    tagName: 'xml',
    attributes: {
        is: 'awesome'
    },
    children: ['tXml']
}
</code></pre>
  </div>
</code>

tXml is really fast. in benchmarks it has shown to be more then 3 times as fast as `fast-xml-parser` and 5 to 10 times faster than the legacy of `xml2js`.

There are more good reasons, check this list:

 - tXml is about 255 lines, can be easily extended.
 - tXml is 1.6kb minified + gzipped.
 - tXml is 5 - 10 times faster than sax/xml2js and still 2-3 times faster than fast-xml-parser
 - tXml can running in a worker.
 - tXml is parsing at average the same speed as native DOMParser + potential to be faster.
 - tXml is easy to read and good for study.
 - tXml creates a domObject with minimal footprint, that is easy to traverse.
 - tXml has proven in different projects, like RSS reader, openStreetMap, websites.
 - tXml can even parse handwritten XML that contains various errors.
 - tXml is working in client and server.
 - tXml is 100% covered by unit tests.
 - tXml is extreme small, perfect for browser, node, cloud function, edge.

checkout the [API](/API), or jump right into the action and see some [examples](/examples).
