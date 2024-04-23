import React from 'react';

const ShipFeeComponent = ({ items = [] }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <div style={{display: "flex", marginTop: "8px"}}>
          <h4>{item.shipinfo}</h4>
          <h4 style={{color: "#ef4444", marginLeft: "8px"}}>{item.title}</h4>
          </div>
          
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ShipFeeComponent;
