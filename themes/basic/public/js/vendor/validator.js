!function(n){"use strict";var s=function(t,e){for(var a in this.$element=n(t),(this.options=e).errors=n.extend({},s.DEFAULTS.errors,e.errors),e.custom)if(!e.errors[a])throw new Error("Missing default error message for custom validator: "+a);n.extend(s.VALIDATORS,e.custom),this.$element.attr("novalidate",!0),this.toggleSubmit(),this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator",n.proxy(this.validateInput,this)),this.$element.on("submit.bs.validator",n.proxy(this.onSubmit,this)),this.$element.find("[data-match]").each(function(){var e=n(this),t=e.data("match");n(t).on("input.bs.validator",function(t){e.val()&&e.trigger("input.bs.validator")})})};function e(r){return this.each(function(){var t=n(this),e=n.extend({},s.DEFAULTS,t.data(),"object"==typeof r&&r),a=t.data("bs.validator");(a||"destroy"!=r)&&(a||t.data("bs.validator",a=new s(this,e)),"string"==typeof r&&a[r]())})}s.INPUT_SELECTOR=':input:not([type="submit"], button):enabled:visible',s.DEFAULTS={delay:500,html:!1,disable:!0,custom:{},errors:{match:"Does not match",minlength:"Not long enough"},feedback:{success:"glyphicon-ok",error:"glyphicon-remove"}},s.VALIDATORS={native:function(t){var e=t[0];return!e.checkValidity||e.checkValidity()},match:function(t){var e=t.data("match");return!t.val()||t.val()===n(e).val()},minlength:function(t){var e=t.data("minlength");return!t.val()||t.val().length>=e}},s.prototype.validateInput=function(e){var a=n(e.target),r=a.data("bs.validator.errors");if(a.is('[type="radio"]')&&(a=this.$element.find('input[name="'+a.attr("name")+'"]')),this.$element.trigger(e=n.Event("validate.bs.validator",{relatedTarget:a[0]})),!e.isDefaultPrevented()){var i=this;this.runValidators(a).done(function(t){a.data("bs.validator.errors",t),t.length?i.showErrors(a):i.clearErrors(a),r&&t.toString()===r.toString()||(e=t.length?n.Event("invalid.bs.validator",{relatedTarget:a[0],detail:t}):n.Event("valid.bs.validator",{relatedTarget:a[0],detail:r}),i.$element.trigger(e)),i.toggleSubmit(),i.$element.trigger(n.Event("validated.bs.validator",{relatedTarget:a[0]}))})}},s.prototype.runValidators=function(r){var i=[],e=n.Deferred(),a=this.options;function o(t){return r.data(t+"-error")||r.data("error")||"native"==t&&r[0].validationMessage||a.errors[t]}return r.data("bs.validator.deferred")&&r.data("bs.validator.deferred").reject(),r.data("bs.validator.deferred",e),n.each(s.VALIDATORS,n.proxy(function(t,e){if((r.data(t)||"native"==t)&&!e.call(this,r)){var a=o(t);!~i.indexOf(a)&&i.push(a)}},this)),!i.length&&r.val()&&r.data("remote")?this.defer(r,function(){var t={};t[r.attr("name")]=r.val(),n.get(r.data("remote"),t).fail(function(t,e,a){i.push(o("remote")||a)}).always(function(){e.resolve(i)})}):e.resolve(i),e.promise()},s.prototype.validate=function(){var t=this.options.delay;return this.options.delay=0,this.$element.find(s.INPUT_SELECTOR).trigger("input.bs.validator"),this.options.delay=t,this},s.prototype.showErrors=function(i){var o=this.options.html?"html":"text";this.defer(i,function(){var t=i.closest(".form-group"),e=t.find(".help-block.with-errors"),a=t.find(".form-control-feedback"),r=i.data("bs.validator.errors");r.length&&(r=n("<ul/>").addClass("list-unstyled").append(n.map(r,function(t){return n("<li/>")[o](t)})),void 0===e.data("bs.validator.originalContent")&&e.data("bs.validator.originalContent",e.html()),e.empty().append(r),t.addClass("has-error"),a.length&&a.removeClass(this.options.feedback.success)&&a.addClass(this.options.feedback.error)&&t.removeClass("has-success"))})},s.prototype.clearErrors=function(t){var e=t.closest(".form-group"),a=e.find(".help-block.with-errors"),r=e.find(".form-control-feedback");a.html(a.data("bs.validator.originalContent")),e.removeClass("has-error"),r.length&&r.removeClass(this.options.feedback.error)&&r.addClass(this.options.feedback.success)&&e.addClass("has-success")},s.prototype.hasErrors=function(){return!!this.$element.find(s.INPUT_SELECTOR).filter(function(){return!!(n(this).data("bs.validator.errors")||[]).length}).length},s.prototype.isIncomplete=function(){return!!this.$element.find(s.INPUT_SELECTOR).filter("[required]").filter(function(){return"checkbox"===this.type?!this.checked:"radio"===this.type?!n('[name="'+this.name+'"]:checked').length:""===n.trim(this.value)}).length},s.prototype.onSubmit=function(t){this.validate(),(this.isIncomplete()||this.hasErrors())&&t.preventDefault()},s.prototype.toggleSubmit=function(){this.options.disable&&n('button[type="submit"], input[type="submit"]').filter('[form="'+this.$element.attr("id")+'"]').add(this.$element.find('input[type="submit"], button[type="submit"]')).toggleClass("disabled",this.isIncomplete()||this.hasErrors())},s.prototype.defer=function(t,e){if(e=n.proxy(e,this),!this.options.delay)return e();window.clearTimeout(t.data("bs.validator.timeout")),t.data("bs.validator.timeout",window.setTimeout(e,this.options.delay))},s.prototype.destroy=function(){return this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator"),this.$element.find(s.INPUT_SELECTOR).off(".bs.validator").removeData(["bs.validator.errors","bs.validator.deferred"]).each(function(){var t=n(this),e=t.data("bs.validator.timeout");window.clearTimeout(e)&&t.removeData("bs.validator.timeout")}),this.$element.find(".help-block.with-errors").each(function(){var t=n(this),e=t.data("bs.validator.originalContent");t.removeData("bs.validator.originalContent").html(e)}),this.$element.find('input[type="submit"], button[type="submit"]').removeClass("disabled"),this.$element.find(".has-error").removeClass("has-error"),this};var t=n.fn.validator;n.fn.validator=e,n.fn.validator.Constructor=s,n.fn.validator.noConflict=function(){return n.fn.validator=t,this},n(window).on("load",function(){n('form[data-toggle="validator"]').each(function(){var t=n(this);e.call(t,t.data())})})}(jQuery);