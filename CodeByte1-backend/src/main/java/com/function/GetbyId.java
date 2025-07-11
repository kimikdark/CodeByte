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
            databaseName = "codebytebd",
            containerName = "inventoryDB",
            id = "{query.id}",
            partitionKey = "{query.id}",
            connection = "AccountEndpoint=https://codebytebd.documents.azure.com:443/;AccountKey=ZRuSye3QLLLhCasPups9b9wAs8nML0s7vavS7yPasCwX7disn4NgzMaFBaiyTA8H71N20ekjYBFYACDb2ZKjtQ==;")
        Eletronica produto,
        
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

