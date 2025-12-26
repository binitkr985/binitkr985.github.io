import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";

export const markdownToPlainText = async (markdown) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkStringify, {
      bullet: "-",
      fences: false,
      listItemIndent: "one",
    })
    .process(markdown);

  return file.toString();
};
