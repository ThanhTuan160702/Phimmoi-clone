import React from 'react'
import { nation } from '../../utils/contants'
import { FaCaretRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { formatSlug } from '../../utils/helper';

const Nation = () => {

    const navigate = useNavigate()

    const columns = [[], [], []];
    nation.forEach((item, index) => {
      columns[index % 3].push(item);
    });
  
    return (
      <div className='grid grid-cols-3 gap-4 bg-opacity p-4'>
          {columns.map((column, columnIndex) => (
          <div key={columnIndex}>
            {column.map((el, index) => (
              <span onClick={() => navigate(`/quoc-gia/${formatSlug(el.text)}`)} className='flex text-[#cbcbcb] items-center gap-1 mt-1 hover:text-blue-700 cursor-pointer' key={index}><FaCaretRight /> {el.text}</span>
            ))}
          </div>
        ))}
      </div>
    )
}

export default Nation