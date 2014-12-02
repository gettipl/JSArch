Injector.configuration('main',{version : '0.1'});

Injector.factory('Foo', [],function(){
    return {
        log : function(){
            console.log('Foo');
        }
    }
});

Injector.factory('FooWithDependencies',['Foo'],function(foo){
    return {
        log : function(){
            console.group('Inside FooWithDependencies');
            console.log('FooWithDependencies');
            foo.log();
            console.groupEnd();
        }
    }
});

Injector.controller('ExampleController',['Foo','FooWithDependencies'],function(foo,fooWithDependencies){
    return {
        action: function(){
            foo.log();
            fooWithDependencies.log();
        }
    }
});

Injector.instance("instance",['Foo'],function(foo){
    console.log('instance created');
    return {
        log: function(){
            console.group('inside instance');
            console.log('instance');
            foo.log();
            console.groupEnd();
        }
    }
});

Injector.resolve(['ExampleController', 'instance', 'main'],function(controller,instance,main){
    console.group('resolve ExampleController');
    controller.action();
    instance.log();
    console.log(main.version);
    console.groupEnd();
});

Injector.resolve(['instance'],function(instance){
    console.group('resolve instance');
    instance.log();
    console.groupEnd();
});