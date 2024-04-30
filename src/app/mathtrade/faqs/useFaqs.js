import useFetch from "@/hooks/useFetch";
import { useCallback, useMemo, useState } from "react";
import { normalizeString } from "@/utils";

const separator = "|||||||";

const useFaqs = () => {
  const [keyword, setKeyword] = useState("");

  const format = useCallback((res) => {
    return res.map((faq) => {
      return {
        ...faq,
        answer: (faq?.answer || "").split("\r\n"),
      };
    });
  }, []);

  const [, faqList, loading, error] = useFetch({
    endpoint: "GET_FAQS",
    initialState: [],
    // afterLoad,
    autoLoad: true,
    format,
  });
  /* end FETCH */

  const list = useMemo(() => {
    if (keyword === "") {
      return faqList;
    }

    const keyLow = normalizeString(keyword);

    return faqList.filter((faq) => {
      const text = `${faq?.question || ""}${separator}${(
        faq?.answer || []
      ).join(separator)}`;
      return normalizeString(text).indexOf(keyLow) >= 0;
    });
  }, [keyword, faqList]);

  return { keyword, setKeyword, list, loading, error };
};
export default useFaqs;
