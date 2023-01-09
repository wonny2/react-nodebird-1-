module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post' , { // MySQL에는 자동적으로 대문자U가 소문자u로 바뀐다.
        // id가 기본적으로 들어가있다. 들어가는 순서대로 1,2,3... 생김
        content: {},
    }, {
        charset: 'uft8mb4',
        collate: 'utf8mb4_general_ci', // 위에 두줄이 한글이 저장되도록 만든다.
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User) // 게시글은 User에게 속해있겠쥬? 그러니 belongsTo
        db.Post.belongsToMany(db.HashTag) // 다대다관계(belongsToMany) 한 게시글 안에 많은 해쉬태그를 적을 수 있고, 반대로 한 해쉬태그를 누르면 해당 게시글이 쫙 뜨는 것과 동일
        db.Post.hasMany(db.Comment) // 하나의 게시글에 많은 댓글을 달 수 있으니까
        db.Post.hasMany(db.Image)
        db.Post.belongsToMany(db.User, {through: 'Like', as: 'Likers'}) // 해쉬태그와 비슷하게 한 게시글 좋아요 유저가 많을 수도 있으니까.
        // as는 나중에 as에 따라서 post.getLikers처럼 게시글 좋아요 누른 사람을 가져올 수 있다. // 위에 db.User와 구별할 수 있음
    };
    return User;
};

// uft8mb4 - mb4는 이모티콘까지 저장 가능하게 함