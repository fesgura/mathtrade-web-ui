import useFetch from "@/hooks/useFetch";
import { useMemo, useState } from "react";
import { normalizeString } from "@/utils";

const useFaqs = () => {
  const [keyword, setKeyword] = useState("");

  const [, faqList, loading, error] = useFetch({
    endpoint: "GET_FAQS",
    initialState: [],
    // afterLoad,
    autoLoad: true,
  });
  /* end FETCH */

  const list = useMemo(() => {
    if (keyword === "") {
      return faqList;
    }

    const keyLow = normalizeString(keyword);

    return faqList.filter((faq) => {
      const text = `${faq?.question || ""}|||||||${faq?.answer || ""}`;
      return normalizeString(text).indexOf(keyLow) >= 0;
    });
  }, [keyword, faqList]);

  return { keyword, setKeyword, list, loading, error };
};
export default useFaqs;
