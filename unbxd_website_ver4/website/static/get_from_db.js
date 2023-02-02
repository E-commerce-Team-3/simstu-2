// const { Client } = require('pg');

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'test1',
//     password: '12345',
//     port: 5432,
//   });
  
//   client.connect();

//   function getProductDetails(productIds) {
//     var query = 'SELECT product_name, price FROM website_data WHERE unique_id IN (' + productIds.join(',') + ')';
//     client.query(query, (err, res) => {
//         if (err) {
//             console.log(err);
//         } else {
//             for (let row of res.rows) {
//                 console.log(row);
//             }
//         }
//     });
// }

// getProductDetails(firstTenProductIds);