const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gerardoantoniodiazrosales@gmail.com',
    pass: 'Divergente2022',
  },
});

async function enviarCorreoConCodigo(correoDestino, codigo) {
  try {
    console.log('Enviando correo a:', correoDestino);
    await transporter.sendMail({
      from: 'gerardoantoniodiazrosales@gmail.com',
      to: correoDestino,
      subject: 'Código de acceso para inicio de sesión',
      text: `Tu código de acceso es: ${codigo}`,
    });
    console.log('Correo enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('Error al enviar el correo electrónico.');
  }
}

module.exports = enviarCorreoConCodigo;
