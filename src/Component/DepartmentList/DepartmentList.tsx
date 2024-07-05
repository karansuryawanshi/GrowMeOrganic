import React, { useState } from 'react';
import { Checkbox, Collapse, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const departmentData = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setExpanded(prev => ({ ...prev, [department]: !prev[department] }));
  };

  const handleCheck = (department: string, subDepartment?: string) => {
    if (subDepartment) {
      // Handle sub-department check
      const isSubChecked = !checked[subDepartment];
      setChecked(prev => ({ ...prev, [subDepartment]: isSubChecked }));
      
      const allSubDepartmentsChecked = departmentData
        .find(dep => dep.department === department)
        ?.sub_departments.every(sub => checked[sub] || sub === subDepartment && isSubChecked);

      if (allSubDepartmentsChecked) {
        setChecked(prev => ({ ...prev, [department]: true }));
      } else {
        setChecked(prev => ({ ...prev, [department]: false }));
      }
    } else {
      const isDeptChecked = !checked[department];
      setChecked(prev => {
        const updatedChecked = { ...prev, [department]: isDeptChecked };
        departmentData
          .find(dep => dep.department === department)
          ?.sub_departments.forEach(sub => updatedChecked[sub] = isDeptChecked);
        return updatedChecked;
      });
    }
  };

  return (
    <List>
      {departmentData.map(dep => (
        <div key={dep.department}>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                checked={checked[dep.department] || false}
                onChange={() => handleCheck(dep.department)}
              />
            </ListItemIcon>
            <ListItemButton onClick={() => handleToggle(dep.department)}>
              <ListItemText primary={dep.department} />
              {expanded[dep.department] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={expanded[dep.department]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dep.sub_departments.map(sub => (
                <ListItem key={sub} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked[sub] || false}
                      onChange={() => handleCheck(dep.department, sub)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
