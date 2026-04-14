import React, { useState, useEffect } from "react";
import axios from "axios";
import TagView from "./TagView";
import "./App.css";

const API_BASE = "http://3.110.147.183:8000/api/trees";

const defaultTree = {
  name: "root",
};

function App() {
  const [trees, setTrees] = useState([]);
  const [exportedJSON, setExportedJSON] = useState("");

  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {
    const res = await axios.get(API_BASE);
    setTrees(res.data);
  };

  const createInitialTree = async () => {
    await axios.post(API_BASE, defaultTree);
    fetchTrees();
  };

  const updateTreeState = (index, updatedTreeData) => {
    const newTrees = [...trees];
    newTrees[index].data = updatedTreeData;
    setTrees(newTrees);
  };

  const handleExport = async (treeRecord) => {
    setExportedJSON(JSON.stringify(treeRecord.data));
    await axios.put(`${API_BASE}/${treeRecord.id}`, treeRecord.data);
  };

  return (
    <div className="container">
      {trees.length === 0 ? (
        <button onClick={createInitialTree}>Add Initial Root Tag</button>
      ) : (
        trees.map((treeRecord, index) => (
          <div key={treeRecord.id} className="tree-wrapper">
            <TagView
              node={treeRecord.data}
              onUpdate={(newData) => updateTreeState(index, newData)}
              canDelete={false}
            />
            <button
              className="export-btn"
              onClick={() => handleExport(treeRecord)}
            >
              Export
            </button>
          </div>
        ))
      )}
      {exportedJSON && <div className="json-output">{exportedJSON}</div>}
    </div>
  );
}

export default App;
