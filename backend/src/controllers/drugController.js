import Drug from '../models/drug.js';

export const getTableConfig = (req, res) => {
  const config = [
    { key: 'id', label: 'Id' },
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Name' },
    { key: 'company', label: 'Company' },
    { key: 'launchDate', label: 'Launch Date' }
  ];

  res.json(config);
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
