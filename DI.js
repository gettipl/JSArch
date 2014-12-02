/**
 * Created by Łukasz on 2014-12-01.
 */
var Injector = function () {
    var container = {};
    var cache = {};

    var getDependence = function (func,deps,args,that,scope) {
        for (var i = 0; i < deps.length; i++) {
            var d = deps[i];
            if (!container[d] && d != '')
                throw new Error('Not registered dependency :' + d);

            if(cache[d])
                return cache[d];

            var object;
            if (container[d].dependencies.length == 0){
                object = container[d].func();
                if(container[d].type === 'instance')
                    cache[d] = object;
            }
            else{
                object = that.resolve(container[d].dependencies, container[d].func);
                if(container[d].type === 'instance')
                    cache[d] = object;
            }
            args.push(object)
        }
        return func.apply(scope || {}, args);
    };

    var register = function (name, dependencies, fun, type) {
        if (!name || !(typeof name == 'string'))
            throw new Error('You must pass valid service name');
        if (!dependencies || !(Object.prototype.toString.call(dependencies) == '[object Array]'))
            throw new Error('You must pass valid service dependencies');
        if (!fun || !(typeof fun == 'function'))
            throw new Error('You must pass valid service creation function');

        container[name] = {
            func: fun,
            dependencies: dependencies,
            type: type
        }
    };
    return {
        factory: function (name, dependencies, fun) {
            register(name, dependencies, fun, 'factory');
        },

        instance: function (name, dependencies, fun) {
            register(name, dependencies, fun, 'instance');
        },

        configuration: function (name,object){
            register(name,[],function(){return object;},'configuration');
        },

        controller: function (name, dependencies, fun) {
            register(name, dependencies, fun, 'controller');
        },

        resolve: function () {
            var  args = [], that = this;
            var func = arguments[1];
            var deps = arguments[0];
            var scope = arguments[2] || {};

            if (!deps || !(Object.prototype.toString.call(deps) == '[object Array]'))
                throw new Error('You must pass valid service dependencies');
            if (!func || !(typeof func == 'function'))
                throw new Error('You must pass valid service creation function');


            return getDependence(func,deps,args,that,scope);
        }
    }
}();