const { supabase } = require('../utils/supabaseClient');

exports.getAllArticles = async (query) => {
  // TODO: filtrage par auteur, statut, etc.
  const { data, error } = await supabase.from('articles').select('*');
  if (error) throw new Error(error.message);
  return data;
};

exports.createArticle = async (articleData, user) => {
  // TODO: vérifier user, champs obligatoires, etc.
  const { data, error } = await supabase.from('articles').insert([{ ...articleData, user_id: user.id }]).select().single();
  if (error) throw new Error(error.message);
  return data;
};

exports.updateArticle = async (id, articleData, user) => {
  // TODO: vérifier que user est l'auteur
  const { data, error } = await supabase.from('articles').update(articleData).eq('id', id).select().single();
  if (error) throw new Error(error.message);
  return data;
};

exports.deleteArticle = async (id, user) => {
  // TODO: vérifier que user est l'auteur
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) throw new Error(error.message);
};

exports.addComment = async (articleId, commentData, user) => {
  const { data, error } = await supabase.from('commentaires_article').insert([{ ...commentData, article_id: articleId, user_id: user.id }]).select().single();
  if (error) throw new Error(error.message);
  return data;
};

exports.addLike = async (articleId, user) => {
  const { data, error } = await supabase.from('likes_article').insert([{ article_id: articleId, user_id: user.id }]).select().single();
  if (error) throw new Error(error.message);
  return data;
};

exports.getLikes = async (articleId) => {
  const { count, error } = await supabase
    .from('likes_article')
    .select('*', { count: 'exact', head: true })
    .eq('article_id', articleId)
  if (error) throw new Error(error.message)
  return count || 0
}

exports.getComments = async (articleId) => {
  const { data, error } = await supabase
    .from('commentaires_article')
    .select('*')
    .eq('article_id', articleId)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data || []
}

exports.getArticleById = async (id) => {
  const { data, error } = await supabase.from('articles').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
} 