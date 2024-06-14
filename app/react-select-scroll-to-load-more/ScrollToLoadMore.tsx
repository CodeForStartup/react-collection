"use client";

import PaginationSelect from "@/components/molecule/pagination-select";
import axios from "axios";

const ScrollToLoadMore = () => {
  const fetchGitHubRepositories = async (input: string, page: number) => {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${input}+stars:>10000&sort=stars&page=${page}&per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_KEY}`,
        },
      }
    );

    const options = response.data.items.map((item: any) => ({
      label: item.full_name,
      value: item.id,
    }));

    return { options, total: response.data.total_count };
  };

  return (
    <PaginationSelect
      className="min-w-[400px]"
      isClearable
      limitPerPage={10}
      fetchOptions={fetchGitHubRepositories}
      placeholder="Search GitHub Repositories"
    />
  );
};

export default ScrollToLoadMore;
