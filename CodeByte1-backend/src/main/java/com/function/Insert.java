package com.function;

import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.annotation.*;
import com.azure.cosmos.*;
import com.azure.cosmos.models.*;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.Map;
import java.util.logging.Logger;

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
            databaseName = "Inventorybd",
            containerName = "Products",
            connection = "CosmosDBConnection",
            createIfNotExists = true)
        OutputBinding<Produto> outputItem,

        final ExecutionContext context
    ) {
        Logger logger = context.getLogger();
        logger.info("Inserção de produto com categoria iniciada.");

        Produto produto = request.getBody();

        // Validação básica
        if (produto.getId() == null || produto.getNome() == null || produto.getPreco() <= 0 || produto.getCategoriaId() == null) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                .body("Por favor, preencha todos os campos obrigatórios, incluindo categoryId.")
                .build();
        }

        // Validar se a categoria existe
        CosmosClient client = new CosmosClientBuilder()
            .endpoint(System.getenv("CosmosDBConnection").split(";")[0].split("=")[1])
            .key(System.getenv("CosmosDBConnection").split(";")[1].split("=")[1])
            .buildClient();

        CosmosContainer categoryContainer = client.getDatabase("Inventorybd").getContainer("Categories");

        try {
            CosmosItemResponse<Object> response = categoryContainer.readItem(
                produto.getCategoriaId(),
                new PartitionKey(produto.getCategoriaId()),
                Object.class
            );

           
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            Map<String, Object> categoryData = mapper.convertValue(
                response.getItem(),
                new TypeReference<Map<String, Object>>() {}
            );

            if (categoryData.get("nome") != null) {
                produto.setCategoriaNome(categoryData.get("nome").toString());
            }

        } catch (CosmosException e) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                .body("Categoria não encontrada com ID: " + produto.getCategoriaId())
                .build();
        }

        
        outputItem.setValue(produto);
        return request.createResponseBuilder(HttpStatus.OK)
            .body("Produto inserido com sucesso com categoria.")
            .build();
    }
}

