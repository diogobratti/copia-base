module.exports = {
  TOKEN_INVALID: "Token inválido!",
  LOGIN_INVALID: "Usuário ou senha inválidos!",
  ADD_USER_ERROR: "Erro ao adicionar o usuário!",
  USER_NOT_FOUND: "Não foi possível encontrar o usuário!",
  USER_LIST_ERROR: "Erro ao listar usuários",
  USER_DELETE_ERROR: "Erro ao deletar o usuário",
  USER_ALREADY_EXISTS_ERROR: "O usuário já existe.",
  UNAUTHORIZED_ACTION: "Ação não autorizada.",
  EMAIL_NOT_FOUND: "Não foi possível encontrar o e-mail!",
  EMAIL_FORGOT_PASSWORD_SENT: "Se encontrarmos um usuário com este email, vamos enviar uma mensagem com as instruções para redefinir a senha!",
  PASSWORD_CHANGED: 'Sua senha foi atualizada com sucesso',
  FIELD_REQUIRED_ERROR: (name) => `É necessário preencher o campo ${name}!`,
  MINIMUM_SIZE_FIELD_ERROR: (name, minimum) =>
    `O campo ${name} precisa ser maior que ${minimum} caracteres!`,
  MAXIMUM_SIZE_FIELD_ERROR: (name, maximum) =>
    `O campo ${name} precisa ser menor que ${maximum} caracteres!`,
  EMAIL_VERIFICATION: {
    SUBJECT: "Verificação de e-mail",
    TEXT: (emailAddress) => `Olá! Verifique seu e-mail aqui: ${emailAddress}`,
    HTML: (emailAddress) =>
      `<h1>Olá!</h1> Verifique seu e-mail aqui: <a href="${emailAddress}">${emailAddress}</a>`,
  },
  EMAIL_PASSWORD_CHANGE: {
    SUBJECT: "Redefinição de Senha",
    TEXT: (token) =>
      `Olá! Você pediu para redefinir sua senha. Use o token a seguir para trocar a sua senha: ${token}`,
    HTML: (token) =>
      `<h1>Olá!</h1> Você pediu para redefinir sua senha. Use o token a seguir para trocar a sua senha: ${token}`,
  },
};
