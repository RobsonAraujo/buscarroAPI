
const winston = require('winston')
const insightDao = require('../../dao/InsightDao')


exports.searchCar = function (req, res) {


    const id_user = req.authInfo.id


    if (!id_user) {
        winston.error('login -> body -  *Bad Request - Missing parameters*')
        return res.status(400).json({
            status: 400,
            message: "Bad Request - Missing parameters "
        })
    }

    return insightDao.searchCar(id_user)
        .then(result => {
            if (!result || result.length <= 0) {
                winston.info('insight->  *not result found*')
                return res.status(401).json({
                    status: 401,
                    message: "not found result"
                })
            } else {
                winston.info('insight->  *The request is OK*');
                return res.status(200).json({
                    status: 200,
                    message: "Sucessfuly - The request is OK ",
                    result
                })
            }
        })

}