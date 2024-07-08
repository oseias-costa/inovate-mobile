export function newSolicitationError(err: [string] | string | undefined): { input: string; message: string } {
  console.log('no erro', err)
  if (err && err[0] === 'Informe uma empresa') {
    return {
      input: 'company',
      message: 'Informe uma empresa',
    };
  }
  if (err && err[0] === 'O nome dever ter menos de 10 caracteres') {
    return {
      input: 'document',
      message: 'O nome do documento deve ter pelo menos 10 caracteres',
    };
  }
  if (err && err[0] === 'Informe o nome do documento') {
    return {
      input: 'document',
      message: 'O nome do documento não pode estar vazio',
    };
  }

  if(err?.includes('expiration')){
    return {
      input: 'expiration',
      message: 'O prazo não pode estar vazio',
    };
  }

  if(err?.includes('inativa')){
    return {
      input: 'company',
      message: 'A empresa está inativa'
    }
  }
  return {
    input: '',
    message: '',
  };
}
