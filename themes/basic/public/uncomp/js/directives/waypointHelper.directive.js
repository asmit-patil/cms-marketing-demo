angular.module('savingCalculator').directive('waypointHelper', WaypointHelper);

function WaypointHelper() {
    return {
        restrict: 'A',
        link: link
    };

    function link(scope, element, attrs) {
        var sticky = new Waypoint.Sticky({
            element: $('#header2')[0],
            // element:$('.header-dark')[0],
            stuckClass: 'sticky-subnav-header'
        });
        // if ($('#value-saver').length > 0) {
        //     var pricing_sticky = new Waypoint.Sticky({
        //         element: $('#value-saver')[0],
        //         stuckClass: 'sticky-pricing-header'
        //     });
        // };
        // if (element.length > 0) {
        var pricing_sticky = new Waypoint.Sticky({
            element: element,
            stuckClass: 'sticky-pricing-header'
        });
        // };

        // $('#element120').waypoint(function(direction) {
        //     console.log('direction triggers at ', direction);
        //     element.removeClass('sticky-pricing-header');
        //     if (direction === 'up') {
        //         element.addClass('sticky-pricing-header');
        //     }
        // }, {
        //     offset: '30%'
        // });

        // var toggle_pricing_sticky = new Waypoint({
        //     element: $('.flow-partners')[0],
        //     handler: function(direction) {
        //         console.log('direction triggers at ', direction);
        //         element.removeClass('sticky-pricing-header');
        //         if (direction === 'up') {
        //             element.addClass('sticky-pricing-header');
        //         }
        //     },
        //     offset: '20%'
        // });

    };
};
