// server.js
// Entry file for Node.js hosting environments (like Hostinger Passenger or cPanel Node App)
import('./dist/server/entry.mjs').catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
