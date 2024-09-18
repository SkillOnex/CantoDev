const defineComment = (sequelize, DataTypes, User, Post) => {
    const Comment = sequelize.define('Comment', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // Campos de data para tracking
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });

    // Relacionamentos
    Comment.belongsTo(User, { foreignKey: 'userId' });
    Comment.belongsTo(Post, { foreignKey: 'postId' });

    return Comment;
};

module.exports = defineComment;
