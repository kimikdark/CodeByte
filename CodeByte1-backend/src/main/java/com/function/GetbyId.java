package com.function;

import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.annotation.*;
import java.util.Optional;
import com.google.gson.Gson;

public class GetbyId {
    @FunctionName("GetbyId")
    public HttpResponseMessage run(
        @HttpTrigger(
            name = "req",
            methods = {HttpMethod.GET},
            authLevel = AuthorizationLevel.ANONYMOUS)
        HttpRequestMessage<Optional<String>> request,

        @CosmosDBInput(
            name = "produtoInput",
            databaseName = "Inventorybd",
            containerName = "Products",
            id = "{query.id}",
            partitionKey = "{query.id}",
            connection = "CosmosDBConnection")
        Produto produto,
        
        final ExecutionContext context
    ) {
        context.getLogger().info("Função GET: A requisção foi processada.");

        Gson gson = new Gson();
        String produtoJson = gson.toJson(produto);

        if (produto == null) {
            return request.createResponseBuilder(HttpStatus.NOT_FOUND)
                .body("Produto não encontrado.")
                .build();
        } else {
            return request.createResponseBuilder(HttpStatus.OK)
                .header("Content-Type", "application/json")
                .body(produtoJson)
                .build();
        }
    }
}

