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
    albumsRoute: function () {
        return Model.getAlbums().then(function (albums) {
            console.log(albums);

            results.innerHTML = View.render('albums', {list: albums});
            document.addEventListener('click', function (e) {
                console.dir(e.target);
                if(e.target.classList.contains('album')) {
                    console.log(e.target.parentNode.dataset.album);
                    Controller.photosRoute(e.target.parentNode.dataset.album);
                }
            });

        })
    },
    photosRoute: function(album) {
        return Model.getPhotos(album).then(function(photos) {
            let photosObj = {};
            photos.forEach(item => {
                photosObj[item.pid] = item;
        })

            return Promise.all(photos.filter(item => item.comments.count)
                    .map(item => Controller.photoCommentsRoute(photosObj, item.pid)))
            .then(() => photosObj);

        }).then(function (result) {
            var album__photos = document.getElementById('album__photos');
            album__photos.innerHTML = View.render('photos', {list: result})
        }  );
    },
    photoCommentsRoute: function(photosObj, pid) {
        return Model.getPhotoComments(pid).then(function(comments) {
            photosObj[pid].commentsContent = comments;
            console.log(comments);
            for(var i = 0; i < photosObj[pid].commentsContent.profiles.length; i++) {
                for(var k = 0; k < photosObj[pid].commentsContent.items.length; k++) {
                    if (photosObj[pid].commentsContent.profiles[i].id == photosObj[pid].commentsContent.items[k].from_id) {
                        photosObj[pid].commentsContent.profiles[i].text = photosObj[pid].commentsContent.items[k].text;
                    }
                }
            }
        });
    }
};