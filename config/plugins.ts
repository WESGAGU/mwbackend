export default ({ env }) => ({
  upload: {
    config: {
      provider: "@strapi/provider-upload-cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
        secure: true,
      },
      actionOptions: {
        upload: {
          folder: "uploads",
          transformation: [], // No aplicar transformaciones automáticas
          allowed_formats: ["jpg", "jpeg", "png", "webp"], // Solo estos formatos
          overwrite: true, // Evita duplicados
          unique_filename: false, // Usa el mismo nombre si se sube la misma imagen
        },
        delete: {},
      },
    },
  },
});
