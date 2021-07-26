export function HandleError(message: string | string[], statusCode = 500, status = 'Erro') {
  return {
    message,
    status,
    statusCode,
  };
}
