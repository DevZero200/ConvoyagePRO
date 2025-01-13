// Add to existing routes in index.js
import paymentRoutes from './routes/payment.js';

// Add this line with other app.use statements
app.use('/api/payment', paymentRoutes);