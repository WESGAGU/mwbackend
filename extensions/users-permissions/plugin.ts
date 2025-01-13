'use strict';

module.exports = ({ strapi }) => {
  // Extender el controlador de autenticación
  strapi.plugins['users-permissions'].controllers.auth.callback = async (ctx) => {
    const { provider, query } = ctx.params;
    const { code } = query;

    try {
      // Autenticar al usuario con el proveedor (Google)
      const { user, jwt } = await strapi.plugins['users-permissions'].services.providers.callback(provider, code);

      // Verificar si el usuario ya existe en tu Collection Type de User
      let userRecord = await strapi.query('api::user.user').findOne({
        where: { email: user.email },
      });

      // Si el usuario no existe, crearlo
      if (!userRecord) {
        userRecord = await strapi.query('api::user.user').create({
          data: {
            username: user.username || user.email.split('@')[0], // Usar el email como nombre de usuario si no hay username
            email: user.email,
            provider: provider, // Guardar el proveedor (Google)
            confirmed: true, // Marcar como confirmado
          },
        });
      }

      // Devolver el token JWT y la información del usuario
      ctx.send({
        jwt,
        user: userRecord,
      });
    } catch (error) {
      console.error('Error en el callback de autenticación:', error);
      ctx.throw(500, 'Error durante la autenticación');
    }
  };
};