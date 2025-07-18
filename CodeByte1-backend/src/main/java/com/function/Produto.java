package com.function;

public class Produto {
    private String id;
    private String nome;
    private String descricao;
    private Float preco;
    private String categoriaId;      // Chave estrangeira para tabela de categorias
    private String categoriaNome;    // Nome da categoria (opcional, para exibir)
    private Integer quantidade;      // Para stock
    private String imagemURL;
    private String createdAt;        // ISO DateTime (opcional)
    private String updatedAt;        // ISO DateTime (opcional)

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public Float getPreco() { return preco; }
    public void setPreco(Float preco) { this.preco = preco; }

    public String getCategoriaId() { return categoriaId; }
    public void setCategoriaId(String categoriaId) { this.categoriaId = categoriaId; }

    public String getCategoriaNome() { return categoriaNome; }
    public void setCategoriaNome(String categoriaNome) { this.categoriaNome = categoriaNome; }

    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }

    public String getImagemURL() { return imagemURL; }
    public void setImagemURL(String imagemURL) { this.imagemURL = imagemURL; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}

