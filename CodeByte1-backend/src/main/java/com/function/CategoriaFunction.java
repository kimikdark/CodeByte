package com.function;

import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;
import java.util.Optional;


public class CategoriaFunction {

    @FunctionName("getAllCategorias")
    public HttpResponseMessage getAllCategorias(
        @HttpTrigger(name = "req", methods = {HttpMethod.GET}, route = "Categories") HttpRequestMessage<Optional<String>> request,
        @CosmosDBInput(
            name = "categorias", 
            databaseName = "Inventorybd", 
            containerName = "Categories",
            connection = "CosmosDBConnection", 
            sqlQuery = "SELECT * FROM categorias") String[] categorias,
        final ExecutionContext context) {
        return request.createResponseBuilder(HttpStatus.OK).body(categorias).build();
    }

    @FunctionName("addCategoria")
    public HttpResponseMessage addCategoria(
        @HttpTrigger(name = "req", methods = {HttpMethod.POST}, route = "Categories") HttpRequestMessage<String> request,
        @CosmosDBOutput(
            name = "output", 
            databaseName = "Inventorybd", 
            containerName = "Categories",
            connection = "CosmosDBConnection") OutputBinding<String> output,
        final ExecutionContext context) {
        output.setValue(request.getBody());
        return request.createResponseBuilder(HttpStatus.CREATED).body("Categoria adicionada com sucesso.").build();
    }

    @FunctionName("deleteCategoria")
    public HttpResponseMessage deleteCategoria(
        @HttpTrigger(name = "req", methods = {HttpMethod.DELETE}, route = "Categories/{id}") HttpRequestMessage<Optional<String>> request,
        @CosmosDBOutput(
            name = "output", 
            databaseName = "Inventorybd", 
            containerName = "Categories",
            connection = "CosmosDBConnection",  
            partitionKey = "{id}") OutputBinding<Object> output,
        @BindingName("id") String id,
        final ExecutionContext context) {
        output.setValue(null); 
        return request.createResponseBuilder(HttpStatus.OK).body("Categoria eliminada.").build();
    }
}

