module.exports = function (sequelize, DataTypes) {
    var Video = sequelize.define('Video', {
    	uid: {type: DataTypes.STRING(64)},
        hash: DataTypes.STRING,
        filename: DataTypes.STRING,
        url:DataTypes.STRING,
        create_time:DataTypes.STRING,
    }, {
        tableName: 'video',
        createdAt   : 'created_at',
        updatedAt   : 'updated_at',
        timestamps  : true,
        underscored : true,
    });
    return Video;
};
