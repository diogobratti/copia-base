module.exports = {
    TOKEN_INVALID : 'Token inválido por logout!',
    LOGIN_INVALID : 'Usuário ou senha inválidos!',
    ADD_USER_ERROR : 'Erro ao adicionar o usuário!',
    USER_NOT_FOUND : 'Não foi possível encontrar o usuário!',
    USER_LIST_ERROR : 'Erro ao listar usuários',
    USER_DELETE_ERROR : 'Erro ao deletar o usuário',
    USER_ALREADY_EXISTS_ERROR : 'O usuário já existe.',
    UNAUTHORIZED_ACTION : 'Ação não autorizada.',
    FIELD_REQUIRED_ERROR : name => `É necessário preencher o campo ${name}!`,
    MINIMUM_SIZE_FIELD_ERROR : (name,minimum) => `O campo ${name} precisa ser maior que ${minimum} caracteres!`,
    MAXIMUM_SIZE_FIELD_ERROR : (name,maximum) => `O campo ${name} precisa ser menor que ${maximum} caracteres!`,
}