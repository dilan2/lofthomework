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
    photosRoute: function() {
        return Model.getPhotos().then(function(photos) {
            var temp = {};
            temp.mas = [];
            for(var i = 0; i < photos.length; i++) {
                var photoInfo = {};
                photoInfo.src = photos[i].src;
                photoInfo.likes = photos[i].likes;
                photoInfo.reposts = photos[i].reposts;
                photoInfo.comments = photos[i].comments;
                Controller.photoCommentsRoute(photoInfo, photos[i].pid);


                temp.mas.push(photoInfo);
            }
            console.log(temp.mas[0].commentsContent);
            results.innerHTML = View.render('photos', {list: temp.mas});
        });
    },
    photoCommentsRoute: function(photoInfo, pid) {
        return Model.getPhotoComments(pid).then(function(comments) {
            console.log(comments);
            photoInfo.commentsContent = comments;
            // return comments;
            // results.innerHTML = View.render('photos', {list: photos});
        });
    }
};
