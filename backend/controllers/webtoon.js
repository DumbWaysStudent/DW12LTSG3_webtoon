const Webtoon = require('../models').webtoon
const Users = require('../models').user

exports.index = (req, res) => {
    Webtoon.findAll({
        include: [{
            model:Users,
            as:"createdBy"
        }]
    })
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        res.send(err)
    })
}
exports.show = (req, res) => {
    const id = req.params.id
    Webtoon.findOne({
        where:{id},
        include:[{
            model:Users,
            as:"createdBy"
        }]
    })
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        res.send(err)
    })
}