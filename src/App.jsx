import React, { useState, useEffect } from 'react';
import './reset.css';
import 'antd/dist/antd.css';
import './App.css';
import Side from './components/side/Side';
import Board from './components/board/Board';
import { data } from './contstant';




function App() {
  const [projectData, setProjectData] = useState(() => {
    let project = localStorage.getItem('project');
    return (
      project ?
        JSON.parse(project)
        :
        data
    )
  });

  const [currentProject, setCurrentProject] = useState(projectData[0]);

  useEffect(() => {
    localStorage.setItem('project', JSON.stringify(projectData))
  }, [projectData])

  return (
    <div className="app">
      <Side
        projectData={projectData}
        setProjectData={setProjectData}
        setCurrentProject={setCurrentProject}
        currentProject={currentProject}
      />
      <Board
        projectData={projectData}
        currentProject={currentProject}
        setProjectData={setProjectData}
        setCurrentProject={setCurrentProject}
      />
    </div>
  )
}

export default App
