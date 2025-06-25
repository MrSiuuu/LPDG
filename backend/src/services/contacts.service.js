const { supabase } = require('../utils/supabaseClient');

class ContactsService {
  // Récupérer tous les contacts d'un lieu
  async getContactsByLieu(lieuId) {
    try {
      const { data, error } = await supabase
        .from('contacts_lieu')
        .select('*')
        .eq('lieu_id', lieuId)
        .order('est_principal', { ascending: false })
        .order('nom_contact', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des contacts: ${error.message}`);
    }
  }

  // Récupérer le contact principal d'un lieu
  async getContactPrincipal(lieuId) {
    try {
      const { data, error } = await supabase
        .from('contacts_lieu')
        .select('*')
        .eq('lieu_id', lieuId)
        .eq('est_principal', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du contact principal: ${error.message}`);
    }
  }

  // Récupérer un contact par ID
  async getContactById(contactId) {
    try {
      const { data, error } = await supabase
        .from('contacts_lieu')
        .select('*')
        .eq('id', contactId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du contact: ${error.message}`);
    }
  }

  // Ajouter un nouveau contact
  async addContact(contactData, userId) {
    try {
      const { data, error } = await supabase
        .from('contacts_lieu')
        .insert([{
          ...contactData,
          user_id: userId
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de l'ajout du contact: ${error.message}`);
    }
  }

  // Modifier un contact
  async updateContact(contactId, contactData, userId) {
    try {
      // Vérifier que le contact existe
      const existingContact = await this.getContactById(contactId);
      if (!existingContact) {
        throw new Error('Contact non trouvé');
      }

      const { data, error } = await supabase
        .from('contacts_lieu')
        .update({
          ...contactData,
          updated_at: new Date().toISOString()
        })
        .eq('id', contactId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de la modification du contact: ${error.message}`);
    }
  }

  // Supprimer un contact
  async deleteContact(contactId, userId) {
    try {
      // Vérifier que le contact existe
      const existingContact = await this.getContactById(contactId);
      if (!existingContact) {
        throw new Error('Contact non trouvé');
      }

      const { error } = await supabase
        .from('contacts_lieu')
        .delete()
        .eq('id', contactId);

      if (error) throw error;
      return { success: true, message: 'Contact supprimé avec succès' };
    } catch (error) {
      throw new Error(`Erreur lors de la suppression du contact: ${error.message}`);
    }
  }

  // Définir un contact comme principal
  async setMainContact(contactId, lieuId, userId) {
    try {
      // D'abord, retirer le statut principal de tous les contacts du lieu
      await supabase
        .from('contacts_lieu')
        .update({ est_principal: false })
        .eq('lieu_id', lieuId);

      // Ensuite, définir le contact sélectionné comme principal
      const { data, error } = await supabase
        .from('contacts_lieu')
        .update({ 
          est_principal: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', contactId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de la définition du contact principal: ${error.message}`);
    }
  }

  // Valider le format du téléphone guinéen
  validatePhoneNumber(phone) {
    if (!phone) return true; // Optionnel
    
    // Format guinéen: +224 XXX XXX XXX ou 224 XXX XXX XXX
    const phoneRegex = /^(\+?224)?\s?(\d{3})\s?(\d{3})\s?(\d{3})$/;
    return phoneRegex.test(phone);
  }

  // Formater le téléphone au format guinéen
  formatPhoneNumber(phone) {
    if (!phone) return phone;
    
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 12 && cleaned.startsWith('224')) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
    }
    return phone;
  }
}

module.exports = new ContactsService(); 