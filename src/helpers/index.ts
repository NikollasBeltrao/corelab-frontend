export function readErros(errors: object) {
      const allErrors = Object.values(errors).flat();
      return(allErrors.join(' '));
  }