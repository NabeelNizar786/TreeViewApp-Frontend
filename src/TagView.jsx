import React, { useState } from "react";

const TagView = ({ node, onUpdate, canDelete }) => {
  console.log(canDelete);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleAddChild = () => {
    const newNode = { ...node };

    if (newNode.hasOwnProperty("data")) {
      delete newNode.data;
    }

    if (!newNode.children) {
      newNode.children = [];
    }

    newNode.children.push({ name: "New Child", data: "Data" });
    onUpdate(newNode);
  };

  const handleDataChange = (e) => {
    onUpdate({ ...node, data: e.target.value });
  };

  const handleRename = (e) => {
    if (e.key === "Enter") {
      onUpdate({ ...node, name: e.target.value });
      setIsEditingName(false);
    }
  };

  return (
    <div className="tag-box">
      <div className="tag-header">
        <button className="collapse-btn" onClick={toggleCollapse}>
          {isCollapsed ? ">" : "v"}
        </button>

        {isEditingName ? (
          <input
            autoFocus
            defaultValue={node.name}
            onKeyDown={handleRename}
            onBlur={() => setIsEditingName(false)}
          />
        ) : (
          <span className="tag-name" onClick={() => setIsEditingName(true)}>
            {node.name}
          </span>
        )}

        <div className="btns">
          <button className="add-btn" onClick={handleAddChild}>
            Add Child
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="tag-content">
          {node.children ? (
            node.children.map((child, index) => (
              <TagView
                key={index}
                node={child}
                canDelete={true}
                onUpdate={(updatedChild) => {
                    const newChildren = [...node.children];
                    newChildren[index] = updatedChild;
                    onUpdate({ ...node, children: newChildren });
                }}
              />
            ))
          ) : (
            <div className="data-row">
              <label>Data</label>
              <input
                type="text"
                value={node.data}
                onChange={handleDataChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagView;
