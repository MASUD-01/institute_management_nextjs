"use client";

import useDebouncedCallback from "@/components/hooks/useDebouncedCallback";
import React, { ReactElement } from "react";

type IProps = {
  children: ReactElement;
  debounceValue?: (value: string) => void;
};

const CommSelectFieldSearch = ({ children, debounceValue }: IProps) => {
  // Create a debounced search handler
  const handleSearch = useDebouncedCallback((value: string) => {
    debounceValue?.(value);
  }, 500);

  // Clone the child element and inject the onSearch prop
  return React.cloneElement(children, {
    componentProps: {
      ...(children.props.componentProps || {}),
      onSearch: handleSearch,
    },
  });
};

export default CommSelectFieldSearch;
