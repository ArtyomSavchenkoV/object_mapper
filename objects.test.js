const objectMapper = require('./object-mapper').objectMapper;

const apiObject = {
    field: 'field',
    obj: {
        a: '1',
        b: 2,
        list: [
            {
                d: '12',
                e: null
            },
            {
                d: '18475',
                e: 'Petya'
            }
        ]
    }
}

describe('test object', () => {
    test('fields', () => {
        expect(objectMapper(apiObject, {
            field: String,
            obj: {
                a: null,
                b: String
            }
        })).toEqual({
            field: 'field',
            obj: {
                a: '1',
                b: '2',
            }
        });
    });

    test('objects array', () => {
        expect(objectMapper(apiObject, {
            field: (val) => val.substr(-3),
            obj: {
                list: [
                    {
                        d: Number,
                        e: (value) => value ? `!!${value}!!` : undefined 
                    }
                ]
            }
        })).toEqual({
            field: 'eld',
            obj: {
                list: [
                    {
                        d: 12,
                    },
                    {
                        d: 18475,
                        e: '!!Petya!!'
                    }
                ]
            }
        });
    })
})