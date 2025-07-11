package com.function;

import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;
import java.util.Optional;

public class Update {
    @FunctionName("Update")
    public HttpResponseMessage run(
        @HttpTrigger(name = "req", methods = {HttpMethod.PUT}, authLevel = AuthorizationLevel.ANONYMOUS) 
        HttpRequestMessage<Optional<Produto>> request,

        @CosmosDBInput(
            name = "carroInput",
            databaseName = "codebytebd",
            containerName = "inventorybd",
            id = "{Query.id}",
            partitionKey = "{Query.id}",
            connection = "CosmosDBConnection"
        ) Produto existingProduto,

        @CosmosDBOutput(
            name = "carroOutput",
            databaseName = "codebytebd",
            containerName = "inventorybd",
            connection = "CosmosDBConnection"
        ) OutputBinding<Produto> outputProduto,

        final ExecutionContext context
    ) {
        context.getLogger().info("Java HTTP trigger processed a request to update a Produto.");

        // Verifica se o carro existe
        if (existingProduto == null) {
            return request.createResponseBuilder(HttpStatus.NOT_FOUND)
                          .body("Produto não encontrado.")
                          .build();
        }

        // Obtém o carro atualizado do corpo do request
        Produto updatedProduto = request.getBody().orElse(null);
        if (updatedProduto == null || 
            updatedProduto.getNome() == null ||
            updatedProduto.getDescricao() == null ||
            updatedProduto.getPreco() == null ||
            updatedProduto.getCategoria() == null ||
            updatedProduto.getQuantidade() == null || 
            updatedProduto.getImagemURL() == null) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                          .body("Dados do Produto inválidos.")
                          .build();
        }

        // Verifica se o ID no corpo bate certo com o da query
        if (!updatedProduto.getId().equals(existingProduto.getId())) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                          .body("ID do Produto no corpo e na query não coincidem.")
                          .build();
        }

        context.getLogger().info("A atualizar Produto com ID: " + existingProduto.getId());

        // Atualiza os campos permitidos
        existingProduto.setNome(updatedProduto.getNome());
        existingProduto.setDescricao(updatedProduto.getDescricao());
        existingProduto.setPreco(updatedProduto.getPreco());
        existingProduto.setCategoria(updatedProduto.getCategoria());
        existingProduto.setQuantidade(updatedProduto.getQuantidade());
        existingProduto.setImagemURL(updatedProduto.getImagemURL());
        // Se tiveres outros campos editáveis, adiciona aqui

        // Grava no Cosmos DB
        outputProduto.setValue(existingProduto);

        return request.createResponseBuilder(HttpStatus.OK)
                      .body(existingProduto)
                      .build();
    }
}
