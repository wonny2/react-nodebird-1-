ㅣ
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
    User.associate = (db) => {};
    return User;
};