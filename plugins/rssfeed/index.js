/*!
 * rssfeed
 */

 "use strict";

/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express');
var Stack = contentstack.Stack();
var RSS = require('rss');
var striptags = require('striptags');

module.exports = function Rssfeed() {


   var options = Rssfeed.options;


   Rssfeed.templateExtends = function(engine) {
   };


   Rssfeed.serverExtends = function(app) {


          app.extends().get('/blog/feed', function(req, res) {                       
                        var replaceMatch = function(data, find, val) {
                            var re = new RegExp(find, 'g');
                            if (typeof data == "object") {
                                data = JSON.parse(JSON.stringify(data).replace(re, val));
                            } else if (typeof data == "string") {
                                data = data.replace(re, val);
                            }
                            return data;
                        };
                        /* lets create an rss feed */

                        try {
                            var feed = new RSS({
                                title: 'Contentstack Blog',
                                description: 'Contentstack: A business-friendly headless CMS',
                                site_url: 'https://www.contentstack.com',
                                language: req.contentstack.get("lang").code,
                                pubDate: new Date()
                            });

                            Stack.ContentType('blog_post').Query().toJSON().find().spread(function success(data) {
                                    if (data[0]) {
                                        // --------------- filter content of locales --------------------
                                        data = data.filter(function(val) {
                                            return val.locale == req.contentstack.get("lang").code;
                                        });
                                        // --------------- filter content of locales --------------------

                                        data = data.sort(function(a, b) {
                                            if (a && b)
                                                return new Date(b.date) - new Date(a.date)
                                        })
                                        //data = data.slice(0,0);
                                        for (var d in data) {
                                            var authors = [];
                                            for (var a in data[d].author) {
                                                if (data[d].author[a] != undefined)
                                                    authors.push(data[d].author[a].title);
                                            }

                                            var blog_author = authors.join(",");

                                            var desc = replaceMatch(data[d].body, '/assets/', "https://www.contentstack.com/assets/");
                                           var descr = striptags(desc);
                                            // var descr = striptags(desc, ['a', 'address', 'b', 'blockquote', 'br', 'code', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'img', 'i', 'li', 'ol', 'p', 'pre', 'small', 'span', 'strike', 'strong', 'table', 'tr', 'td', 'th', 'tbody', 'tfoot', 'thead', 'title', 'u', 'ul']);
                                            feed.item({
                                                title: data[d].title,
                                                description: descr,
                                                url: 'https://www.contentstack.com' + req.contentstack.get("lang").relative_url_prefix + data[d].url.slice(1),
                                                author: blog_author,
                                                date: data[d].date
                                            });
                                        }
                                        var xml = feed.xml();
                                        // var xmlf = xml.replace(/<!\[CDATA\[/g,"").replace(/\]\]>/g,"").replace(/\n/g,"");
                                        res.set('Content-Type', 'text/xml');
                                        res.send(xml);
                                    } else {
                                        res.send("There is some error");
                                    }
                                },
                                function fail(err) {
                                    res.send(err);
                                })
                        } catch (e) {
                            res.send(e);
                        }

                    });

              




   };
  

   Rssfeed.beforePublish = function (data, next) {
       next();
   };

   Rssfeed.beforeUnpublish = function (data, next) {
       next();
   };
};