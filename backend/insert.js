    var Connection = require('tedious').Connection;  
    var config = {  
        server: '104.41.40.140',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'sa1033', //update me
                password: '05062021'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'db_Ecommerce_sa10'  //update me
        }
    };  

    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Connected");  
        executeStatement1();  
    });
    
    connection.connect();
    
    var Request = require('tedious').Request  
    var TYPES = require('tedious').TYPES;  
  
    function executeStatement1() {  
        request = new Request("INSERT sa1033.TB_IP_PRODUTO (titulo, preco_compra) VALUES (@titulo, @preco_compra);", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('titulo', TYPES.NVarChar,'Iphone XR');  
        request.addParameter('preco_compra', TYPES.NVarChar , '2000');  
        
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Product id of inserted item is " + column.value);  
              }  
            });  
        });       
        connection.execSql(request);  
    } 