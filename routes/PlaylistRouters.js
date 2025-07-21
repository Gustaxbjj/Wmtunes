import express from 'express';
import { Playlist } from '../models/Index.js';

const PlaylistRouters = express.Router();


PlaylistRouters.get('/', async (_req, res) => {
  try {
    const playlist = await Playlist.findAll();
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar playlist', details: err.message });
  }
});


PlaylistRouters.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const assinatura = await Playlist.findByPk(id);

    if (assinatura)
      res.json(assinatura);
    else
      res.status(404).json({ error: 'Nenhuma assinatura encontrada' });
  } catch (err) {
    
    res.status(500).json({ error: 'Erro ao encontrar assinatura', details: err.message });
  }
});


PlaylistRouters.post('/', async (req, res) => {
  try {
    const assinaturas = Playlist.build(req.body);
    await assinaturas.validate();
    await assinaturas.save();

    res.status(201).json(Playlist);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar avaliação', details: err.message });
  }
});

PlaylistRouters.post('/batch', async (req, res) => {
  try {
    const result = await Playlist.bulkCreate(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o assinatura', details: err.message, errorFull: err });
  }
});



PlaylistRouters.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Playlist.update(req.body, {
      where: { id },
    });

    if (updated) {
      const PlaylistAtualizada = await Playlist.findByPk(id);
      return res.json(PlaylistAtualizada);
    }

    return res.status(404).json({ error: 'Playlist não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar a Playlist', details: err.message });
  }
});


PlaylistRouters.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Playlist.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Playlist deletada com sucesso' });
    }

    return res.status(404).json({ error: 'Playlist não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar Playlist', details: err.message });
  }
});

export default PlaylistRouters;
