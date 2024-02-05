import { createContext, useEffect, useState } from "react";
import { categories } from "../constants";
import { getData } from "../helpers/GetData";

// 1) context temelini oluştur
export const VideoContext = createContext();

// 2) sağlayıcı tanımla
export const VideoProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [videos, setVideos] = useState(null);

  //   kategori her değiştiğinde api'dan veriyi al
  useEffect(() => {
    // menü seçildiyse fonksiyonu durdur
    if (selectedCategory.type === "menu") return;
    // önceki kategorinin verilerini temizle
    setVideos(null);
    // type'ı home ise home endpointine istek at
    if (selectedCategory.type === "home") {
      getData("/home")
        .then((res) => setVideos(res.data))
        .catch((err) => console.log(err));
    }
    // type'ı trending ise trending endpointine istek at
    if (selectedCategory.type === "trending") {
      getData("/trending")
        .then((res) => setVideos(res.data))
        .catch((err) => console.log(err));
    }
    // type'ı category ise category endpointine istek at
    if (selectedCategory.type === "category") {
      getData(`/search?query=${selectedCategory.name}`)
        .then((res) => setVideos(res.data))
        .catch((err) => console.log(err));
    }
  }, [selectedCategory]);
  return (
    <VideoContext.Provider
      value={{ videos, selectedCategory, setSelectedCategory }}
    >
      {children}
    </VideoContext.Provider>
  );
};
