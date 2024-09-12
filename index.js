const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "https://imagem-five.vercel.app/",
}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('profileImage'), (req, res) => {
  try {
    res.status(200).json({
      message: 'Imagem enviada com sucesso!',
      file: req.file,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar a imagem.', error });
  }
});

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
