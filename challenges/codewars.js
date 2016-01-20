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
    
    
    
    // A digital root is the recursive sum of all the digits in a number. Given n, take the sum of the digits of n. If that value has two digits, continue reducing in this way until a single-digit number is produced. This is only applicable to the natural numbers.
    
    let digitalRoot = function (int) {

        if (int < 10) return int;
        let digitSum = String(int).split('').map(e => Number(e)).reduce((acc, e) => acc + e);
        return digitSum < 10 ? digitSum : digitalRoot(digitSum);
    };

    describe('function digitalRoot', function () {
        it('should compute the digital root of an integer', function () {
            expect(digitalRoot(16)).to.equal(7);
            expect(digitalRoot(942)).to.equal(6);
            expect(digitalRoot(132189)).to.equal(6);
            expect(digitalRoot(493193)).to.equal(2);
        });
    });
    
    // Create a function named "rotate" that takes an array and returns a new one with the elements inside rotated n spaces. If n is greater than 0 it should rotate the array to the right. If n is less than 0 it should rotate the array to the left. If n is 0, then it should return the array unchanged.
    
    let rotate = function (arr, n) {
        let newArr = new Array(...arr);
        if (n > 0) {
            while (n > 0) {
                newArr.unshift(newArr.pop());
                n--;
            }
            return newArr;
        }
        if (n < 0) {
            while (n < 0) {
                newArr.push(newArr.shift());
                n++;
            }
            return newArr;
        }
        else return newArr;
    };

    describe('function rotate', function () {
        let data = [1, 2, 3, 4, 5];
        it('should rotate 1 position to the right if n is 1', function () {
            expect(rotate(data, 1)).to.eql([5, 1, 2, 3, 4]);
        });
        it('should rotate n positions to the right if n positive', function () {
            expect(rotate(data, 2)).to.eql([4, 5, 1, 2, 3]);
            expect(rotate(data, 3)).to.eql([3, 4, 5, 1, 2]);
            expect(rotate(data, 4)).to.eql([2, 3, 4, 5, 1]);
            expect(rotate(data, 5)).to.eql([1, 2, 3, 4, 5]);
            expect(rotate(data, 10)).to.eql([1, 2, 3, 4, 5]);
        });
        it('should not rotate if n is zero', function () {
            expect(rotate(data, 0)).to.eql([1, 2, 3, 4, 5]);
        });
        it('should rotate 1 position to the left if n is -1', function () {
            expect(rotate(data, -1)).to.eql([2, 3, 4, 5, 1]);
        });
        it('should rotate n positions tom the left if n negative', function () {
            expect(rotate(data, -2)).to.eql([3, 4, 5, 1, 2]);
            expect(rotate(data, -3)).to.eql([4, 5, 1, 2, 3]);
            expect(rotate(data, -4)).to.eql([5, 1, 2, 3, 4]);
            expect(rotate(data, -5)).to.eql([1, 2, 3, 4, 5]);
            expect(rotate(data, -10)).to.eql([1, 2, 3, 4, 5]);
        });
    });
    
    
    
    // Create a function named divisors that takes an integer and returns an array with all of the integer's divisors(except for 1 and the number itself). If the number is prime return the string '(integer) is prime'
    
    
    let divisors = function (int) {
        for (var i = Math.ceil(int / 2), divs = []; i > 1; i--) {
            if (int % i === 0) divs.unshift(i);
        }
        return divs.length > 0 ? divs : `${int} is prime`;
    };


    describe('function divisors', function () {
        it('should return array of divisors', function () {
            expect(divisors(12)).to.eql([2, 3, 4, 6]);
            expect(divisors(25)).to.eql([5]);
        });
        it('should return a string message if num is prime', function () {
            expect(divisors(13)).to.equal("13 is prime");
        });
    });
    
    
    // Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.
    
    let createPhoneNumber = function (int) {
        let a = int.slice(0, 3).join('');
        let b = int.slice(3, 6).join('');
        let c = int.slice(6).join('');
        return `(${a}) ${b}-${c}`;
    };

    function createPhoneNumberb(numbers) { // clever use of regexps by mrkishi
        return numbers.join('').replace(/(...)(...)(.*)/, '($1) $2-$3');
    }

    describe('function createPhoneNumber', function () {
        it('should return a correctly formated phone number', function () {
            expect(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])).to.equal("(123) 456-7890");
        });
    });
}
