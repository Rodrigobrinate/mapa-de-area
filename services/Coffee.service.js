
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({ datasources: {  db: { url: "mysql://root:123456@mysqldb:3306/mapa-de-area" } } });
exports.index = async (req, res) => {
   const city = await prisma.coffee.findMany({
     
        include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  id: true,
                }
              }
              
      }
    })
    res.json(city) 
}

exports.create = async (req, res) => {

  let coffee = await prisma.coffee.findMany({})

  if (coffee.length >= 3) {
    res.json({
      status: 0,
      msg: "espere um colaborador voutar do café"
    })
  }else{

  const usersCoffe = await prisma.coffee.findUnique({
    where: {
      id: parseInt(req.user.id)
    }
  })
  if (usersCoffe) {
    res.json({
      st: 1,
      msg: 'Você já está café',
      date: usersCoffe.created_at.getTime(),
      auth: true
    })  } else {  
  const coffee = await prisma.coffee.create({
    data: {
      user_id: parseInt(req.user.id),
    }
  
  })
  
  return res.json({ date: new Date(),st: 1,
    msg: 'Você está café',})
    }}
}
 

exports.delete = async (req, res) => {
  let coffee = await prisma.coffee.findFirst({
    where: {
      user_id: parseInt(req.user.id)
    }
  })
   historic = await prisma.Historic_pause.create({
    data: {
      initial: new Date(coffee.created_at),
      final: new Date(),
      user_id: parseInt(req.user.id),
    }})


  await prisma.coffee.delete({
    where: {
      id: parseInt(coffee.id)
}}) 

  coffee = await prisma.coffee.findMany({
    include: {
          user: {
            select: {
              name: true,
              email: true,
              id: true,
            }
          },
  }
})
  res.json(coffee)
}