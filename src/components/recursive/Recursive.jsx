/* eslint-disable react/prop-types */

import { useState } from "react";
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

const Recursive = () => {
    const [partitions, setPartitions] = useState({
        1: { id: 1, color: getRandomColor(), direction: "initial", children: [] },
      });
    
      const splitPartition = (id, direction) => {
        const newId1 = Date.now(); // generate unique ID
        const newId2 = Date.now() + 1; // generate unique ID
        const newColor1 = getRandomColor();
        const newColor2 = getRandomColor();
    
        setPartitions((prevPartitions) => {
          const newPartitions = { ...prevPartitions };
    
          // Update the parent partition to have children
          newPartitions[id] = {
            ...newPartitions[id],
            direction,
            children: [newId1, newId2],
          };
    
          // Add the new child partitions
          newPartitions[newId1] = { id: newId1, color: newColor1, direction: "initial", children: [] };
          newPartitions[newId2] = { id: newId2, color: newColor2, direction: "initial", children: [] };
    
          return newPartitions;
        });
      };
    
      const removePartition = (id) => {
        setPartitions((prevPartitions) => {
          const newPartitions = { ...prevPartitions };
          delete newPartitions[id]; // Remove partition by ID
    
          // Remove the partition from its parent's children list
          Object.values(newPartitions).forEach((partition) => {
            if (partition.children.includes(id)) {
              partition.children = partition.children.filter(childId => childId !== id);
            }
          });
    
          return newPartitions;
        });
      };
    
      const renderPartitions = (parentId) => {
        return Object.values(partitions)
          .filter(partition => (partition.children.length > 0 ? partition.id === parentId : partition.id === parentId))
          .map((partition) => (
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
              {partition.children.length > 0 && (
                <div className={`w-full h-full ${partition.direction === "V" ? "flex flex-row" : "flex flex-col"}`}>
                  {partition.children.map(childId => renderPartitions(childId))}
                </div>
              )}
            </div>
          ));
      };
    
      return <>
      <h1 className='my-1 font-bold text-center'>Recursive:</h1>
      <div className="w-screen h-screen flex overflow-hidden">
        {renderPartitions(1)}
        </div>
      </>
};

export default Recursive;