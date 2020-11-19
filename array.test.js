const objectMapper = require('./object-mapper').objectMapper;

const apiObject = {
    arr: [
        'g',
        5,
        null,
        '8'
    ]
}

describe('test array', () => {
    test('functions', () => {
        expect(objectMapper(apiObject, {
            arr: [String]
        })).toEqual({
            arr: ['g', '5', 'null', '8']
        });
    
        expect(objectMapper(apiObject, {
            arr: [Number]
        })).toEqual({
            arr: [NaN, 5, 0, 8]
        });
    });
})