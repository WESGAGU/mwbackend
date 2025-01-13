export default ({ env }) => ({
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          service: 'gmail', // Usar el servicio de Gmail
          auth: {
            user: env('SMTP_USERNAME'), // Tu correo de Gmail
            pass: env('SMTP_PASSWORD'), // Tu contraseña de aplicación de Gmail
          },
        },
        settings: {
          defaultFrom: 'mwbienesinmuebles@gmail.com', // Correo que aparecerá como remitente
          defaultReplyTo: 'mwbienesinmuebles@gmail.com', // Correo para respuestas
        },
      },
    },
  });