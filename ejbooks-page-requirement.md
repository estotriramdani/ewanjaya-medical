# EJ Books | Terbit buku gratis

## Background

Ewan Jaya terdapat dua unit usaha, yakni EJ Medical dan EJ Books.

EJ Medical merupakan unit usaha yang berfokus pada (namun tidak terbatas pada) penyediaan alat kesehatan. Website/landing page untuk EJ Medical sudah dibuat pada segmen '/' (home) pada aplikasi web ini.

EJ Books merupakan unit usaha yang berfokus pada penerbitan buku gratis, self publishing. Website/landing page untuk EJ Books akan dibuat pada segmen '/ejbooks' pada aplikasi web ini.

## Requirement

### Theme and design, configuration

Ikuti tema dan gaya yang telah ditetapkan untuk EJ Books. Warna dan tipografi harus konsisten dengan identitas visual EJ Books. Cek `tailwind.config.js` untuk referensi warna dan font yang digunakan.

Terapkan responsive design untuk memastikan tampilan yang optimal di berbagai perangkat.

Untuk navigasi, gunakan tag <a> HTML native alih-alih menggunakan <Link /> dari Next.js.

### Page `/ejbooks`

Pada `/ejbooks`, saya ingin menampilkan informasi:

1. Tentang EJ Books, termasuk visi, misi, dan sejarah singkatnya. Informasi ini dapat dikontrol melalui constant `EJ_BOOKS_INFO`.
2. Daftar buku yang diterbitkan oleh EJ Books, termasuk judul, penulis, deskripsi, dan cara mendapatkan buku tersebut. Informasi ini dapat dikontrol melalui constant `EJ_BOOKS_LIST`. Pada bagian ini terdapat link untuk melihat detail buku lebih lanjut (masuk ke `/ejbooks/books`).
3. CTA "Terbitkan Buku", yang memungkinkan pengguna untuk mengirimkan naskah mereka untuk diterbitkan oleh EJ Books. CTA ini redirect ke `/ejbooks/submit`.
4. Informasi kontak EJ Books, termasuk alamat email dan nomor telepon. Informasi ini dapat dikontrol melalui constant `EJ_BOOKS_CONTACT`.
5. FAQ atau pertanyaan yang sering diajukan tentang EJ Books, termasuk proses penerbitan dan cara mendapatkan buku. Informasi ini dapat dikontrol melalui constant `EJ_BOOKS_FAQ`.
6. Testimoni atau ulasan dari pembaca atau penulis yang telah bekerja sama dengan EJ Books. Informasi ini dapat dikontrol melalui constant `EJ_BOOKS_TESTIMONIALS`.
7. Informasi tambahan atau pengumuman terkait EJ Books. Informasi ini dapat dikontrol melalui constant `EJ_BOOKS_ANNOUNCEMENTS`.
8. CTA lagi untuk mendorong penulis menerbitkan buku mereka melalui EJ Books.

### Page `/ejbooks/submit`

Pada halaman ini, tampilkan alur penerbitan dan estimasi waktu di tiap-tiap tahap. Alur ini bisa dikontrol melalui constant `EJ_BOOKS_PUBLISHING_FLOW`. Buat format seperti timeline dan interactive.

Pada halaman ini juga, menampilkan Paket penerbitan yang tersedia. Paket penerbitan ini seperti pricing card. Tentu harus ada detailnya. Informasi terkait paket penerbitan dapat dikontrol melalui constant `EJ_BOOKS_PUBLISHING_PACKAGES`. Pada constant / array tersebut, harus ada "Nama Paket", "Harga (Rp)", "Fitur", dan "Deskripsi". Kamu bisa menambah properti lainnya yang dikira cocok.

Pada paket penerbitan, pengguna dapat memilih paket yang sesuai dengan kebutuhan mereka dengan cara mengeklik tombol. Kemudian akan muncul formulir pengiriman naskah yang sesuai dengan paket yang dipilih.

Formulir tersebut ada kolom berikut:
1. Paket penerbitan
2. Nama lengkap penulis
3. Nama pena penulis
4. Judul buku
5. File naskah berikut (sediakan kolom berbeda):
   1. Rangkuman, sinopsis, gambaran umum tentang naskah
   2. Daftar isi
   3. Kata pengantar
   4. Tentang penulis
   5. Naskah penuh (ukuran A5, margin 2-2-2-2, font Cambria 11pt, spasi 1.15)
   6. Cover (jika ada)
6. Kontak penulis (email dan nomor telepon)

Setelah formulir dikirim, pengguna akan menerima konfirmasi bahwa naskah mereka telah diterima dan akan diproses oleh tim EJ Books.

NOTE: Form action ini cukup dummy API dulu saja, untuk form processing selanjutnya kita akan melakukan improvement di lain kesempatan.

### Page `/ejbooks/books` and `/ejbooks/books/[id]`

Halaman ini menampilkan daftar buku yang diterbitkan oleh EJ Books. Pengguna dapat melihat detail buku dengan mengklik link yang tersedia, yang akan membawa mereka ke halaman `/ejbooks/books/[id]` untuk informasi lebih lanjut tentang buku tersebut.

Pada informasi buku, ada beberapa gambar yang menampilkan sampul buku, ilustrasi, atau konten terkait lainnya. Jadi nanti dibuat semacam galeri atau slider untuk menampilkan gambar-gambar tersebut. Seperti ecommerce.

### Page `/ejbooks/social-links`

Halaman ini menampilkan tautan-tautan dan informasi lainnya terkait EJ Books, termasuk media sosial, blog, cara menerbitkan, dan platform lainnya yang relevan. Informasi ini dapat dikontrol melalui constant `EJ_BOOKS_SOCIAL_LINKS`. Konsepnya seperti Linktree, di mana pengguna dapat dengan mudah mengakses berbagai platform EJ Books dari satu halaman.