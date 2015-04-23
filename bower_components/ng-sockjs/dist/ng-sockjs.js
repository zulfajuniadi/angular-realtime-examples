/**
The MIT License (MIT)

Copyright (c) 2015 Zulfa Juniadi bin Zulkifli <zulfajuniadi@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

angular.module('ng.sockjs', [])
    .value('ngSockUrl', '/')
    .value('ngSockRetry', 5000)
    .factory('socket', ['$rootScope', 'ngSockUrl', 'ngSockRetry', function($rootScope, ngSockUrl, ngSockRetry){
        var buffer             = [];
        var onOpenCallbacks    = [];
        var onCloseCallbacks   = [];
        var onMessageCallbacks = [];
        var sockjs;
        var newSockJS = function() {
            sockjs = new SockJS(ngSockUrl);
            sockjs.onopen = function() {
                buffer = buffer.filter(function(data){
                    sockjs.send(JSON.stringify(data));
                    return false;
                });
                onOpenCallbacks.forEach(function(callback){
                    callback(sockjs);
                    $rootScope.$digest();
                });
            }
            sockjs.onclose = function(){
                onCloseCallbacks.forEach(function(callback){
                    callback();
                    $rootScope.$digest();
                });
                setTimeout(newSockJS, ngSockRetry);
            };
            sockjs.onmessage = function(event){
                if(event.type == 'message') {
                    onMessageCallbacks.forEach(function(callback){
                        callback.call(window, JSON.parse(event.data));
                        $rootScope.$digest();
                    });
                }
            };
        }
        newSockJS();
        return {
            onOpen: function(callback) {
                onOpenCallbacks.push(callback);
            },
            onClose: function(callback) {
                onCloseCallbacks.push(callback);
            },
            onMessage: function(callback) {
                onMessageCallbacks.push(callback);
            },
            send: function(data) {
                if(sockjs.readyState !== 1) {
                    buffer.push(data);
                } else {
                    sockjs.send(JSON.stringify(data));
                }
            }
        }
    }]);