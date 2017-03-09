const Hapi = require('hapi');
const inert =  require('inert');
const Good = require('good');
const Boom = require('Boom');
const Joi = require('joi');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.state('hello', {
    ttl: 60 * 60 * 1000,
    path: "/",
    isHttpOnly: true,
    encoding: 'iron',
    isSecure: false,
    password: 'a5LewP10pXNbWUdYQakUfVlk1jUVuLuUU6E1WEE302k'
});

server.route( {
    method: 'GET',
    path: '/{files*}',
    handler: function (request, reply) {
        console.log(('stuff'));
        reply("stuff" + request.params);
        // reply('Hello, world!');
    }
});



server.route({
    method: 'GET',
    path: '/cookie',
    config: {
        handler: function(request, reply) {
            var hello = request.state.hello;
            reply('Cookies!' +  hello)
                .state('hello', 'world');
        }
    }
});


server.route({
    method: ['POST','PUT'],
    path: '/user/{id?}',
    config: {
        validate: {
            params: Joi.object().keys({
                id: Joi.number()
            }),
            payload: Joi.object().keys({
                id: Joi.number(),
                email: Joi.string()
            }).unknown(),
            query: Joi.object().keys({
                id: Joi.number()
            })
        },
        handler: function(request, reply) {
            reply({
                params: request.params,
                query: request.query,
                payload: request.payload
            })
        }
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
