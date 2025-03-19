import {AbstractControl, ValidationErrors} from '@angular/forms';

export function comparisonValidator(group: AbstractControl<{ password: string, confirmPassword: string }>): ValidationErrors | null {
  const {password, confirmPassword} = group.value;
  return !confirmPassword || password === confirmPassword ? null : {comparisonValidator: 'Passwords doesn\'t match'};
}
