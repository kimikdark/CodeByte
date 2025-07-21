package com.function;

public class Produto {
    private String id;
    private String nome;
    private String descricao;
    private Float preco;
    private String categoriaId;      
    private String categoriaNome;    
    private Integer quantidade;      
    private String imagemURL;        

    
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
}



