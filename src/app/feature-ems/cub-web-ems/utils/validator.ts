import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validatePID(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const isValid = /^[A-Z][12][0-9]{8}$/;
    if (!isValid.test(value)) {
      return { invalidPID: true };
    }

    const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
    const letterValue = letters.indexOf(value.charAt(0)) + 10;
    const letterValueArr = [Math.floor(letterValue / 10), letterValue % 10];
    const numValueArr = value
      .slice(1)
      .split('')
      .map((num: string) => parseInt(num, 10));

    const weight = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
    let sum = letterValueArr[0] * 1 + letterValueArr[1] * 9;
    for (let i = 0; i < numValueArr.length; i++) {
      sum += numValueArr[i] * weight[i + 2];
    }
    if (sum % 10 !== 0) {
      return { invalidPID: true };
    }

    return null;
  };
}
