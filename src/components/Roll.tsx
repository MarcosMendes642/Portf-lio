type RollProps = {
  children: string;
};


export default function Roll({ children }: RollProps) {
  return (
    <span className="roll" aria-hidden="true">
      <span className="roll__current">{children}</span>
      <span className="roll__next">{children}</span>
    </span>
  );
}
