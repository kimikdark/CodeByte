package com.function;

import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;
import java.util.Optional;

public class Update {
    @FunctionName("Update")
    public HttpResponseMessage run(
        @HttpTrigger(
            name = "req",
            methods = {HttpMethod.PUT},
            route = "Products/{id}",
            authLevel = AuthorizationLevel.ANONYMOUS
        ) HttpRequestMessage<Optional<Produto>> request,

        @BindingName("id") String id,

        @CosmosDBInput(
            name = "produtoInput",
            databaseName = "InventoryDB",
            containerName = "Products",
            id = "{id}",
            partitionKey = "{id}",
            connection = "CosmosDBConnection"
        ) Produto existingProduto,

        @CosmosDBOutput(
            name = "produtoOutput",
            databaseName = "InventoryDB",
            containerName = "Products",
            connection = "CosmosDBConnection"
        ) OutputBinding<Produto> outputProduto,

        final ExecutionContext context
    ) {
        context.getLogger().info("Atualizar produto com ID: " + id);

        if (existingProduto == null) {
            return request.createResponseBuilder(HttpStatus.NOT_FOUND)
                        .body("Produto não encontrado.")
                        .build();
        }

        Produto updatedProduto = request.getBody().orElse(null);
        if (updatedProduto == null ||
            updatedProduto.getNome() == null ||
            updatedProduto.getDescricao() == null ||
            updatedProduto.getPreco() == null ||
            updatedProduto.getCategoriaId() == null ||
            updatedProduto.getQuantidade() == null ||
            updatedProduto.getImagemURL() == null) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                        .body("Dados do Produto inválidos.")
                        .build();
        }

        if (!updatedProduto.getId().equals(existingProduto.getId())) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                        .body("ID do Produto no corpo e na URL não coincidem.")
                        .build();
        }

        // Atualizar campos
        existingProduto.setNome(updatedProduto.getNome());
        existingProduto.setDescricao(updatedProduto.getDescricao());
        existingProduto.setPreco(updatedProduto.getPreco());
        existingProduto.setCategoriaId(updatedProduto.getCategoriaId());
        existingProduto.setQuantidade(updatedProduto.getQuantidade());
        existingProduto.setImagemURL(updatedProduto.getImagemURL());

        outputProduto.setValue(existingProduto);

        return request.createResponseBuilder(HttpStatus.OK)
                    .body(existingProduto)
                    .build();
    }

}

