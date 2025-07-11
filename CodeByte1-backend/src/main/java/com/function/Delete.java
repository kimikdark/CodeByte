package com.function;

import com.azure.cosmos.*;
import com.azure.cosmos.models.CosmosItemRequestOptions;
import com.azure.cosmos.models.CosmosItemResponse;
import com.azure.cosmos.models.PartitionKey;
import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.annotation.*;

import java.net.URI;
import java.util.Optional;

public class Delete {
    @FunctionName("Delete")
    public HttpResponseMessage run(
        @HttpTrigger(name = "req", methods = {HttpMethod.DELETE}, route = "produtos/{id}", authLevel = AuthorizationLevel.ANONYMOUS)
        HttpRequestMessage<Optional<String>> request,
        @BindingName("id") String id,
        final ExecutionContext context) {

        context.getLogger().info("Java HTTP trigger processed a request.");

        // Obter a connection string do ambiente
        String connectionString = System.getenv("CosmosDBConnection");
        URI endpoint = URI.create(connectionString.split(";")[0].replace("AccountEndpoint=", ""));
        String key = connectionString.split(";")[1].replace("AccountKey=", "");

        // Criar o cliente Cosmos DB
        CosmosClient client = new CosmosClientBuilder()
            .endpoint(endpoint.toString())
            .key(key)
            .buildClient();

        // Obter o container da base de dados
        CosmosContainer container = client.getDatabase("codebytebd").getContainer("inventorybd");

        try {
            CosmosItemResponse<?> response = container.deleteItem(id, new PartitionKey(id), new CosmosItemRequestOptions());
            context.getLogger().info("Deleted item with id " + id + " with status code: " + response.getStatusCode());
            return request.createResponseBuilder(HttpStatus.OK).body("Produto deleted.").build();
        } catch (CosmosException e) {
            context.getLogger().info("Delete item failed with: " + e);
            return request.createResponseBuilder(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting produto.").build();
        }
    }
}

