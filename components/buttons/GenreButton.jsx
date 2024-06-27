function GenreButton({ text }) {
  return (
    <div className={`bg-primary-light border-gray-300 hover:bg-slate-700 rounded-full text-center min-w-[75px] transition-all py-1 px-3`}>
      <p className="text-secondary">{text}</p>
    </div>
  );
};

export default GenreButton;