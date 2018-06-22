/*!
 * sitemap
 */

 "use strict";

/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express');
var  http = require('http'),
  path = require('path'),
  fs = require('fs'),
  cheerio = require('cheerio'),
  js2xmlparser = require('js2xmlparser'),
  _ = require('lodash');  

module.exports = function Sitemap() {

   /*
    * Sitemap.options provides the options provided in the configuration.
    */

   var options = Sitemap.options;

   Sitemap.templateExtends = function(engine) {

    
   };

   
   Sitemap.serverExtends = function(app) { 


   };
  
   var sitemapGenerate = function(data, next , event) {

      if(data.entry && data.entry.url){
    var siteXmlContent = null;
    var urlset = {
      "@":{
        "xmlns":"http://www.sitemaps.org/schemas/sitemap/0.9",
        "xmlns:video":"http://www.google.com/schemas/sitemap-video/1.1"
      }             
    };
    if(data.entry.url  && /\/thank-you$/i.test(data.entry.url) == false){
      var entry_url = data.entry.url.charAt(0) == '/' ? data.entry.url.substr(1): "";  
      
      var frequency = "weekly",
          priority = "0.5";

      var data_url = entry_url,
          hostname = "https://www.contentstack.com",
          url = data.entry.url,
          absUrl = hostname + url;
      var sitemap_data = extractUrls(fs.readFileSync(__dirname + '/../../themes/basic/public/static/sitemap.xml'));
      if(data.entry.url != "/404" && data.entry.url != "/search" && event == 'publish'){
        // check if duplicate exist don't modify original object
        var hasDuplicate = duplicateSitemapObj(sitemap_data, absUrl);
        if(hasDuplicate){
          urlset['url'] = sitemap_data;           
          siteXmlContent = js2xmlparser.parse("urlset", urlset);
        } else { 
          deleteSitemapObj(sitemap_data, absUrl);
          var sitemapObj = {};
          sitemapObj["loc"] = absUrl;
          sitemapObj["changefreq"] = frequency;
          sitemapObj["priority"] = priority;

          sitemap_data.push(sitemapObj);
          urlset.url = sitemap_data;
          siteXmlContent = js2xmlparser.parse("urlset", urlset);
        }
        } else if(event == "unpublish"){
          deleteSitemapObj(sitemap_data, absUrl);
          // var sitemapObj = {};
          // sitemapObj["loc"] = absUrl;
          // sitemapObj["changefreq"] = frequency;
          // sitemapObj["priority"] = priority;

          urlset.url = sitemap_data;
          siteXmlContent = js2xmlparser.parse("urlset", urlset); 
        } else {
          deleteSitemapObj(sitemap_data, absUrl);                    
          urlset['url'] = sitemap_data;           
          siteXmlContent = js2xmlparser.parse("urlset", urlset);
        }      
    } else {
      return next();
    }
    fs.writeFile(__dirname + '/../../themes/basic/public/static/sitemap.xml', siteXmlContent.toString(), function(err){
      if(err){
        return next(err)
      }
      console.log("sitemap successfully saved");
      next();
    })    
  } else {
    next();
  }


} //end function 
   Sitemap.beforePublish = function (data, next) {
        sitemapGenerate(data, next, "publish");
   };  
  
   Sitemap.beforeUnpublish = function (data, next) {
        sitemapGenerate(data, next, "unpublish");
        // next();
   };
};



function extractUrls(xml) {
    var urls = [];
    var $ = cheerio.load(xml, {xmlMode:true});
    
    $('url').each(function() {
        var obj = {};
        obj['loc'] = $(this).find('loc').text();
        // obj['lastmod'] = $(this).find('lastmod').text();
        obj['changefreq'] = $(this).find('changefreq').text();
        obj['priority'] = $(this).find('priority').text();

        var urlObj = $(this);
        var child = $(this).children();  

        urls.push(obj);        
    });
    return urls;
}


function deleteSitemapObj(sitemap_data, data_url){  
  for (var i = 0; i < sitemap_data.length; i++){
    if(sitemap_data[i].loc === data_url){
      sitemap_data.splice(i, 1);
    }   
  } 
}

function duplicateSitemapObj(sitemap_data, data_url, date){
  for (var i = 0; i < sitemap_data.length; i++){
    // if(sitemap_data[i].loc === data_url && date === sitemap_data[i].lastmod){
      if(sitemap_data[i].loc === data_url){
      return true
    }   
  } 
}



