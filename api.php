<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost:3307";  // Ganti dengan konfigurasi server database Anda
$username = "root";  // Ganti dengan username database Anda
$password = "";  // Ganti dengan password database Anda
$dbname = "ucapan";  // Ganti dengan nama database Anda

$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi ke database
if ($conn->connect_error) {
    echo json_encode([
        "statusCode" => 500,
        "message" => "Koneksi database gagal: " . $conn->connect_error
    ]);
    exit();
}

// Jika request POST untuk menambahkan ucapan
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nama = isset($_POST['nama']) ? $conn->real_escape_string($_POST['nama']) : null;
    $ucapan = isset($_POST['ucapan']) ? $conn->real_escape_string($_POST['ucapan']) : null;
    $kehadiran = isset($_POST['kehadiran']) ? $conn->real_escape_string($_POST['kehadiran']) : null;

    // Validasi input
    if ($nama && $ucapan && $kehadiran) {
        $sql = "INSERT INTO komentar (nama, ucapan, kehadiran) VALUES ('$nama', '$ucapan', '$kehadiran')";
        
        if ($conn->query($sql) === TRUE) {
            echo json_encode([
                "statusCode" => 200,
                "message" => "Ucapan berhasil disimpan!"
            ]);
        } else {
            echo json_encode([
                "statusCode" => 500,
                "message" => "Error database: " . $conn->error
            ]);
        }
    } else {
        echo json_encode([
            "statusCode" => 400,
            "message" => "Semua field harus diisi!"
        ]);
    }
} 
// Jika request GET untuk mengambil ucapan
elseif ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "SELECT nama, ucapan, kehadiran FROM komentar ORDER BY id DESC";  // Ambil komentar terbaru

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $comments = [];
        while ($row = $result->fetch_assoc()) {
            $comments[] = $row;  // Simpan setiap ucapan dalam array
        }
        echo json_encode($comments);
    } else {
        echo json_encode([
            "statusCode" => 404,
            "message" => "Tidak ada komentar ditemukan."
        ]);
    }
} else {
    // Jika method tidak diizinkan
    echo json_encode([
        "statusCode" => 405,
        "message" => "Method tidak diizinkan"
    ]);
}

$conn->close();
?>
