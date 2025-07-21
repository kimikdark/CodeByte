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
            name = "codebytebd",
            databaseName = "InventoryDB",
            containerName = "Products",
            connection = "CosmosDBConnection",
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
