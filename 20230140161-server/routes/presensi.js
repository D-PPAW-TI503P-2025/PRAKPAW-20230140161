const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { body, validationResult } = require('express-validator'); // Import express-validator

// Middleware Validasi untuk update presensi
const validatePresensiUpdate = [
    // waktuCheckIn harus berformat tanggal ISO8601 (opsional)
    body('waktuCheckIn')
        .optional()
        .isISO8601()
        .withMessage('Format waktuCheckIn harus berupa tanggal dan waktu yang valid (YYYY-MM-DDTHH:mm:ssZ).'),

    // waktuCheckOut harus berformat tanggal ISO8601 (opsional)
    body('waktuCheckOut')
        .optional()
        .isISO8601()
        .withMessage('Format waktuCheckOut harus berupa tanggal dan waktu yang valid (YYYY-MM-DDTHH:mm:ssZ).'),
    
    // Middleware untuk menangani hasil validasi
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Jika ada error validasi, kirim response 400 Bad Request
            return res.status(400).json({ 
                success: false,
                message: 'Kesalahan Validasi Input',
                errors: errors.array().map(err => err.msg) 
            });
        }
        next();
    }
];

// Terapkan middleware validasi pada endpoint PUT
router.put('/update', [
  // middlewares / validators
  body('fieldName').notEmpty(),
], (req, res) => {
  // handler utama
  res.send('update success')
});


// ... rute-rute lainnya/no changes


module.exports = router;