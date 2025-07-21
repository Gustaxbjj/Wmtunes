import express from 'express';
import { Song } from '../models/Index.js';

const SongsRouters = express.Router();


SongsRouters.get('/', async (_req, res) => {
  try {
    const Songs = await Song.findAll();
    res.json(Songs);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o Song', details: err.message });
  }
});


SongsRouters.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const Songs= await Song.findByPk(id);

    if (Songs)
      res.json(Songs);
    else
      res.status(404).json({ error: 'Nenhuma Song encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar  Song', details: err.message });
  }
});


SongsRouters.post('/', async (req, res) => {
  try {
    const Songs = Song.build(req.body);
    await Songs.validate();
    await Songs.save();

    res.status(201).json(Songs);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar  Songs', details: err.message });
  }
});

SongsRouters.post('/batch', async (req, res) => {
  try {
    const result = await Song.bulkCreate(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o Song', details: err.message, errorFull: err });
  }
});



SongsRouters.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Song.update(req.body, {
      where: { id },
    });

    if (updated) {
      const SongAtualizada = await Song.findByPk(id);
      return res.json(SongAtualizada);
    }

    return res.status(404).json({ error: ' Songs não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizada Song', details: err.message });
  }
});


SongsRouters.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Song.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Song  deletado com sucesso' });
    }

    return res.status(404).json({ error: 'Song  não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar Song', details: err.message });
  }
});

export default SongsRouters;
