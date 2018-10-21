
const profileDao = require('../../dao/ProfileDao')
const winston = require('winston')

exports.saveProfile = function (req, res) {
    const { height, qtd_baggage, qtd_team, purpose_use, money_available_level } = req.body;
    const id_user = req.authInfo.id
    if ( !height || !qtd_baggage || !qtd_team || !purpose_use || !money_available_level) {
        winston.error('saveProfile -> body -  *Bad Request - Missing parameters*')
        return res.status(400).json({
            status: 400,
            message: "Bad Request - Missing parameters "
        })
    }
 

  return profileDao.saveProfile(id_user, height, qtd_baggage, qtd_team, purpose_use, money_available_level)
        .then(result => {
            winston.info(`profile -> saveProfile - *Successfuully new resource is created with id ${result}*`)
            return res.status(201).json({
                status: 201,
                message: "Successfuully new resource is created with id " + result
            })

        })
        .catch(error => {

            winston.error(`profile -> saveProfile - *Internal Server error - ${error}*`)
            return res.status(500).json({
                status: 500,
                message: "Internal Server error - " + error
            })
        })
}
