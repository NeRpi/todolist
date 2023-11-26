import { Collapse, Input } from "antd";
import { useState } from "react";

const EditblePanel = (props) => {
  const [title, setTitle] = useState(props.header);

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <Collapse.Panel
      {...props}
      header={
        <>
          <Input
            value={title}
            onChange={handleInputChange}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </>
      }
    />
  );
};

export default EditblePanel;
