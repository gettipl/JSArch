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
            console.log('FooWithDependencies');
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

Injector.resolve(['ExampleController'],function(controller){
    controller.action();
});