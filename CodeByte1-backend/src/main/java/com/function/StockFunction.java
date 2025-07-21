package com.function;

import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;

import java.util.Optional;

public class StockFunction {

   
    @FunctionName("getStock")
    public HttpResponseMessage getStock(
        @HttpTrigger(name = "req", methods = {HttpMethod.GET}, route = "stock") 
        HttpRequestMessage<Optional<String>> request,

        @CosmosDBInput(
            name = "products",
            databaseName = "InventoryDB",
            containerName = "Products",
            connection = "CosmosDBConnection",
            sqlQuery = "SELECT c.id, c.nome, c.quantidade FROM c"
        ) String[] stockData,

        final ExecutionContext context
    ) {
        context.getLogger().info("A obter lista de stock dos produtos.");
        return request.createResponseBuilder(HttpStatus.OK).body(stockData).build();
    }

    
        @FunctionName("updateStock")
        public HttpResponseMessage updateStock(
            @HttpTrigger(name = "req", methods = {HttpMethod.PUT}, route = "stock/{id}")
            HttpRequestMessage<Optional<Produto>> request,

            @BindingName("id") String id,

            @CosmosDBInput(
                name = "produtoInput",
                databaseName = "InventoryDB",
                containerName = "Products",
                id = "{id}",
                partitionKey = "{id}",
                connection = "CosmosDBConnection"
            ) Produto produto,

            @CosmosDBOutput(
                name = "produtoOutput",
                databaseName = "InventoryDB",
                containerName = "Products",
                connection = "CosmosDBConnection"
            ) OutputBinding<Produto> outputProduto,

            final ExecutionContext context
        ) {
            context.getLogger().info("A tentar atualizar o stock do produto com ID: " + id);

            if (produto == null) {
                return request.createResponseBuilder(HttpStatus.NOT_FOUND)
                    .body("Produto com o ID especificado não foi encontrado.")
                    .build();
            }

            Optional<Produto> produtoDoPedido = request.getBody();

            if (!produtoDoPedido.isPresent() || produtoDoPedido.get().getQuantidade() == null) {
                return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body("Corpo do pedido inválido ou quantidade em falta.")
                    .build();
            }

            int novaQuantidade = produtoDoPedido.get().getQuantidade();

            if (novaQuantidade < 0) {
                return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body("Quantidade de stock inválida.")
                    .build();
            }

            produto.setQuantidade(novaQuantidade); // Atualiza só o stock
            outputProduto.setValue(produto);       // Grava as alterações no Cosmos DB

            return request.createResponseBuilder(HttpStatus.OK)
                .body("Stock atualizado para o produto com ID: " + id)
                .build();
        }
}

