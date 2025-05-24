const extractAuthorName = (author) => {
  if (!author || author.trim() === "") return "이민지";
  let name = author;

  if (author.includes("(")) {
    name = author.split("(")[0];
  } else if (author.includes("@")) {
    name = author.split(" ").find((part) => !part.includes("@")) || author;
  }

  name = name.replace(/기자$/, "").trim();
  return name || "이민지";
};

export default extractAuthorName;
