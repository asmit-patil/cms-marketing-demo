"use strict";

angular.module('savingCalculator').controller('savingCal', SavingCal);

SavingCal.$inject = ['$scope', '$timeout', 'savingCalModel', '$filter'];

function SavingCal($scope, $timeout, savingCalModel, $filter) {
    var vm = this;

    $scope.$watch('model', function(newValue, oldValue) {

        /* Site Features costs apply for following features 
         * SEO, analytics, responsive, contact_us_forms, users_and_permissions, animations, search, blog, forum, live_chat,
         * cdn, eCommerce, dynamic_content_optimization, login_portal, download_library, advanced_lead_gen, ab_testing, roi_calculators
         */
        
        angular.forEach(vm.boolSiteFeatures, function(value, index) {
            // console.log(value);
            if (!value.display) {
                value.cs.base_price = 0;
                value.drupal.base_price = 0;
                value.wordpress.base_price = 0;

                value.cs.server_base_price = 0;
                value.drupal.server_base_price = 0;
                value.wordpress.server_base_price = 0;
            } else {
                value.cs.base_price = value.cs.rate;
                value.drupal.base_price = value.drupal.rate;
                value.wordpress.base_price = value.wordpress.rate;

                value.cs.server_base_price = value.cs.server_rate;
                value.drupal.server_base_price = value.drupal.server_rate;
                value.wordpress.server_base_price = value.wordpress.server_rate;
            }
        });
        
        // Multi languages 
        if (newValue.siteFeaturesCost.multilingual.display !== oldValue.siteFeaturesCost.multilingual.display) {
            if (!newValue.siteFeaturesCost.multilingual.display) {
                $scope.lang_count = "";
                $scope.model.siteFeaturesCost.multilingual.cs.base_price = 0;
                $scope.model.siteFeaturesCost.multilingual.drupal.base_price = 0;
                $scope.model.siteFeaturesCost.multilingual.wordpress.base_price = 0;
                angular.element('#lang').val('');
            } else {
                $scope.focusMultilingual();
            }
        }
        

        vm.getFeaturesCost();
        vm.getTotalAnnualOwnershipCost();
        vm.getTotalCost();
        if (newValue === oldValue) {
            console.log("timeout.................");
            $timeout(function() {
                vm.generateGraph();
            }, 1000);
        } else {
            console.log("Without timeout.................");
            vm.generateGraph();
        }
    }, true);


    vm.generateLaunchCostGraph = function() {
        angular.element('#launchCostGraph').highcharts({
            chart: {
                type: 'column',                
                style: {
                    fontFamily: 'proxima-nova,sans-serif',
                    fontWeight: 300,
                    fontSize: '20px',
                }
            },
            credits: {

                enabled: false // hide highcharts name from graph
            },
            title: {
                text: 'Launch Cost',
                fontWeight: 300,
                  y: 50
            },
            subtitle: {
                enabled: false
                // align: 'left',
                // text: '<span style="font-family: Open Sans;font-size:14px; color:#23bab5">Save up to</span><br>' + '<span style="font-family:proxima-nova,sans-serif;font-size:48px;color:#23bab5">' + Math.round($scope.perc_saving_initial_cost) + '</span>' + '<span style="font-size:18px; color: #23bab5">%</span>',
                // // x: -130,
                // y: 100,
                // style: {
                //     color: '#23bab5',
                //     fontFamily: 'proxima-nova,sans-serif',
                //     fontWeight: 300,
                //     lineHeight: '45em'

                // }
            },
            xAxis: {
                tickLength: 0, //remove ticks
                // categories: ['$'+ [Math.round($scope.total_initial_cost_cs)], '$'+ [Math.round($scope.total_initial_cost_drupal)], '$'+ [Math.round($scope.total_initial_cost_wordpress)]],
                // categories: ['$' + [$scope.total_initial_cost_cs.toFixed(2)], '$' + [$scope.total_initial_cost_drupal.toFixed(2)], '$' + [$scope.total_initial_cost_wordpress.toFixed(2)]],
                categories: ['$'+ $filter('number')(Math.round($scope.total_initial_cost_cs)), '$'+ $filter('number')(Math.round($scope.total_initial_cost_drupal)), '$'+ $filter('number')(Math.round($scope.total_initial_cost_wordpress))],
                labels: {
                    style: {
                        fontWeight: 600,
                        fontSize: '18px',
                        // fontSize: '17px',
                        lineHeight: 1.6,
                        color: '#41424a'
                    }
                },


            },
            yAxis: {
                min: 0,
                visible: false, // hide values on yaxis

                // title: {
                //     text: 'Total initial cost'
                // },
                // stackLabels: {
                //     enabled: true,
                //     style: {
                //         fontWeight: 'bold',
                //         color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                //     }
                // }
                labels: {
                    enabled: true
                },
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'bottom',
                y: 25,
                floating: false,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                // borderWidth: 1,
                shadow: false
            },
            tooltip: {
                enabled: false, ///disable tooltip
                headerFormat: '<b>{point.x}</b><br/>',
                // pointFormat: '{series.name}: {point.y}<br/>Total: ${point.stackTotal}',
                pointFormatter: function() {
                    // console.log(this);
                    var seriesName = this.series.name;
                    var seriesVal = Math.round(this.y);
                    var total = Math.round(this.stackTotal);

                    return '' + seriesName + ': $' + seriesVal + '<br/>Total: $' + total;
                    // {series.name}: {point.y}<br/>Total: ${point.stackTotal}
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    borderWidth: 0, //remove white line between two bars  
                    animation: false,
                    dataLabels: {
                        enabled: false, //Avoid values inside bar 
                        // color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        // style: {
                        //     textShadow: '0 0 3px black',

                        // }
                    }
                },

            },
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            series: [
            {
                showInLegend: false,
                name: 'Initial Dev Cost',
                visible: true,
                color: '#7bd5d2',
                // data: [Math.round($scope.initial_dev_cost_cs), Math.round($scope.initial_dev_cost_drupal), Math.round($scope.initial_dev_cost_wordpress)],
                data: [$scope.initial_dev_cost_cs, $scope.initial_dev_cost_drupal, $scope.initial_dev_cost_wordpress]
            }, {
                showInLegend: false,
                name: 'Initial Server Cost ',
                visible: true,
                color: '#23bab5',
                // data: [Math.round($scope.initial_server_cost_cs), Math.round($scope.initial_server_cost_drupal), Math.round($scope.initial_server_cost_wordpress)],
                data: [$scope.initial_server_cost_cs, $scope.initial_server_cost_drupal, $scope.initial_server_cost_wordpress]
            }],
        });

    };

    vm.generateAnnualTcoGraph = function() {
        angular.element('#annualTcoGraph').highcharts({
            chart: {
                type: 'column',       
                style: {
                    fontFamily: 'proxima-nova,sans-serif',
                    fontWeight: 300,
                    fontSize: '20px'
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Annual TCO',
                 y: 50,            
              
            },
            subtitle: {
                enabled: false
                // align: 'left',
                // text: '<span style="font-family: Open Sans;font-size:14px; color:#e44749">Save up to</span><br>' + '<span style="font-family:proxima-nova,sans-serif;font-size:48px;color:#e44749">' + Math.round($scope.perc_saving_annual_ownership_cost) + '</span>' + '<span style="font-size:18px; color: #e44749">%</span>',
                // // x: -130,
                // y: 100,
                // style: {
                //     color: '#23bab5',
                //     fontFamily: 'proxima-nova,sans-serif',
                //     fontWeight: 300,
                //     lineHeight: '45em'

                // }
            },
            xAxis: {
                tickLength: 0, //remove ticks
                // categories: ['$' + [Math.round($scope.total_annual_ownership_cost_cs)], '$' + [Math.round($scope.total_annual_ownership_cost_drupal)], '$' + [Math.round($scope.total_annual_ownership_cost_wordpress)]],
                // categories: ['$' + [$scope.total_annual_ownership_cost_cs.toFixed(2)], '$' + [$scope.total_annual_ownership_cost_drupal.toFixed(2)], '$' + [$scope.total_annual_ownership_cost_wordpress.toFixed(2)]],
                categories: ['$' + $filter('number')(Math.round($scope.total_annual_ownership_cost_cs)), '$' + $filter('number')(Math.round($scope.total_annual_ownership_cost_drupal)), '$' + $filter('number')(Math.round($scope.total_annual_ownership_cost_wordpress))],
                labels: {
                    style: {
                        fontWeight: 600,
                        fontSize: '18px',
                        // fontSize: '17px',
                        lineHeight: 1.6,
                        color: '#41424a'
                    }
                },

            },
            yAxis: {
                min: 0,
                visible: false,
                // title: {
                //     text: 'Total initial cost'
                // },
                // stackLabels: {
                //     enabled: true,
                //     style: {
                //         fontWeight: 'bold',
                //         color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                //     }
                // }
                labels: {
                    enabled: false
                },
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                enabled: false,
                headerFormat: '<b>{point.x}</b><br/>',
                // pointFormat: '{series.name}: {point.y}<br/>Total: ${point.stackTotal}',
                pointFormatter: function() {
                    // console.log(this);
                    var seriesName = this.series.name;
                    var seriesVal = Math.round(this.y);
                    var total = Math.round(this.stackTotal);

                    return '' + seriesName + ': $' + seriesVal + '<br/>Total: $' + total;
                    // {series.name}: {point.y}<br/>Total: ${point.stackTotal}
                }
            },
            plotOptions: {

                column: {
                    stacking: 'normal',
                    borderWidth: 0, //remove white line between two bars
                    animation: false,
                    dataLabels: {
                        enabled: false, ////Avoid values inside bar 
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            series: [{
                showInLegend: false,
                // name: 'Annual Licence Cost',
                name: 'Annual Lic Cost',
                visible: true,
                color: '#f7b452',
                // data: [Math.round($scope.annual_license_cost_cs), Math.round($scope.annual_license_cost_drupal), Math.round($scope.annual_license_cost_wordpress)],
                data: [$scope.annual_license_cost_cs, $scope.annual_license_cost_drupal, $scope.annual_license_cost_wordpress]


            }, {
                showInLegend: false,
                // name: 'Annual development cost',
                name: 'Annual Dev Cost',
                visible: true,
                color: '#f08043',
                // data: [Math.round($scope.annual_dev_cost_cs), Math.round($scope.annual_dev_cost_drupal), Math.round($scope.annual_dev_cost_wordpress)]
                data: [$scope.annual_dev_cost_cs, $scope.annual_dev_cost_drupal, $scope.annual_dev_cost_wordpress]

            }, {
                showInLegend: false,
                // name: 'Annual server/infrastructure cost',
                name: 'Annual Server Cost',
                visible: true,
                color: '#e44749',
                // data: [Math.round($scope.annual_server_cost_cs), Math.round($scope.annual_server_cost_drupal), Math.round($scope.annual_server_cost_wordpress)]
                data: [$scope.annual_server_cost_cs, $scope.annual_server_cost_drupal, $scope.annual_server_cost_wordpress]
            }]
        });
    };

    vm.generateGraph = function() {
        vm.generateLaunchCostGraph();
        vm.generateAnnualTcoGraph();
    };

    /* function - focusMultilingual 
     * Focus on multilingual input field to enter languages count for multilingual feature for required tech types
     */
    $scope.focusMultilingual = function() {
        $timeout(function() {
            angular.element('#lang').focus();
            angular.element('#lang').css({'box-shadow':'none', 'outline':'none'});
            // $('#lang').css({'box-shadow':'none', 'outline':'none'})
        }, 100);
    };

    /* function - langChanged 
     * Assignes base price according to languages count for multilingual feature for required tech types
     */
    $scope.langChanged = function(count) {
        $scope.lang_count = count;
        //Multi languages 
        if (!$scope.model.siteFeaturesCost.multilingual.display || !$scope.lang_count) {
            $scope.model.siteFeaturesCost.multilingual.cs.base_price = 0;
            $scope.model.siteFeaturesCost.multilingual.drupal.base_price = 0;
            $scope.model.siteFeaturesCost.multilingual.wordpress.base_price = 0;
        } else {
            $scope.model.siteFeaturesCost.multilingual.cs.base_price = ($scope.lang_count * 2) + 1;
            $scope.model.siteFeaturesCost.multilingual.drupal.base_price = ($scope.lang_count * 2) + 1;
            $scope.model.siteFeaturesCost.multilingual.wordpress.base_price = ($scope.lang_count * 2) + 1;
        }
        vm.getFeaturesCost();
        vm.getTotalAnnualOwnershipCost();
        vm.getTotalCost();
    };


    /* function - getInitialDevCost 
     * Calculates the initial dev cost with all price values for required tech types
     */
    vm.getInitialDevCost = function() {
        // sum of rates of all features for cs 
        $scope.sum_cost_cs = $scope.model.siteFeaturesCost.seo.cs.base_price + $scope.model.siteFeaturesCost.analytics.cs.base_price +
            $scope.model.siteFeaturesCost.responsive.cs.base_price + $scope.model.siteFeaturesCost.contact_us_forms.cs.base_price +
            $scope.model.siteFeaturesCost.users_and_permissions.cs.base_price + $scope.sum_common_cost_cs;

        // total initial_dev_cost for cs.
        $scope.initial_dev_cost_cs = ($scope.sum_cost_cs + $scope.total_weeks_cs) / 52 * 80000;

        // sum of rates of all features for drupal
        $scope.sum_cost_drupal = $scope.model.siteFeaturesCost.seo.drupal.base_price + $scope.model.siteFeaturesCost.analytics.drupal.base_price +
            $scope.model.siteFeaturesCost.responsive.drupal.base_price + $scope.model.siteFeaturesCost.contact_us_forms.drupal.base_price +
            $scope.model.siteFeaturesCost.users_and_permissions.drupal.base_price + $scope.sum_common_cost_drupal;

        // total initial_dev_cost fpr drupal.
        $scope.initial_dev_cost_drupal = ($scope.sum_cost_drupal + $scope.total_weeks_drupal) / 52 * 160000;

        // sum of rates of all features for wordpress
        $scope.sum_cost_wordpress = $scope.model.siteFeaturesCost.seo.wordpress.base_price + $scope.model.siteFeaturesCost.analytics.wordpress.base_price +
            $scope.model.siteFeaturesCost.responsive.wordpress.base_price + $scope.model.siteFeaturesCost.contact_us_forms.wordpress.base_price +
            $scope.model.siteFeaturesCost.users_and_permissions.wordpress.base_price + $scope.sum_common_cost_wordpress;

        // total initial_dev_cost for wordpress
        $scope.initial_dev_cost_wordpress = ($scope.sum_cost_wordpress + $scope.total_weeks_wordpress) / 52 * 160000;
    };

    /* Initial costs */

    /* function - getWeeksCount
     * Calculates the total weeks for launch timeline.
     */
    vm.getWeeksCount = function() {
        $scope.sum_common_cost_cs = $scope.model.siteFeaturesCost.animations.cs.base_price +
            $scope.model.siteFeaturesCost.search.cs.base_price + $scope.model.siteFeaturesCost.multilingual.cs.base_price +
            $scope.model.siteFeaturesCost.blog.cs.base_price + $scope.model.siteFeaturesCost.forum.cs.base_price + $scope.model.siteFeaturesCost.live_chat.cs.base_price + $scope.model.siteFeaturesCost.cdn.cs.base_price + $scope.model.siteFeaturesCost.eCommerce.cs.base_price + $scope.model.siteFeaturesCost.dynamic_content_optimization.cs.base_price + $scope.model.siteFeaturesCost.login_portal.cs.base_price +
            $scope.model.siteFeaturesCost.download_library.cs.base_price + $scope.model.siteFeaturesCost.advanced_lead_gen.cs.base_price +
            $scope.model.siteFeaturesCost.ab_testing.cs.base_price + $scope.model.siteFeaturesCost.roi_calculators.cs.base_price;

        $scope.sum_common_cost_drupal = $scope.model.siteFeaturesCost.animations.drupal.base_price +
            $scope.model.siteFeaturesCost.search.drupal.base_price + $scope.model.siteFeaturesCost.multilingual.drupal.base_price +
            $scope.model.siteFeaturesCost.blog.drupal.base_price + $scope.model.siteFeaturesCost.forum.drupal.base_price + $scope.model.siteFeaturesCost.live_chat.drupal.base_price + $scope.model.siteFeaturesCost.cdn.drupal.base_price + $scope.model.siteFeaturesCost.eCommerce.drupal.base_price + $scope.model.siteFeaturesCost.dynamic_content_optimization.drupal.base_price + $scope.model.siteFeaturesCost.login_portal.drupal.base_price +
            $scope.model.siteFeaturesCost.download_library.drupal.base_price + $scope.model.siteFeaturesCost.advanced_lead_gen.drupal.base_price +
            $scope.model.siteFeaturesCost.ab_testing.drupal.base_price + $scope.model.siteFeaturesCost.roi_calculators.drupal.base_price;

        $scope.sum_common_cost_wordpress = $scope.model.siteFeaturesCost.animations.wordpress.base_price +
            $scope.model.siteFeaturesCost.search.wordpress.base_price + $scope.model.siteFeaturesCost.multilingual.wordpress.base_price +
            $scope.model.siteFeaturesCost.blog.wordpress.base_price + $scope.model.siteFeaturesCost.forum.wordpress.base_price + $scope.model.siteFeaturesCost.live_chat.wordpress.base_price + $scope.model.siteFeaturesCost.cdn.wordpress.base_price + $scope.model.siteFeaturesCost.eCommerce.wordpress.base_price + $scope.model.siteFeaturesCost.dynamic_content_optimization.wordpress.base_price + $scope.model.siteFeaturesCost.login_portal.wordpress.base_price +
            $scope.model.siteFeaturesCost.download_library.wordpress.base_price + $scope.model.siteFeaturesCost.advanced_lead_gen.wordpress.base_price +
            $scope.model.siteFeaturesCost.ab_testing.wordpress.base_price + $scope.model.siteFeaturesCost.roi_calculators.wordpress.base_price;


        $scope.total_weeks_cs = ($scope.model.pageSize.cs.values[$scope.model.pageSize.currentIndex] + $scope.sum_common_cost_cs) * 1.25;
        $scope.total_weeks_drupal = ($scope.model.pageSize.drupal.values[$scope.model.pageSize.currentIndex] + $scope.sum_common_cost_drupal) * 1.25;
        $scope.total_weeks_wordpress = ($scope.model.pageSize.wordpress.values[$scope.model.pageSize.currentIndex] + $scope.sum_common_cost_wordpress) * 1.25;

    };

    /* function - getInitialServerCost
     * Calculates the initial server/infra cost with all price values for required tech types.
     */
    vm.getInitialServerCost = function() {
        $scope.initial_server_cost_cs = (200 * $scope.total_weeks_cs) / 4;
        $scope.initial_server_cost_drupal = (300 * $scope.total_weeks_drupal) / 4;
        $scope.initial_server_cost_wordpress = (300 * $scope.total_weeks_wordpress) / 4;
    };


    /* function - getFeaturesCost
     * Calculates the total cost with all price values for required tech types.
     */
    vm.getFeaturesCost = function() {
        vm.getWeeksCount();
        vm.getInitialDevCost();
        vm.getInitialServerCost();

        $scope.total_initial_cost_cs = $scope.initial_dev_cost_cs + $scope.initial_server_cost_cs;
        $scope.total_initial_cost_drupal = $scope.initial_dev_cost_drupal + $scope.initial_server_cost_drupal;
        $scope.total_initial_cost_wordpress = $scope.initial_dev_cost_wordpress + $scope.initial_server_cost_wordpress;

        $scope.perc_saving_initial_cost = (($scope.total_initial_cost_drupal - $scope.total_initial_cost_cs) / $scope.total_initial_cost_drupal) * 100;
        if(!$scope.perc_saving_initial_cost) {
            $scope.perc_saving_initial_cost = 0;
        }
        // console.log("perc_saving_initial_cost", $scope.perc_saving_initial_cost);
        // end here
    }


    /* Annual costs */

    /* function - getAnnualLicenseCost 
     * Calculates annual licence cost values for all tech types
     */
    vm.getAnnualLicenseCost = function() {
        $scope.annual_license_cost_cs = $scope.model.pageViews.cs.values[$scope.model.pageViews.currentIndex] * 12;
        $scope.annual_license_cost_drupal = $scope.model.pageViews.drupal.values[$scope.model.pageViews.currentIndex] * 12;
        $scope.annual_license_cost_wordpress = $scope.model.pageViews.wordpress.values[$scope.model.pageViews.currentIndex] * 12;
        // console.log($scope.annual_license_cost_cs, $scope.annual_license_cost_drupal, $scope.annual_license_cost_wordpress);

    }

    /* function - getAnnualDevelopmentCost 
     * Calculates annual development cost values for all tech types
     */
    vm.getAnnualDevelopmentCost = function() {
        $scope.annual_dev_cost_cs = $scope.model.pageSize.cs.ann_values[$scope.model.pageSize.currentIndex] * 80000;
        $scope.annual_dev_cost_drupal = $scope.model.pageSize.drupal.ann_values[$scope.model.pageSize.currentIndex] * 160000;
        $scope.annual_dev_cost_wordpress = $scope.model.pageSize.wordpress.ann_values[$scope.model.pageSize.currentIndex] * 160000;
        // console.log($scope.annual_dev_cost_cs, $scope.annual_dev_cost_drupal, $scope.annual_dev_cost_wordpress);
    }

    vm.getAnnualServerCost = function() {
        // sum of annual_server rates of all features for cs 
        $scope.sum_annual_server_cost_cs = $scope.model.siteFeaturesCost.seo.cs.server_base_price + $scope.model.siteFeaturesCost.analytics.cs.server_base_price +
            $scope.model.siteFeaturesCost.responsive.cs.server_base_price + $scope.model.siteFeaturesCost.contact_us_forms.cs.server_base_price +
            $scope.model.siteFeaturesCost.users_and_permissions.cs.server_base_price + $scope.model.siteFeaturesCost.animations.cs.server_base_price +
            $scope.model.siteFeaturesCost.search.cs.server_base_price + $scope.model.siteFeaturesCost.multilingual.cs.server_base_price +
            $scope.model.siteFeaturesCost.blog.cs.server_base_price + $scope.model.siteFeaturesCost.forum.cs.server_base_price + $scope.model.siteFeaturesCost.live_chat.cs.server_base_price +
            $scope.model.siteFeaturesCost.cdn.cs.server_base_price + $scope.model.siteFeaturesCost.eCommerce.cs.server_base_price +
            $scope.model.siteFeaturesCost.dynamic_content_optimization.cs.server_base_price + $scope.model.siteFeaturesCost.login_portal.cs.server_base_price +
            $scope.model.siteFeaturesCost.download_library.cs.server_base_price + $scope.model.siteFeaturesCost.advanced_lead_gen.cs.server_base_price +
            $scope.model.siteFeaturesCost.ab_testing.cs.server_base_price + $scope.model.siteFeaturesCost.roi_calculators.cs.server_base_price;

        $scope.annual_server_cost_cs = ($scope.model.pageViews.cs.ann_values[$scope.model.pageViews.currentIndex] + $scope.sum_annual_server_cost_cs) * 12;
        // console.log("annual_server_cost_cs:", $scope.annual_server_cost_cs);

        // sum of annual_server rates of all features for drupal 
        $scope.sum_annual_server_cost_drupal = $scope.model.siteFeaturesCost.seo.drupal.server_base_price + $scope.model.siteFeaturesCost.analytics.drupal.server_base_price +
            $scope.model.siteFeaturesCost.responsive.drupal.server_base_price + $scope.model.siteFeaturesCost.contact_us_forms.drupal.server_base_price +
            $scope.model.siteFeaturesCost.users_and_permissions.drupal.server_base_price + $scope.model.siteFeaturesCost.animations.drupal.server_base_price +
            $scope.model.siteFeaturesCost.search.drupal.server_base_price + $scope.model.siteFeaturesCost.multilingual.drupal.server_base_price +
            $scope.model.siteFeaturesCost.blog.drupal.server_base_price + $scope.model.siteFeaturesCost.forum.drupal.server_base_price + $scope.model.siteFeaturesCost.live_chat.drupal.server_base_price + $scope.model.siteFeaturesCost.cdn.drupal.server_base_price + $scope.model.siteFeaturesCost.eCommerce.drupal.server_base_price + $scope.model.siteFeaturesCost.dynamic_content_optimization.drupal.server_base_price + $scope.model.siteFeaturesCost.login_portal.drupal.server_base_price +
            $scope.model.siteFeaturesCost.download_library.drupal.server_base_price + $scope.model.siteFeaturesCost.advanced_lead_gen.drupal.server_base_price +
            $scope.model.siteFeaturesCost.ab_testing.drupal.server_base_price + $scope.model.siteFeaturesCost.roi_calculators.drupal.server_base_price;

        $scope.annual_server_cost_drupal = ($scope.model.pageViews.drupal.ann_values[$scope.model.pageViews.currentIndex] + $scope.sum_annual_server_cost_drupal) * 12;
        // console.log("annual_server_cost_drupal:", $scope.annual_server_cost_drupal);

        // sum of annual_server rates of all features for wordpress 
        $scope.sum_annual_server_cost_wordpress = $scope.model.siteFeaturesCost.seo.wordpress.server_base_price + $scope.model.siteFeaturesCost.analytics.wordpress.server_base_price +
            $scope.model.siteFeaturesCost.responsive.wordpress.server_base_price + $scope.model.siteFeaturesCost.contact_us_forms.wordpress.server_base_price +
            $scope.model.siteFeaturesCost.users_and_permissions.wordpress.server_base_price + $scope.model.siteFeaturesCost.animations.wordpress.server_base_price +
            $scope.model.siteFeaturesCost.search.wordpress.server_base_price + $scope.model.siteFeaturesCost.multilingual.wordpress.server_base_price +
            $scope.model.siteFeaturesCost.blog.wordpress.server_base_price + $scope.model.siteFeaturesCost.forum.wordpress.server_base_price + $scope.model.siteFeaturesCost.live_chat.wordpress.server_base_price + $scope.model.siteFeaturesCost.cdn.wordpress.server_base_price + $scope.model.siteFeaturesCost.eCommerce.wordpress.server_base_price + $scope.model.siteFeaturesCost.dynamic_content_optimization.wordpress.server_base_price + $scope.model.siteFeaturesCost.login_portal.wordpress.server_base_price +
            $scope.model.siteFeaturesCost.download_library.wordpress.server_base_price + $scope.model.siteFeaturesCost.advanced_lead_gen.wordpress.server_base_price +
            $scope.model.siteFeaturesCost.ab_testing.wordpress.server_base_price + $scope.model.siteFeaturesCost.roi_calculators.wordpress.server_base_price;

        $scope.annual_server_cost_wordpress = ($scope.model.pageViews.wordpress.ann_values[$scope.model.pageViews.currentIndex] + $scope.sum_annual_server_cost_wordpress) * 12;

    };

    /* function - getTotalAnnualOwnershipCost 
     * Calculates the total annual ownership cost for all tech types
     */
    vm.getTotalAnnualOwnershipCost = function() {
        vm.getAnnualLicenseCost();
        vm.getAnnualDevelopmentCost();
        vm.getAnnualServerCost();

        $scope.total_annual_ownership_cost_cs = $scope.annual_license_cost_cs + $scope.annual_dev_cost_cs + $scope.annual_server_cost_cs;
        $scope.total_annual_ownership_cost_drupal = $scope.annual_license_cost_drupal + $scope.annual_dev_cost_drupal + $scope.annual_server_cost_drupal;
        $scope.total_annual_ownership_cost_wordpress = $scope.annual_license_cost_wordpress + $scope.annual_dev_cost_wordpress + $scope.annual_server_cost_wordpress;

        $scope.perc_saving_annual_ownership_cost = (($scope.total_annual_ownership_cost_drupal - $scope.total_annual_ownership_cost_cs) / $scope.total_annual_ownership_cost_drupal) * 100;
        if (!$scope.perc_saving_annual_ownership_cost) {
            $scope.perc_saving_annual_ownership_cost = 0;
        }
    };

    /* function - getTotalCost 
     * Calculates the total annual ownership cost for all tech types
     */
    vm.getTotalCost = function() {
        // Corrected final values
        $scope.total_cost_cs = $scope.total_initial_cost_cs + ($scope.total_annual_ownership_cost_cs * 3);
        $scope.total_cost_drupal = $scope.total_initial_cost_drupal + ($scope.total_annual_ownership_cost_drupal * 3);
        $scope.total_cost_wordpress = $scope.total_initial_cost_wordpress + ($scope.total_annual_ownership_cost_wordpress * 3);

        // 3 year saving cost
        // $scope.savingCost = ($scope.total_cost_drupal - $scope.total_cost_cs) * 3;

        if ($scope.total_cost_drupal < $scope.total_cost_wordpress) {
            $scope.savingCost = Math.round($scope.total_cost_drupal - $scope.total_cost_cs);
        } else {
            $scope.savingCost = Math.round($scope.total_cost_wordpress - $scope.total_cost_cs);
        }

    };


    /* function - setDefaultValues 
     * Sets the default values of price values for desktop and app model types
     */
    vm.setDefaultValues = function() {
        $scope.model.pageSize.currentIndex = 1;
        $scope.model.pageViews.currentIndex = 3;

        // $scope.total_cs_cost = 0;
        // $scope.total_drupal_cost = 0;
        // $scope.total_wordpress_cost = 0;

        $scope.initial_dev_cost_cs = 0;
        $scope.initial_dev_cost_drupal = 0;
        $scope.initial_dev_cost_wordpress = 0;
        // console.log($scope.initial_dev_cost_cs, $scope.initial_dev_cost_drupal, $scope.initial_dev_cost_wordpress);
    };

    /* function - checkTarget 
     * Checks and returns target value to anchor tag
     * @params
     * new_tab [boolean] true when it open in new tab
     */
    $scope.checkTarget = function(new_tab) {
        return new_tab ? 'target="_blank"' : "";
    };

    /* function - initializeCal 
     * Sets the initial values of the model from service jsons
     * @params
     * isReset [boolean] true if it is called on reset click
     */
    $scope.initializeCal = function(isReset) {
        $scope.savingCalCms = angular.copy(window.savingCalCms);
        $scope.model = angular.copy(savingCalModel.getSavingCalModel());
        // console.log($scope.savingCalCms);
        vm.boolSiteFeatures = _.toArray(_.omit($scope.model.siteFeaturesCost, ['multilingual']));
        $scope.savingCalSiteFeatures = _.chunk(vm.boolSiteFeatures, 2);
        // console.log($scope.savingCalSiteFeatures);

        // set the initial values of price variables
        vm.setDefaultValues();
    };

    /* function - init 
     * initilization function/constructor, gets self called while controller is loaded for the 1st time 
     */
    vm.init = function() {
        $scope.initializeCal();
    }();
}
