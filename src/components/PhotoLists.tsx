import React, { useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPhotos = async ({ pageParam = 1 }) => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/photos", {
    params: { _page: pageParam, _limit: 10 },
  });
  return res.data;
};

const PhotoLists: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("asc");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["photos"],
      queryFn: fetchPhotos,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 10 ? allPages.length + 1 : undefined,
    });

  if (status === "error") return <p style={{ color: "red" }}>Error</p>;

  let allPhotos = data ? data.pages.flat() : [];

  if (search) {
    allPhotos = allPhotos.filter((photo) => {
      photo.title.toLowerCase().includes(search.toLowerCase());
    });

    console.log(search);
  }

  if (filter) {
    allPhotos = allPhotos.filter((photo) => {
      photo.albumId === Number(filter);
    });
  }

  allPhotos.sort((a: any, b: any): any => {
    sort === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  console.log(search);
  console.log(allPhotos);
  console.log(data);
  console.log(
    allPhotos.map(({ title }) => {
      title;
    })
  );
  return (
    <div>
      <h1>PhotoLists</h1>
      <input
        type="text"
        placeholder="search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {allPhotos.map((photo) => (
        <div key={photo.id}>
          {/* <img src={photo.thumbnailUrl} alt={photo.title} /> */}

          <span>
            {photo.thumbnailUrl} | {photo.title}
          </span>
        </div>
      ))}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load more"
          : "No more data "}
      </button>
    </div>
  );
};

export default PhotoLists;
