'use strict'

module.exports = function (Animals) {
  try {
    Animals.getUnminted = async () => {
      const unmintedAnimals = await Animals.find({where: {minted: false}})
      const unmintedAnimal = unmintedAnimals[Math.floor(Math.random()*unmintedAnimals.length)];
      return unmintedAnimal.id
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
      }
    );
  } catch (err) {
    throw err
  }
}
