const balls = [0, 200, 400];

const LoadingBalls = () => {
  return (
    <div className="absolute top-[20vh] left-[50%] translate-x-[-50%] flex gap-2 animate-pulse">
      {balls.map((b) => {
        return (
          <div
            key={b}
            className="w-6 h-6 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: `${b}ms` }}
          />
        );
      })}
    </div>
  );
};

export default LoadingBalls;
