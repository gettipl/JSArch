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
            console.log('FooWithDependencies');
            foo.log();
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

Injector.instance("instance",[],function(){
    console.log('instance created');
    return {

    }
});

Injector.resolve(['ExampleController', 'instance', 'main'],function(controller,instance,main){
    controller.action();
    console.log(main.version);
});

Injector.resolve(['instance'],function(instance){

});