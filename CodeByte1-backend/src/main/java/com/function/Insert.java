package com.function;

import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.HttpStatus;
import com.microsoft.azure.functions.OutputBinding;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import com.microsoft.azure.functions.annotation.CosmosDBOutput;


public class Insert {
    @FunctionName("Insert")
    public HttpResponseMessage run(
        @HttpTrigger(
            name = "req",
            methods = {HttpMethod.POST},
            authLevel = AuthorizationLevel.ANONYMOUS)
        HttpRequestMessage<Produto> request,

        @CosmosDBOutput(
            name = "produtoOutput",
            databaseName = "codebytebd",
            containerName = "Inventorybd",
            connection = "AccountEndpoint=https://codebytebd.documents.azure.com:443/;AccountKey=ZRuSye3QLLLhCasPups9b9wAs8nML0s7vavS7yPasCwX7disn4NgzMaFBaiyTA8H71N20ekjYBFYACDb2ZKjtQ==;",
            createIfNotExists = true)
        OutputBinding<Produto> outputItem,

        final ExecutionContext context
    ) {
        context.getLogger().info("Java HTTP trigger processed a request.");

        Produto Eletronica = request.getBody();

        // Validação básica
        if (Eletronica.getId() == null || Eletronica.getNome() == null || Eletronica.getPreco() <= 0) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                .body("Por favor, preencha os campos obrigatórios.")
                .build();
        }

        // Enviar para Cosmos DB
        outputItem.setValue(Eletronica);

        return request.createResponseBuilder(HttpStatus.OK)
            .body("Produto inserido com sucesso.")
            .build();
    }
}

