Angular Realtime Examples
=========================

AngularJS and NodeJS realtime technologies compared. Covers short-polling, long-polling, server-sent events and websocket.

## Requirements

[NodeJS](https://nodejs.org/download/)

*As the target audience of this repo is assumed to have little knowledge in NodeJS, bower & NPM, all dependencies are committed together.*
    
## Usage

This repo contains four examples:
1. ex1.js - Realtime example via short-polling
2. ex2.js - Realtime example via long-polling
3. ex3.js - Realtime example via EventSource
4. ex4.js - Realtime example via websockets (SockJS)

To view each examples in action, just run `node ex1.js` to start the local server [http://localhost:3000/](http://localhost:3000/).

To execute `ex2.js` run `node ex2.js`... and so on

Each example file will load views corresponding to their name inside the `views/` folder. E.g: `ex1.js` will serve `views/ex1.html` file.

## Contributing

Fork and send a pull request to our repo: [https://github.com/zulfajuniadi/angular-realtime-examples](https://github.com/zulfajuniadi/angular-realtime-examples)


##License

The MIT License (MIT)

Copyright (c) 2015 Zulfa Juniadi bin Zulkifli <zulfajuniadi@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.