import { useSearchParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useEffect } from "react";
import { getData } from "../helpers/GetData";
import { useState } from "react";
import Loader from "../components/Loader";
import VideoCard from "../components/VideoCard";

const SearchResult = () => {
  const [results, setResults] = useState(null);

  // 1) url den aratılan terimi al
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");

  // 2) api dan aratılan terime uygun videoları al
  // her yeni terim aratıldığında useeffect in tekrar çalışmasını istiyoruz bu yüzden bağımlılık dizisine arama parametrelerini verdik parametreler her değiştiğinde bu sayede useeffect tekrar çalışır
  useEffect(() => {
    getData(`/search?query=${query}&type=video`)
      .then((res) => setResults(res))
      .catch((err) => console.log(err));
  }, [searchParams]);
  return (
    <div className="flex">
      <SideBar />
      <div className="flex items-center gap-10 flex-col flex-1 px-4 h-screen overflow-auto">
        <div className="flex gap-10 flex-col max-w-[1000px]">
          <p className="flex gap-2 text-lg">
            <span className="font-bold">{query}</span>
            <span>için sonuçlar</span>
          </p>

          {!results ? (
            <Loader />
          ) : (
            results.data.map(
              (item) =>
                item.type === "video" && (
                  <VideoCard key={item.videoId} video={item} isRow={true} />
                )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
