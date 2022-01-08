import { uuid } from "./utils";

export default {
  name: "workshop",
  columns: [
    {
      name: "todo",
      tasks: [
        {
          description: "desc for 1task",
          name: "first task",
          id: uuid(),
          userAssigned: null,
        },
        {
          description: "desc for 2task",
          name: "second task",
          id: uuid(),
          userAssigned: null,
        },
        {
          description: "",
          name: "thrid task",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: "todo2",
      tasks: [
        {
          description: "",
          name: "first task",
          id: uuid(),
          userAssigned: null,
        },
        {
          description: "",
          name: "second task",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: "in-progress",
      tasks: [
        {
          description: "",
          name: "first task",
          id: uuid(),
          userAssigned: null,
        },
        {
          description: "",
          name: "thrid task",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: "done",
      tasks: [
        {
          description: "",
          name: "thrid task",
          id: uuid(),
          userAssigned: null,
        },
        {
          description: "",
          name: "th3333rid task",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: "3done",
      tasks: [
        {
          description: "",
          name: "thrid task",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
  ],
};
