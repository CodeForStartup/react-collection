"use client";

import Select from "react-select";
import type { AsyncProps } from "react-select/async";
import type { OptionsOrGroups } from "react-select";
import { useEffect, useState } from "react";

type PaginationSelectProps = AsyncProps<any, any, any> & {
  fetchOptions: (
    input: string,
    page: number
  ) => Promise<{ options: any[]; total: number }>;
  initialInput?: string;
  initialPage?: number;
  limitPerPage: number;
};

const PaginationSelect = ({
  fetchOptions,
  initialInput = "",
  initialPage = 1,
  limitPerPage = 10,
  ...props
}: PaginationSelectProps) => {
  const [input, setInput] = useState(initialInput);
  const [page, setPage] = useState(initialPage);
  const [options, setOptions] = useState<OptionsOrGroups<any, any>>([]);
  const [total, setTotal] = useState(limitPerPage + 1);

  const loadOptions = async () => {
    if (page * 10 > total) return;

    const { options: newOptions, total: newTotal } = await fetchOptions(
      input,
      page
    );

    setTotal(newTotal);
    setOptions((prev) => [...prev, ...newOptions]);
  };

  useEffect(() => {
    loadOptions();
  }, [input, page]);

  const handleInputChange = (newInputValue: string, actionMeta: any) => {
    setInput(newInputValue);
    if (
      actionMeta.action === "input-change" ||
      actionMeta.action === "menu-close"
    ) {
      setPage(1);
      setOptions([]);
    }
  };

  const handleChange = (selectedOption: any, actionMeta: any) => {
    if (actionMeta.action === "clear") {
      setPage(1);
      setInput("");
      setOptions([]);
      loadOptions();
    }
  };

  return (
    <Select
      {...props}
      options={options}
      inputValue={input}
      onInputChange={handleInputChange}
      isSearchable={true}
      onChange={handleChange}
      onMenuScrollToBottom={() => setPage((prev) => prev + 1)}
    />
  );
};

export default PaginationSelect;
