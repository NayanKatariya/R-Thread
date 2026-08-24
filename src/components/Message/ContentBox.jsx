
function ContentBox({ text }) {
  return (
    <div className="bg-white bg-opacity-0 text-stone-500">
      <div className="flex flex-col justify-center px-0.5 py-px bg-white bg-opacity-0">
        <div className="px-4 py-4 bg-white rounded border border-gray-200 border-solid max-md:pr-5">
          {text}
        </div>
      </div>
    </div>
  );
}

export default ContentBox;
