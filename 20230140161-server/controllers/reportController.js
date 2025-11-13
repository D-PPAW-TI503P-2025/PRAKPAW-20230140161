"use strict";

const { Presensi } = require("../models");
const { format } = require("date-fns-tz");
const { Op } = require("sequelize");
const timeZone = "Asia/Jakarta";

exports.getDailyReport = async (req, res) => {
  try {
    // Ambil tanggalMulai dan tanggalSelesai dari query parameters
    const { tanggalMulai, tanggalSelesai } = req.query;

    let whereCondition = {};

    // Terapkan filter [Op.between] jika kedua parameter ada
    if (tanggalMulai && tanggalSelesai) {
      whereCondition.tanggalPresensi = {
        [Op.between]: [tanggalMulai, tanggalSelesai],
      };
    }

    // Ambil data presensi
    const laporan = await Presensi.findAll({
      where: whereCondition,
      attributes: [
        "id",
        "userId",
        "namaKaryawan",
        "waktuCheckIn",
        "waktuCheckOut",
        "tanggalPresensi",
      ],
    });

    if (laporan.length === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada data presensi dalam rentang tanggal ini." });
    }

    // Format hasil untuk dikirim ke response
    const formattedData = laporan.map((record) => ({
      id: record.id,
      userId: record.userId,
      nama: record.namaKaryawan,
      checkIn: format(record.waktuCheckIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
      checkOut: record.waktuCheckOut
        ? format(record.waktuCheckOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone })
        : null,
      tanggal: record.tanggalPresensi,
    }));

    // Kirim hasil ke client
    res.status(200).json({
      message: "Laporan presensi harian berhasil diambil",
      total: formattedData.length,
      data: formattedData,
    });
  } catch (error) {
    console.error("❌ Error getDailyReport:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil laporan presensi",
      error: error.message,
    });
  }
};