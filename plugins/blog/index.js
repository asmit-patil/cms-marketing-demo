/*!
 * blog
 */

 "use strict";

/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express');
var request = require('request');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();
var Stack = contentstack.Stack();
var striptags = require('striptags')

module.exports = function Blog() {

   var options = Blog.options;


   Blog.templateExtends = function(engine) {
   };

  
   Blog.serverExtends = function(app) {

       app.extends().get('/blog', function(req, res, next) {
            var Query = Stack.ContentType('blog_post').Query().descending('date').limit(10)
            Query.toJSON().find()
                .spread(function success(result, schema, count) {
                    result.forEach(function(el) {
                        el.body = striptags(el.body)
                    })
                    req.getViewContext().set('allpost', result)
                    next()
                }, function error(err) {
                    console.log("Error", err);
                });
        })

         app.get('/blog/category/latest', function(req, res) {
            res.redirect('/blog/')
        })
        
           app.get('/blog/loadmore/:skip', function(req, res) {
            if (!isNaN(req.params.skip)) {
                var skip = Number(req.params.skip)
            }
            var getposts = Stack.ContentType('blog_post').Query().skip(skip).limit(10).descending('date')
            getposts.toJSON().find().spread(function success(result, schema, count) {
                result.forEach(function(el) {
                    el.body = striptags(el.body)
                })
                res.render('pages/blog_post/blog_loadmore.html', {
                    allpost: result
                })
            }, function error(err) {
                console.log(err);
                res.send(err)
            })
        })

       /* START categories Filter */
        app.get('/blog/category/:catid', function(req, res) {             
                var catname = req.params.catid.replace(/-/gi, ' ')
                var reg = new RegExp(catname, 'gi')
                var a = catname.split(' ')
                catname = a.map(function(e) {
                    return e.charAt(0).toUpperCase() + e.slice(1)
                })
                var catname = catname.toString().replace(/,/gi, ' ')
                var categoryq = Stack.ContentType('blog_post').Query().where('category.title', reg).limit(10).descending('date')

                categoryq.toJSON().find()
                    .spread(function(result, schema, count) {
                        var categorytitle = ""
                        result[0].category.forEach(function(el) {
                            if (el.title.match(new RegExp(catname, 'gi'))) {
                                categorytitle = el.title + " - Blog"
                            }
                        })
                        result.forEach(function(el) {
                                    el.body = striptags(el.body)
                                })
                        
                                res.render('pages/category_posts/index.html', {
                                    entry: {
                                        title: categorytitle,
                                        catcount: result.length,
                                        catposts: result,
                                        category: catname,
                                        seo: { title: categorytitle }
                                    },
                                    // canonical: full_url
                                })
                            })
                    }, function error(err) {
                        console.log("Error", err);
                        res.redirect('/blog')
                    });

            ///End categories Filter

                /// Categories Loadmore 
        app.get('/blog/loadmore/:skip/:catname', function(req, res) {
            if (!isNaN(req.params.skip)) {
                var skip = Number(req.params.skip)
            }
            if (req.params.catname) {
                var catname = req.params.catname.replace('-', ' ')

            }
            var reg = new RegExp(catname, 'gi')
            var getposts = Stack.ContentType('blog_post').Query().regex('category.title', reg).skip(skip).limit(10).descending('date')
            getposts.toJSON().find().spread(function success(data, schema, count) {
                data.forEach(function(el) {
                    el.body = striptags(el.body)
                })
                res.render('pages/blog_post/blog_loadmore.html', {
                    allpost: data
                })
            }, function error(err) {
                console.log(err);
                res.send(err)
            })
        })

        /* END categories Loadmore */

              /* START Author Filter */

        app.get('/blog/author/:authorid', function(req, res) {                 
            //var authorname = req.params.authorid.replace('-',' ')
            var authorname = req.params.authorid.replace(/-/g, ' ')           
            var reg = new RegExp(authorname, 'gi')
            var a = authorname.split(' ')              
            authorname = a.map(function(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            })
            var authorname = authorname.toString().replace(/,/g, ' ')
            var authornameseo = authorname.toString().replace(/,/g, ' ') + " - Blog"
            // var authorq = Stack.ContentType('blog_post').Query().regex('author.title', reg).descending('date')
            // var authordetails = Stack.ContentType('authors').Query().where('author.title') 
            var Query = Stack.ContentType('blog_post').Query().regex('author.title', reg).descending('date') 
            Query.toJSON().find()
                .spread(function(result, schema, count) { 
                            result.forEach(function(el) {
                                el.body = striptags(el.body)
                            })
                            res.render('pages/author_posts/index.html', {
                                entry: {
                                    title: authornameseo,
                                    acount: result.length,
                                    posts: result,
                                    author: authorname,
                                    authordetails : result[0].author,
                                    seo: { 
                                        title: result[0].author[0].seo && result[0].author[0].seo.title ? result[0].author[0].seo.title :"",
                                        description : result[0].author[0].seo && result[0].author[0].seo.description ? result[0].author[0].seo.description  : ""
                                        // keywords : result[0].author[0].seo.keywords 
                                    }
                                    // url : "/blog/author/" + authorname
                                },
                                // canonical: full_url
                            })
                     
                }, function error(err) {
                    console.log("Error", err);
                     res.redirect('/blog')
                });


        })

        /* END Author Filter */

         /// author Loadmore 
        app.get('/blog/authorloadmore/:skip/:aname', function(req, res) {
            if (!isNaN(req.params.skip)) {
                var skip = Number(req.params.skip)
            }
            if (req.params.aname) {
                var aname = req.params.aname.replace('-', ' ')

            }
            var reg = new RegExp(aname, 'gi')
            var getposts = Stack.ContentType('blog_post').Query().regex('author.title', reg).skip(skip).limit(10).descending('date')
            getposts.toJSON().find().spread(function success(data, schema, count) {
                data.forEach(function(el) {
                    el.body = striptags(el.body)
                })

                res.render('pages/author_posts/authorloadmore', {
                    allpost: data
                })
            }, function error(err) {
                console.log(err);
                res.send(err)
            })
        })

        /* END author Loadmore */
         /* START Search Filter */
        app.get('/blog/search', function(req, res, next) {
            if (!req.query.q) {
                return next()
            }
            var params = entities.decode(req.query.q).replace(/\*/g, '\\*').replace(/\+/g, '\\+').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\?/g, '\\?')
            // params = replace(params)
            var reg = new RegExp(params, 'gi')
            // reg = decodeURI(reg)
            var search = Stack.ContentType('blog_post').Query().descending('date')
            var query1 = Stack.ContentType('blog_post').Query().regex('body', reg)
            var query2 = Stack.ContentType('blog_post').Query().regex('title', reg)
            var query3 = Stack.ContentType('blog_post').Query().where('author.title', reg)
            var query4 = Stack.ContentType('blog_post').Query().where('category.title', reg)
            search.or(query1, query2, query3, query4).toJSON() 
                .find()
                .spread(function success(result, schema, count) {
                            result.forEach(function(el) {
                                el.body = striptags(el.body)
                            })
                            res.render('pages/search/blog_search.html', {
                                entry: {
                                    posts: result,
                                    count: result.length,
                                    query: req.query.q,
                                    title: "Search Results : " + req.query.q
                                }
                            })
                      
                }, function error(err) {
                    console.log("Error in regex", err);
                });
        })


       app.get('/blog/searchloadmore/:skip/:srchname', function(req, res) {
            if (!isNaN(req.params.skip)) {
                var skip = Number(req.params.skip)
            }
            var params = decodeURIComponent(req.params.srchname)
            var reg = new RegExp(params, 'gi')
            var search = Stack.ContentType('blog_post').Query().skip(skip).limit(10).descending('date')
            var query1 = Stack.ContentType('blog_post').Query().regex('title', reg)
            var query2 = Stack.ContentType('blog_post').Query().regex('body', reg)
            var query3 = Stack.ContentType('blog_post').Query().where('author.title', reg)
            var query4 = Stack.ContentType('blog_post').Query().where('category.title', reg)
            search.or(query1, query2, query3, query4).toJSON().find().spread(function success(data, schema, count) {
                data.forEach(function(el) {
                    el.body = striptags(el.body)
                })
                res.render('pages/search/blog_search_loadmore.html', {
                    posts: data
                })
            }, function error(err) {
                console.log(err);
                res.send(err)
            })
        })
   var latestq = Stack.ContentType('blog_post').Query().limit(1).descending('date')
             /* Start of  popular post  section*/
        app.extends().get('*', function(req, res, next) {
            var popularpost = Stack.ContentType('blog_post').Query().descending('date')
            latestq.toJSON().find()
                .spread(function(result) {
                    req.getViewContext().set('latestpost', result[0])
                    var categoryinpage = req._contentstack && req._contentstack.entry && req._contentstack.entry.category && req._contentstack.entry.category.map(function(cat) {
                        return cat.title
                    })
                    popularpost.where('blog_related_posts', true).containedIn('category.title', categoryinpage || []).toJSON().find().spread(function(posts, schema, count) {
                        var p = posts
                        posts = []
                        p.forEach(function(p) {
                            (req._contentstack.entry.title != p.title) ? posts.push(p): null
                        })
                        p.forEach(function(p) {
                            p.body = striptags(p.body)
                        })
                        req.getViewContext().set('postincat', posts)
                        next()
                    })
                }, function error(err) {
                    console.log("Error", err);
                    res.redirect('/blog/')
                })

        })


        app.locals.replacespace = function(str) {
                if (str) {
                    return str.replace(/ /gi, '-').toLowerCase()
                }
            }


        //    app.locals.categoryfilter = function(arr, tag) {
        //     var val = false;
        //     // return false if array is not defined or empty
        //     if (!arr) {
        //         val = false
        //     }

        //     // check if categories is contained in post and return appropriate value
        //     if (arr instanceof Array) {
        //         arr.forEach(function(el) {
        //             if (el.title == tag) {
        //                 val = true
        //             }
        //         })
        //     } else {
        //         val = false
        //     }
        //     return val;
        // }    


   };
  
  
   Blog.beforePublish = function (data, next) {
       next();
   };
  
   /*
    * @beforeUnpublish
    * @Description: This function is triggered when the unpublish or delete event occurs.
    * @Parameters: data - contains un-published entry, it's content_type and language.
    * @Parameters: next - call this function to pass control to the next subsequent "beforeUnpublish" hook.
    *              It is important to call the next() function, it will affect the unpublish process,
    *              the entry will get stuck to "in-prgoress" state.
    * @Example:
           Blog.beforeUnpublish = function(data, next) {
               *
               * var entry = data.entry;
               * var contentType = data.contentType;
               * var language = data.language;
               *
           };
    */
   Blog.beforeUnpublish = function (data, next) {
       next();
   };
};


// function replace(string) {
//     string = string.replace(/\ /g, '%20')
//                    .replace(/\!/g, '%21')
//                    .replace(/\"/g, '%22')
//                    .replace(/\#/g, '%23')
//                    .replace(/\$/g, '%24')
//                    .replace(/\%/g, '%25')
//                    .replace(/\&/g, '%26')
//                    .replace(/\'/g, '%27')
//                    .replace(/\(/g, '%28')
//                    .replace(/\)/g, '%29')
//                    .replace(/\*/g,'%2A')
//                    .replace(/\+/g, '%2B')
//                    .replace(/\,/g, '%2C')
//                    .replace(/\-/g, '%2D')
//                    .replace(/\</g, '%3C')
//                    .replace(/\>/g, '%3E')
//                    .replace(/\?/g, '%3F')
//                    .replace(/\//g, '%2F')
//                    .replace(/\@/g, '%40')
//                    .replace(/\=/g, '%3D')
//     return string;               
//  }
