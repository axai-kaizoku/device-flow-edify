## Device Flow

## Workflows Todo:

- [x] Add react-flow
- [x] Add custom cards
- [x] Add edges and nodes to workflow with dropdown menus
- [x] Rename paths
- [x] Change app on node
- [x] Duplicate node
- [x] Open forms on clicking nodes

- [x] Split path

  - [x] delete btn on split path
  - [x] plus btn (add extra path)

- [ ] Add data (inputs and outputs) (align with backend)

## todo.

- [x] fix app nodes and instruction nodes according to design
- [ ] fix dropdown (rm duplicate option if there is duplicate);
- [ ] check change app, (fix duplicate for changed app)
- [ ] add connect functionality if app is not connected

timestamp - 3:47:56

// https://www.youtube.com/watch?v=RkwbGuL-dzo

### front-end-res

```
{
	"nodes": [
		{
			"id": "297ae58d-fce2-4297-8a3d-e11efdcc0b0f",
			"type": "Node",
			"data": { "type": "START", "inputs": { "Start": "heyy" } },
			"position": { "x": 250, "y": 200 },
			"measured": { "width": 75, "height": 30 },
			"selected": false,
			"dragging": false
		},
		{
			"id": "fa782591-f231-454f-abe5-891ac0275e1b",
			"type": "Node",
			"data": { "type": "SPLIT", "appType": "GOOGLE", "inputs": {} },
			"position": { "x": 600, "y": 150 },
			"measured": { "width": 96, "height": 96 },
			"selected": false,
			"dragging": false
		},
		{
			"id": "2c34d998-3a31-4a2f-90e3-86b3eec8fb3a",
			"type": "Node",
			"data": { "type": "PATH", "appType": "GOOGLE", "inputs": {} },
			"position": { "x": 700, "y": -100 },
			"measured": { "width": 80, "height": 34 },
			"selected": false,
			"dragging": false
		},
		{
			"id": "57b7719b-0541-47b4-9221-93ed94439b2c",
			"type": "Node",
			"data": { "type": "PATH", "appType": "GOOGLE", "inputs": {} },
			"position": { "x": 900, "y": 150 },
			"measured": { "width": 80, "height": 34 },
			"selected": false,
			"dragging": false
		},
		{
			"id": "776e91e5-dc40-4ba9-a0e7-cb6ca4304e77",
			"type": "Node",
			"data": { "type": "PATH", "appType": "GOOGLE", "inputs": {} },
			"position": { "x": 750, "y": 450 },
			"measured": { "width": 80, "height": 34 },
			"selected": false,
			"dragging": false
		},
		{
			"id": "c14dc593-fd50-45f0-87dc-caec319f186c",
			"type": "Node",
			"data": { "type": "INSTRUCTION", "appType": "GOOGLE", "inputs": {} },
			"position": { "x": 1150, "y": 100 },
			"measured": { "width": 240, "height": 95 },
			"selected": true,
			"dragging": false
		},
		{
			"id": "c1f03e70-2241-4917-bc92-2fbe311b4c21",
			"type": "Node",
			"data": { "type": "APP", "appType": "GOOGLE", "inputs": {} },
			"position": { "x": 1000, "y": -150 },
			"measured": { "width": 240, "height": 94 },
			"selected": false,
			"dragging": false
		},
		{
			"id": "8b3992e7-d512-4539-b333-c4cdd2f3e0bd",
			"type": "Node",
			"data": { "type": "APP", "appType": "GOOGLE", "inputs": {} },
			"position": { "x": 1050, "y": 400 },
			"measured": { "width": 240, "height": 94 }
		}
	],
	"edges": [
		{
			"source": "297ae58d-fce2-4297-8a3d-e11efdcc0b0f",
			"sourceHandle": "Start",
			"target": "fa782591-f231-454f-abe5-891ac0275e1b",
			"targetHandle": "left",
			"animated": true,
			"id": "xy-edge__297ae58d-fce2-4297-8a3d-e11efdcc0b0fStart-fa782591-f231-454f-abe5-891ac0275e1bleft"
		},
		{
			"source": "57b7719b-0541-47b4-9221-93ed94439b2c",
			"sourceHandle": "paths",
			"target": "fa782591-f231-454f-abe5-891ac0275e1b",
			"targetHandle": "right",
			"animated": true,
			"id": "xy-edge__57b7719b-0541-47b4-9221-93ed94439b2cpaths-fa782591-f231-454f-abe5-891ac0275e1bright"
		},
		{
			"source": "57b7719b-0541-47b4-9221-93ed94439b2c",
			"sourceHandle": "source-right",
			"target": "c14dc593-fd50-45f0-87dc-caec319f186c",
			"targetHandle": "Instruction",
			"animated": true,
			"id": "xy-edge__57b7719b-0541-47b4-9221-93ed94439b2csource-right-c14dc593-fd50-45f0-87dc-caec319f186cInstruction"
		},
		{
			"source": "2c34d998-3a31-4a2f-90e3-86b3eec8fb3a",
			"sourceHandle": "source-right",
			"target": "c1f03e70-2241-4917-bc92-2fbe311b4c21",
			"targetHandle": "Start",
			"animated": true,
			"id": "xy-edge__2c34d998-3a31-4a2f-90e3-86b3eec8fb3asource-right-c1f03e70-2241-4917-bc92-2fbe311b4c21Start"
		},
		{
			"source": "2c34d998-3a31-4a2f-90e3-86b3eec8fb3a",
			"sourceHandle": "paths",
			"target": "fa782591-f231-454f-abe5-891ac0275e1b",
			"targetHandle": "top",
			"animated": true,
			"id": "xy-edge__2c34d998-3a31-4a2f-90e3-86b3eec8fb3apaths-fa782591-f231-454f-abe5-891ac0275e1btop"
		}
	],
	"viewport": {
		"x": -221.89133370807156,
		"y": 150.80946073218115,
		"zoom": 0.8519936410851596
	}
}
```

### backend-api-res:

```
{
    "workflow": {
        "_id": "68494350c65fb6b05024dea2",
        "name": "User Onboarding",
        "status": "draft",
        "startNode": "6849454e6045718eb60c7788"
    },
    "nodes": [
        {
            "_id": "6849454e6045718eb60c7788",
            "orgId": "678a1a10959cf72ab3b66068",
            "workflowId": "68494350c65fb6b05024dea2",
            "token": "token-bdnrqswv",
            "templateKey": "create_user",
            "config": {
                "email": ""
            },
            "next": null,
            "position": {
                "x": 200,
                "y": 100
            },
            "branches": [
                {
                    "label": "Path A",
                    "condition": {
                        "field": "teamId",
                        "operator": "==",
                        "value": "HR"
                    },
                    "next": "684a6d8fc93584c4b4cce3bf",
                    "_id": "684a6d8fc93584c4b4cce3c2"
                },
                {
                    "label": "Path B",
                    "condition": {
                        "field": "teamId",
                        "operator": "==",
                        "value": "Tech"
                    },
                    "next": "684a6da5c93584c4b4cce3c6",
                    "_id": "684a6da6c93584c4b4cce3ca"
                }
            ],
            "createdAt": "2025-06-11T08:58:54.858Z",
            "updatedAt": "2025-06-12T06:03:18.048Z",
            "__v": 0,
            "connectorPosition": {
                "x": 550,
                "y": 620
            },
            "template": {
                "name": "Device Flow",
                "description": "Creates a new user in the system",
                "service": "create User",
                "requiredFields": [
                    "email"
                ],
                "outputFields": [
                    "_id",
                    "email",
                    "first_name",
                    "last_name",
                    "role",
                    "onboarding_date"
                ],
                "createdAt": "1999-12-31T18:30:00.000Z"
            }
        },
        {
            "_id": "684a6d8fc93584c4b4cce3bf",
            "orgId": "678a1a10959cf72ab3b66068",
            "workflowId": "68494350c65fb6b05024dea2",
            "templateKey": "move_user_team",
            "config": {
                "teamId": ""
            },
            "next": null,
            "position": {
                "x": 600,
                "y": 500
            },
            "branches": [],
            "createdAt": "2025-06-12T06:02:55.734Z",
            "updatedAt": "2025-06-12T06:02:55.734Z",
            "__v": 0,
            "template": {
                "name": "Device Flow",
                "description": "Reassigns a user to a different team",
                "service": "Move to Team",
                "requiredFields": [
                    "teamId"
                ],
                "outputFields": [
                    "_id",
                    "teamId"
                ]
            }
        },
        {
            "_id": "684a6da5c93584c4b4cce3c6",
            "orgId": "678a1a10959cf72ab3b66068",
            "workflowId": "68494350c65fb6b05024dea2",
            "templateKey": "move_user_team",
            "config": {
                "teamId": ""
            },
            "next": null,
            "position": {
                "x": 700,
                "y": 600
            },
            "branches": [],
            "createdAt": "2025-06-12T06:03:17.925Z",
            "updatedAt": "2025-06-12T06:03:17.925Z",
            "__v": 0,
            "template": {
                "name": "Device Flow",
                "description": "Reassigns a user to a different team",
                "service": "Move to Team",
                "requiredFields": [
                    "teamId"
                ],
                "outputFields": [
                    "_id",
                    "teamId"
                ]
            }
        }
    ]
}
```
