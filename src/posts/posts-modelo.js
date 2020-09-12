const postsDao = require('./posts-dao');
const validacoes = require('../validation/validation-commom');

class Post {
  constructor(post) {
    this.titulo = post.titulo;
    this.conteudo = post.conteudo;
    this.valida();
  }

  adiciona() {
    return postsDao.adiciona(this);
  }

  valida() {
    validacoes.notNullStringField(this.titulo, 'título');
    validacoes.minimumSizeField(this.titulo, 'título', 5);

    validacoes.notNullStringField(this.conteudo, 'conteúdo');
    validacoes.maximumSizeField(this.conteudo, 'conteúdo', 140);
  }

  static lista() {
    return postsDao.lista();
  }
}

module.exports = Post;
