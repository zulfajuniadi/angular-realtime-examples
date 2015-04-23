Angular SockJS
==============

AngularJS module for SockJS. Enables auto-reconnect features, auto serialization to JSON, and other improvements to SockJS native client

## Installation

`# bower install --save ng-sockjs`

## Setup

1. AngularJS module for SockJS. To use include the file in your html:
``<script src="/bower_components/dist/ng-sockjs.min.js"></script>``
2. Load `ng-sockjs` in your app: 

    ```js
    var app = angular.module('app', ['ng.sockjs']);
    ```
    
3. Configure the retry timeout in milliseconds [optional, default: 5000]:

    ```js
    app.value('ngSockRetry', 10000);
    ```
    
4. Configure the SockJS server URL endpoint [optional, default: '/']:
    
    ```js
    app.value('ngSockUrl', '/messages');
    ```
    
## Usage

You can inject the ``socket`` factory into your controllers:

```js
app.controller('ListController', function($scope, socket) {
    $scope.messages = [];
    // runs when the socket is opened
    socket.onOpen(function(){
        $scope.messages = [];
        console.log('Socket Established');
    });
    
    // runs when the socket receives message
    socket.onMessage(function(data){
        // data is JSON.parsed automatically
        $scope.messages.push(data);
        console.log('Got Data');
    });
    
    // runs when the socket closes or disconnects
    socket.onClose(function(data){
        $scope.messages.push(data);
        console.error('Socket closed... will try to reconnect in 5 seconds');
    });
    
    $scope.create = function() {
        var message = $scope.message.trim();
        // Send to server. If the connection is down, it will send 
        // when the server comes back alive.
        socket.send({
            message: message,
            username: $scope.username
        });
        $scope.message = '';
    }
});
```


## Development

1. Have NodeJS and GulpJS installed on your machine
2. Run npm install
3. Edit the `ng-sockjs.js` in the `src/` directory
4. Run `gulp` to minify


## Contributing

Fork and send a pull request to our repo: [https://github.com/zulfajuniadi/ng-sockjs.git](https://github.com/zulfajuniadi/ng-sockjs.git)


##License

The MIT License (MIT)

Copyright (c) 2015 Zulfa Juniadi bin Zulkifli <zulfajuniadi@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.