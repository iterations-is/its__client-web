export const joiErrorToString = (error) => {
  switch (error?.type) {
    case 'string.email':
      return 'E-mail is not valid';
    case 'string.min':
      return 'Value is too short';
    case 'string.max':
      return 'Value is too long';
    case 'number.min':
      return 'Value is too low';
    case 'number.max':
      return 'Value is too high';
    case 'string.empty':
      return 'Value is empty';
  }
};
