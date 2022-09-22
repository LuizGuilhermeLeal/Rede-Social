'use strict';

//CHAMADA DA TABELA DYNAMODB
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require("uuid");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: "USERS",
};



//FUNÇÃO LISTAR USUÁRIO
module.exports.listarUsers = async (event) => {
  try {
    let data = await dynamoDb.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (err) {
    console.log("Error",err);
    return {
      statusCode: err.statusCode ? err.statusCode: 500,
      body: JSON.stringify({
        error: err.name ? err.name: "Exception",
        message: err.message ? err.message: "Unknown error",
      }),
    };
  }
};

//FUNÇÃO OBTER USUÁRIO
module.exports.obterUser = async (event) => {
  try {
    const { userID } = event.pathParameters;

    const data = await dynamoDb
      .get({
        ...params,
        Key: {
          user_id: userID,
        },
    })
    .promise();

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Usuário não existe" }, null, 2),
      };
    }

    const user = data.Item;

    return {
      statusCode: 200,
      body: JSON.stringify(user, null, 2),
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};

//FUNÇÃO CADASTRAR USUÁRIO
module.exports.cadastrarUser = async (event) => {
  try {
    const timestamp = new Date().getTime();

    let dados = JSON.parse(event.body);

    const { nome, sobrenome, email, senha } = dados;

    const user = {
      user_id: uuidv4(),
      nome,
      sobrenome,
      email,
      senha,
      status: true,
      criado_em: timestamp,
      atualizado_em: timestamp,
    };

    await dynamoDb
      .put({
        TableName: "USERS",
        Item: user,
      })
      .promise();

    return {
      statusCode: 201,
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};

//FUNÇÃO ATUALIZAR USUÁRIO
module.exports.atualizarUser = async (event) => {
  const { userID } = event.pathParameters

  try {
    const timestamp = new Date().getTime();

    let dados = JSON.parse(event.body);

    const { nome, sobrenome, email, senha } = dados;

    await dynamoDb
      .update({
        ...params,
        Key: {
          user_id: userID
        },
        UpdateExpression:
          'SET nome = :nome, sobrenome = :sobrenome, email = :email,' 
          + ' senha = :senha, atualizado_em = :atualizado_em',
        ConditionExpression: 'attribute_exists(user_id)',
        ExpressionAttributeValues: {
          ':nome': nome,
          ':sobrenome': sobrenome,
          ':email': email,
          ':senha': senha,
          ':atualizado_em': timestamp
        }
      })
      .promise()

    return {
      statusCode: 204,
    };
  } catch (err) {
    console.log("Error", err);

    let error = err.name ? err.name : "Exception";
    let message = err.message ? err.message : "Unknown error";
    let statusCode = err.statusCode ? err.statusCode : 500;

    if (error == 'ConditionalCheckFailedException') {
      error = 'Usuário não existe';
      message = `Recurso com o ID ${userID} não existe e não pode ser atualizado`;
      statusCode = 404;
    }

    return {
      statusCode,
      body: JSON.stringify({
        error,
        message
      }),
    };
  }
};

//FUNÇÃO EXCLUIR USUÁRIO
module.exports.excluirUser = async event => {
  const { userID } = event.pathParameters

  try {
    await dynamoDb
      .delete({
        ...params,
        Key: {
          user_id: userID
        },
        ConditionExpression: 'attribute_exists(user_id)'
      })
      .promise()

    return {
      statusCode: 204
    }
  } catch (err) {
    console.log("Error", err);

    let error = err.name ? err.name : "Exception";
    let message = err.message ? err.message : "Unknown error";
    let statusCode = err.statusCode ? err.statusCode : 500;

    if (error == 'ConditionalCheckFailedException') {
      error = 'Usuário não existe';
      message = `Recurso com o ID ${userID} não existe e não pode ser atualizado`;
      statusCode = 404;
    }

    return {
      statusCode,
      body: JSON.stringify({
        error,
        message
      }),
    };
  }
}