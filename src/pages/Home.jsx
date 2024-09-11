// import  { useState } from 'react';
// import '../App.css';

// const getRandomColor = () => {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

// const Partition = ({ id, width, height, color, onSplit, onRemove }) => {
//   const [isSplit, setIsSplit] = useState(false);
//   const [splitType, setSplitType] = useState('');
//   const [children, setChildren] = useState([]);

//   const handleSplit = (type) => {
//     if (!isSplit) {
//       setSplitType(type);
//       setIsSplit(true);
//       const newColor = getRandomColor();
//       setChildren([
//         { id: `${id}-1`, color: color, width: type === 'V' ? width / 2 : width, height: type === 'H' ? height / 2 : height },
//         { id: `${id}-2`, color: newColor, width: type === 'V' ? width / 2 : width, height: type === 'H' ? height / 2 : height }
//       ]);
//     }
//   };

//   return (
//     <div
//       className="partition"
//       style={{
//         width: `${width}px`,
//         height: `${height}px`,
//         backgroundColor: color,
//         position: 'relative',
//         border: '1px solid #ddd'
//       }}
//     >
//       {!isSplit && (
//         <div className="buttons">
//           <button onClick={() => handleSplit('V')}>V</button>
//           <button onClick={() => handleSplit('H')}>H</button>
//           <button onClick={onRemove}>-</button>
//         </div>
//       )}

//       {isSplit && (
//         <div className={splitType === 'V' ? 'split-vertical' : 'split-horizontal'}>
//           {children.map((child) => (
//             <Partition
//               key={child.id}
//               id={child.id}
//               width={child.width}
//               height={child.height}
//               color={child.color}
//               onRemove={() => onRemove(child.id)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const Home = () => {
//   const [partitions, setPartitions] = useState([
//     { id: 'root', width: 800, height: 400, color: getRandomColor() }
//   ]);

//   const handleRemove = (id) => {
//     setPartitions(partitions.filter((partition) => partition.id !== id));
//   };

//   return (
//     <div className="App">
//       {partitions.map((partition) => (
//         <div
//           key={partition.id}
//           className="resizable-partition"
//           style={{ width: `${partition.width}px`, height: `${partition.height}px`, resize: 'both', overflow: 'auto' }}
//         >
//           <Partition
//             id={partition.id}
//             width={partition.width}
//             height={partition.height}
//             color={partition.color}
//             onRemove={() => handleRemove(partition.id)}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Home;












import  { useState } from "react";
import { Rnd } from "react-rnd";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Partition = ({ id, partition, splitPartition, removePartition }) => {
  const [size, setSize] = useState({ width: "100%", height: "100%" });

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      onResizeStop={(e, direction, ref) => {
        setSize({ width: ref.style.width, height: ref.style.height });
      }}
      bounds="parent"
      className="border"
      style={{ backgroundColor: partition.color }}
    >
      <div className="w-full h-full flex justify-center items-center relative">
        <div className="absolute top-0 space-x-1">
          <button
            onClick={() => splitPartition(id, "V")}
            className="bg-green-500 text-white px-2 py-1 text-sm"
          >
            V
          </button>
          <button
            onClick={() => splitPartition(id, "H")}
            className="bg-blue-500 text-white px-2 py-1 text-sm"
          >
            H
          </button>
          <button
            onClick={() => removePartition(id)}
            className="bg-red-500 text-white px-2 py-1 text-sm"
          >
            -
          </button>
        </div>
      </div>
    </Rnd>
  );
};

const Home = () => {
  const [partitions, setPartitions] = useState({
    1: { id: 1, color: getRandomColor(), direction: "initial" },
  });

  const splitPartition = (id, direction) => {
    const newId = Date.now(); // generate unique ID
    const newColor = getRandomColor();

    setPartitions((prevPartitions) => {
      const newPartitions = { ...prevPartitions };
      newPartitions[id].direction = direction;
      newPartitions[newId] = { id: newId, color: newColor, direction: "initial" };

      return newPartitions;
    });
  };

  const removePartition = (id) => {
    setPartitions((prevPartitions) => {
      const newPartitions = { ...prevPartitions };
      delete newPartitions[id]; // Remove partition by ID
      return newPartitions;
    });
  };

  const renderPartitions = () => {
    return Object.values(partitions).map((partition) => (
        
      <div
        key={partition.id}
        className={`${
          partition.direction === "V" ? "flex flex-row" : "flex flex-col"
        } flex-grow relative`}
      >
        <Partition
          id={partition.id}
          partition={partition}
          splitPartition={splitPartition}
          removePartition={removePartition}
        />
      </div>
    ));
  };

  return <div className="w-screen h-screen flex overflow-hidden">{renderPartitions()}</div>;
};

export default Home; 








