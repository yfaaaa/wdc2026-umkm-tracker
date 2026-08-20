/**
 * Helper perhitungan matematika presisi untuk menghindari bug desimal JavaScript.
 */
export const decimalMath = {
    add: (a: number, b: number): number => {
        return Math.round((a + b) * 100) / 100;
    },

    subtract: (a: number, b: number): number => {
        return Math.round((a - b) * 100) / 100;
    },

    multiply: (a: number, b: number): number => {
        return Math.round(a * b * 100) / 100;
    },

    divide: (a: number, b: number): number => {
        if (b === 0) return 0;
        return Math.round((a / b) * 100) / 100;
    },
};