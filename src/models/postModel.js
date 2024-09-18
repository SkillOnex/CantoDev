const definePost = (sequelize, DataTypes, User) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    // Relacionamentos
    Post.belongsTo(User, { foreignKey: 'userId' });

    return Post;
};

module.exports = definePost;
