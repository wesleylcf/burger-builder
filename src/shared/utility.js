export const updateObject = (oldObj, newObj) => {
  return { ...oldObj, ...newObj };
};

export const isValid = (value, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minChars) {
    isValid = value.length >= rules.minChars && isValid;
  }
  if (rules.isString) {
    isValid = !/\d/.test(value) && isValid;
  }
  if (rules.isNum) {
    isValid = /^\d+$/.test(value) && isValid;
  }
  if (rules.isEmail) {
    isValid =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) && isValid;
  }
  return isValid;
};
