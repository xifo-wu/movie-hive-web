import { TbChevronLeft } from 'react-icons/tb';

const PrevArrow = ({ onClick }: any) => {
  return (
    <div className="absolute left-0 top-0 z-10 h-full">
      <div className="flex h-full items-center">
        <TbChevronLeft onClick={onClick} style={{ fontSize: 48 }} className="cursor-pointer z-20" />
      </div>
    </div>
  );
};

export default PrevArrow;
