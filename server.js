import {   Usuario, Livros,UsuarioLivros,Postagem,TelefoneUsuario, FormasDePagamento, PagamentoCartao, Entrega, UsuarioVendas,  Plano,  Assinaturas, EscritorLivros, Comentario,} from './models/Index.js';
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';


import albumrouter from './routes/AlbumRouters.js';
import playlistsrouter from './routes/PlaylistRouters.js';
import songrouter from './routes/SongsRouters.js';
import usuariorouter from './routes/UsuarioRouters.js';
import playlistSongrouter from './routes/PlaylistSongRouters.js'




const app = express();
const port =process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/version', (req, res) =>{
 res.json({status: 'ok', version: '1.0.0'});
});

app.use('/album', albumrouter);
app.use('/playlist', playlistsrouter);
app.use('/song', songrouter);
app.use('/usuario', usuariorouter);
app.use('/playlistSong', playlistSongrouter);

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