/**
 * Created by ACC11991 on 8/17/2015.
 */
module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.initConfig({
        watch: {
            scripts: {
                files: ["app/!**!/!*.js"],
                tasks: ['karma', 'min', 'jshint'],
                options: {
                    spawn: false
                }
            }
        },
        connect: {
            QA: {
                options: {
                    port: 8000,
                    base: '.',
                    hostname: '0.0.0.0',
                    middleware: function (connect, options, defaultMiddleware) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        var connectSSI = require('connect-ssi');
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }
                        var directory = options.directory || options.base[options.base.length - 1];

                        defaultMiddleware.unshift(connectSSI({
                            baseDir: directory,
                            ext: '.html',
                            payload: {
                                UI_FRAMEWORK_HOST : "//ts0.hfdstatic.com"
                            }
                        }));
                        return [
                            proxy
                        ].concat(defaultMiddleware);
                    }
                },
                proxies: [
                    {
                        context : [ /*'/RECMSIntegrator', '/ClassificationService', '/RESTIntService', '/SBOEligibilityService',
                            '/RERulesService', '/REQuoteService', '/REItmsLookUpService'*/],
                        host: 'qa-sboservices.thehartford.com',
                        //changeOrigin: true,
                        https: false
                    }
                ]
            }
        }
    });

    grunt.registerTask('start-server', function (target) {
        if(!target) target='QA';
        grunt.task.run([
            'configureProxies:' + target,
            'connect:'+ target,
            'watch'
        ]);
    });
};
