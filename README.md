# Form Auth

- **Nama:** Latanza Akbar Fadilah
- **NIM:** 2410501004
- **Aplikasi:** Auth Form App (Login & Register)

---

## Deskripsi Aplikasi

Aplikasi Auth Form adalah aplikasi mobile berbasis React Native (Expo) yang berfungsi untuk mengelola autentikasi pengguna melalui fitur Login dan Register.

Aplikasi ini memiliki sistem form yang lengkap dengan validasi menggunakan Formik dan Yup, serta mendukung multi-step form pada proses registrasi. Data pengguna disimpan secara lokal menggunakan AsyncStorage sehingga dapat digunakan kembali saat proses login.

### Fitur Utama

- Login dengan validasi email dan password
- Register multi-step (Data Pribadi > Akun > Review)
- Upload foto profil dari galeri
- Password strength indicator (weak, medium, strong)
- Auto focus antar input
- Custom alert 
- Penyimpanan data menggunakan AsyncStorage
- Animasi transisi antar step

---

## Dependency & Library yang Digunakan

| Library | Fungsi |
|---------|--------|
| **React Native (Expo)** | Framework mobile development |
| **Formik** | Manajemen state form |
| **Yup** | Validasi form schema |
| **@react-navigation/native** | Navigasi antar screen |
| **@react-native-async-storage/async-storage** | Penyimpanan data lokal |
| **expo-image-picker** | Upload foto dari galeri |
| **@expo/vector-icons** | Icon UI |
| **React Native Animated API** | Animasi transisi |

---

## Screenshot

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./screenshot/signin.jpeg" width="160" alt="Login Screen" /><br />
        <b>Login Screen</b>
      </td>
      <td align="center">
        <img src="./screenshot/signup-step1.jpeg" width="160" alt="Data Pribadi" /><br />
        <b>Data Pribadi</b>
      </td>
      <td align="center">
        <img src="./screenshot/signup-step2.jpeg" width="160" alt="Upload Foto" /><br />
        <b>Upload Foto</b>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="./screenshot/signup-step3.jpeg" width="160" alt="Review Data" /><br />
        <b>Review Data</b>
      </td>
      <td align="center">
        <img src="./screenshot/signup-photo.jpeg" width="160" alt="Foto Profil" /><br />
        <b>Foto Profil</b>
      </td>
      <td align="center">
        <img src="./screenshot/homescreen.jpeg" width="160" alt="Home Screen" /><br />
        <b>Home Screen</b>
      </td>
    </tr>
  </table>
</div>

---

## Cara Menjalankan

### 1. Install Dependencies

```bash
npm install
```

### 2. Jalankan Aplikasi

```bash
npx expo start
```

### 3. Jalankan di Device

- **Scan QR** dengan Expo Go (Android/iOS)
- Tekan `a` untuk Android emulator
- Tekan `i` untuk iOS simulator

---