var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

var comments = []

// if use http.createserver, you have not to use 'request'.
http
    .createServer(function (req, res) {
        
        // 调用url包得到请求的url
        var urlPath = url.parse(req.url, true)
        urlPathName = urlPath.pathname

        if (urlPathName === '/') {
            
            fs.readFile('./views/index.html', function (err, data) {

                if (err) {
                    return res.end('404 Not Found.')
                }
                
                // 将index.html中的列表渲染进去
                var htmlStr = template.render(data.toString(), {
                    comments: comments
                })

                res.end(htmlStr)
            })

        } else if (urlPathName === '/post') {

            fs.readFile('./views/post.html', function (err, data) {
                
                if (err) {
                    return res.end('404 Not Found.')
                }
                
                res.end(data)
            })

        } else if (urlPathName.indexOf('/public/') === 0) {
            
            fs.readFile('.' + urlPathName, function (err, data) {
            
                if (err) {
                    return res.end('404 Not Found')
                }
            
                res.end(data)
            })
        } else {

            fs.readFile('./views/404.html', function (err, data) {
            
                if (err) {
                    return res.end('404 Not Found.')
                }
            
                res.end(data)
            })
        }
    })


    .listen(5000, function () {
        console.log('running...')
    })