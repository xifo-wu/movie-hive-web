import { TbChevronLeft } from 'react-icons/tb';

const PrevArrow = ({ onClick }: any) => {
  return (
    <div className="absolute left-0 top-0 z-10 h-full">
      <div className="flex h-full items-center text-3xl sm:text-5xl">
        <TbChevronLeft
          onClick={onClick}
          style={{ fontSize: 'inherit' }}
          className="cursor-pointer z-20"
        />
      </div>
    </div>
  );
};

export default PrevArrow;
