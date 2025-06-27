**CodeByte - Sistema de Gestão de Inventário para Loja de Informática**



Este projeto tem como objetivo o desenvolvimento de um sistema completo de gestão de stock para uma loja de produtos eletrónicos. A aplicação permite o controlo eficiente de produtos, categorias, níveis de stock e transações, garantindo organização e rastreabilidade no inventário.

Objetivos do Projeto



&nbsp;   Gestão de produtos e categorias

&nbsp;   Monitorização e atualização de stock

&nbsp;   Registo de transações de entrada e saída

&nbsp;   Pesquisa e visualização dos dados em tempo real



Tecnologias Utilizadas



&nbsp;   Frontend: Angular

&nbsp;   Backend: Azure Functions (Java)

&nbsp;   Base de Dados: Azure CosmosDB (NoSQL)

&nbsp;   Deploy: Azure App Service e Azure Functions



MVP - Mínimo Produto Viável

1\. Gestão de Produtos



Funcionalidades:



&nbsp;   Criar novo produto com nome, descrição, preço, categoria e quantidade em stock

&nbsp;   Editar os dados de um produto existente

&nbsp;   Eliminar produtos descontinuados

&nbsp;   Listar todos os produtos com detalhes principais

&nbsp;   Visualizar detalhes de um produto



2\. Gestão de Stock



Funcionalidades:



&nbsp;   Aumentar ou reduzir stock de um produto

&nbsp;   Validar quantidade antes da venda (evitar stock negativo)

&nbsp;   Exibir alerta visual no frontend para produtos com stock baixo (ex: menos de 5 unidades)



Lógica:



&nbsp;   O stock é atualizado automaticamente com base nas transações de entrada e saída

&nbsp;   Pode ser ajustado manualmente por um administrador



Objetivo:



&nbsp;   Manter o controlo do inventário em tempo real

&nbsp;   Evitar ruturas ou excesso de stock



3\. Visualização de Transações



Funcionalidades:



&nbsp;   Registar entrada de stock (ex: compra a fornecedor)

&nbsp;   Registar saída de stock (ex: venda ou devolução)

&nbsp;   Listar todas as transações ordenadas por data

&nbsp;   Visualizar transações por produto ou tipo (entrada ou saída)



Objetivo:



&nbsp;   Manter um histórico completo das movimentações de inventário

&nbsp;   Apoiar decisões operacionais como reposições ou promoções



4\. Pesquisa Básica de Produtos



Funcionalidades:



&nbsp;   Caixa de pesquisa para procurar produtos por:

&nbsp;       Nome

&nbsp;       Categoria

&nbsp;   Filtros simples por:

&nbsp;       Categoria

&nbsp;       Preço

&nbsp;       Nível de stock



Objetivo:



&nbsp;   Melhorar a usabilidade do sistema

&nbsp;   Permitir acesso rápido a produtos específicos

&nbsp;   Facilitar a gestão do inventário

