import { GenerationResult } from './types';

export const MOCK_RESULT: GenerationResult = {
  sessionId: 'sess_1712250000000_mock123',
  createdAt: new Date().toISOString(),
  productName: 'Xiaomi Smart Desk Fan 30cm',
  affiliateLink: 'https://shopee.com/product/xxx',
  angle: 'bilik panas dan ruang kecil',
  targetAudience: 'student dan orang bujang',
  tone: 'problem-solution',
  threads: {
    contentLabel: 'Student Cool Room Setup',
    posts: [
      {
        postNumber: 1,
        title: 'Hook',
        content:
          'Tengok la, tengok. Tengah berpuasa sampai lebih jam 5 petang. Air cond bilik dorm sibuk jadi panas. Kipas biasa jadi tak cukup, suasana tercekik. Rasa nak pengsan sampai kena tidur tepi pintu. Ada solusi la untuk ini...',
      },
      {
        postNumber: 2,
        title: 'Pain Expansion',
        content:
          'Masalahnya, bilik dorm size bilik tidur rumah sakit je. Kipas standing ambil separuh space. Keliling badan panas, gusi kering, produktiviti belajar jatuh picik. Pas exam season ni, lagi teruk sebab stress tinggi.',
      },
      {
        postNumber: 3,
        title: 'Solution + Features',
        content:
          'Kena ada fan yang praktis. Kecil, tak ambil tempat, tapi angin kuat. Ada yang ada oscillation feature, boleh rotate 70 derajat. Boleh adjust 3 speed level. Siap dengan sleep mode lagi.',
      },
      {
        postNumber: 4,
        title: 'Product Recommendation',
        content:
          'Xiaomi Smart Desk Fan 30cm ni solve semua. Letak kat atas meja study, angin terus kena badan, kepala sejuk. Besar-besaran design tapi compact, tak ganggu dekstop space. Boleh remote control lagi. Link ada kat bio kalau nak check.',
      },
      {
        postNumber: 5,
        title: 'CTA',
        content:
          'Bilik dorm sejuk, kepala sejuk, belajar fokus. Sekali beli, semester panjang boleh tahan. Solusi paling praktis untuk ruang kecil. Check out link kat bio!',
      },
    ],
  },
  facebook: {
    contentLabel: 'Dorm Room Comfort Guide',
    paragraphs: [
      'Tengok la, tengok. Kalau kamu dorm student yang bilik tengah panas sepanjang hari, apatah lagi tengah cuaca puasa ni — kau tau exactly rasa apa. Suasana terasa tercekik, air cond dorm yang sibuk jadi kerja separuh hati, kipas biasa yang ada pun tak cukup angin. Gusi kering, kepala berat, produktiviti belajar jatuh picik.',

      'Masalahnya, space bilik dorm kita limited. Kipas standing gitu ambil separuh ruang, meja jadi bersepit, dan akhirnya kipas jadi hiasan je. Kalau tengok kipas berputar tapi angin tak kena badan, rasa geram je. Pas exam season especially, stress tinggi dengan bilik panas — kombinasi teruk yang membuat focus hilang.',

      'Kena ada solution yang praktis dan smart. Xiaomi Smart Desk Fan 30cm ni designed untuk exactly situation kita — compact, powerful angin, dan features yang boleh guna. Ada oscillation 70 derajat, 3 speed level, sleep mode untuk malam, dan remote control. Letak atas meja je sudah cukup untuk angin terus kena badan dan kepala.',

      'Kalau kau serious nak bilik sejuk dan comfort, Xiaomi Smart Desk Fan 30cm ni investment terbaik untuk dorm life. Beli sekali, tahan semester panjang. Angin kuat, design compact, energy efficient. Link produk ada kat shopee, check out sekarang. Bilik panas atau bilik sejuk, 50-50 bergantung fan yang guna ni!',
    ],
    fullText: `Tengok la, tengok. Kalau kamu dorm student yang bilik tengah panas sepanjang hari, apatah lagi tengah cuaca puasa ni — kau tau exactly rasa apa. Suasana terasa tercekik, air cond dorm yang sibuk jadi kerja separuh hati, kipas biasa yang ada pun tak cukup angin. Gusi kering, kepala berat, produktiviti belajar jatuh picik.

Masalahnya, space bilik dorm kita limited. Kipas standing gitu ambil separuh ruang, meja jadi bersepit, dan akhirnya kipas jadi hiasan je. Kalau tengok kipas berputar tapi angin tak kena badan, rasa geram je. Pas exam season especially, stress tinggi dengan bilik panas — kombinasi teruk yang membuat focus hilang.

Kena ada solution yang praktis dan smart. Xiaomi Smart Desk Fan 30cm ni designed untuk exactly situation kita — compact, powerful angin, dan features yang boleh guna. Ada oscillation 70 derajat, 3 speed level, sleep mode untuk malam, dan remote control. Letak atas meja je sudah cukup untuk angin terus kena badan dan kepala.

Kalau kau serious nak bilik sejuk dan comfort, Xiaomi Smart Desk Fan 30cm ni investment terbaik untuk dorm life. Beli sekali, tahan semester panjang. Angin kuat, design compact, energy efficient. Link produk ada kat shopee, check out sekarang. Bilik panas atau bilik sejuk, 50-50 bergantung fan yang guna ni!`,
  },
};
