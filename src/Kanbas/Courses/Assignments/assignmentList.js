const assignmentList = [
  {
      id: 1,
      name: "A1",
      points: 100,
      dueDate: "May 12, 2014",
      timeDue: "11:59 PM",
      availableOn: "May 10, 2014",
      description: "A1 is very easy but you should still start it early!",
  },
  {
      id: 2,
      name: "A2",
      points: 25,
      dueDate: "May 12, 2014",
      timeDue: "11:59 PM",
      availableOn: "May 10, 2014",
      description: "A2 has more readings than typical.",
  },
  {
      id: 3,
      name: "A3",
      points: 50,
      dueDate: "May 12, 2014",
      timeDue: "11:59 PM",
      availableOn: "May 10, 2014",
      description: "A3 is very difficult - but it's important to learn.",
  }
];

export const getAssignmentById = (id) => {
  return assignmentList.find(assignment => assignment.id === parseInt(id));
};


export const updateAssignmentById = (id, updatedAssignment) => {
  const index = assignmentList.findIndex(assignment => assignment.id === parseInt(id));
  if (index !== -1) {
    assignmentList[index] = updatedAssignment;
  }
};

export default assignmentList;