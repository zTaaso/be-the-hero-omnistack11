const UniqueIdGenerator = require('../../src/utils/UniqueIdGenerator')

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = UniqueIdGenerator();
        expect(id).toHaveLength(8)
    })
})