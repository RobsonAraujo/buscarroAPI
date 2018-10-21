
const winston = require('winston')
const insightDao = require('../../dao/InsightDao')
const cheerio = require('cheerio')
const axios = require('axios')
const request = require('request')


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



exports.callCrowler = function (req, res) {


    const { marca, modelo, ano, estado, cidade } = req.params

    if (!marca || !modelo || !ano || !estado || !cidade) {
        winston.error('callCrowler -> body -  *Bad Request - Missing parameters*')
        return res.status(400).json({
            status: 400,
            message: "Bad Request - Missing parameters "
        })
    }

    let resContext = res
    return request('https://www.icarros.com.br/comprar/' + cidade +`-`+ estado + '/' + marca + '/' + modelo + '/' + ano, (err, res, body) => {
        if (err) console.log('Erro: ' + err)
        const $ = cheerio.load(body)
        const offering = $.html('.listavertical li .anuncio_container .clearfix h2')
    
        return resContext.status(200).json({
            status: 200,
            message: "Sucessfuly - The request is OK  ",
            data : offering
        })
    })
}