"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Remark = ({ data }: { data: string }) => {
  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data}</ReactMarkdown>;
};

export default Remark;
