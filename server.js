import {   Usuario, Livros,UsuarioLivros,Postagem,TelefoneUsuario, FormasDePagamento, PagamentoCartao, Entrega, UsuarioVendas,  Plano,  Assinaturas, EscritorLivros, Comentario,} from './models/Index.js';
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';


import entregarouter from './routes/EntregaRouters.js';
import assinaturasrouter from './routes/AssinaturaRouters.js';
import comentariorouter from './routes/ComentarioRouters.js';




const app = express();
const port =process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/version', (req, res) =>{
 res.json({status: 'ok', version: '1.0.0'});
});

app.use('/entrega', entregarouter);
app.use('/assinatura', assinaturasrouter);
app.use('/comentario', comentariorouter);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tudo certo chefe ✅');
    app.listen(port, () => {
      console.log(`Server ok port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Deu ruim:', error);
  });