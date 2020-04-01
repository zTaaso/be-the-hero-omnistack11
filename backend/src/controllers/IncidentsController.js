const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count();
    res.header('X-Total-Count', count['count(*)'])
    
    if(page === 'all') {
      const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

      return res.json(incidents)
      }

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
    

    return res.json(incidents)
  },

  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    try {
      const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,

      });

      return res.json({ id })

    } catch (error) {
      
    }

    
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if(!incident) {
      return res.status(400).json({ error: 'This incident does not exist.' })
    }

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation unauthorized.' })
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}