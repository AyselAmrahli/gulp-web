var name = 'Ayten';

// document.write('Hello' + name);

var greetTemplate = templates['greeting']({

message:name

});
document.write(greetTemplate);
