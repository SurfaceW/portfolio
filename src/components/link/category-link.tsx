import Link from "next/link";

export const TaggedLink = ({ tag, lang, children }: {
  tag: string;
  lang: string;
  children?: any;
}) => {
  return (
    <Link target="_blank" href={`/posts/topics/tag/${tag}`} className="text-sm text-gray-600 mr-2 hover:text-blue-700 transition-all ease-in duration-200" key={tag}>
      #{tag}
    </Link>
  );
}
