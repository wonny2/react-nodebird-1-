module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment' , { // MySQL에는 자동적으로 대문자U가 소문자u로 바뀐다.
        // id가 기본적으로 들어가있다. 들어가는 순서대로 1,2,3... 생김
        content: {
            type: DataTypes.TEXT,
            allowNull: false, // 필수
        },
        // UserId: 1, 1번 유저가,
        // PostId: 3, 3번 게시글을 작성했다.
    }, {
        charset: 'uft8mb4',
        collate: 'utf8mb4_general_ci', // 위에 두줄이 한글이 저장되도록 만든다.
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post); // 댓글 하나가 여러게 게시글에 달릴 수 있나..? NOPE! 댓글은 게시글에 속해져 있는 거임!
    };
    return User;
};