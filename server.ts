import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory & local file persistence for registrations
const DATA_DIR = path.join(__dirname, 'data');
const REG_FILE = path.join(DATA_DIR, 'registrations.json');
const PRAYER_FILE = path.join(DATA_DIR, 'prayers.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const loadData = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (err) {
    console.error('Error loading data from ' + filePath, err);
  }
  return [];
};

const saveData = (filePath: string, data: any) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving data to ' + filePath, err);
  }
};

let registrations = loadData(REG_FILE);
let prayers = loadData(PRAYER_FILE);

// API Routes
app.post('/api/register', (req, res) => {
  const { name, email, whatsapp, country, role } = req.body;

  if (!name || !email || !whatsapp) {
    return res.status(400).json({ error: 'Name, email, and WhatsApp number are required.' });
  }

  const newRegistration = {
    id: 'REG-' + Date.now(),
    name: name.trim(),
    email: email.trim(),
    whatsapp: whatsapp.trim(),
    country: (country || 'Not specified').trim(),
    role: role || 'Mother',
    registeredAt: new Date().toISOString(),
  };

  registrations.unshift(newRegistration);
  saveData(REG_FILE, registrations);

  console.log(`[CCTI 3.0] New Registration: ${newRegistration.name} (${newRegistration.email})`);

  return res.json({
    success: true,
    message: 'Registration saved successfully!',
    registration: newRegistration,
    totalCount: registrations.length,
  });
});

app.get('/api/registrations', (req, res) => {
  return res.json({
    success: true,
    count: registrations.length,
    registrations,
  });
});

app.post('/api/prayer', (req, res) => {
  const { name, category, message, isAnonymous, targetMinister } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  const newPrayer = {
    id: 'PRY-' + Date.now(),
    name: isAnonymous ? 'Anonymous' : (name || 'Anonymous').trim(),
    category: category || 'Prayer Request',
    message: message.trim(),
    targetMinister: targetMinister || 'General Ministry Team',
    submittedAt: new Date().toISOString(),
  };

  prayers.unshift(newPrayer);
  saveData(PRAYER_FILE, prayers);

  console.log(`[CCTI 3.0] New Prayer/Question from ${newPrayer.name}`);

  return res.json({
    success: true,
    message: 'Prayer request/question saved successfully!',
    prayer: newPrayer,
  });
});

app.get('/api/prayers', (req, res) => {
  return res.json({
    success: true,
    count: prayers.length,
    prayers,
  });
});

// Serve public static assets
app.use('/assets/images', express.static(path.join(__dirname, 'public/assets/images')));
app.use(express.static(path.join(__dirname, 'public')));

// Configure Vite middleware in development
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Ensure all HTML navigation requests resolve index.html
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    app.use('/src/assets/images', express.static(path.join(__dirname, 'public/assets/images')));
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[CCTI 3.0] Server running on port ${PORT} (http://localhost:${PORT})`);
  });
}

startServer();
