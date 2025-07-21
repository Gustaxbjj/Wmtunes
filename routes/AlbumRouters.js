import express from 'express';
import { Album } from '../models/Index.js';

const AlbumRouters = express.Router();


AlbumRouters.get('/', async (_req, res) => {
  try {
    const album = await Album.findAll();
    res.json(album);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar album', details: err.message });
  }
});


AlbumRouters.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findByPk(id);

    if (album)
      res.json(album);
    else
      res.status(404).json({ error: 'Nenhuma album encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar album', details: err.message });
  }
});


AlbumRouters.post('/', async (req, res) => {
  try {
    const album = Album.build(req.body);
    await album.validate();
    await album.save();

    res.status(201).json(Album);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar album', details: err.message });
  }
});

AlbumRouters.post('/batch', async (req, res) => {
  try {
    const result = await Album.bulkCreate(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o album', details: err.message, errorFull: err });
  }
});



AlbumRouters.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Album.update(req.body, {
      where: { id },
    });

    if (updated) {
      const AlbumAtualizada = await Album.findByPk(id);
      return res.json(AlbumAtualizada);
    }

    return res.status(404).json({ error: 'Album não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar album', details: err.message });
  }
});


AlbumRouters.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Album.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Album deletada com sucesso' });
    }

    return res.status(404).json({ error: 'Album não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar album', details: err.message });
  }
});

export default AlbumRouters;
