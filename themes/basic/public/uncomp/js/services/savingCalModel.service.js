angular.module('savingCalculator').service('savingCalModel', SavingCalModel);

function SavingCalModel() {
    // this.savingCalCmsData = {};
    this.savingCalCmsData = angular.copy(window.savingCalCms);

    this.model = {
        pageSize: {
            values: [0, 25, 50, 100, 500],
            currentIndex: 0,
            step: 1,
            cs: {
                values: [0, 4, 6, 11, 13],
                ann_values: [0, 0.5, 1, 2, 3]
            },
            drupal: {
                values: [0, 5, 8, 13, 15],
                // ann_values: [0, 0.5, 1, 2, 3]
                ann_values: [0, 1, 1.5, 2.5, 4]
            },
            wordpress: {
                values: [0, 5, 8, 13, 15],
                // ann_values: [0, 0.5, 1, 2, 3]
                ann_values: [0, 1, 1.5, 2.5, 4]
            }
        },
        pageViews: {
            // values: [0, 250000, 500000, 1000000, 5000000, 10000000, 25000000, 50000000, 100000000, 250000000, 500000000, 1000000000],
            values: [0, 250000, 500000, 1000000, 5000000, 10000000, 25000000, 50000000],
            currentIndex: 0,
            step: 1,
            cs: {
                // values: [0, 2000, 2000, 2000, 3500, 4500, 6500, 8500, 10000, 12000, 14000, 15000],
                // ann_values: [0, 180, 180, 180, 270, 360, 440, 600, 760, 920, 1080, 1240]
                values: [0, 2000, 2000, 2000, 3500, 4500, 6500, 8500],
                ann_values: [0, 180, 180, 180, 270, 360, 440, 600]
            },
            drupal: {
                // values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                // ann_values: [0, 500, 700, 800, 1000, 1200, 1600, 2000, 3000, 4000, 6000, 8000]
                values: [0, 0, 0, 0, 0, 0, 0, 0],
                ann_values: [0, 500, 700, 800, 1000, 1200, 1600, 2000]

            },
            wordpress: {
                // values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                // ann_values: [0, 500, 700, 800, 1000, 1200, 1600, 2000, 3000, 4000, 6000, 8000]
                values: [0, 0, 0, 0, 0, 0, 0, 0],
                ann_values: [0, 500, 700, 800, 1000, 1200, 1600, 2000]
            }
        },

        siteFeaturesCost: {
            seo: {
                name: this.savingCalCmsData.features_section.site_features.feature_1,
                display: false,
                cs: {
                    rate: 0.15,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 0.15,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 0.15,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            analytics: {
                name: this.savingCalCmsData.features_section.site_features.feature_11,
                display: false,
                cs: {
                    rate: 0.25,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 0.25,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 0.25,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            responsive: {
                name: this.savingCalCmsData.features_section.site_features.feature_2,
                display: false,
                cs: {
                    rate: 0.25,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 0.25,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 0.25,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            contact_us_forms: {
                name: this.savingCalCmsData.features_section.site_features.feature_12,
                display: false,
                cs: {
                    rate: 0.5,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 0.5,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 0.5,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            users_and_permissions: {
                name: this.savingCalCmsData.features_section.site_features.feature_3,
                display: false,
                cs: {
                    rate: 0.1,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 0.1,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 0.1,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            animations: {
                name: this.savingCalCmsData.features_section.site_features.feature_13,
                display: false,
                cs: {
                    rate: 2,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 2,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 2,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            search: {
                name: this.savingCalCmsData.features_section.site_features.feature_4,
                display: false,
                cs: {
                    rate: 1,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 1,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 1,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            multilingual: {
                name: this.savingCalCmsData.features_section.site_features.feature_10,
                display: false,
                cs: {
                    rate: 0,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0

                },
                drupal: {
                    rate: 0,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 0,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            blog: {
                name: this.savingCalCmsData.features_section.site_features.feature_14,
                display: false,
                cs: {
                    rate: 2,
                    server_rate: 190,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 3.5,
                    server_rate: 190,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 3.5,
                    server_rate: 190,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            forum: {
                name: this.savingCalCmsData.features_section.site_features.feature_5,
                display: false,
                cs: {
                    rate: 4,
                    server_rate: 190,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 3.5,
                    server_rate: 190,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    // rate: 3.5,
                    rate: 4,
                    server_rate: 190,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            live_chat: {
                name: this.savingCalCmsData.features_section.site_features.feature_15,
                display: false,
                cs: {
                    rate: 1,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 1,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 1,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            cdn: {
                name: this.savingCalCmsData.features_section.site_features.feature_6,
                display: false,
                cs: {
                    rate: 1,
                    server_rate: 200,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 1,
                    server_rate: 400,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 1,
                    server_rate: 400,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            eCommerce: {
                name: this.savingCalCmsData.features_section.site_features.feature_16,
                display: false,
                cs: {
                    // rate: 4,
                    rate: 3,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 5,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 5,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            dynamic_content_optimization: {
                name: this.savingCalCmsData.features_section.site_features.feature_7,
                display: false,
                cs: {
                    rate: 2,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 2,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 2,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            login_portal: {
                name: this.savingCalCmsData.features_section.site_features.feature_17,
                display: false,
                cs: {
                    rate: 3,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    // rate: 4,
                    rate: 5,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    // rate: 4,
                    rate: 5,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            download_library: {
                name: this.savingCalCmsData.features_section.site_features.feature_8,
                display: false,
                cs: {
                    // rate: 2,
                    rate: 1,
                    server_rate: 50,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 3,
                    server_rate: 140,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 3,
                    server_rate: 140,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            advanced_lead_gen: {
                name: this.savingCalCmsData.features_section.site_features.feature_18,
                display: false,
                cs: {
                    rate: 1,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 1,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 1,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            ab_testing: {
                name: this.savingCalCmsData.features_section.site_features.feature_9,
                display: false,
                cs: {
                    rate: 2,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 2,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 2,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            },
            roi_calculators: {
                name: this.savingCalCmsData.features_section.site_features.feature_19,
                display: false,
                cs: {
                    rate: 4,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                drupal: {
                    rate: 4,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                },
                wordpress: {
                    rate: 4,
                    server_rate: 0,
                    base_price: 0,
                    server_base_price: 0
                }
            }

        }
    }

    this.getSavingCalModel = function() {
        // console.log(this.model);
        return this.model;
    };

};
