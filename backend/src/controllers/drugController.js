import Drug from '../models/drug.js';
import { drugTableConfig } from '../config/drugTableConfig.js';

export const getTableConfig = (req, res) => {
  res.json(drugTableConfig);
};

export const getDrugs = async (req, res) => {
  try {
    const { company } = req.query;
    const filter = {};

    if (company) {
      filter.company = company;
    }

    const drugs = await Drug.find(filter).sort({ launchDate: -1 });

    res.json(drugs);
  } catch (error) {
    console.error('Error fetching drugs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
