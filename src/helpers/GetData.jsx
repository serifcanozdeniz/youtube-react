import axios from "axios";

// istek için gerekli ayarlar
const options = {
  headers: {
    "X-RapidAPI-Key": "1e2136d40bmshe60fd9f92baf95bp1b932ejsnaea6227d21e9",
    "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
  },
  params: {
    geo: "TR",
    lang: "tr",
  },
};

// yapılan bütün isteklerin ortak olan başlangıç kısmını belirle
axios.defaults.baseURL = "https://yt-api.p.rapidapi.com";

// parametre olarak aldığı url e istek atıp geriye elde ettiği verileri döndüren bir fonksiyon yaz

export const getData = async (endpoint) => {
  try {
    // api isteği at
    const res = await axios.get(endpoint, options);
    // fonksiyonun çağrıldığı yere veriyi döndür
    return res.data;
  } catch (err) {
    console.log("hata oluştu", err);
  }
};
