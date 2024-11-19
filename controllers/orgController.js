import Organization from '../models/orgModel.js';

export const createSpace = async (req, res) => {
  const { name, subdomain, adminId } = req.body;

  try {
    const existingOrg = await Organization.findOne({ subdomain });
    if (existingOrg) return res.status(400).json({ message: 'Subdomain already exists.' });

    const org = new Organization({ name, subdomain, admin: adminId });
    await org.save();

    res.status(201).json({ message: 'Organization created successfully', org });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
