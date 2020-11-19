const objectMapper = require('./object-mapper').objectMapper;

const apiObject = {
	a: 'a',
	b: '2',
	c: 3,
	d: 4
}

describe('test fields', () => {
    test('test fields', () => {
        expect(objectMapper(apiObject, {
            a: null,
            b: null,
            c: null,
        })).toEqual({
            a: 'a',
            b: '2',
            c: 3
        });
    });
    
    test('test functions', () => {
        expect(objectMapper(apiObject, {
            a: String,
            b: Number,
            c: Number,
        })).toEqual({
            a: 'a',
            b: 2,
            c: 3
        });

        expect(objectMapper(apiObject, {
            a: function (value) { return typeof value === 'string' }
        })).toEqual({
            a: true
        });

        expect(objectMapper(apiObject, {
            a: (value) => typeof value === 'number'
        })).toEqual({
            a: false
        });
    
        expect(objectMapper(apiObject, {
            a: () => undefined
        })).toEqual({
            
        });
    
        expect(objectMapper(apiObject, {
            undef: (value) => value ? undefined : []
        })).toEqual({
            undef: []
        });
    });
});