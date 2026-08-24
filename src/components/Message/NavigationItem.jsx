
function NavigationItem({ icon, text, subText, rightIcon, variant = "default", className,getMessages }) {


  if (variant === "button") {
    return (
      <button className="flex flex-col justify-center px-1.5 py-1 my-1 rounded-lg w-full border border-solid bg-white border-stone-200 bg-opacity-0" onClick={()=>getMessages(text)}>
        <div className="flex gap-5 justify-between px-5 py-3 w-full rounded-lg">
          <div className="flex gap-3 overflow-hidden">
            <img src={icon} className="object-contain shrink-0 self-start aspect-[0.83] w-[15px]" alt="" />
            <span className="truncate max-w-[200px]">{text}</span>
          </div>
          {rightIcon && (
            <img src={rightIcon} className="object-contain shrink-0 my-auto aspect-[0.64] w-[7px]" alt="" />
          )}
        </div>
        <p className="truncate px-5 text-sm text-left">{subText}</p>
      </button>

    );
  }

  
  return (
    <div className={className}>
      <div className="flex gap-2">
        <img src={icon} className="object-contain shrink-0 aspect-[1.06] w-[19px]" alt="" />
        <span className="my-auto">{text}</span>
      </div>
      {rightIcon && (
        <img src={rightIcon} className="object-contain shrink-0 my-auto w-3 aspect-[1.72]" alt="" />
      )}
    </div>
  );
}

export default NavigationItem;
