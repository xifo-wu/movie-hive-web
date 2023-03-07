import { TbChevronRight } from 'react-icons/tb';

const NextArrow = ({ onClick }: any) => {
  return (
    <div className="absolute right-0 top-0 h-full">
      <div className="flex h-full items-center justify-end text-3xl sm:text-5xl">
        <TbChevronRight
          onClick={onClick}
          style={{ fontSize: 'inherit' }}
          className="cursor-pointer z-20"
        />
      </div>
    </div>
  );
};

export default NextArrow;
