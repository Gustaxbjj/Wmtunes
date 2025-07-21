import express from 'express';
import { Song } from '../models/Index.js';

const Song = express.Router();


Song.get('/', async (_req, res) => {
  try {
    const Song = await Song.findAll();
    res.json(Song);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o Song', details: err.message });
  }
});


Song.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const Song = await Song.findByPk(id);

    if (Song)
      res.json(Song);
    else
      res.status(404).json({ error: 'Nenhuma playlist Song encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar Playlist song', details: err.message });
  }
});


Song.post('/', async (req, res) => {
  try {
    const playlistSong = PlaylistSong.build(req.body);
    await playlistSong.validate();
    await playlistSong.save();

    res.status(201).json(playlistSong);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar playlist song', details: err.message });
  }
});

Song.post('/batch', async (req, res) => {
  try {
    const result = await PlaylistSong.bulkCreate(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o playlist Song', details: err.message, errorFull: err });
  }
});



Song.put('/:id', async (req, res) => {
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


Song.delete('/:id', async (req, res) => {
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

export default Song;
