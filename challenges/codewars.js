import chai from 'chai';
let expect = chai.expect;
chai.should();

export function codewars() {

    //  Write a function that accepts a string, and returns true if it is in the form of a phone number. Assume that any integer from 0-9 in any of the spots will produce a valid phone number. Only worry about the following format: (123) 456-7890 (don't forget the space after the close parentheses)

    let validPhoneNumber = str => /^\(\d{3}\)\s\d{3}-\d{4}$/.test(str);

    describe('validPhoneNumber function', function () {

        it('should return false if not passed a string', function () {
            expect(validPhoneNumber()).to.be.false;
        });
        it('should return true if fed correctly formatted nums', function () {
            expect(validPhoneNumber('(123) 123-1234')).to.be.true;
        });
        it('should return false if fed incorrectly formatted nums', function () {
            expect(validPhoneNumber(' (123) 123-1234')).to.be.false;
            expect(validPhoneNumber('(123) 123-1234 ')).to.be.false;
            expect(validPhoneNumber('(123)123-1234')).to.be.false;
            expect(validPhoneNumber('(12) 123-1234')).to.be.false;
            expect(validPhoneNumber('(123) 13-134')).to.be.false;
            expect(validPhoneNumber('(1234) 123-1234')).to.be.false;
            expect(validPhoneNumber('(123) 1234-1234')).to.be.false;
            expect(validPhoneNumber('(123) 123-12345')).to.be.false;
            expect(validPhoneNumber('(12a) 123-1234')).to.be.false;
            expect(validPhoneNumber('(123) 12a-1234')).to.be.false;
            expect(validPhoneNumber('(123) 123-123a')).to.be.false;
            expect(validPhoneNumber('(123) 1231234')).to.be.false;
            expect(validPhoneNumber('123 123 1234')).to.be.false;
        });
    });


    // Define a function isPrime that takes one integer argument and returns true or false depending on if the integer is a prime.

    let isPrime = function (int) {
        if (int <= 1) return false;
        for (let n = Math.ceil(int / 2); n > 1; n--) {
            if (int % n === 0) return false;
        }
        return true;
    };

    describe('isPrime function', function () {

        it('should return false if fed 1 or less,', function () {
            expect(isPrime(1)).to.be.false;
            expect(isPrime(0)).to.be.false;
            expect(isPrime(-1)).to.be.false;
        });
        it('should return false if fed a non prime', function () {
            expect(isPrime(4)).to.be.false;
            expect(isPrime(9)).to.be.false;
            expect(isPrime(15)).to.be.false;
        });
        it('should return true if fed a prime', function () {
            expect(isPrime(3)).to.be.true;
            expect(isPrime(5)).to.be.true;
            expect(isPrime(7)).to.be.true;

        });
    });


    // You'll implement once, a function that takes another function as an argument, and returns a new version of that function that can only be called once. Subsequent calls to the resulting function should have no effect (and should return undefined).

    let once = function (fun) {
        let virgin = true;
        return function (stuff) {
            if (virgin) {
                virgin = false;
                return fun(stuff);
            }
            return;
        };
    };


    describe('once function', function () {

        let worksAlways = stuff => stuff;
        let worksOnlyOnce = once(worksAlways);

        it('should execute great the first time', function () {
            expect(worksOnlyOnce('hello')).to.equal('hello');
        });
        it('should return undefined afterwards', function () {
            expect(worksOnlyOnce('hello')).to.be.undefined;
            expect(worksOnlyOnce('hello')).to.be.undefined;
        });

    });


    /*
    In this Kata, you will implement The Luhn Algorithm, which is used to help validate credit card numbers. Given a positive integer of up to 16 digits, return true if it is a valid credit card number, and false if it is not. Here is the algorithm:

    If there are an even number of digits, double every other digit starting with the first, and if there are an odd number of digits, double every other digit starting with the second. Another way to think about it is, from the right to left, double every other digit starting with the second to last digit.

        1714 => [1*, 7, 1*, 4] => [2, 7, 2, 4]
        12345 => [1, 2*, 3, 4*, 5] => [1, 4, 3, 8, 5]
        891 => [8, 9*, 1] => [8, 18, 1]

    If a resulting doubled number is greater than 9, replace it with either the sum of it's own digits, or 9 subtracted from it.

        [8, 18*, 1] => [8, (1+8), 1] => [8, 9, 1]

    (or)

        [8, 18*, 1] => [8, (18-9), 1] => [8, 9, 1]

    Sum all of the final digits

        [8, 9, 1] => 8+9+1 => 18

    Finally, take that sum and divide it by 10. If the remainder equals zero, the original credit card number is valid.

        18 (modulus) 10 => 8.

    8 does not equal 0, so 891 is not a valid credit card number.
    */

    let doubleEveryOther = function (int) {

        let digits = String(int).split('').map((e) => Number(e));
        return digits.map(function (e, i) {

            if (String(int).length % 2 === 0) {
                return i % 2 === 0 ? e * 2 : e;
            }
            return i % 2 !== 0 ? e * 2 : e;
        }).map(function (e) {

            if (e > 9) {
                return Number(String(e).split('')[0]) + Number(String(e).split('')[1]);
            }
            return e;
        });
    };

    let validateCreditCard = function (int) {
        return doubleEveryOther(int).reduce((acc, e) => acc + e) % 10 === 0;
    };

    describe('helper function doubleEveryOther', function () {
        it('should work with even number of digits', function () {
            expect(doubleEveryOther(1234)).to.eql([2, 2, 6, 4]);
        });
        it('should work with odd number of digits', function () {
            expect(doubleEveryOther(123)).to.eql([1, 4, 3]);
        });
        it('should work with digits that go over 9', function () {
            expect(doubleEveryOther(1254)).to.eql([2, 2, 1, 4]);
            expect(doubleEveryOther(153)).to.eql([1, 1, 3]);
        });
    });

    describe('function validateCreditCard', function () {
        it('should return true if given valid credit card number', function () {
            expect(validateCreditCard(4916591904898577)).to.be.true;
            expect(validateCreditCard(5305491575977279)).to.be.true;
        });
        it('should return false if given invalid credit card number', function () {
            expect(validateCreditCard(1234123412341234)).to.be.false;
        });
    });
    
    
    /*
    You've just recently been hired to calculate scores for a Dart Board game! 

    Scoring specifications:
    
        0 points - radius above 10
        5 points - radius between 5 and 10 inclusive
        10 points - radius less than 5

    If all radiuses are less than 5, award 100 BONUS POINTS!

    Write a function that accepts an array of radiuses (can be integers and/or floats), 
    and returns a total score using the above specification.
    An empty array should return 0.
    */

    let calculate = function (rad) {

        if (rad >= 0 && rad < 5) return 10;
        if (rad >= 5 && rad <= 10) return 5;
        return 0;
    };

    let scoreThrows = function (rads) {

        let awesome = rads.every(e => e < 5);
        let scores = rads.map(e => calculate(e));
        let sum = scores.reduce((acc, e) => acc + e);
        
        if (rads.length === 0) return 0;
        return awesome ? sum + 100 : sum;
    };



    describe('function calculate', function () {
        it('should give score 0 for invalid negative radius', function () {
            expect(calculate(-6)).to.equal(0);
        });
        it('should give score 10 for radius less than five', function () {
            expect(calculate(4.9)).to.equal(10);
            expect(calculate(0)).to.equal(10);
        });
        it('should give score 5 for radius between 5 - 10 inclusive', function () {
            expect(calculate(5)).to.equal(5);
            expect(calculate(7.5)).to.equal(5);
            expect(calculate(10)).to.equal(5);
        });
        it('should give score 0 for radius above 10', function () {
            expect(calculate(10.1)).to.equal(0);
            expect(calculate(11)).to.equal(0);
        });
    });

    describe('function scoreThrows', function () {
        it('should return a total score based on an array of radiuses', function () {
            expect(scoreThrows([1, 5, 11])).to.equal(15);
            expect(scoreThrows([15, 20, 30])).to.equal(0);
        });
        it('should give 100 extra points if all radiuses under 5', function () {
            expect(scoreThrows([1, 2, 3, 4])).to.equal(140);
        });
    });
}
