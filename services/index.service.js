
const { PrismaClient } = require('@prisma/client');
const { response } = require('express');
const prisma = new PrismaClient({ 
    datasources: { 
      db: { 
       url: process.env.DATABASE_URL_INTRNAL
    } } });
 
    /// retorna os dados do mapa de area
exports.index = async (req, res) => {
    await prisma.city.findMany({
        include: {
            user_in_city: {  
           include: {
            user: {
                select: {
                  name: true,
                  email: true,
                  id: true,
                }
              }
          }
            }
      }
    }).then((response) => {
        res.json(response)
    }).catch((err) => {
        res.status(500).json({msg: 'ocorreu um erro contate o suporte', err})
    })
}

/// retorna os dados do mada de area de uma data especifica
exports.search = async (req, res) => {
     await prisma.city.findMany({
        include: {
          user_in_city: {
              where: {
                  date: new Date(req.body.date),
              },
         include: {
                user: {
                    select: {
                    name: true,
                    email: true,
                    id: true,
                    }
                }
            }
          }
      }
    }).then((response) => {
        res.json(response)
    }).catch((err) => {
        res.status(500).json({msg: 'ocorreu um erro contate o suporte', err})
    })
}

///busca um usuario pelo nome
exports.searchColaborator = async (req, res) => {
const {data} = req.params
console.log(data)
   await prisma.user.findMany({
        where: {
            name: {
                contains: data
            }
        }
    }).then((response) => {
        res.json(response)
    }
    ).catch((err) => {
        res.status(500).json({msg: 'ocorreu um erro contate o suporte', err})
    }   )

    
}


// retorna tadas as cidades
exports.city = async (req, res) => {
    await prisma.city.findMany({
    }).then((response) => {
        res.json(response)
    }).catch((err) => {
        res.status(500).json({msg: 'ocorreu um erro contate o suporte', err})
    }   )
} 

//retorna todos os colaboradores
exports.colaborator = async (req, res) => {
    const colaborator = await prisma.user.findMany({})
    res.status(200).json(colaborator)
}

//remove um tecnico de uma cidade
exports.delete = async (req, res) => {
    // verifica se o usuario tem permissao para deletar
    if (parseInt(req.user.department) > 2){
        await prisma.user_in_city.delete({
            where: {
            id: req.body.id,
            },
        }).then((response) => {
            res.status(200).json({st: 1, msg: " t??cnico deletado com sucesso", response})
            }
        ).catch((err) => {
            res.status(500).json({st: 1, msg: "ocoorreu um erro contate o suporte", err})
        })
    }else{ 
        res.status(401).json({st:0, msg: "Sem permiss??o"})
        } 
} 

     /// adiciona um tecnico em uma cidade
exports.create = async (req, res) => {
const {city, colaborator, type, period, date } = req.body

    // verifica se os dados foram preenchidos
    if (city == 0 || colaborator == 0 || type == 0 || period == 0 || date == "" ) {
        res.status(406).json({
            st: 0,
            msg: "preencha todos os campos"
        })
    }else{ 
    await prisma.user_in_city.create({
        data: {
        city_id: parseInt(req.body.city),
        User_id:  parseInt(colaborator),
        periodo:req.body.period.toString(),
        date: new Date(req.body.date),
        type: req.body.type.toString()
}}).then((response) => {
    res.json({st: 1, msg: " t??cnico cadastrado com sucesso", response})

}).catch((err) => {
    res.status(500).json({st: 0, msg: "ocoorreu um erro contate o suporte", err})
    })
}
}


/// adiciona as cidades os banco de dados
exports.teste = async (req, res) => {
    const create = await prisma.city.createMany({ 
        data: 
        [
        { "name": "ALTO CAPARA??"},
        { "name": "ALTO JEQUITIBA"},
        { "name": "ALEGRE"},
        { "name": "ANTONIO PRADO DE MINAS"},
        { "name": "BOM JESUS DO ITABAPOANA"},
        { "name": "BOM JESUS DO NORTE"},
        { "name": "CAIANA"},
        { "name": "CAPARA??"},
        { "name": "CARANGOLA"},
        { "name": "DIVINO DE S??O LOUREN??O"},
        { "name": "DORES DO RIO PRETO"},
        { "name": "ESPERA FELIZ"},
        { "name": "GUA??U??"},
        { "name": "MANHUMIRIM"},
        { "name": "NATIVIDADE"},
        { "name": "OURANIA"},
        { "name": "PEDRA DOURADA"},
        { "name": "PIRAPETINGA"},
        { "name": "PORCIUNCULA"},
        { "name": "QUERENDO"},
        { "name": "S??O JOSE DO CAL??ADO"},
        { "name": "TOMBOS"},
        { "name": "VARRE SAI"}
        ]
}).then((response) => {

    res.status(200).json(response)
}).catch((err) => {
    res.status(500).json({st: 0, msg: "ocoorreu um erro contate o suporte", err})
})
}


