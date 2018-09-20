// define array of arabic to romans values
const romanValues = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
];

function convertToRoman(number) {
    if (number > 0) {
        for (i in romanValues) {
            if (number >= romanValues[i][0]) {
                return romanValues[i][1] + convertToRoman(number - romanValues[i][0]);
            }
        }
    } else {
        return '';
    }
}
