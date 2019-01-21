'use strict'

module.exports = function (Animals) {
  try {
    Animals.getUnminted = async () => {
      const unmintedAnimals = await Animals.find({where: {minted: false}})
      const unmintedAnimal = unmintedAnimals[Math.floor(Math.random()*unmintedAnimals.length)]
      return unmintedAnimal.id
    }

    Animals.getUnmintedCount = async () => {
      const unmintedAnimals = await Animals.find({where: {minted: false}})
      return unmintedAnimals.length
    }

    Animals.remoteMethod(
      'getUnminted', {
        http: {
          path: '/unminted',
          verb: 'get'
        },
        returns: {
          arg: 'id',
          type: 'object'
        }
      })

    Animals.remoteMethod(
      'getUnmintedCount', {
        http: {
          path: '/unminted/count',
          verb: 'get'
        },
        returns: {
          arg: 'count',
          type: 'number'
        }
      }
    )

  } catch (err) {
    throw err
  }
}
