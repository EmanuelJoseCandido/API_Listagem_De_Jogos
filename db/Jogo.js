const Sequelize = require("sequelize");
const connection = require("./db");

const Jogo = connection.define('jogos', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    year:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price:{
        type: Sequelize.DECIMAL,
        allowNull: false
    }
});

Jogo.sync({force: false}).then(() => {
    console.log("Tabela criada com sucesso!");
});

module.exports = Jogo;