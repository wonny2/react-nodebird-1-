module.exports = (sequelize, DataTypes) => {
    const HashTag = sequelize.define('HashTag' , { // MySQL에는 자동적으로 대문자U가 소문자u로 바뀐다.
        // id가 기본적으로 들어가있다. 들어가는 순서대로 1,2,3... 생김
        name: {
                type: DataTypes.STRING(20),
                allowNull: false,
        },
    }, {
        charset: 'uft8mb4',
        collate: 'utf8mb4_general_ci', // 위에 두줄이 한글이 저장되도록 만든다.
    });
    HashTag.associate = (db) => {
        db.HashTag.belongsToMany(db.Post);
    };
    return User;
};