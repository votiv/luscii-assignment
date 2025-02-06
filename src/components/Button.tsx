type ButtonProps = {
  onClick: () => void;
  title: string;
};

export const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, title } = props;
  return (
    <button
      className="bg-poke-red hover:bg-red-400 text-white font-bold py-2 px-4 transition-colors"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
