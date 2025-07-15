package com.function;

import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;
import java.util.*;

public class GetAll {
    
    @FunctionName("GetAll")
    public HttpResponseMessage run(
        @HttpTrigger(
            name = "req",
            methods = {HttpMethod.POST},
            authLevel = AuthorizationLevel.ANONYMOUS)
            HttpRequestMessage<Optional<Produto>> request,

        @CosmosDBInput(
            name = "database",
            databaseName = "codebytebd",
            containerName = "Inventorybd",
            connection = "AccountEndpoint=https://codebytebd.documents.azure.com:443/;AccountKey=ZRuSye3QLLLhCasPups9b9wAs8nML0s7vavS7yPasCwX7disn4NgzMaFBaiyTA8H71N20ekjYBFYACDb2ZKjtQ==;",
            sqlQuery = "SELECT * FROM c")
            List<Produto> Produto,

        final ExecutionContext context) {
        
        context.getLogger().info("Java HTTP trigger processed a request.");
        
        if(Produto == null || Produto.size() == 0) {
            return request.createResponseBuilder(HttpStatus.NOT_FOUND).build();
        }

        return request.createResponseBuilder(HttpStatus.OK).body(Produto).build();

    }
}
