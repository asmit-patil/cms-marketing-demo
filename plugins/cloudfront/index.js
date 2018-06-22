/*!
 * cloudfront
 */

"use strict";

/*!
 * Module dependencies
 */
var contentstack = require('contentstack-express');
var AWS = require('aws-sdk'),
    path = require('path'),
    EventEmitter = require('events').EventEmitter,
    config = contentstack.config;




module.exports = function Cloudfront() {

    //  var Sendgrid = require('sendgrid')
    //  (
    //     process.env.SENDGRID_API_KEY || Cloudfront.options.sendgrid_api_key
    // );
    AWS.config.update({
        accessKeyId: Cloudfront.options.accessKeyId,
        secretAccessKey: Cloudfront.options.secretAccessKey
    });


    Cloudfront.templateExtends = function(engine) {};

    Cloudfront.serverExtends = function(app) {};
    var cloudfront = new AWS.CloudFront();

    Cloudfront.beforePublish = function(data, next) {
        checkCloudFront(data)
        next();
    };

    Cloudfront.beforeUnpublish = function(data, next) {
        checkCloudFront(data)
        next();
    };


    function checkCloudFront(data) {
        try {
            if (data.content_type) {
                var form_uid = data.content_type.uid,
                    uid = data.content_type.uid,
                    objectJSON = data.entry,
                    tempJson = {};
                tempJson["form_id"] = form_uid;
                var cloudFrontEE = new EventEmitter();

                var _CloudFrontClass = function() {
                    this.sendRequest = function(object) {
                        var params = {
                            DistributionId: Cloudfront.options.DISTRIBUTION_ID,
                            /* required */
                            InvalidationBatch: { /* required */
                                CallerReference: (new Date().getTime()).toString(),
                                /* required */
                                Paths: { /* required */
                                    Quantity: ((object['urls']).length),
                                    /* required */
                                    Items: object['urls']
                                }
                            }
                        };
                        cloudfront.createInvalidation(params, function(err, data) {
                            try {
                                if (err) {
                                    console.log("Error Caught !!!", err, err.stack);
                                    throw err;
                                } else {
                                    console.log('data.Invalidation.Id: ', data.Invalidation.Id);
                                    if (data.Invalidation.Id) {
                                        object['invalidation_id'] = data.Invalidation.Id;
                                    }
                                    cloudFrontEE.emit('checkStatus', object);
                                }

                            } catch (e2) {
                                console.log("Error1:::::", e2);
                                var html = "";
                                if (object['urls'].length == 1) {
                                    if (object['urls'][0] == "/*") {
                                        html += " All Pages"
                                    } else {
                                        html += "<ul>";
                                        html += "<li>" + Cloudfront.options.hostname + object['urls'][0] + "</li>";
                                        html += "</ul>";
                                    }
                                } else {
                                    html += "<ul>";
                                    for (var i = 0; i < object['urls'].length; i++) {
                                        html += "<li>" + Cloudfront.options.hostname + object['urls'][i] + "</li>"
                                    }
                                    html += "</ul>"

                                }
                            }
                        });
                    };

                    this.checkStatus = function(object) {
                        console.log("Status Checking:::: ........");
                        var params = {
                            DistributionId: Cloudfront.options.DISTRIBUTION_ID,
                            /* required */
                            Id: object.invalidation_id /* required */
                        };

                        cloudfront.waitFor('invalidationCompleted', params, function(err, data) {
                            try {
                                if (err) {
                                    console.log("Invalidation Error", err, err.stack);
                                    throw err;

                                } else {
                                    var id = data.Invalidation.Id;
                                    console.log('sucess::::', data)
                                    var quantity = data.Invalidation.InvalidationBatch.Paths.Quantity;
                                    var html = "";
                                    if (quantity > 1) {
                                        html += "<ul>";
                                        for (var i = 0; i < data.Invalidation.InvalidationBatch.Paths.Quantity; i++) {
                                            html += "<li>" + Cloudfront.options.hostname + data.Invalidation.InvalidationBatch.Paths.Items[i] + "</li>"
                                        }
                                        html += "</ul>"
                                    } else {
                                        if (data.Invalidation.InvalidationBatch.Paths.Items[0] == "/*") {
                                            html += " All Pages"
                                        } else {
                                            html += "<ul>";
                                            html += "<li>" + Cloudfront.options.hostname + data.Invalidation.InvalidationBatch.Paths.Items[0] + "</li>";
                                            html += "</ul>";
                                        }
                                    }
                                }
                            } catch (e1) {
                                console.log("Error Invalidation ID:", object.invalidation_id);
                                console.log("Error Occour while Invalidation1:", object);
                                var html = "";
                                if (object['urls'].length == 1) {
                                    if (object['urls'][0] == "/*") {
                                        html += " All Pages"
                                    } else {
                                        html += "<ul>";
                                        html += "<li>" + Cloudfront.options.hostname + object['urls'][0] + "</li>";
                                        html += "</ul>";
                                    }
                                } else {
                                    html += "<ul>";
                                    for (var i = 0; i < object['urls'].length; i++) {
                                        html += "<li>" + Cloudfront.options.hostname + object['urls'][i] + "</li>"
                                    }
                                    html += "</ul>"

                                }
                            }
                        });
                    }
                };
                //To activate event
                var _CloudFront = new _CloudFrontClass();
                cloudFrontEE.on('checkStatus', _CloudFront.checkStatus);
                cloudFrontEE.on('sendRequest', _CloudFront.sendRequest);

                if (objectJSON.url) {
                    tempJson["urls"] = [objectJSON.url];
                    cloudFrontEE.emit('sendRequest', tempJson);

                } else {
                    //console.log("Inside else::::::::::////////");

                    tempJson["urls"] = ["/*"];
                    cloudFrontEE.emit('sendRequest', tempJson);

                }
            } else {
                console.log("Asset publish");

            }
        } catch (e) {
            console.log("Plugin CloudFront Error: " + e);
        }
    };













};