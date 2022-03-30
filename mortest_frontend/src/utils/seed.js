var    express = require('express'), // express framework
       session = require('express-session');// session middleware
       cookieParser = require('cookie-parser'), // cookie middleware
       mysql = require('mysql2');

const {faker} = require('@faker-js/faker');

var connection = mysql.createConnection({
       host: 'localhost',
       user: 'houssamboudiar',
       database: 'mortestdb',
       password: 'stormspirit99',
});


app = express();

app.use(cookieParser());

app.listen(3000, 'localhost');

// // Seed Products Collection
// Product = {
//        selling_point: Number,
//        reference: Number,
//        article: String,
//        img: null,
//        unit: Number,
//        famille: Number,
//        marque: Number,
//        prix_U_achat: Number,
//        prix_detail: Number,
//        prix_vente_gros: Number,
//        prix_vente_revendeur: Number,
//        prix_vente_autre: Number,
//        stock_alerte: null,
//        stock_actuel: null,
//        qtte: null,
//        ancien_prix: null,
//        marge_vente_detail: Number,
//        marge_vente_grossiste: Number,
//        marge_vente_revendeur: Number,
//        marge_vente_autre: Number
// }

const seedProducts = async (req,res) => {
  try {
    let i = 0
    for ( i = 0; i < 150; i++) {
       const product = {
          selling_point: faker.datatype.number(),
          reference: faker.datatype.number(),
          article: faker.commerce.product(),
          img: null,
          unit: faker.datatype.number(),
          famille: faker.datatype.number(),
          marque: faker.datatype.number(),
          prix_U_achat: faker.datatype.number(),
          prix_detail: faker.datatype.number(),
          prix_vente_gros: faker.datatype.number(),
          prix_vente_revendeur: faker.datatype.number(),
          prix_vente_autre: faker.datatype.number(),
          stock_alerte: faker.datatype.number(),
          stock_actuel: faker.datatype.number(),
          qtte: faker.datatype.number(),
          ancien_prix: faker.datatype.number(),
          marge_vente_detail: faker.datatype.number(),
          marge_vente_grossiste: faker.datatype.number(),
          marge_vente_revendeur: faker.datatype.number(),
          marge_vente_autre: faker.datatype.number(),
          qtte_achete: faker.datatype.number(),
          qtte_vendue: faker.datatype.number(),
          qtte_retour_four: faker.datatype.number(),
          qtte_retour_client: faker.datatype.number(),
          qtte_avarie: faker.datatype.number(),
       };
       console.log(`INSERT INTO \`mortestdb\`.\`core_produit\` (\`reference\`, \`article\`, \`unit\`, \`prix_U_achat\`, \`prix_detail\`, \`prix_vente_gros\`, \`prix_vente_revendeur\`, \`prix_vente_autre\`, \`stock_alerte\`, \`qtte\`, \`qtte_achete\`, \`qtte_vendue\`, \`qtte_retour_four\`, \`qtte_retour_client\`, \`qtte_avarie\`, \`ancien_prix\`, \`famille_id\`, \`marque_id\`, \`selling_point_id\`) VALUES (${product.reference}, '${product.article}', 'm²', ${product.prix_U_achat}, ${product.prix_detail}, ${product.prix_vente_gros}, ${product.prix_vente_revendeur}, ${product.prix_vente_autre}, ${product.stock_alerte}, ${product.qtte},${product.qtte_achete} , ${product.qtte_vendue}, ${product.qtte_retour_four}, ${product.qtte_retour_client}, ${product.qtte_avarie}, ${product.ancien_prix},'3', '1', '1');`)
       connection.execute(`INSERT INTO \`mortestdb\`.\`core_produit\` (\`reference\`, \`article\`, \`unit\`, \`prix_U_achat\`, \`prix_detail\`, \`prix_vente_gros\`, \`prix_vente_revendeur\`, \`prix_vente_autre\`, \`stock_alerte\`, \`qtte\`, \`qtte_achete\`, \`qtte_vendue\`, \`qtte_retour_four\`, \`qtte_retour_client\`, \`qtte_avarie\`, \`ancien_prix\`, \`famille_id\`, \`marque_id\`, \`selling_point_id\`) VALUES (${product.reference}, '${product.article}', 'm²', ${product.prix_U_achat}, ${product.prix_detail}, ${product.prix_vente_gros}, ${product.prix_vente_revendeur}, ${product.prix_vente_autre}, ${product.stock_alerte}, ${product.qtte},${product.qtte_achete} , ${product.qtte_vendue}, ${product.qtte_retour_four}, ${product.qtte_retour_client}, ${product.qtte_avarie}, ${product.ancien_prix},'3', '1', '1');`,
                          (err, i, fields) => {
                                   console.log(err); // results contains rows returned by server
                                   console.log(i); // results contains rows returned by server
                            });
   } 
   console.log("THE END")
   return true
   }catch (error) {
    console.log(eror)
  }
}

seedProducts()