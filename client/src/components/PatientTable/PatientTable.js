import React from 'react';
import { useSelector } from 'react-redux';

import '@innovaccer/design-system/css';

import { Card, Table } from '@innovaccer/design-system';

const PatientTable = () => {

    const patientData = useSelector((state) => state.patients);

    const schema = [
      {
        name: 'name',
        displayName: 'Name',
        width: '40%',
        resizable: true,
        separator: true,
        tooltip: true,
        translate: a => ({
          title: `${a.FirstName} ${a.LastName}`,
          firstName: a.FirstName,
          lastName: a.LastName
        }),
        filters: [
          { label: 'A-G', value: 'a-g' },
          { label: 'H-R', value: 'h-r' },
          { label: 'S-Z', value: 's-z' },
        ],
        onFilterChange: (a, filters) => {
          for (const filter of filters) {
            // eslint-disable-next-line default-case
            switch (filter) {
              case 'a-g':
                if (a.FirstName[0].toLowerCase() >= 'a' && a.FirstName[0].toLowerCase() <= 'g') return true;
                break;
              case 'h-r':
                if (a.FirstName[0].toLowerCase() >= 'h' && a.FirstName[0].toLowerCase() <= 'r') return true;
                break;
              case 's-z':
                if (a.FirstName[0].toLowerCase() >= 's' && a.FirstName[0].toLowerCase() <= 'z') return true;
                break;
            }
          }
          return false;
        },
        cellType: 'AVATAR_WITH_TEXT',
      },
      {
        name: 'Contact',
        displayName: 'Contact',
        width: 350,
        resizable: true,
        sorting: false,
        cellType: 'WITH_META_LIST'
      },
      {
        name: 'Age',
        displayName: 'Age',
        width: 200,
        resizable: true,
        sorting: false,
        cellType: 'WITH_META_LIST'
      },
      {
        name: 'Gender',
        displayName: 'Gender',
        width: 200,
        resizable: true,
        comparator: (a, b) => a.Gender.localeCompare(b.Gender),
        cellType: 'STATUS_HINT',
        translate: a => ({
          title: a.Gender,
          statusAppearance: (a.Gender === 'Female') ? 'alert' : 'success'
        }),
        filters: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ],
        onFilterChange: (a, filters) => {
          for (const filter of filters) {
            if (a.Gender.toLowerCase() === filter) return true;
          }
          return false;
        },
      }
    ];
  
    const loaderSchema = [
      {
          "name": "name",
          "displayName": "Name",
          "width": "40%",
          "resizable": true,
          "tooltip": true,
          "separator": true,
          "filters": [
              {
                  "label": "A-G",
                  "value": "a-g"
              },
              {
                  "label": "H-R",
                  "value": "h-r"
              },
              {
                  "label": "S-Z",
                  "value": "s-z"
              }
          ],
          "cellType": "AVATAR_WITH_TEXT"
      },
      {
          "name": "Contact",
          "displayName": "Contact",
          "width": 350,
          "resizable": true,
          "sorting": false,
          "cellType": "WITH_META_LIST"
      },
      {
        "name": "Age",
        "displayName": "Age",
        "width": 200,
        "resizable": true,
        "sorting": false,
        "cellType": "WITH_META_LIST"
    },
      {
          "name": "Gender",
          "displayName": "Gender",
          "width": 180,
          "resizable": true,
          "cellType": "STATUS_HINT",
          "filters": [
              {
                  "label": "Male",
                  "value": "male"
              },
              {
                  "label": "Female",
                  "value": "female"
              }
          ]
      }
  ];
  
    return (
      <div
        style={{
          height: '350px',
        }}
      >
          {!patientData.length ? '' : (
        <Card className="h-100">
          <Table
            loaderSchema={loaderSchema}
            data={patientData}
            schema={schema}
            withHeader={true}
            headerOptions={{
              withSearch: true
            }}
            onSearch={(currData, searchTerm) => {
              return currData.filter(d =>
                d.FirstName.toLowerCase().match(searchTerm.toLowerCase())
                || d.LastName.toLowerCase().match(searchTerm.toLowerCase())
              );
            }}
            withCheckbox={true}
            onSelect={(rowIndex, selected, selectedList, selectAll) => console.log(`on-select:- rowIndex: ${rowIndex} selected: ${selected} selectedList: ${JSON.stringify(selectedList)} selectAll: ${selectAll}`)}
            withPagination={true}
            pageSize={5}
            onPageChange={newPage => console.log(`on-page-change:- ${newPage}`)}
          />
        </Card>)}
      </div>
    );
  };

  export default PatientTable;
  