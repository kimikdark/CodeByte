// seed-db.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: './database.env' }); // Garante que as variáveis de ambiente são carregadas

import { CosmosClient } from "@azure/cosmos";
// *** MUITO IMPORTANTE: Ajuste este caminho se o seu ficheiro 'produto.model.ts' estiver noutro local ***
// Caminho comum se 'seed-db.ts' estiver em 'src/' e 'produto.model.ts' em 'src/app/core/models/'
import { Produto } from './app/core/models/produto.model';


// Credenciais do Cosmos DB (Corrigido para usar notação de colchetes e asserção de tipo)
const endpoint = process.env['COSMOS_DB_ENDPOINT'] as string;
const key = process.env['COSMOS_DB_KEY'] as string;
const databaseId = process.env['COSMOS_DB_DATABASE_ID'] as string;
const containerId = process.env['COSMOS_DB_CONTAINER_ID'] as string;
const partitionKeyPath = process.env['COSMOS_DB_PARTITION_KEY_PATH'] as string;

// Validação de variáveis de ambiente
if (!endpoint || !key || !databaseId || !containerId || !partitionKeyPath) {
  console.error("ERRO: As variáveis de ambiente do Cosmos DB não estão configuradas corretamente.");
  console.error("Verifique o seu ficheiro database.env.");
  console.error("COSMOS_DB_ENDPOINT:", endpoint ? "Configurado" : "FALTA");
  console.error("COSMOS_DB_KEY:", key ? "Configurado" : "FALTA");
  console.error("COSMOS_DB_DATABASE_ID:", databaseId ? "Configurado" : "FALTA");
  console.error("COSMOS_DB_CONTAINER_ID:", containerId ? "Configurado" : "FALTA");
  console.error("COSMOS_DB_PARTITION_KEY_PATH:", partitionKeyPath ? "Configurado" : "FALTA");
  process.exit(1);
}

// Inicializar o cliente Cosmos DB
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

// Dados de exemplo (COM NOMES DE PROPRIEDADE EM INGLÊS E ID COMO STRING)
const sampleProducts: Produto[] = [
  {
    id: "prod-001", // ID agora é STRING
    name: "Laptop CodeByte Pro",
    description: "Potente laptop para desenvolvimento e jogos.",
    price: 1200.00,
    category: "Eletrónica",
    quantityInStock: 20,
    imageUrl: "https://via.placeholder.com/200x150.png?text=Laptop"
  },
  {
    id: "prod-002", // ID agora é STRING
    name: "Teclado Mecânico RGB",
    description: "Teclado ergonómico com iluminação personalizável.",
    price: 95.50,
    category: "Acessórios",
    quantityInStock: 150,
    imageUrl: "https://via.placeholder.com/200x150.png?text=Teclado"
  },
  {
    id: "prod-003", // ID agora é STRING
    name: "Monitor Ultrawide 34\"",
    description: "Monitor imersivo para produtividade e entretenimento.",
    price: 450.00,
    category: "Eletrónica",
    quantityInStock: 30,
    imageUrl: "https://via.placeholder.com/200x150.png?text=Monitor"
  },
  {
    id: "prod-004", // ID agora é STRING
    name: "Rato Gamer Ergonómico",
    description: "Rato de alta precisão com botões programáveis.",
    price: 60.00,
    category: "Acessórios",
    quantityInStock: 80,
    imageUrl: "https://via.placeholder.com/200x150.png?text=Rato"
  },
  {
    id: "prod-005", // ID agora é STRING
    name: "Webcam Full HD",
    description: "Webcam para videochamadas com excelente qualidade de imagem.",
    price: 40.00,
    category: "Periféricos",
    quantityInStock: 100,
    imageUrl: "https://via.placeholder.com/200x150.png?text=Webcam"
  }
  // ADICIONE OS SEUS PRÓPRIOS DADOS DE TESTE AQUI!
];

async function seedDatabase() {
  console.log('A tentar conectar e semear o Cosmos DB...');
  try {
    await database.read();
    await container.read();
    console.log(`Conectado à base de dados '${databaseId}' e contêiner '${containerId}'.`);

    for (const product of sampleProducts) {
      // O upsert irá criar ou atualizar o item. A partitionKey é importante aqui.
      const { resource: createdItem } = await container.items.upsert(product);
      // Usar createdItem!.name para resolver 'possibly undefined' e 'name' para alinhar com o modelo
    console.log(`Produto '${createdItem!['name']}' (ID: ${createdItem!['id']}) adicionado/atualizado.`);    }
    console.log('Semeadura da base de dados concluída com sucesso!');
  } catch (error: any) {
    console.error('Erro durante a semeadura da base de dados:', error.message);
    if (error.code === 401) {
        console.error("Erro de Autorização: Verifique se a COSMOS_DB_KEY no seu database.env está correta.");
    } else if (error.code === 404) {
        console.error(`Erro: Base de dados '${databaseId}' ou contêiner '${containerId}' não encontrado. Verifique os IDs.`);
    } else {
        console.error("Erro desconhecido. Mensagem:", error.message);
    }
  } finally {
    console.log('Script de semeadura finalizado.');
  }
}

seedDatabase();