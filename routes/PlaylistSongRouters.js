import express from 'express';
import { PlaylistSong } from '../models/Index.js';

const PlaylistSongRouters = express.Router();


PlaylistSongRouters.get('/', async (_req, res) => {
  try {
    const playlistSong = await PlaylistSong.findAll();
    res.json(playlistSong);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar a música nessa playlist', details: err.message });
  }
});


PlaylistSongRouters.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const playlistSong = await PlaylistSong.findByPk(id);

    if (playlistSong)
      res.json(playlistSong);
    else
      res.status(404).json({ error: 'Nenhuma playlist Song encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar Playlist song', details: err.message });
  }
});


PlaylistSongRouters.post('/', async (req, res) => {
  try {
    const playlistSong = PlaylistSong.build(req.body);
    await playlistSong.validate();
    await playlistSong.save();

    res.status(201).json(playlistSong);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar playlist song', details: err.message });
  }
});

PlaylistSongRouters.post('/batch', async (req, res) => {
  try {
    const result = await PlaylistSong.bulkCreate(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o playlist Song', details: err.message, errorFull: err });
  }
});



PlaylistSongRouters.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await PlaylistSong.update(req.body, {
      where: { id },
    });

    if (updated) {
      const playlistSongAtualizada = await PlaylistSong.findByPk(id);
      return res.json(playlistSongAtualizada);
    }

    return res.status(404).json({ error: 'Playlist Song não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar Playlist song', details: err.message });
  }
});


PlaylistSongRouters.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await PlaylistSong.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Música da playlist deletada com sucesso' });
    }

    return res.status(404).json({ error: 'Música  não encontrada na playlist' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar Música da playlist', details: err.message });
  }
});

export default PlaylistSongRouters;
