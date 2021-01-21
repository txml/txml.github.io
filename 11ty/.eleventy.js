module.exports = function (eleventyConfig) {
    // You can return your Config object (optional).
    eleventyConfig.addPassthroughCopy("content/assets");
    eleventyConfig.addPassthroughCopy("content/favicon.ico");

    return {
        htmlTemplateEngine: "ejs",
        dir: {
            
            input: "content",
            output: ".."
        }
    };
};