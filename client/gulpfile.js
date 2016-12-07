var gulp = require('gulp');


function startNW() {
    var child = require('child_process').exec('npm run nw');
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
}


var reloads = [];

gulp.task('default', function () {


    return gulp.watch('dist/*', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        if (reloads.length > 0) {
            console.log('canceling')
            clearTimeout(reloads[reloads.length - 1]);
        }
        var x = setTimeout(function () {
            wss.broadcast('reload');
        }, 500)
        reloads.push(x);

    });

});


var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: 4359 });

wss.broadcast = function broadcast(data) {
    console.log('broadcasting', data);
    if (wss.clients.length == 0) {
        startNW();
    }
    else {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    }

};


