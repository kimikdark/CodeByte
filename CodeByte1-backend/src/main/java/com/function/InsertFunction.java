package com.function;

import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.annotation.*;

import com.azure.cosmos.*;
import com.azure.cosmos.models.*;


/**
 * Azure Functions com gatilho HTTP.
 */
public class InsertFunction {
    private final CosmosClient client = new CosmosClientBuilder()
        .endpoint(System.getenv("COSMOSDB_ENDPOINT"))
        .key(System.getenv("COSMOSDB_KEY"))
        .buildClient();

    @FunctionName("InsertFunction")
    public HttpResponseMessage run(
        @HttpTrigger(
            name = "req",
            methods = {HttpMethod.POST},
            authLevel = AuthorizationLevel.ANONYMOUS)
        HttpRequestMessage<Produto> request,

        @CosmosDBOutput(
            name = "produtoOutput",
            databaseName = "InventoryDB",
            containerName = "Products",
            connection = "CosmosDBConnection")
        OutputBinding<Produto> outputItem,

        final ExecutionContext context) {

        context.getLogger().info("Java HTTP trigger processed a request.");

        Produto produto = request.getBody();

        // Validação dos campos obrigatórios
        if (produto.getId() == null || produto.getNome() == null || produto.getDescricao() == null ||
            produto.getPreco() == null || produto.getCategoriaId() == null ||
            produto.getQuantidade() == null || produto.getImagemURL() == null) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                .body("Por favor, preencha todos os campos do produto.")
                .build();
        }

        try {
            // Aceder à base de dados e ao container de categorias
            CosmosDatabase database = client.getDatabase("InventoryDB");
            CosmosContainer container = database.getContainer("Categories");

            // Tentar ler a categoria com o ID especificado
            container.readItem(
                produto.getCategoriaId(),
                new PartitionKey(produto.getCategoriaId()),
                Categoria.class
            ).getItem();

        } catch (CosmosException e) {
            if (e.getStatusCode() == 404) {
                return request.createResponseBuilder(HttpStatus.NOT_FOUND)
                    .body("Categoria não encontrada com ID: " + produto.getCategoriaId())
                    .build();
            } else {
                return request.createResponseBuilder(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao verificar categoria: " + e.getMessage())
                    .build();
            }
        }

        // Inserir o produto no CosmosDB
        outputItem.setValue(produto);

        return request.createResponseBuilder(HttpStatus.OK)
            .body("Produto inserido com sucesso.")
            .build();
    }
}
