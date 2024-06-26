import BN from 'bn.js'
import { __read } from "tslib";

const DEFAULT_OPTIONS = {
    pad: false,
};

const Units = {
    Zil: 'zil',
    Li: 'li',
    Qa: 'qa'
}

var unitMap = new Map([
    [Units.Qa, '1'],
    [Units.Li, '1000000'],
    [Units.Zil, '1000000000000'], // 1e12 qa
]);

const  numToStr = function (input: any) {
    if (typeof input === 'string') {
        if (!input.match(/^-?[0-9.]+$/)) {
            throw new Error("while converting number to string, invalid number value '".concat(input, "', should be a number matching (^-?[0-9.]+)."));
        }
        return input;
    }
    else if (typeof input === 'number') {
        return String(input);
    }
    else if (BN.isBN(input)) {
        return input.toString(10);
    }
    throw new Error("while converting number to string, invalid number value '".concat(input, "' type ").concat(typeof input, "."));
}
// eslint-disable-next-line
export default {
    Units,
    fromQa: (qa: any, unit: any, options: any) => {
        if (options === void 0) { options = DEFAULT_OPTIONS; }
        if (unit === 'qa') {
            return qa.toString(10);
        }
        var baseStr = unitMap.get(unit);

        if (!baseStr) {
            throw new Error("No unit of type ".concat(unit, " exists."));
        }
        var base = new BN(baseStr, 10);
        var baseNumDecimals = baseStr.length - 1;
        var fraction = qa.abs().mod(base).toString(10);
        // prepend 0s to the fraction half
        while (fraction.length < baseNumDecimals) {
            fraction = "0".concat(fraction);
        }
        if (!options.pad) {
            fraction = (fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1]);
        }
        var whole = qa.div(base).toString(10);
        return fraction === '0' ? "".concat(whole) : "".concat(whole, ".").concat(fraction);
    },
    toQa: (input: any, unit:any) => {

        var inputStr = numToStr(input);
        var baseStr = unitMap.get(unit);
        if (!baseStr) {
            throw new Error("No unit of type ".concat(unit, " exists."));
        }
        var baseNumDecimals = baseStr.length - 1;
        var base = new BN(baseStr, 10);
        // Is it negative?
        var isNegative = inputStr.substring(0, 1) === '-';
        if (isNegative) {
            inputStr = inputStr.substring(1);
        }
        if (inputStr === '.') {
            throw new Error("Cannot convert ".concat(inputStr, " to Qa."));
        }
        // Split it into a whole and fractional part
        var comps = inputStr.split('.'); // eslint-disable-line
        if (comps.length > 2) {
            throw new Error("Cannot convert ".concat(inputStr, " to Qa."));
        }
        var _a = __read(comps, 2), whole = _a[0], fraction = _a[1];
        if (!whole) {
            whole = '0';
        }
        if (!fraction) {
            fraction = '0';
        }
        if (fraction.length > baseNumDecimals) {
            throw new Error("Cannot convert ".concat(inputStr, " to Qa."));
        }
        while (fraction.length < baseNumDecimals) {
            fraction += '0';
        }
        var wholeBN = new BN(whole);
        var fractionBN = new BN(fraction);
        var wei = wholeBN.mul(base).add(fractionBN); // eslint-disable-line
        if (isNegative) {
            wei = wei.neg();
        }
        return new BN(wei.toString(10), 10);
    }



}