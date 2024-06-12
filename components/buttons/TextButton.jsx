import Link from "next/link";

function TextButton({ text, link, isCurrent, onClick, title }) {
  if (link) {
    return (
      <Link href={link}>
        <div onClick={onClick} className={`${isCurrent ? "bg-blue-500 text-white" : "bg-primary-light border-gray-300"} rounded-md text-center min-w-[75px] hover:bg-slate-700 transition-all  px-2 py-2`}>
          <p title={title} className=" text-secondary">{text}</p>
        </div>
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={`${isCurrent ? "bg-blue-500 text-white" : "bg-primary-light border-gray-300"} rounded-md text-center min-w-[75px] hover:bg-slate-700 transition-all  px-2 py-2`}>
      <p className=" text-secondary">{text}</p>
    </div>
  );
};

export default TextButton;