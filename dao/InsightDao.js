const connectionFactory = require('../services/connectionFactory')
const knex = connectionFactory.knex;
const security = require('../services/security')

module.exports = {
    searchCar(id_user) {
        return (async () => {

            const userProfile = await knex('user_profile').where({ id_user })
            const userPersonalInfo = await knex.select(`date_birth`, `marital_status`, `latitude`, `longitude`)
                .from('user').where({ id_user })

            // Define rules
            let rules = { car_trunk_l: ``, qtd_occupants: ``, height_adjustment: 0, car_height: ``, priceMax: ``, priceMin: `` }
            rules.car_height = 1,6
            // Define car trunk 
            const qtd_baggage = userProfile[0].qtd_baggage

            if (qtd_baggage <= 1) {
                rules.car_trunk_l = 300
            } else if (qtd_baggage == 2) {
                rules.car_trunk_l = 400
            } else {
                rules.car_trunk_l = 500
            }

            // Define car quantity of occupants 
            const qtd_team = userProfile[0].qtd_team

            if (qtd_team <= 5) {
                rules.qtd_occupants = 5
            } else {
                rules.qtd_occupants = 7
            }

            // Define height 
            const userHeight = userProfile[0].height


            if (userHeight < 1.6) {
                rules.height_adjustment = 1
            } else if (userHeight > 1.8) {
                rules.car_height = 1.8
            }

            // define price
            const money_available_level = userProfile[0].money_available_level
          
            if (money_available_level == 1) {
                rules.priceMin = 0.000
                rules.priceMax = 20.000
            } else if (money_available_level == 2) {

                rules.priceMin = 21.000,00
                rules.priceMax = 40.000,00
            } else if (money_available_level == 3) {
                rules.priceMin = 41.000
                rules.priceMax = 60.000
            } else if (money_available_level == 4) {
                rules.priceMin = 51.000
                rules.priceMax = 80.000
            } else {
                rules.priceMin = 80.000,00
                rules.priceMax = 10.000000,00
            }

            // Define Price 
            

            const car = await knex('car')
                .where('car_trunk_l', '<', rules.car_trunk_l)
                .andWhere(`qtd_occupants`, rules.qtd_occupants)
                .andWhere(`car_height`, `>`, rules.car_height)
                .andWhere(`price`, `>`, rules.priceMin)
                .andWhere(`price`, `<`, rules.priceMax)
                .andWhere(`height_adjustment`, rules.height_adjustment)
                
            return car
        })()
    }

}