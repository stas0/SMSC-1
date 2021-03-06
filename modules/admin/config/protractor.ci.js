/**
 * @author: @AngularClass
 */

const helpers = require('./helpers');
const objectMerge = require('object-merge');
const commonConfig = require('./protractor.common'); // the settings that are common to prod and dev

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'ci';

exports.config = objectMerge(commonConfig.config, {
    seleniumAddress: 'http://hub.browserstack.com/wd/hub',

    commonCapabilities: {
        'browserstack.user': process.env.BROWSER_STACK_USER,
        'browserstack.key': process.env.BROWSER_STACK_KEY,
        'browserstack.debug': 'true',
        'browserstack.local' : 'true',
        'browserstack.localIdentifier' : process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
        build: process.env.TRAVIS_BUILD_NUMBER || 'smsc',
        name: process.env.TRAVIS_JOB_NUMBER || 'test',
        browserName: 'Chrome'
    },

    multiCapabilities: [
        {
            browserName: 'Chrome',
            os: 'OS X',
            name: 'Chrome on OS X'
        },
        // {
        //     'browserName': 'Safari'
        // },
        // {
        //     'browserName': 'Firefox'
        // },
        // {
        //     'browserName': 'IE'
        // }
    ]
});

exports.config.multiCapabilities.forEach(function(caps){
    for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
