"use strict";

const { Presensi } = require("../models");
const { format } = require("date-fns-tz");
const { Op } = require("sequelize");
const timeZone = "Asia/Jakarta";

exports.getDailyReport = async (req, res) => {
    try {
        // 1. Ambil tanggalMulai dan tanggalSelesai dari query parameters
        const { tanggalMulai, tanggalSelesai } = req.query;

        let whereCondition = {};

        // 2. Terapkan filter [Op.between] jika kedua parameter ada
        if (tanggalMulai && tanggalSelesai) {
            // Asumsi: Field tanggal di model presensi adalah 'tanggalPresensi'
            whereCondition.tanggalPresensi = {
                [Op.between]: [tanggalMulai, tanggalSelesai],
            };
        }

        // Contoh kueri: Mencari presensi dalam rentang tanggal
        const laporan = await Presensi.findAll({
            where: whereCondition,
            // Anda mungkin memiliki group, attributes, atau include lainnya di sini
            // Untuk laporan harian, Anda mungkin perlu memformat atau mengelompokkan data
            // Contoh sederhana:
            attributes: ['id', 'namaKaryawan', 'waktuCheckIn', 'waktuCheckOut', 'tanggalPresensi'],
        });

        if (laporan.length === 0) {
            return res.status(404).json({ message: 'Tidak ada data presensi dalam rentang tanggal ini.' });
        }

        return res.status(200).json({
            message: 'Laporan harian berhasil diambil',
            data: laporan,
        });
    } catch (error) {
        console.error('Error saat mengambil laporan harian:', error);
        return res.status(500).json({ message: 'Gagal mengambil laporan harian', error: error.message });
    }
};
{
    // Format hasil untuk dikirim ke response
    const formattedData = dailyData.map((record) => ({
      id: record.id,
      userId: record.userId,
      nama: record.nama,
      checkIn: format(record.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
      checkOut: record.checkOut
        ? format(record.checkOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone })
        : null,
    }));

    // Kirim hasil ke client
    res.json({
      message: `Laporan presensi tanggal ${today}`,
      total: formattedData.length,
      data: formattedData,
    });

   catch (error) {
    console.error("❌ Error getDailyReport:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil laporan presensi",
      error: error.message,
    });
  }
};
