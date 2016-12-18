var Controller = {
    musicRoute: function() {
        return Model.getMusic().then(function(music) {
            results.innerHTML = View.render('music', {list: music});
        });
    },
    friendsRoute: function() {
        return Model.getFriends().then(function(friends) {
            results.innerHTML = View.render('friends', {list: friends});
        });
    },
    newsRoute: function() {
        return Model.getNews().then(function(news) {
            results.innerHTML = View.render('news', {list: news.items});
        });
    },
    groupsRoute: function() {
        return Model.getGroups().then(function(groups) {
            var mod = groups.splice(0,1);
            console.log(groups);
            results.innerHTML = View.render('groups', {list: groups});
        });
    },
    // photosRoute: function() {
    //     return Model.getPhotos().then(function(photos) {
    //         var temp = {};
    //         temp.mas = [];
    //         for(var i = 0; i < photos.length; i++) {
    //             var photoInfo = {};
    //             photoInfo.src = photos[i].src;
    //             photoInfo.likes = photos[i].likes;
    //             photoInfo.reposts = photos[i].reposts;
    //             photoInfo.comments = photos[i].comments;
    //             Controller.photoCommentsRoute(photoInfo, photos[i].pid);
    //
    //
    //             temp.mas.push(photoInfo);
    //         }
    //         console.log(temp.mas[0].commentsContent);
    //         results.innerHTML = View.render('photos', {list: temp.mas});
    //     });
    // },
    // photoCommentsRoute: function(photoInfo, pid) {
    //     return Model.getPhotoComments(pid).then(function(comments) {
    //         console.log(comments);
    //         photoInfo.commentsContent = comments;
    //         // return comments;
    //         // results.innerHTML = View.render('photos', {list: photos});
    //     });
    // },
    photosRoute: function() {
        return Model.getPhotos().then(function(photos) {
            let photosObj = {};
            photos.forEach(item => {
                photosObj[item.pid] = item;
        })

            return Promise.all(photos.filter(item => item.comments.count)
                    .map(item => Controller.photoCommentsRoute(photosObj, item.pid)))
            .then(() => photosObj);

        }).then(result => results.innerHTML = View.render('photos', {list: result}));
    },
    photoCommentsRoute: function(photosObj, pid) {
        return Model.getPhotoComments(pid).then(function(comments) {
            photosObj[pid].commentsContent = comments;
            console.log(comments);
            // for(let item of photosObj[pid].commentsContent.profiles) {
            //     photosObj[pid].commentsContent.profiles.text = photosObj[pid].commentsContent.items.text;
            // }
            for(var i = 0; i < photosObj[pid].commentsContent.profiles.length; i++) {
                for(var k = 0; k < photosObj[pid].commentsContent.items.length; k++) {
                    if (photosObj[pid].commentsContent.profiles[i].id == photosObj[pid].commentsContent.items[k].from_id) {
                        photosObj[pid].commentsContent.profiles[i].text = photosObj[pid].commentsContent.items[k].text;
                    }
                }
            }
            // photosObj[pid].commentsContent.profiles[photosObj[pid].commentsContent.profiles.length+1] = comments.items;
            // photosObj[pid].commentsContent.text = comments.items.text;
        });
    }
};


// var photosObj = {};