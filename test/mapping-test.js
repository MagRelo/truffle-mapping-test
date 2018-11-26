const Election = artifacts.require('./contracts/MappingTest');

const name = 'testName';
const depositContract = '0x0000000000000000000000000000000000000001';

contract('Election', async accounts => {
  // Candidates

  it('Register Candidate', async () => {
    let election = await Election.deployed();

    let owner = await election.candidateRegister.call(name, depositContract, {
      from: accounts[0]
    });

    assert.equal(owner, accounts[0], 'Candidate was not registered');
  });

  it('Check owner of Candidate', async () => {
    let election = await Election.deployed();

    // create candidate
    let candidateOwner = await election.candidateRegister.call(
      name,
      depositContract,
      { from: accounts[0] }
    );

    // get owner
    let owner = await election.candidateOwner.call(depositContract);

    assert.equal(owner, accounts[0], 'Wrong Owner');
  });
});
