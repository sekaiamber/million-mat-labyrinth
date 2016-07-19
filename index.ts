import {Server} from 'corona'
import controllers from './app/controllers'
import http = require('http')
import express = require('express')
import repl = require("repl");
var app = express();
var server = http.createServer(app);
server.listen(8080, '0.0.0.0');
app.use(express.static('public'));

var coronaServer = new Server(controllers, server);

var replServer = repl.start({
    prompt: "game > ",
});

replServer.context.coronaServer = coronaServer;
replServer.on('exit', () => process.exit())
