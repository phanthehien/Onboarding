const Hapi = require('hapi');
const inert =  require('inert');
const Good = require('good');
const Boom = require('Boom');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.route( {
    method: 'GET',
    path: '/{files*}',
    handler: function (request, reply) {
        console.log(('stuff'));
        reply("stuff" + request.params);
        // reply('Hello, world!');
    }
});

server.route( {
    method: 'GET',
    path: '/helloBoom',
    handler: function (request, reply) {
        console.log('go to hello Boom');
        var err = Boom.badRequest('invalid query', { stuff: 'and more' });
        err.output.payload
        err.output.payload.data = err.data;

        reply(err);
    }
});



server.route( {
    method: 'GET',
    path: '/files/{files*2}',
    handler: function (request, reply) {
        console.log(('files * 2'));
        reply("files * 2: " + request.params);

        // reply('Hello, world!');
    }
});





//
// server.route({
//     method: 'GET',
//     path: '/',
//     handler: function (request, reply) {
//         reply('Hello, world!');
//     }
// });
//
// server.route({
//     method: 'GET',
//     path: '/{name}',
//     handler: function (request, reply) {
//         reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
//     }
// });
//
// server.register(inert, function (err) {
//
//     if (err) {
//         throw err;
//     }
//
//     server.route({
//     method: 'GET',
//     path: '/hello',
//     handler: function (request, reply) {
//         reply.file('./public/hello.html');
//     }
//     });
// });
//
// server.register({
//     register: Good,
//     options: {
//         reporters: {
//             console: [{
//                 module: 'good-squeeze',
//                 name: 'Squeeze',
//                 args: [{
//                     response: '*',
//                     log: '*'
//                 }]
//             }, {
//                 module: 'good-console'
//             }, 'stdout']
//         }
//     }
// }, function (err) {
//
//         if (err) {
//             throw err; // something bad happened loading the plugin
//         }
//
//         server.start( function (err) {
//
//         if (err) {
//             throw err;
//         }
//         server.log('info', 'Server running at: ' + server.info.uri);
//     });
// });
//



server.start(function (err) {

    if (err) {
        throw err;
    }
    console.log('Server running at: ${server.info.uri}');
});
