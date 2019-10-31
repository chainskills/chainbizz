import React from 'react';

const ProjectDetail = ({ match }) => {
  console.log(match);
  return <div>Hello project detail: {match.params.id}</div>;
};

export default ProjectDetail;
