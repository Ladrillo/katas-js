import chai from 'chai';
let expect = chai.expect;
chai.should();

export function codewars() {
    
    //  Write a function that accepts a string, and returns true if it is in the form of a phone number. Assume that any integer from 0-9 in any of the spots will produce a valid phone number. Only worry about the following format: (123) 456-7890 (don't forget the space after the close parentheses) 
    
    let validPhoneNumber = str => /^\(\d{3}\)\s\d{3}-\d{4}$/.test(str);

    describe('validPhoneNumber', function () {
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


}
