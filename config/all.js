module.exports = exports = {
    port: "4003",
    theme: "basic",
    languages: [
        {
            "code": "en-us",
            "relative_url_prefix": "/"
        }
    ],
    plugins: {
        // "blog":{},
        "cloudfront" : {},
        "helpers" :{},
        "news" : {},
        "press":{},
        "rssfeed" : {},
        "redirects" : {},
        "sitemap" : {}  
    },
    contentstack: {
        api_key: "bltdf5cac72109ca18e",
        access_token: "blt63f6423c65ea63df",
        environment:"development"
    }
};