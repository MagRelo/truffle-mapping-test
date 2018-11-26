const Election = artifacts.require('./contracts/MappingTest');

const name = 'testName';
const depositContract = '0x0000000000000000000000000000000000000001';

contract('Election', async accounts => {
  // Candidates
  describe('Candidates', async function() {
    // can register candidate
    it('Register Candidate', async function() {
      let election = await Election.deployed();

      let registered = await election.candidateRegister.call(
        name,
        depositContract,
        { from: accounts[0] }
      );

      assert.equal(registered, true, 'Candidate was not registered');
    });

    // can check registration status
    it('Check status of Candidate', async function() {
      let election = await Election.deployed();

      let registered = await election.candidateRegister.call(
        name,
        depositContract,
        { from: accounts[0] }
      );

      console.log(registered);

      let candidateStruct = await election.candidateMap.call(depositContract);

      console.log(candidateStruct);

      // candidate found
      assert.equal(candidateStruct[2], depositContract, 'Candidate not found');

      // candidate valid
      assert.equal(candidateStruct[4], true, 'Candidate status not valid');
    });
  });
});
