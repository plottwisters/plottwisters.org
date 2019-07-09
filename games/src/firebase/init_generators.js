export function generateInitialUser() {
    return {
      "mCV": 1,
      "cT": []
    }
}

export function generateInitialTasks(userid) {
  return  {
      "taskAggregates": {
        "deleted": 0,
        "moved": 0,
        "completed": 0,
        "total": 1
      },
      "u": userid,
      "hiearchy": {
      },
      "tbosCookieTrail": [],
      "active": 1,
      "name": "Your Main Trail"
    }
}
