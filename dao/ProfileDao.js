const connectionFactory = require('../services/connectionFactory')
const knex = connectionFactory.knex;

module.exports = {
    saveProfile(id_user, height, qtd_baggage, qtd_team, purpose_use, money_available_level) {
        return knex('user_profile').insert({
            id_user, height, qtd_baggage, qtd_team, purpose_use, money_available_level
        }) 
    }
}