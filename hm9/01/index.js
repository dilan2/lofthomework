var apisearch = document.getElementById('APIsearch');
apisearch.addEventListener('input', getFriends);
var listsearch = document.getElementById('listSearch');
listsearch.addEventListener('input', getList);
var leftList = document.getElementsByClassName('left-content')[0];
leftList.addEventListener('click', add);
var del = document.getElementsByClassName('right-content')[0];
del.addEventListener('click', delet);
var friendsAll = [];
var friendsList = [];
save.addEventListener('click', saveBu);

// if(localStorage.mylist) {
//     friendsList = JSON.parse(localStorage.mylist);
// }

function searchFromAPI() {
    new Promise(function(resolve, reject) {
        VK.init({
            apiId: 5773525
        });

        VK.Auth.login(function(response) {
            if(response.session) {
                resolve(response);
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    }).then(function () {
        VK.Api.call('friends.get', {fields: 'photo_50, screen_name, bdate'}, function(result) {
            if(result.error) {
                // reject(new Error(result.error.error_msg));
                console.log('Ошибка!');
            } else {
                friendsAll = result.response;
                if(localStorage.mylist) {
                    var fromLS = JSON.parse(localStorage.mylist);

                    for (var i = 0; i < friendsAll.length; i++) {
                        for (var k = 0; k < fromLS.length; k++) {
                            if (friendsAll[i].uid == fromLS[k]) {
                                friendsList.push(friendsAll[i]);
                            }
                        }
                    }
                }
                getFriends();
                getList();
            }
    })
}).catch(function(e) {
        console.log('Ошибка: ' + e.message);
    })
}

function getFriends() {
    return new Promise(function (resolve, reject) {
                for(var k = 0; k < friendsAll.length; k++) {
                    for(var j = 0; j < friendsList.length; j++) {
                        if(friendsAll[k].uid == friendsList[j].uid) {
                            friendsAll.splice(k, 1);
                        }
                    }
                }
                if(apisearch.value == '') {
                    console.log(friendsAll);
                    let source = friendsListAll.innerHTML;
                    let templFn = Handlebars.compile(source);
                    let template = templFn({items: friendsAll});
                    list.innerHTML = template;

                    resolve();
                } else {

                    var contres = friendsAll.filter(function (arg) {
                        if(arg.first_name.indexOf(apisearch.value) > -1) {
                            return arg.first_name.indexOf(apisearch.value) > -1;
                        } else if(arg.last_name.indexOf(apisearch.value) > -1) {
                            return arg.last_name.indexOf(apisearch.value) > -1;
                        }
                    })

                    let source = friendsListAll.innerHTML;
                    let templFn = Handlebars.compile(source);
                    let template = templFn({items: contres});
                    list.innerHTML = template;
                    resolve();
                }
            })
        }
//     })
// }


function getList() {
    if(arguments[0]) {
        arguments[0].preventDefault();
    }
    if(listsearch.value == '') {
        let source = friendsListNew.innerHTML;
        let templFn = Handlebars.compile(source);
        let template = templFn({items: friendsList});
        listNew.innerHTML = template;
    } else {
        var contres = friendsList.filter(function (arg) {
            if(arg.first_name.indexOf(apisearch.value) > -1) {
                return arg.first_name.indexOf(listsearch.value) > -1;
            } else if(arg.last_name.indexOf(listsearch.value) > -1) {
                return arg.last_name.indexOf(listsearch.value) > -1;
            }
        })
        let source = friendsListNew.innerHTML;
        let templFn = Handlebars.compile(source);
        let template = templFn({items: contres});
        listNew.innerHTML = template;
    }
}

searchFromAPI();

function add(e) {
    e.preventDefault();
    if(e.target.tagName == 'A') {
        var itemId = e.target.parentNode.firstElementChild.dataset.id;
        for(var i = 0; i < friendsAll.length; i++) {
            if(friendsAll[i].uid == itemId) {
                // friendsList.push(friendsAll[i]);


                var test = function() {
                    var temp = 0;
                    for(var j = 0; j < friendsList.length; j++) {
                        if(friendsList[j].uid == itemId) {
                            temp++;
                        }
                    }
                    console.log(temp);
                    return temp;
                }

                if(test()) {
                    return;
                } else {
                    friendsList.push(friendsAll[i]);
                }


            }
        }
        getFriends();
        getList();
    }
}

function delet(e) {
    e.preventDefault();
    if(e.target.tagName == 'A') {
        var itemId = e.target.parentNode.firstElementChild.dataset.id;
        console.log(itemId);
        for(var i = 0; i < friendsList.length; i++) {
            if(friendsList[i].uid == itemId) {
                // friendsList.push(friendsAll[i]);
                friendsList.splice(i, 1);
            }
        }
        getFriends();
        getList();
    }

}

function saveBu(e) {
    e.preventDefault();
    var ls = [];
    for(var i = 0; i < friendsList.length; i++) {
        ls.push(friendsList[i].uid);
    }
    localStorage.setItem('mylist', JSON.stringify(ls));
}



function dragStart(e) {
    if(e.target.className == 'friends-div') {
        console.dir(e.target);
        e.dataTransfer.setData("uid", e.target.firstElementChild.dataset.id);
        return true;
    }
}

function dragEnter(e) {
    e.preventDefault();
    return true;
}
function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    if(e.target.className == 'items right-list-items' || e.target.className =='friends-div' || e.target.className =='friends-ul') {
        var data = e.dataTransfer.getData("uid");
        console.log(data);
        for(var i = 0; i < friendsAll.length; i++) {
            if(friendsAll[i].uid == data) {
                friendsList.push(friendsAll[i]);
                // friendsAll.splice(i, 1);
            }
        }
        getFriends();
        getList();
    }
}

function dragDropR(e) {
    if(e.target.className == 'items left-list-items' || e.target.className =='friends-div' || e.target.className =='friends-ul') {
        var data = e.dataTransfer.getData("uid");
        console.log(data);
        for(var i = 0; i < friendsList.length; i++) {
            if(friendsList[i].uid == data) {
                // friendsList.push(friendsAll[i]);
                friendsList.splice(i, 1);
            }
        }
        getFriends();
        getList();
    }
};

var leftList = document.getElementsByClassName('left-content')[0];
leftList.addEventListener('dragstart', dragStart);
del.addEventListener('dragenter', dragEnter);
del.addEventListener('dragover', dragOver);
del.addEventListener('drop', dragDrop);


del.addEventListener('dragstart', dragStart);
leftList.addEventListener('dragenter', dragEnter);
leftList.addEventListener('dragover', dragOver);
leftList.addEventListener('drop', dragDropR);






































