import { Button, Collapse, Input } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./EditablePanel.css";

const EditablePanel = (props) => {
  const [title, setTitle] = useState(props.category.name);
  const [oldTitle, setOldTitle] = useState(props.category.name);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    setBtnVisible(title !== oldTitle);
  }, [title, oldTitle]);

  const onClickUpdate = (e) => {
    e.stopPropagation();
    setOldTitle(title);
    props.onCategoryUpdate({
      ...props.category,
      id: props.category._id,
      name: title,
    });
  };

  const onHandleInput = (e) => {
    setTitle(e.target.value);
    setBtnVisible(e.target.value !== oldTitle);
  };

  return (
    <div className="edit-panel">
      <Collapse.Panel
        {...props}
        header={
          <div className="edit-panel-header">
            <Input
              style={{ margin: "4px" }}
              value={title}
              onChange={onHandleInput}
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              value="small"
              style={{
                margin: "2px",
                visibility: btnVisible ? "visible" : "hidden",
              }}
              icon={<CheckOutlined style={{ width: "12px", height: "10px" }} />}
              onClick={onClickUpdate}
            />
            <Button
              value="small"
              style={{
                margin: "2px",
                visibility: btnVisible ? "visible" : "hidden",
              }}
              icon={
                <CloseOutlined
                  style={{
                    width: "12px",
                    height: "12px",
                  }}
                />
              }
              onClick={(e) => {
                setTitle(oldTitle);
                e.stopPropagation();
              }}
            />
          </div>
        }
      />
    </div>
  );
};

export default EditablePanel;
