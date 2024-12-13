  static doSomethingElse(val: string) { return val }

  static setToken15day(token?: string, field = localStorageKey.TOKEN) {
    let timeToAdd = 1000 * 60 * 60 * 24 * 15;
    let date = new Date();
    let expiryTime = parseInt(date.getTime().toString()) + timeToAdd;
    date.setTime(expiryTime);
    let utcTime = date.toUTCString();
    document.cookie = `${field}=${token};expires=${utcTime};path=/`;
  }

  static getCookie(name?: any) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`);
    const match = document.cookie.match(regex);
    if (match) {
      return match[2];
    }
  }

  static clearCookie() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
  }

  static getErrorMessage(err) {
    return err?.error?.errors?.body || '';
  }

  static validPassword(val, statusValidatePassword) {
    statusValidatePassword.minLength = val.length < 8;
    statusValidatePassword.upAndLowCase = !/(?=.*[a-z])(?=.*[A-Z]).*/.test(val);
    statusValidatePassword.number = !/(?=.*\d).+/.test(val);
    statusValidatePassword.charactor = !/[^A-Za-z0-9<>?;]/.test(val);
    statusValidatePassword.whitespace = /.*\s+.*/.test(val);
  }

  static formatNumber(value, maxFractionDigits = 2) {
    // Định dạng chung: 12.345.678,23
    value = value.toString();
    value = value.replace(/[^0-9\,]/g, '');
    let parts = value.split(',');
    parts[0] = parts[0].replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');
    if (maxFractionDigits <= 0) {
      return parts[0];
    }
    if (parts[1] && parts[1].length > maxFractionDigits) {
      parts[1] = parts[1].substring(0, maxFractionDigits);
    }
    if (parts.length > 2) {
      parts.length = 2;
    }
    return parts.join(',');
  }

  static numberToFormatedCurrency(value) {
    if (!value) {
      return value;
    }
    value = value.toString();
    value = value.replaceAll([','], '.');
    value = value.replaceAll(['.'], ',');
    return this.formatNumber(value);
  }

  static unixToDate(time: number) {
    let timestamp: any = Number(time);
    if (time?.toString().length <= 10) {
      timestamp = Number(time) * 1000;
    }
    if (timestamp === 0 || isNaN(timestamp)) {
      return '';
    }
    return new Date(timestamp);
  }

  static unixToDay(time: number, format = 'DD/MM/YYYY') {
    if (!time || time <= 0) {
      return;
    }
    if (time?.toString().length <= 10) {
      time = Number(time) * 1000;
    }
    return moment(time).format(format);
  }

  static async createFile(url, name?) {
    let response = await fetch(url);
    let data = await response.blob();
    let file = new File([data], name);
    return file;
  }

  static downloadFile(url) {
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  static downloadFileByte(resultByte) {
    let blob = new Blob([resultByte]);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = window.URL.createObjectURL(blob);
    a.click();
    a.remove();
  }

  static checkboxToggle(event, row) {
    if (event?.keyCode === 13) {
      row.isSelected = !row.isSelected;
    }
  }

  static checkboxToggleAll(event, allRowsSelected, callbacks) {
    if (event?.keyCode === 13) {
      callbacks.map((c) => {
        c(!allRowsSelected)
      })
    }
  }

  static parseDate(val: string) {
    // 20112023 or 20/11/2023 is valid
    let format1 = moment(val, 'DDMMYYYY', true);
    let format2 = moment(val, 'DD/MM/YYYY', true);
    let format3 = moment(val, 'D/MM/YYYY', true);
    let format4 = moment(val, 'D/M/YYYY', true);
    let date = null;
    if (format1.isValid()) {
      date = format1.toDate();
    } else if (format2.isValid()) {
      date = format2.toDate();
    } else if (format3.isValid()) {
      date = format3.toDate();
    } else if (format4.isValid()) {
      date = format4.toDate();
    }
    return date
  }

  static getPermission(module = '', action = '') {
    const info = JSON.parse(localStorage.getItem(localStorageKey.USER_INFO) || '{}');
    let permissions = info?.permissions || [];
    permissions = permissions.map(i => {
      let name = i.name?.split('-');
      return {
        module: name[0].replaceAll('permission_', ''),
        action: name[1]
      }
    });
    permissions = _.orderBy(permissions, 'module', 'asc');
    return !!permissions.find(i => i.module == module && i.action == action);
  }

  static getUserInfo() {
    return JSON.parse(localStorage.getItem(localStorageKey.USER_INFO) || '{}');
  }

  static getFilterByMfaValue(filterData) {
    let result;
    switch (filterData?.MFA) {
      case 'All':
        result = 'Enable; Disable'
        break;
      case 'true':
        result = 'Enable'
        break;
      case 'false':
        result = 'Disable'
        break;
      default:
        result = ''
        break;
    }
    return result;
  }

  static setSession(key, value) {
    if (!key || !value) return;
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static getSession(key) {
    if (!key) return;
    const value = sessionStorage.getItem(key);
    if (!value || value == 'undefined') return;
    return JSON.parse(value);
  }

  static deleteDataSearch() {
    window.onbeforeunload = () => {
      Object.values(KeySearchData).forEach(value => {
        sessionStorage.removeItem(value);
      })
    }
  }

  static getDataSearch(key) {
    if (!key) return;
    Object.values(KeySearchData).forEach(value => {
      if (value == key) {
        return;
      }
      sessionStorage.removeItem(value);
    })
    const value = sessionStorage.getItem(key);
    if (!value || value == 'undefined') return;
    return JSON.parse(value);
  }

  static getArrayDate(startDay, endDay) {
    let startDate = moment(startDay);
    let endDate = moment(endDay);
    let datesBetween = [];
    let startingMoment = startDate;
    while (startingMoment <= endDate) {
      datesBetween.push(startingMoment.clone());
      startingMoment.add(1, 'days');
    }
    return datesBetween;
  }

  static exportPDF(pdfElement: HTMLElement, width: number, height: number, name: string, isCanvas = false) {
    return new Promise((resolve, rejects) => {
      if (isCanvas) {
        html2canvas(pdfElement).then((canvas) => {
          const imgData = canvas.toDataURL('image/jpeg', 1440);
          const pdf = new jsPDF({
            unit: 'px',
            orientation: "p",
            format: [height, width],
          })
          const imageProps = pdf.getImageProperties(imgData);
          const pdfw = pdf.internal.pageSize.getWidth();
          const pdfh = (imageProps.height * pdfw) / imageProps.width
          pdf.addImage(imgData, 'PNG', 0, 0, pdfw, pdfh);
          pdf.save(name, { returnPromise: true }).then(() => {
            resolve(true)
          })
        })
        return;
      }
      const doc = new jsPDF({
        unit: 'px',
        orientation: "p",
        format: [height, width],
      })
      doc.html(pdfElement, {
        callback: (pdf) => {
          pdf.save(name, { returnPromise: true }).then(() => {
            resolve(true)
          })
        },
        margin: 0,
        autoPaging: true,
        fontFaces: [
          { family: 'Roboto-Medium', src: [{ url: "/assets/fonts/Roboto/Roboto-Medium.ttf", format: 'truetype' }], stretch: 'normal', style: 'normal' },
          { family: 'Roboto-Regular', src: [{ url: "/assets/fonts/Roboto/Roboto-Regular.ttf", format: 'truetype' }], stretch: 'normal', style: 'normal' },
          { family: 'Roboto-Regular', src: [{ url: "/assets/fonts/Roboto/Roboto-Thin.ttf", format: 'truetype' }], stretch: 'normal', style: 'normal' },
          { family: 'Roboto-Regular', src: [{ url: "/assets/fonts/Roboto/Roboto-ThinItalic.ttf", format: 'truetype' }], stretch: 'normal', style: 'normal' },
          { family: 'Roboto-Regular', src: [{ url: "/assets/fonts/Roboto/Roboto-Italic.ttf", format: 'truetype' }], stretch: 'normal', style: 'normal' },
          { family: 'Roboto-Regular', src: [{ url: "/assets/fonts/Roboto/Roboto-Light.ttf", format: 'truetype' }], stretch: 'normal', style: 'normal' },
        ],
      });
      doc.setLineJoin(0.1)
    });
  }

  static popupCenter(url, title, w, h) {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth || document.documentElement.clientWidth || screen.width;
    const height = window.innerHeight || document.documentElement.clientHeight || screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title,
      `
          scrollbars=yes,
          width=${w / systemZoom},
          height=${h / systemZoom},
          top=${top},
          left=${left}
          `
    )
    if (window.focus) newWindow.focus();
  }

  static saveBlobs(blobs, fileName) {
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(new Blob([blobs]))
    downloadLink.download = fileName;
    downloadLink.click();
  }

  static scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
    });
  }

  static getDataSearchWorkSpaceAndInvoice(key) {
    if (!key) return;
    Object.values(KeySearchData).forEach((value) => {
      if (value == key) {
        return;
      }
    });
    const value = sessionStorage.getItem(key);
    if (!value || value == 'undefined') return;
    return JSON.parse(value);
  }

  static getSplitSign(cond1, cond2) {
    let splitSign;
    if (cond1 && cond2) {
      splitSign = ';'
    }
    return splitSign || ''
  }

  static noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if ((control.value && control.value.trim().length === 0) || !control.value) {
        return { 'required': true }; // Lỗi khi giá trị chỉ là khoảng trắng
      }
      return null; // Không có lỗi
    };
  }

}

export const REGEX_POSITIVE_INTEGER = /[^0-9]*/g;
export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\+\-=[\]{}|;':",.\/<>?~`])[A-Za-z\d!@#%$^&*()_+-=[\]{}|;':",.\/<>?~`]{8,}$/;
export const REGEX_IPv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
export const REGEX_SUBNET_IPv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(\/([0-9]|[0-2][0-9]|3[0-2]?))$/;
// export const REGEX_EMAIL = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const REGEX_NO_WHITESPACE = /[\s]/
export const REGEX_FILENAME = /[<>:;,?"*|/\\]*/g;
export const REGEX_USERNAME = /[^\d|\w]/g
export const REGEX_AT_LEAST_CHAR = /^(?=[^A-Za-z]*[A-Za-z])[ -~]*$/g
function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  if (typeof value === 'string') {
    value = value.trim();
  }
  return value == null || value.length === 0;
}

export class CValidators {
  static min(min: number, errorMessage?: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return null;
      }
      const value = parseFloat(control.value);
      return !isNaN(value) && value > min
        ? null : {
          errorMessage: errorMessage || `The minimum value must be greater than ${min}`,
          min: { min, actual: control.value },
        };
    };
  }

  static max(max: number, errorMessage?: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return null;
      }
      const value = parseFloat(control.value);

      return !isNaN(value) && value > max
        ? {
          errorMessage,
          max: { max, actual: control.value },
        }
        : null;
    };
  }

  static validateRange = (startKey: string, endKey: string, errorMessage: string) => {
    return (group: FormGroup): ValidationErrors => {

      if (typeof group.value[startKey] === 'number' && typeof group.value[endKey] === 'number' && +group.value[startKey] > +group.value[endKey]) {
        return {
          errorMessage,
          range: true
        }
      }
      return null;
    }
  }

  static dateRange = (start: string, end: string, errorMessage: string) => {
    return (group: FormGroup): ValidationErrors => {
      if (group.value[start] > +group.value[end]) {
        return {
          errorMessage,
          range: true
        }
      }
      return null;
    }
  }

  static required(errorMessage?: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      return isEmptyInputValue(control.value)
        ? { errorMessage, required: true }
        : null;
    };
  }

  static email(errorMessage: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control?.value && control?.value.trim() && !REGEX_EMAIL.test(control.value)) {
        return { email: true, errorMessage };
      } else return null
    }
  }


  static minLength(minLength: number, errorMessage?: string | Function) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const length: number = control.value ? control.value.length : 0;
      return length < minLength
        ? {
          errorMessage,
          minlength: { requiredLength: minLength, actualLength: length },
        }
        : null;
    };
  }

  static maxLength(maxLength: number, errorMessage?: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const length: number = control.value ? control.value.length : 0;
      return length > maxLength
        ? {
          errorMessage,
          maxlength: { requiredLength: maxLength, actualLength: length },
        }
        : null;
    };
  }

  static pattern(pattern: string | RegExp, errorMessage?: string): ValidatorFn {
    if (!pattern) {
      return Validators.nullValidator;
    }
    let regex: RegExp;
    let regexStr: string;
    if (typeof pattern === 'string') {
      regexStr = '';

      if (pattern.charAt(0) !== '^') {
        regexStr += '^';
      }

      regexStr += pattern;

      if (pattern.charAt(pattern.length - 1) !== '$') {
        regexStr += '$';
      }

      regex = new RegExp(regexStr);
    } else {
      regexStr = pattern.toString();
      regex = pattern;
    }
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
          errorMessage,
          pattern: { requiredPattern: regexStr, actualValue: value },
        };
    };
  }

  static conditionalValidator(condFn: (control: AbstractControl) => boolean, validators: ValidatorFn | ValidatorFn[]): ValidatorFn {
    return (control) => {
      if (!condFn(control)) {
        return null;
      }

      if (!Array.isArray(validators)) {
        return validators(control);
      }

      return validators.map(v => v(control)).reduce((errors, result) =>
        result === null ? errors :
          (Object.assign(errors || {}, result))
      );
    };
  }

  static validate(formGroup: FormGroup) {
    this.validateGroups(formGroup);
    formGroup.updateValueAndValidity({ onlySelf: true });
    if (formGroup.invalid) {
      throw Error('Form invalid')
    }
  }

  static validateGroups(formGroup: FormGroup, isArray?: boolean) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
        control.updateValueAndValidity({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.validateGroups(control);
        control.updateValueAndValidity({ onlySelf: true });
      } else if (control instanceof FormArray) {
        Object.keys(control.controls).forEach(ctrl => {
          const childControl = control.get(ctrl);
          if (childControl instanceof FormControl) {
            childControl.markAsTouched({ onlySelf: true });
            childControl.markAsDirty({ onlySelf: true });
            childControl.updateValueAndValidity({ onlySelf: true })
          } else if (childControl instanceof FormGroup) {
            this.validateGroups(childControl, true);
            childControl.updateValueAndValidity({ onlySelf: true });
          }
        })
        control.updateValueAndValidity({ onlySelf: true })
      }
    });
  }

  static confirmPassword(): ValidatorFn {
    return (formGroup: AbstractControl) => {
      let pass = formGroup.get('new_password').value;
      let confirmPass = formGroup.get('confirm_password').value;
      pass === confirmPass ? formGroup.get('confirm_password').setErrors(null) : formGroup.get('confirm_password').setErrors({ notSame: true, errorMessage: `Password confirmation doesn't match Password` })
      return {}
    }
  }

  static passwordValid() {
    return (control: FormControl) => {
      const password = control.value;
      if (!password || REGEX_PASSWORD.test(password)) {
        return null;
      } else {
        return {
          invalid: true,
          state: [
            PasswordValidation.isLength(password),
            PasswordValidation.containDigit(password),
            PasswordValidation.containCharacter(password),
            PasswordValidation.containSpecialCharacter(password),
            PasswordValidation.noWhitespace(password),
          ]
        }
      }
    }
  }

  static passwordMatchValidator() {
    return (group: FormGroup) => {
      const password = group.get('password').value;
      const confirm = group.get('confirm').value;
      if (confirm === password || !confirm) {
        return null;
      } else {
        return { passwordMissMatch: true, errorMessage: 'Confirm password must be the same as password.' }
      }
    }
  }
}

export class PasswordValidation {
  static isLength = (password: string) => {
    if (password.length < 8) {
      return { valid: false, condition: 'At least 8 characters' }
    } else return { valid: true, condition: 'At least 8 characters' }
  }

  static containCharacter(password: string) {
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password.replace(/\s/g, ''))) {
      return { valid: false, condition: 'A mixture of both uppercase and lowercase letters' }
    } else return { valid: true, condition: 'A mixture of both uppercase and lowercase letters' }
  }

  static containDigit(password: string) {
    if (!/[0-9]/.test(password.replace(/\s/g, ''))) {
      return { valid: false, condition: 'At least 1 number' }
    } else return { valid: true, condition: 'At least 1 number' }
  }

  static containSpecialCharacter(password: string) {
    if (!/[^A-Za-z0-9\s]/.test(password.replace(/\s/g, ''))) {
      return { valid: false, condition: 'At least 1special character e.g., $, !, @, %, &' }
    } else return { valid: true, condition: 'At least 1special character e.g., $, !, @, %, &' }
  }

  static noWhitespace(password: string) {
    if (/\s/.test(password)) {
      return { valid: false, condition: 'No leading or trailing whitespace' }
    } else return { valid: true, condition: 'No leading or trailing whitespace' }
  }
}

function isPresent(o: any): boolean {
  return o != null;
}

export function toObservable(r: any): Observable<any> {
  const obs = isPromise(r) ? from(r) : r;
  if (!isObservable(obs)) {
    throw new Error(`Expected validator to return Promise or Observable.`);
  }
  return obs;
}

function _executeValidators(
  control: AbstractControl,
  validators: ValidatorFn[]
): any[] {
  return validators.map((v) => v(control));
}

function _executeAsyncValidators(
  control: AbstractControl,
  validators: AsyncValidatorFn[]
): any[] {
  return validators.map((v) => v(control));
}