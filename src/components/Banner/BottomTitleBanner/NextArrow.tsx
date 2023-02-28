import { TbChevronRight } from 'react-icons/tb';

const NextArrow = ({ onClick }: any) => {
  return (
    <div className="absolute right-0 top-0 h-full">
      <div className="flex h-full items-center justify-end">
        <TbChevronRight
          onClick={onClick}
          style={{ fontSize: 48 }}
          className="cursor-pointer z-20"
        />
      </div>
    </div>
  );
};

export default NextArrow;
