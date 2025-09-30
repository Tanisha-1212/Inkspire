export default function DotsBackground(){
  const dots = [
    { top: "10%", left: "5%", size: "w-20 h-20", color: "bg-green-400", opacity: "opacity-40", blur: "blur-2xl" },
    { top: "30%", left: "80%", size: "w-32 h-32", color: "bg-green-400", opacity: "opacity-30", blur: "blur-2xl" },
    { top: "60%", left: "10%", size: "w-24 h-24", color: "bg-green-400", opacity: "opacity-35", blur: "blur-2xl" },
    { top: "75%", left: "70%", size: "w-40 h-40", color: "bg-green-400", opacity: "opacity-45", blur: "blur-2xl" },
    { top: "50%", left: "50%", size: "w-28 h-28", color: "bg-green-400", opacity: "opacity-20", blur: "blur-2xl" },
    { top: "20%", left: "40%", size: "w-32 h-32", color: "bg-green-400", opacity: "opacity-30", blur: "blur-2xl" }
  ];

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {dots.map((dot, i) => (
        <div
          key={i}
          className={`${dot.size} ${dot.color} ${dot.opacity} ${dot.blur} rounded-full absolute animate-pulse`}
          style={{ top: dot.top, left: dot.left }}
        />
      ))}
    </div>
  );
};
