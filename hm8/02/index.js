new Promise(function(resolve, reject) {
    VK.init({
        apiId: 5759290
    });

    VK.Auth.login(function(response) {
        if(response.session) {
            resolve(response);
        } else {
            reject(new Error('Не удалось авторизоваться'));
        }
    }, 2);
}).then(function () {
        return new Promise(function (resolve, reject) {
            VK.Api.call('friends.get', {fields: 'photo_50, screen_name, bdate'}, function(result) {
                if(result.error) {
                    reject(new Error(result.error.error_msg));
                } else {
                    function sorter(a, b) {
                        if(!a.bdate || a.bdate.split('.').length != 3) {
                            return 1;
                        } else if(!b.bdate || b.bdate.split('.').length != 3) {
                            return -1;
                        } else {
                            var s = a.bdate;
                            var d = s.split('.');
                            var unixA = (new Date (+d[2], +d[1] - 1, +d[0], 0, 0, 0) ).getTime();
                            var ss = b.bdate;
                            var db = ss.split('.');
                            var unixB = (new Date (+db[2], +db[1] - 1, +db[0], 0, 0, 0) ).getTime();
                            return unixB - unixA;
                        }
                    }
                    result.response.sort(sorter);
                    console.log(result.response);
                    let source = friendsList.innerHTML;
                    let templFn = Handlebars.compile(source);
                    let template = templFn({items: result.response});
                    list.innerHTML = template;
                    resolve();
                }
            })
        })

}).catch(function(e) {
    console.log('Ошибка: ' + e.message);
})


