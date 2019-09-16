const LectureEvaluation = artifacts.require('./LectureEvaluation.sol')
const fs = require('fs')

module.exports = function (deployer) {
  deployer.deploy(LectureEvaluation)
    .then(() => {
    if (LectureEvaluation._json) {
      // 1. Record recently deployed contract's abi file to 'deployedABI'
      fs.writeFile(
        'deployedABI',
        JSON.stringify(LectureEvaluation._json.abi, 2),
        (err) => {
          if (err) throw err
          console.log(`The abi of ${LectureEvaluation._json.contractName} is recorded on deployedABI file`)
        })
    }

    // 2. Record recently deployed contract's address to 'deployedAddress'
    fs.writeFile(
      'deployedAddress',
      LectureEvaluation.address,
      (err) => {
        if (err) throw err
        console.log(`The deployed contract address * ${LectureEvaluation.address} * is recorded on deployedAddress file`)
    })
  })
}
