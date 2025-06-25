const contactsService = require('../services/contacts.service');

// Récupérer tous les contacts d'un lieu
async function getContactsByLieu(req, res) {
  try {
    const { lieuId } = req.params;
    const contacts = await contactsService.getContactsByLieu(lieuId);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Récupérer le contact principal d'un lieu
async function getContactPrincipal(req, res) {
  try {
    const { lieuId } = req.params;
    const contact = await contactsService.getContactPrincipal(lieuId);
    if (!contact) {
      return res.status(404).json({ message: 'Aucun contact principal trouvé' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Récupérer un contact par ID
async function getContactById(req, res) {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Ajouter un nouveau contact
async function addContact(req, res) {
  try {
    const { lieuId } = req.params;
    const contactData = { ...req.body, lieu_id: lieuId };
    const userId = req.user.id;

    // Validation des données
    if (!contactData.nom_contact) {
      return res.status(400).json({ message: 'Nom du contact requis' });
    }

    // Validation du format téléphone si fourni
    if (contactData.telephone && !contactsService.validatePhoneNumber(contactData.telephone)) {
      return res.status(400).json({ message: 'Format de téléphone invalide. Utilisez le format guinéen: +224 XXX XXX XXX' });
    }

    // Formater le téléphone si fourni
    if (contactData.telephone) {
      contactData.telephone = contactsService.formatPhoneNumber(contactData.telephone);
    }

    const contact = await contactsService.addContact(contactData, userId);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Modifier un contact
async function updateContact(req, res) {
  try {
    const { id } = req.params;
    const contactData = req.body;
    const userId = req.user.id;

    // Validation du format téléphone si fourni
    if (contactData.telephone && !contactsService.validatePhoneNumber(contactData.telephone)) {
      return res.status(400).json({ message: 'Format de téléphone invalide. Utilisez le format guinéen: +224 XXX XXX XXX' });
    }

    // Formater le téléphone si fourni
    if (contactData.telephone) {
      contactData.telephone = contactsService.formatPhoneNumber(contactData.telephone);
    }

    const contact = await contactsService.updateContact(id, contactData, userId);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Supprimer un contact
async function deleteContact(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await contactsService.deleteContact(id, userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Définir un contact comme principal
async function setMainContact(req, res) {
  try {
    const { id } = req.params;
    const { lieuId } = req.body;
    const userId = req.user.id;

    if (!lieuId) {
      return res.status(400).json({ message: 'ID du lieu requis' });
    }

    const contact = await contactsService.setMainContact(id, lieuId, userId);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getContactsByLieu,
  getContactPrincipal,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  setMainContact
}; 