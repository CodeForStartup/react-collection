"use client";

import Select from "react-select";
import type { AsyncProps } from "react-select/async";
import type { OptionsOrGroups } from "react-select";
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

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
  onChange,
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
    if ((page - 1) * 10 > total) return;

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

  const _handleInputChange = (newInputValue: string, actionMeta: any) => {
    setInput(newInputValue);
    if (
      actionMeta.action === "input-change" ||
      (actionMeta.action === "menu-close" && !!actionMeta.prevInputValue)
    ) {
      setPage(1);
      setOptions([]);
    }
  };

  const handleInputChange = debounce(_handleInputChange, 500);

  const handleChange = (selectedOption: any, actionMeta: any) => {
    onChange?.(selectedOption, actionMeta);

    if (actionMeta.action === "clear") {
      setPage(1);
      setInput("");
      setOptions([]);
      if (page === 1) {
        loadOptions();
      }
    }
  };

  return (
    <Select
      {...props}
      options={options}
      onInputChange={handleInputChange}
      isSearchable={true}
      onChange={handleChange}
      onMenuScrollToBottom={() => setPage((prev) => prev + 1)}
    />
  );
};

export default PaginationSelect;
