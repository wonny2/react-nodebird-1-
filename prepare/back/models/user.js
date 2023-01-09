module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User' , { // MySQL에는 자동적으로 대문자U가 소문자u로 바뀐다.
        // id가 기본적으로 들어가있다. 들어가는 순서대로 1,2,3... 생김
        email: {
            type: DataTypes.STRING(30), // 데이터 타입을 지정해줘야 한다. STRING, TEXT(긴글), INTEGER, FLOAT, DATETIME
            allowNull: false, // 필수여부 = 빈값을 허용하시겠습니까?
            unique: true, // 고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30), // 데이터 타입을 지정해줘야 한다.
            allowNull: false, // 필수여부 = 빈값을 허용하시겠습니까?
        },
        password: {
            type: DataTypes.STRING(100), // 데이터 타입을 지정해줘야 한다.
            allowNull: false, // 필수여부 = 빈값을 허용하시겠습니까?
        },
    }, {
        charset: 'uft8',
        collate: 'utf8_general_ci', // 위에 두줄이 한글이 저장되도록 만든다.
    });

    // 관계형 데이터베이스이기 때문에 어떤 관계인지 설정해줘야함!
    // User가 Comment 단 Post
    User.associate = (db) => {
        // 일대다 관계
        db.User.hasMany(db.Post) // 문장 그대로 User가 Post를 hasMany 가질 수 있다.
        db.User.hasMany(db.Comment) // 댓글도 마찬가지임
        db.User.belongsToMany(db.Post, {through: 'Like', as: 'Liked'}) // 사용자, 게시글의 좋아요 관계/ 한 유저가 좋아요수 누른 게시글 수가 많을 수 있으니까.
        // through는 다대다관계는 중간테이블에서 정보를 가져오는데 그 중간테이블 이름을 정해준 것
    };
    return User;
};