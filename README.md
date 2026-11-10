# LAPORAN PEMROGRAMAN WEB - CLASS ACTIVITY 10

----
| Nama | NRP |
| ---------------------- | ---------- |
| Dea Chrisna Butarbutar | 5027241035 |
----

## SKENARIO DAN TAMPILAN

### 1. POST

Tampilan sebelum:

![alt text](src/images/1-web.png)
![alt text](src/images/1-neon-before.png)

POST film Interstellar:

![alt text](src/images/1-postman.png)

Tampilan sesudah:

![alt text](src/images/1-after.png)
![alt text](src/images/1-neon-after.png)

### 2. PUT

PUT film Interstellar untuk mengubah film menjadi series:
![alt text](src/images/2-postman.png)

Tampilan database sesudah:

![alt text](src/images/2-neon-after.png)

### 3. DELETE item id 4	item hilang dari list

DELETE fil Interstellar dengan id 1:

![alt text](src/images/3-postman.png)

Tampilan sesudah:
![alt text](src/images/3-neon-after.png)

### 4. POST dengan Kategori yang Tidak Tersedia

![alt text](src/images/4-postman.png)

Ketika merequest dengan kategori yang tidak tersedia, maka akan menampilkan response 404 dan tidak dapat menambahkan data baru.

![alt text](src/images/4-neon-after.png)

5. GET Id yang Tidak Ada

![alt text](image.png)

Id yang tersisa tidak ada karena sebelumnya sudah dihapus, sehingga ketika melakukan PUT ataupun GET, hasilnya akan 404 not found.