import { deepCopy } from './deepCopy';

test('Can we copy strings', () => {
    const value = 'Hello World';
    let copy = deepCopy<String>(value);
    copy += 'foo';

    expect(copy).not.toBe('Hello World');
});

test('Can we copy null', () => {
    expect(deepCopy<null>(null)).toBe(null);
});

test('Can we copy a array', () => {
    const value = [
        1,
        2,
        3,
        4
    ];
    
    const copy = deepCopy<number[]>(value);

    value.push(1);

    expect(copy).not.toBe(value);
});

test('Can we copy a date', () => {

    const date = new Date();
    const copy = deepCopy<Date>(date);

    date.setDate(22);

    expect(copy).not.toBe(date);
});

test('Can a object be changed', () => {

    let value: any = {
        'foo': 'Y'
    };

    const copy = deepCopy<typeof value>(value);

    value['bar'] = 'N';

    expect(copy.hasOwnProperty('bar')).toBeFalsy();
});