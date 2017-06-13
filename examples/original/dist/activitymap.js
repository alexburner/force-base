var Util = {
    bound: function(val, range) {
        var low = range[0],
            high = range[1];
        return Math.max(low, Math.min(high, val));
    }
};

var Options = {
    renderOptions: {
        antialias: true
    },
    layout: {
        minEnergy: 5
    }
};
var FakeData = {
  "since": 1495572120000,
  "from": 1495570350000,
  "until": 1495572150000,
  "edges": [
    {
      "to": 54,
      "from": 47,
      "annotations": [
        {
          "weight": 8,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 47,
      "from": 21,
      "annotations": [
        {
          "weight": 12,
          "proto": "nas"
        },
        {
          "weight": 10,
          "proto": "http"
        },
        {
          "weight": 1,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 16,
      "from": 87,
      "annotations": [
        {
          "weight": 6,
          "proto": "http"
        }
      ]
    },
    {
      "to": 149,
      "from": 21,
      "annotations": [
        {
          "weight": 19,
          "proto": "http"
        }
      ]
    },
    {
      "to": 176,
      "from": 60,
      "annotations": [
        {
          "weight": 5,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 35,
      "from": 47,
      "annotations": [
        {
          "weight": 10,
          "proto": "nas"
        },
        {
          "weight": 11,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 28,
      "from": 21,
      "annotations": [
        {
          "weight": 10,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 149,
      "from": 47,
      "annotations": [
        {
          "weight": 5,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 56,
      "from": 47,
      "annotations": [
        {
          "weight": 1,
          "proto": "nas"
        },
        {
          "weight": 12,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 62,
      "from": 79,
      "annotations": [
        {
          "weight": 16,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 38,
      "annotations": [
        {
          "weight": 9,
          "proto": "http"
        }
      ]
    },
    {
      "to": 150,
      "from": 147,
      "annotations": [
        {
          "weight": 16,
          "proto": "http"
        }
      ]
    },
    {
      "to": 158,
      "from": 62,
      "annotations": [
        {
          "weight": 3,
          "proto": "http"
        }
      ]
    },
    {
      "to": 68,
      "from": 47,
      "annotations": [
        {
          "weight": 9,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 152,
      "from": 47,
      "annotations": [
        {
          "weight": 0,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 150,
      "from": 76,
      "annotations": [
        {
          "weight": 2,
          "proto": "http"
        }
      ]
    },
    {
      "to": 56,
      "from": 21,
      "annotations": [
        {
          "weight": 11,
          "proto": "ssl"
        },
        {
          "weight": 5,
          "proto": "http"
        }
      ]
    },
    {
      "to": 177,
      "from": 47,
      "annotations": [
        {
          "weight": 1,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 128,
      "annotations": [
        {
          "weight": 10,
          "proto": "nas"
        },
        {
          "weight": 20,
          "proto": "db"
        }
      ]
    },
    {
      "to": 162,
      "from": 47,
      "annotations": [
        {
          "weight": 3,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 121,
      "from": 79,
      "annotations": [
        {
          "weight": 7,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 16,
      "from": 129,
      "annotations": [
        {
          "weight": 7,
          "proto": "http"
        }
      ]
    },
    {
      "to": 57,
      "from": 123,
      "annotations": [
        {
          "weight": 6,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 34,
      "from": 21,
      "annotations": [
        {
          "weight": 1,
          "proto": "http"
        }
      ]
    },
    {
      "to": 6,
      "from": 12,
      "annotations": [
        {
          "weight": 18,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 202,
      "from": 47,
      "annotations": [
        {
          "weight": 12,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 35,
      "annotations": [
        {
          "weight": 14,
          "proto": "http"
        }
      ]
    },
    {
      "to": 38,
      "from": 47,
      "annotations": [
        {
          "weight": 19,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 17,
      "from": 12,
      "annotations": [
        {
          "weight": 0,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 71,
      "from": 47,
      "annotations": [
        {
          "weight": 0,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 48,
      "annotations": [
        {
          "weight": 10,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 158,
      "from": 191,
      "annotations": [
        {
          "weight": 3,
          "proto": "http"
        }
      ]
    },
    {
      "to": 133,
      "from": 47,
      "annotations": [
        {
          "weight": 14,
          "proto": "nas"
        },
        {
          "weight": 3,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 56,
      "from": 89,
      "annotations": [
        {
          "weight": 11,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 198,
      "from": 190,
      "annotations": [
        {
          "weight": 1,
          "proto": "db"
        }
      ]
    },
    {
      "to": 78,
      "from": 21,
      "annotations": [
        {
          "weight": 1,
          "proto": "http"
        }
      ]
    },
    {
      "to": 176,
      "from": 185,
      "annotations": [
        {
          "weight": 20,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 176,
      "from": 47,
      "annotations": [
        {
          "weight": 14,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 78,
      "annotations": [
        {
          "weight": 15,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 59,
      "from": 21,
      "annotations": [
        {
          "weight": 18,
          "proto": "http"
        }
      ]
    },
    {
      "to": 35,
      "from": 62,
      "annotations": [
        {
          "weight": 7,
          "proto": "http"
        }
      ]
    },
    {
      "to": 158,
      "from": 162,
      "annotations": [
        {
          "weight": 1,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 8,
      "annotations": [
        {
          "weight": 8,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 125,
      "from": 21,
      "annotations": [
        {
          "weight": 14,
          "proto": "http"
        }
      ]
    },
    {
      "to": 77,
      "from": 14,
      "annotations": [
        {
          "weight": 2,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 56,
      "from": 5,
      "annotations": [
        {
          "weight": 16,
          "proto": "db"
        }
      ]
    },
    {
      "to": 35,
      "from": 70,
      "annotations": [
        {
          "weight": 0,
          "proto": "http"
        }
      ]
    },
    {
      "to": 146,
      "from": 118,
      "annotations": [
        {
          "weight": 0,
          "proto": "db"
        }
      ]
    },
    {
      "to": 106,
      "from": 21,
      "annotations": [
        {
          "weight": 15,
          "proto": "http"
        }
      ]
    },
    {
      "to": 37,
      "from": 21,
      "annotations": [
        {
          "weight": 15,
          "proto": "http"
        }
      ]
    },
    {
      "to": 146,
      "from": 47,
      "annotations": [
        {
          "weight": 9,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 103,
      "from": 21,
      "annotations": [
        {
          "weight": 4,
          "proto": "http"
        }
      ]
    },
    {
      "to": 143,
      "from": 47,
      "annotations": [
        {
          "weight": 1,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 55,
      "from": 47,
      "annotations": [
        {
          "weight": 15,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 84,
      "from": 21,
      "annotations": [
        {
          "weight": 2,
          "proto": "http"
        }
      ]
    },
    {
      "to": 77,
      "from": 47,
      "annotations": [
        {
          "weight": 0,
          "proto": "nas"
        },
        {
          "weight": 13,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 164,
      "from": 47,
      "annotations": [
        {
          "weight": 12,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 65,
      "from": 21,
      "annotations": [
        {
          "weight": 6,
          "proto": "http"
        }
      ]
    },
    {
      "to": 122,
      "from": 47,
      "annotations": [
        {
          "weight": 8,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 63,
      "from": 47,
      "annotations": [
        {
          "weight": 6,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 99,
      "annotations": [
        {
          "weight": 9,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 62,
      "from": 21,
      "annotations": [
        {
          "weight": 8,
          "proto": "http"
        }
      ]
    },
    {
      "to": 92,
      "from": 79,
      "annotations": [
        {
          "weight": 13,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 14,
      "annotations": [
        {
          "weight": 14,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 4,
      "annotations": [
        {
          "weight": 3,
          "proto": "nas"
        },
        {
          "weight": 19,
          "proto": "db"
        }
      ]
    },
    {
      "to": 190,
      "from": 47,
      "annotations": [
        {
          "weight": 8,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 90,
      "from": 47,
      "annotations": [
        {
          "weight": 11,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 142,
      "from": 21,
      "annotations": [
        {
          "weight": 5,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 12,
      "annotations": [
        {
          "weight": 8,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 7,
      "annotations": [
        {
          "weight": 8,
          "proto": "ssl"
        },
        {
          "weight": 5,
          "proto": "http"
        }
      ]
    },
    {
      "to": 184,
      "from": 79,
      "annotations": [
        {
          "weight": 15,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 128,
      "from": 79,
      "annotations": [
        {
          "weight": 19,
          "proto": "nas"
        },
        {
          "weight": 4,
          "proto": "ldap"
        }
      ]
    },
    {
      "to": 21,
      "from": 47,
      "annotations": [
        {
          "weight": 15,
          "proto": "nas"
        },
        {
          "weight": 3,
          "proto": "dns"
        },
        {
          "weight": 13,
          "proto": "ldap"
        }
      ]
    },
    {
      "to": 64,
      "from": 47,
      "annotations": [
        {
          "weight": 17,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 15,
      "from": 5,
      "annotations": [
        {
          "weight": 19,
          "proto": "db"
        }
      ]
    },
    {
      "to": 164,
      "from": 118,
      "annotations": [
        {
          "weight": 4,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 68,
      "from": 21,
      "annotations": [
        {
          "weight": 11,
          "proto": "http"
        }
      ]
    },
    {
      "to": 36,
      "from": 12,
      "annotations": [
        {
          "weight": 19,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 89,
      "annotations": [
        {
          "weight": 5,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 46,
      "from": 47,
      "annotations": [
        {
          "weight": 1,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 125,
      "from": 47,
      "annotations": [
        {
          "weight": 2,
          "proto": "nas"
        },
        {
          "weight": 14,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 124,
      "from": 47,
      "annotations": [
        {
          "weight": 1,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 0,
      "annotations": [
        {
          "weight": 10,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 34,
      "from": 47,
      "annotations": [
        {
          "weight": 15,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 129,
      "from": 21,
      "annotations": [
        {
          "weight": 16,
          "proto": "http"
        }
      ]
    },
    {
      "to": 8,
      "from": 21,
      "annotations": [
        {
          "weight": 6,
          "proto": "http"
        }
      ]
    },
    {
      "to": 129,
      "from": 47,
      "annotations": [
        {
          "weight": 18,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 50,
      "from": 79,
      "annotations": [
        {
          "weight": 19,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 23,
      "annotations": [
        {
          "weight": 18,
          "proto": "nas"
        },
        {
          "weight": 19,
          "proto": "db"
        }
      ]
    },
    {
      "to": 74,
      "from": 21,
      "annotations": [
        {
          "weight": 8,
          "proto": "http"
        }
      ]
    },
    {
      "to": 5,
      "from": 21,
      "annotations": [
        {
          "weight": 18,
          "proto": "http"
        }
      ]
    },
    {
      "to": 176,
      "from": 21,
      "annotations": [
        {
          "weight": 4,
          "proto": "nas"
        },
        {
          "weight": 0,
          "proto": "http"
        }
      ]
    },
    {
      "to": 99,
      "from": 47,
      "annotations": [
        {
          "weight": 11,
          "proto": "nas"
        },
        {
          "weight": 3,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 72,
      "from": 47,
      "annotations": [
        {
          "weight": 2,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 71,
      "from": 21,
      "annotations": [
        {
          "weight": 9,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 88,
      "annotations": [
        {
          "weight": 14,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 158,
      "from": 47,
      "annotations": [
        {
          "weight": 15,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 50,
      "from": 17,
      "annotations": [
        {
          "weight": 12,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 121,
      "from": 21,
      "annotations": [
        {
          "weight": 10,
          "proto": "http"
        }
      ]
    },
    {
      "to": 52,
      "from": 21,
      "annotations": [
        {
          "weight": 8,
          "proto": "http"
        }
      ]
    },
    {
      "to": 20,
      "from": 47,
      "annotations": [
        {
          "weight": 9,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 52,
      "from": 47,
      "annotations": [
        {
          "weight": 15,
          "proto": "nas"
        },
        {
          "weight": 8,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 33,
      "from": 21,
      "annotations": [
        {
          "weight": 0,
          "proto": "http"
        }
      ]
    },
    {
      "to": 176,
      "from": 65,
      "annotations": [
        {
          "weight": 7,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 176,
      "from": 152,
      "annotations": [
        {
          "weight": 5,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 33,
      "from": 47,
      "annotations": [
        {
          "weight": 20,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 30,
      "from": 21,
      "annotations": [
        {
          "weight": 14,
          "proto": "http"
        }
      ]
    },
    {
      "to": 133,
      "from": 161,
      "annotations": [
        {
          "weight": 17,
          "proto": "db"
        }
      ]
    },
    {
      "to": 73,
      "from": 47,
      "annotations": [
        {
          "weight": 20,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 50,
      "from": 105,
      "annotations": [
        {
          "weight": 10,
          "proto": "db"
        }
      ]
    },
    {
      "to": 122,
      "from": 21,
      "annotations": [
        {
          "weight": 18,
          "proto": "http"
        }
      ]
    },
    {
      "to": 14,
      "from": 47,
      "annotations": [
        {
          "weight": 0,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 179,
      "from": 21,
      "annotations": [
        {
          "weight": 7,
          "proto": "nas"
        },
        {
          "weight": 17,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 92,
      "from": 47,
      "annotations": [
        {
          "weight": 13,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 58,
      "annotations": [
        {
          "weight": 18,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 21,
      "from": 64,
      "annotations": [
        {
          "weight": 12,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 160,
      "from": 21,
      "annotations": [
        {
          "weight": 20,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 84,
      "annotations": [
        {
          "weight": 7,
          "proto": "http"
        }
      ]
    },
    {
      "to": 124,
      "from": 21,
      "annotations": [
        {
          "weight": 12,
          "proto": "http"
        }
      ]
    },
    {
      "to": 16,
      "from": 82,
      "annotations": [
        {
          "weight": 12,
          "proto": "http"
        }
      ]
    },
    {
      "to": 198,
      "from": 79,
      "annotations": [
        {
          "weight": 18,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 63,
      "from": 21,
      "annotations": [
        {
          "weight": 5,
          "proto": "http"
        }
      ]
    },
    {
      "to": 5,
      "from": 47,
      "annotations": [
        {
          "weight": 20,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 36,
      "from": 47,
      "annotations": [
        {
          "weight": 14,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 185,
      "annotations": [
        {
          "weight": 6,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 142,
      "from": 47,
      "annotations": [
        {
          "weight": 0,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 66,
      "annotations": [
        {
          "weight": 0,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 76,
      "from": 47,
      "annotations": [
        {
          "weight": 9,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 53,
      "from": 47,
      "annotations": [
        {
          "weight": 19,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 34,
      "annotations": [
        {
          "weight": 4,
          "proto": "nas"
        },
        {
          "weight": 18,
          "proto": "db"
        }
      ]
    },
    {
      "to": 160,
      "from": 166,
      "annotations": [
        {
          "weight": 15,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 3,
      "annotations": [
        {
          "weight": 13,
          "proto": "http"
        }
      ]
    },
    {
      "to": 42,
      "from": 21,
      "annotations": [
        {
          "weight": 16,
          "proto": "nas"
        },
        {
          "weight": 7,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 51,
      "from": 47,
      "annotations": [
        {
          "weight": 14,
          "proto": "nas"
        },
        {
          "weight": 4,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 108,
      "from": 21,
      "annotations": [
        {
          "weight": 15,
          "proto": "http"
        }
      ]
    },
    {
      "to": 101,
      "from": 47,
      "annotations": [
        {
          "weight": 1,
          "proto": "nas"
        },
        {
          "weight": 9,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 141,
      "from": 21,
      "annotations": [
        {
          "weight": 10,
          "proto": "nas"
        },
        {
          "weight": 18,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 118,
      "annotations": [
        {
          "weight": 9,
          "proto": "nas"
        },
        {
          "weight": 15,
          "proto": "db"
        }
      ]
    },
    {
      "to": 21,
      "from": 161,
      "annotations": [
        {
          "weight": 13,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 20,
      "from": 21,
      "annotations": [
        {
          "weight": 13,
          "proto": "http"
        }
      ]
    },
    {
      "to": 51,
      "from": 14,
      "annotations": [
        {
          "weight": 10,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 125,
      "annotations": [
        {
          "weight": 10,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 46,
      "annotations": [
        {
          "weight": 0,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 81,
      "from": 79,
      "annotations": [
        {
          "weight": 2,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 114,
      "from": 47,
      "annotations": [
        {
          "weight": 13,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 68,
      "from": 79,
      "annotations": [
        {
          "weight": 4,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 77,
      "from": 23,
      "annotations": [
        {
          "weight": 4,
          "proto": "db"
        }
      ]
    },
    {
      "to": 114,
      "from": 21,
      "annotations": [
        {
          "weight": 2,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 150,
      "annotations": [
        {
          "weight": 1,
          "proto": "http"
        }
      ]
    },
    {
      "to": 22,
      "from": 47,
      "annotations": [
        {
          "weight": 0,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 176,
      "from": 124,
      "annotations": [
        {
          "weight": 3,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 41,
      "annotations": [
        {
          "weight": 18,
          "proto": "nas"
        },
        {
          "weight": 8,
          "proto": "db"
        }
      ]
    },
    {
      "to": 23,
      "from": 21,
      "annotations": [
        {
          "weight": 4,
          "proto": "http"
        }
      ]
    },
    {
      "to": 128,
      "from": 47,
      "annotations": [
        {
          "weight": 12,
          "proto": "nas"
        },
        {
          "weight": 9,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 124,
      "annotations": [
        {
          "weight": 11,
          "proto": "http"
        }
      ]
    },
    {
      "to": 73,
      "from": 21,
      "annotations": [
        {
          "weight": 14,
          "proto": "http"
        }
      ]
    },
    {
      "to": 70,
      "from": 21,
      "annotations": [
        {
          "weight": 8,
          "proto": "http"
        }
      ]
    },
    {
      "to": 78,
      "from": 79,
      "annotations": [
        {
          "weight": 18,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 35,
      "from": 155,
      "annotations": [
        {
          "weight": 18,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 158,
      "annotations": [
        {
          "weight": 18,
          "proto": "http"
        }
      ]
    },
    {
      "to": 176,
      "from": 175,
      "annotations": [
        {
          "weight": 12,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 40,
      "annotations": [
        {
          "weight": 2,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 95,
      "from": 47,
      "annotations": [
        {
          "weight": 20,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 131,
      "from": 21,
      "annotations": [
        {
          "weight": 14,
          "proto": "http"
        }
      ]
    },
    {
      "to": 95,
      "from": 21,
      "annotations": [
        {
          "weight": 6,
          "proto": "http"
        }
      ]
    },
    {
      "to": 101,
      "from": 128,
      "annotations": [
        {
          "weight": 16,
          "proto": "db"
        }
      ]
    },
    {
      "to": 158,
      "from": 155,
      "annotations": [
        {
          "weight": 5,
          "proto": "http"
        }
      ]
    },
    {
      "to": 35,
      "from": 79,
      "annotations": [
        {
          "weight": 11,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 57,
      "annotations": [
        {
          "weight": 7,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 76,
      "from": 21,
      "annotations": [
        {
          "weight": 7,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 63,
      "annotations": [
        {
          "weight": 11,
          "proto": "nas"
        },
        {
          "weight": 0,
          "proto": "db"
        }
      ]
    },
    {
      "to": 182,
      "from": 47,
      "annotations": [
        {
          "weight": 13,
          "proto": "nas"
        },
        {
          "weight": 18,
          "proto": "ldap"
        }
      ]
    },
    {
      "to": 175,
      "from": 21,
      "annotations": [
        {
          "weight": 16,
          "proto": "http"
        }
      ]
    },
    {
      "to": 56,
      "from": 118,
      "annotations": [
        {
          "weight": 20,
          "proto": "db"
        }
      ]
    },
    {
      "to": 123,
      "from": 21,
      "annotations": [
        {
          "weight": 9,
          "proto": "http"
        }
      ]
    },
    {
      "to": 54,
      "from": 21,
      "annotations": [
        {
          "weight": 19,
          "proto": "http"
        }
      ]
    },
    {
      "to": 35,
      "from": 21,
      "annotations": [
        {
          "weight": 13,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 16,
      "annotations": [
        {
          "weight": 20,
          "proto": "http"
        }
      ]
    },
    {
      "to": 101,
      "from": 21,
      "annotations": [
        {
          "weight": 14,
          "proto": "http"
        }
      ]
    },
    {
      "to": 16,
      "from": 21,
      "annotations": [
        {
          "weight": 17,
          "proto": "http"
        }
      ]
    },
    {
      "to": 41,
      "from": 79,
      "annotations": [
        {
          "weight": 19,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 36,
      "annotations": [
        {
          "weight": 18,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 51,
      "from": 5,
      "annotations": [
        {
          "weight": 15,
          "proto": "db"
        }
      ]
    },
    {
      "to": 82,
      "from": 21,
      "annotations": [
        {
          "weight": 3,
          "proto": "http"
        }
      ]
    },
    {
      "to": 79,
      "from": 47,
      "annotations": [
        {
          "weight": 15,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 184,
      "from": 21,
      "annotations": [
        {
          "weight": 12,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 28,
      "annotations": [
        {
          "weight": 11,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 79,
      "from": 21,
      "annotations": [
        {
          "weight": 4,
          "proto": "http"
        },
        {
          "weight": 18,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 53,
      "annotations": [
        {
          "weight": 7,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 16,
      "from": 47,
      "annotations": [
        {
          "weight": 6,
          "proto": "nas"
        },
        {
          "weight": 12,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 60,
      "from": 21,
      "annotations": [
        {
          "weight": 19,
          "proto": "db"
        },
        {
          "weight": 15,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 79,
      "annotations": [
        {
          "weight": 5,
          "proto": "nas"
        },
        {
          "weight": 15,
          "proto": "dns"
        },
        {
          "weight": 9,
          "proto": "ldap"
        }
      ]
    },
    {
      "to": 47,
      "from": 79,
      "annotations": [
        {
          "weight": 14,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 60,
      "from": 47,
      "annotations": [
        {
          "weight": 17,
          "proto": "nas"
        },
        {
          "weight": 3,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 41,
      "from": 21,
      "annotations": [
        {
          "weight": 1,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 101,
      "annotations": [
        {
          "weight": 4,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 48,
      "from": 47,
      "annotations": [
        {
          "weight": 13,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 38,
      "from": 21,
      "annotations": [
        {
          "weight": 6,
          "proto": "http"
        }
      ]
    },
    {
      "to": 147,
      "from": 47,
      "annotations": [
        {
          "weight": 15,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 206,
      "from": 47,
      "annotations": [
        {
          "weight": 16,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 88,
      "from": 21,
      "annotations": [
        {
          "weight": 3,
          "proto": "nas"
        },
        {
          "weight": 12,
          "proto": "ldap"
        }
      ]
    },
    {
      "to": 206,
      "from": 21,
      "annotations": [
        {
          "weight": 12,
          "proto": "http"
        }
      ]
    },
    {
      "to": 56,
      "from": 79,
      "annotations": [
        {
          "weight": 5,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 85,
      "from": 21,
      "annotations": [
        {
          "weight": 9,
          "proto": "http"
        }
      ]
    },
    {
      "to": 66,
      "from": 47,
      "annotations": [
        {
          "weight": 7,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 33,
      "annotations": [
        {
          "weight": 7,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 52,
      "annotations": [
        {
          "weight": 7,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 155,
      "from": 47,
      "annotations": [
        {
          "weight": 11,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 21,
      "from": 29,
      "annotations": [
        {
          "weight": 11,
          "proto": "ssl"
        }
      ]
    },
    {
      "to": 35,
      "from": 85,
      "annotations": [
        {
          "weight": 15,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 55,
      "annotations": [
        {
          "weight": 16,
          "proto": "ssl"
        },
        {
          "weight": 11,
          "proto": "http"
        }
      ]
    },
    {
      "to": 106,
      "from": 47,
      "annotations": [
        {
          "weight": 16,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 125,
      "from": 118,
      "annotations": [
        {
          "weight": 15,
          "proto": "db"
        }
      ]
    },
    {
      "to": 16,
      "from": 76,
      "annotations": [
        {
          "weight": 9,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 100,
      "annotations": [
        {
          "weight": 11,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 113,
      "from": 21,
      "annotations": [
        {
          "weight": 0,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 146,
      "from": 21,
      "annotations": [
        {
          "weight": 8,
          "proto": "db"
        },
        {
          "weight": 4,
          "proto": "http"
        }
      ]
    },
    {
      "to": 87,
      "from": 79,
      "annotations": [
        {
          "weight": 3,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 150,
      "from": 47,
      "annotations": [
        {
          "weight": 6,
          "proto": "nas"
        },
        {
          "weight": 10,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 150,
      "from": 129,
      "annotations": [
        {
          "weight": 17,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 123,
      "annotations": [
        {
          "weight": 18,
          "proto": "ssl"
        },
        {
          "weight": 11,
          "proto": "http"
        }
      ]
    },
    {
      "to": 26,
      "from": 12,
      "annotations": [
        {
          "weight": 1,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 21,
      "from": 2,
      "annotations": [
        {
          "weight": 8,
          "proto": "ssl"
        },
        {
          "weight": 7,
          "proto": "http"
        }
      ]
    },
    {
      "to": 72,
      "from": 21,
      "annotations": [
        {
          "weight": 6,
          "proto": "http"
        }
      ]
    },
    {
      "to": 65,
      "from": 47,
      "annotations": [
        {
          "weight": 17,
          "proto": "nas"
        },
        {
          "weight": 0,
          "proto": "dns"
        }
      ]
    },
    {
      "to": 190,
      "from": 21,
      "annotations": [
        {
          "weight": 2,
          "proto": "http"
        }
      ]
    },
    {
      "to": 176,
      "from": 106,
      "annotations": [
        {
          "weight": 9,
          "proto": "nas"
        }
      ]
    },
    {
      "to": 60,
      "from": 118,
      "annotations": [
        {
          "weight": 0,
          "proto": "db"
        }
      ]
    },
    {
      "to": 21,
      "from": 152,
      "annotations": [
        {
          "weight": 8,
          "proto": "http"
        }
      ]
    },
    {
      "to": 152,
      "from": 21,
      "annotations": [
        {
          "weight": 10,
          "proto": "http"
        }
      ]
    },
    {
      "to": 21,
      "from": 5,
      "annotations": [
        {
          "weight": 8,
          "proto": "nas"
        },
        {
          "weight": 20,
          "proto": "db"
        }
      ]
    }
  ]
};

var Layers = {
    background: 20,
    edges: 5,
    nodes: 2,
    labels: 1,
    selection: 0
};
function Geometry() {
    var geometryCache = {},
        baseGeometry = new THREE.PlaneGeometry(80, 90, 6, 6),
        baseBorderGeometry = new THREE.PlaneGeometry(85, 95, 6, 6);

    this.createBackground = function(materials) {
        var geom,
            mesh;
        geom = new THREE.PlaneGeometry(100000, 100000);
        mesh = new THREE.Mesh(geom, materials.background);
        mesh.position.set(0, 0, Layers.background);
        return mesh;
    };

    this.getNodeGeometry = function(node) {
        var segments,
            geometry;

        if (geometryCache[node.r] && geometryCache[node.r].geometry) {
            return geometryCache[node.r].geometry;
        }
        segments = Util.bound(node.r, [16, 32]);
        geometry = new THREE.CircleGeometry(node.r, segments);
        if (!geometryCache[node.r]) {
            geometryCache[node.r] = {};
        }
        geometryCache[node.r].geometry = geometry;
        return geometry;
    };

    this.getNodeBorderGeometry = function(node) {
        var segments,
            borderGeometry;

        if (geometryCache[node.r] && geometryCache[node.r].borderGeometry) {
            return geometryCache[node.r].borderGeometry;
        }
        segments = Util.bound(node.r, [16, 32]);
        borderGeometry = new THREE.CircleGeometry(node.r + 0.5, segments);
        if (!geometryCache[node.r]) {
            geometryCache[node.r] = {};
        }
        geometryCache[node.r].borderGeometry = borderGeometry;
        return borderGeometry;
    };

    this.createNodeLabelMesh = function(materials, node, p) {
        var geom,
            material,
            canvas,
            context,
            labelHeight = 18,
            labelWidth = 500,
            fontSize = 12,
            texture,
            mesh;
        canvas = document.createElement('canvas');
        $(canvas).attr('height', labelHeight);
        $(canvas).attr('width', labelWidth);
        context = canvas.getContext('2d');
        context.font = fontSize + 'pt Source Sans Pro';
        context.fillStyle = '#444';
        context.textAlign = 'center';
        context.fillText(node.label, canvas.width / 2, fontSize);
        texture = new THREE.Texture(canvas);
        material = new THREE.MeshBasicMaterial({
            'map': texture,
            'transparent': true
        });
        material.opacity = 0.0;
        material.map.needsUpdate = true;
        geom = new THREE.PlaneGeometry(canvas.width, canvas.height);
        mesh = new THREE.Mesh(geom, material);
        mesh.position.x = p.x;
        mesh.position.y = p.y;
        mesh.position.z = Layers.labels;
        return mesh;
    };

    this.createNodeMesh = function(materials, node, p) {
        var borderGeom,
            geom,
            borderMesh,
            mesh,
            r;

        r = Util.bound(node.degree * 2 || 2, [5, 15]);
        node.r = r;
        geom = this.getNodeGeometry(node);
        mesh = new THREE.Mesh(geom, materials.node);
        borderGeom = this.getNodeBorderGeometry(node);
        mesh.name = 'node-' + node.id;
        borderMesh = new THREE.Mesh(borderGeom, materials.nodeBorder);

        borderMesh.position.z = Layers.nodes + 1;
        mesh.position.x = p.x;
        mesh.position.y = p.y;
        mesh.position.z = Layers.nodes;
        mesh.add(borderMesh);
        return mesh;
    };

    this.updateEdgeMesh = function(edge, mesh, p, q) {
        var i,
            baseWidth = 0.3,
            w,
            scale,
            distance = new THREE.Vector2(q.x - p.x, q.y - p.y),
            geom = mesh.geometry,
            n = geom.vertices.length,
            xd = distance.x / (n / 2 - 1),
            yd = distance.y / (n / 2 - 1),
            cur = p.clone(),
            theta = Math.atan2(q.y - p.y, q.x - p.x),
            tmp = new THREE.Vector2(),
            normal = new THREE.Vector2(),
            pad,
            v;

        pad = new THREE.Vector2(Math.cos(theta), Math.sin(theta));

        for (i = 0; i < n / 2; i++) {
            scale = Math.pow(Math.abs(n / 4 - i), 1.5) / 6;
            if ((edge.source instanceof DeviceNode) &&
                (edge.target instanceof DeviceNode)) {
                w = 0.1;
            }
            else if (edge.source instanceof DeviceNode) {
                w = (i / (n / 2) + 0.1) * baseWidth;
            }
            else if (edge.target instanceof DeviceNode) {
                w = (1 - i / (n / 2)) * baseWidth;
            }
            else {
                w = baseWidth;
            }
            pad = pad.normalize().multiplyScalar(w);
            tmp.set(cur.x, cur.y);
            normal.set(-pad.y, pad.x).multiplyScalar(scale);
            tmp.add(normal);
            v = geom.vertices[2 * i];
            v.set(tmp.x, tmp.y, Layers.edges);

            tmp.set(cur.x, cur.y);
            normal.set(pad.y, -pad.x).multiplyScalar(scale);
            tmp.add(normal);
            v = geom.vertices[2 * i + 1];
            v.set(tmp.x, tmp.y, Layers.edges);
            cur.x += xd;
            cur.y += yd;
        }
        geom.verticesNeedUpdate = true;
        geom.computeBoundingSphere();
    };

    this.createEdgeMesh = function(materials, edge, p, q) {
        var geom,
            line;
        geom = new THREE.PlaneGeometry(1, 100, 20, 1);
        geom.dynamic = true;
        geom.name = 'edge-' + [edge.source.id, edge.target.id].join('-');
        line = new THREE.Mesh(geom, materials.edge);
        this.updateEdgeMesh(edge, line, p, q);
        return line;
    };

    this.dispose = function() {
        var key;
        for (key in geometryCache) {
            geometryCache[key].dispose();
        }
        baseBorderGeometry.dispose();
        baseGeometry.dispose();
    };
}
function Materials() {
    this.background = new THREE.MeshBasicMaterial({
        'color': 0xdadaff,
        'shading': THREE.FlatShading
    });
    this.node = new THREE.MeshBasicMaterial({
        'color': 0xfafafa,
        'shading': THREE.FlatShading
    });
    this.nodeBorder = new THREE.MeshBasicMaterial({
        'color': 0x999999,
        'shading': THREE.FlatShading
    });
    this.selectedNode = new THREE.MeshBasicMaterial({
        'color': 0xffffff,
        'shading': THREE.FlatShading
    });
    this.selectedNodeBorder = new THREE.MeshBasicMaterial({
        'color': 0x005395,
        'shading': THREE.FlatShading
    });
    this.edge = new THREE.LineBasicMaterial({
        'color': 0xbababa,
        'shading': THREE.FlatShading
    });
}
function Animations() {
    this.animationList = [];
}

Animations.prototype.add = function(meshObject, id, anim) {
    if (meshObject.hasAnimation(id)) {
        this.remove(meshObject, id);
    }

    this.animationList.push(anim);
    meshObject.addAnimation(id, anim);

    // Automatically remove on completion
    anim.onComplete(function() {
        var idx = this.animationList.indexOf(anim);
        if (idx !== -1) {
            this.animationList.splice(idx, 1);
            delete meshObject.animations[id];
        }
    }.bind(this))
        .start();
};

Animations.prototype.remove = function(meshObject, id) {
    var anim,
        idx;
    anim = meshObject.removeAnimation(id);
    idx = this.animationList.indexOf(anim);
    if (idx !== -1) {
        this.animationList.splice(idx, 1);
    }
};

Animations.prototype.empty = function() {
    return this.animationList.length === 0;
};

// Types
Animations.Highlight = 'Highlight';
var MouseState,
    RightMouseButton = 3;

MouseState = {
    None: 'None',
    Hover: 'Hover',
    DragPan: 'DragPan',
    DragItem: 'DragItem'
};

function Controls(renderer) {
    this.renderer = renderer;
    this.mouseState = MouseState.None;
    this.hoverTarget = null;
    this.selection = null;
    this.lastClickPosition = null;
    this.menu = new Menu(renderer.container);

    console.log('Controls initialized');
}

Controls.prototype.init = function() {
    var self = this,
        $container = self.renderer.container,
        container = $container.get(0);

    function onScroll(event) {
        var scrollAmount = (event.wheelDeltaY  * 0.02) || -event.detail;
        self.renderer.zoom(scrollAmount);
        event.preventDefault();
    }

    function onMouseMove(event) {
        var mousePos = new THREE.Vector3(event.clientX, event.clientY),
            obj,
            intersects,
            i;

        switch (self.mouseState) {
        case MouseState.None:
            intersects = self.renderer.mouseAt(mousePos);
            for (i = 0; i < intersects.length; i++) {
                obj = intersects[i];
                self.renderer.addHighlight(obj);
                self.mouseState = MouseState.Hover;
                self.hoverTarget = obj;
            }
            break;
        case MouseState.Hover:
            intersects = self.renderer.mouseAt(mousePos);
            if (intersects.length === 0) {
                obj = self.hoverTarget;
                self.renderer.removeHighlight(obj);
                self.mouseState = MouseState.None;
                self.hoverTarget = null;
                self.selection = null;
            }
            break;
        case MouseState.DragPan:
            if (!$container.hasClass('grab-cursor')) {
                $container.toggleClass('grab-cursor', true);
            }
            self.renderer.pan(self.lastClickPosition, mousePos);
            self.lastClickPosition = mousePos;
            break;
        case MouseState.DragItem:
            if (self.hoverTarget === null) {
                self.mouseState = MouseState.None;
            }
            else {
                self.renderer.move(self.hoverTarget, self.lastClickPosition,
                                   mousePos);
                self.lastClickPosition = mousePos;
            }
            break;
        }
        event.preventDefault();
        event.stopPropagation();
    }

    function onMouseUp(event) {
        if (event.which === RightMouseButton) {
            return;
        }
        self.menu.hide();
        self.lastClickPosition = null;
        if (self.mouseState === MouseState.DragItem) {
            self.mouseState = MouseState.Hover;
        }
        else {
            self.mouseState = MouseState.None;
        }
        container.removeEventListener('mouseup', onMouseUp);
        if ($container.hasClass('grab-cursor')) {
            $container.toggleClass('grab-cursor', false);
        }
        event.preventDefault();
        event.stopPropagation();
    }

    function onMouseDown(event) {
        if (event.which === RightMouseButton) {
            return;
        }
        self.menu.hide();
        self.lastClickPosition = new THREE.Vector3(event.clientX,
                                                   event.clientY,
                                                   0);
        if (self.mouseState === MouseState.Hover) {
            self.mouseState = MouseState.DragItem;
            self.selection = self.hoverTarget;
        }
        else {
            self.mouseState = MouseState.DragPan;
        }
        container.addEventListener('mouseup', onMouseUp);
        self.renderer.step();
        event.preventDefault();
        event.stopPropagation();
    }

    function onResize() {
        self.renderer.onResize();
    }

    function onContextMenu(event) {
        if (self.hoverTarget !== null) {
            self.menu.show(self.hoverTarget, {
                x: event.clientX,
                y: event.clientY
            });
            event.preventDefault();
            event.stopPropagation();
        }
    }

    container.addEventListener('contextmenu', onContextMenu, false);
    container.addEventListener('DOMMouseScroll', onScroll, false);
    container.addEventListener('mousewheel', onScroll, false);
    container.addEventListener('mousedown', onMouseDown, false);
    container.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onResize.bind(this), false);
};
var Events = {
    UpdateStart: 'UpdateStart',
    UpdateComplete: 'UpdateComplete'
};
function Menu(container) {
    this.container = container;
    this.el = null;
}

Menu.prototype.show = function(node, pos) {
    var el,
        menuWidth,
        menuHeight,
        x = pos.x,
        y = pos.y;
    console.log('menu:', node, x, y);
    el = $('.activitymap-context-menu').first();
    menuWidth = el.width();
    menuHeight = el.height();
    el.trigger('activitymap-context-menu-open', node);
    if (x + menuWidth > this.container.width()) {
        x -= menuWidth;
    }
    if (y + menuHeight > this.container.height()) {
        y -= menuHeight;
    }
    el.show().css({left: x, top: y});
    this.el = el;
};

Menu.prototype.hide = function() {
    if (this.el !== null) {
        this.el.hide();
        this.el = null;
    }
};
function MeshObject() {
    this.id = null;
    // This object is represented in the arbor graph layout.
    this.isInLayout = false;
    // This object is represented in the currently rendered scene.
    this.isInScene = false;
    // The current mesh associated with this object.
    this.mesh = null;
    // The current animations associated with this object.
    this.animations = {};
}

MeshObject.prototype.addAnimation = function(id, tween) {
    if (this.animations[id] !== undefined) {
        this.removeAnimation(id);
    }
    this.animations[id] = tween;
};

MeshObject.prototype.hasAnimation = function(id) {
    return this.animations[id] !== undefined;
};

MeshObject.prototype.removeAnimation = function(id) {
    var anim = this.animations[id] || null;
    if (anim !== null) {
        TWEEN.remove(anim);
        this.animations[id] = undefined;
    }
    return anim;
};

function Node(id, info) {
    MeshObject.call(this);
    this.weight = 1;
    this.x = 0;
    this.y = 0;
    this.id = id;
    this.label = (info && info.name) || id;
    this.degree = 0;
    this.isInLayout = false;
    this.isHighlighted = false;
    this.labelMesh = null;
    this.fixed = false;
    this.dampingFactor = 1.0;

    // XXX: hack for arbor.js
    Object.defineProperty(this, 'mass', {
        get: function() {
            return this.weight;
        },
        set: function(x) {
            void x;
        }
    });
}
Node.prototype = Object.create(MeshObject.prototype);

function Edge(source, target) {
    MeshObject.call(this);
    this.id = Edge.getId(source, target);
    this.source = source;
    this.target = target;
    this.stats = {};
}
Edge.prototype = Object.create(MeshObject.prototype);

Edge.getId = function(source, target) {
    return ['edge', source.id, target.id].join('-');
};

function DeviceNode() {
    Node.apply(this, Array.prototype.slice.call(arguments));
    this.r = 0;
    this.ref = 0;

    this.acquire = function() {
        this.ref += 1;
    };
    this.release = function() {
        this.ref -= 1;
        if (this.ref < 0) {
            log.error('Node', this.id, 'ref error');
            this.ref = 0;
        }
    };
}
DeviceNode.prototype = Object.create(Node.prototype);

var ParticleSystem = window.arbor.ParticleSystem;

function Graph() {
    this.data = null;
    this.map = {};
    this.edges = {};
    //this.watch = new Watch();
    this.callback = null; // XXX

    this.layout = new ParticleSystem({
        repulsion: 800,
        precision: 0.7,
        stiffness: 0.06,
        fps: 60,
        gravity: true
    });

    //this.watch.on(Events.UpdateComplete, function() {
        //// Manually start layout process after modifying the graph
        //this.layout.start();
    //}.bind(this));
    this.update(FakeData);
}

Graph.prototype.update = function(data) {
    var node,
        edge,
        oid,
        i,
        oid,
        src,
        addEdge,
        dst;

    //this.watch.notify(Events.UpdateStart);
    for (i = 0; i < data.edges.length; i++) {
        edge = data.edges[i];
        [edge.from, edge.to].forEach(function(oid) {
            node = this.map[oid];
            if (node === undefined) {
                var info = null; // XXX
                node = new DeviceNode(oid, info, 1);
                this.map[node.id] = node;
            }
            // Reset reference counts because we will recompute all tiers
            node.ref = 0;
        }.bind(this));
    }
    for (i = 0; i < data.edges.length; i++) {
        edge = data.edges[i];
        src = this.get(edge.from);
        dst = this.get(edge.to);
        src.acquire();
        dst.acquire();
        this.addNode(src);
        this.addNode(dst);
        this.addEdge(src, dst);
    }

    // Remove nodes no longer in use
    for (oid in this.map) {
        var node = this.map[oid];
        if (node.ref === 0) {
            this.removeNode(node);
        }
    }
    console.log('graph updated');
    this.data = data;
    //this.watch.notify(Events.UpdateComplete);
    if (this.callback !== null) {
        this.callback(); // XXX
    }
    this.layout.start(); // XXX
};

Graph.prototype.get = function(id) {
    if ((typeof id === 'string') && (/^node\-/.test(id))) {
        id = id.split('-')[1];
    }
    else if ((typeof id === 'string') && (/^edge\-/.test(id))) {
        return this.edges[id];
    }
    return this.map[id] || null;
};

Graph.prototype.addNode = function(node) {
    var result = this.layout.getNode(node.id);
    node.isInLayout = true;
    if (!result) {
        console.log('add:', node);
        this.layout.addNode(node.id, node);
    }
};

Graph.prototype.removeNode = function(node) {
    var self = this;
    node.isInLayout = false;
    if (self.layout.getNode(node.id)) {
        console.log('remove:', node);
        // Remove edges first so that pruneNode doesn't sneakily remove them
        // from the layout for us.
        self.eachEdge(function(e) {
            if ((e.source === node) || (e.target === node)) {
                self.removeEdge(e);
            }
        });
        this.layout.pruneNode(node.id);
    }
};

Graph.prototype.addEdge = function(source, target) {
    var edges,
        edgeId,
        edge,
        key;

    edgeId = Edge.getId(source, target);
    edge = this.edges[edgeId];
    if (edge === undefined) {
        edge = new Edge(source, target);
        this.edges[edgeId] = edge;
    }

    edges = this.layout.getEdges(source.id, target.id);
    if (!this.layout.getNode(edge.source.id)) {
        throw new Error(edge.source.id);
    }
    if (!this.layout.getNode(edge.target.id)) {
        throw new Error(edge.target.id);
    }
    if (edges.length === 0) {
        console.log('edge from', edge.source.id, 'to', edge.target.id);
        edge.source.degree += 1;
        edge.target.degree += 1;
        edge.isInLayout = true;
        this.layout.addEdge(edge.source.id, edge.target.id, edge);
    }
};

Graph.prototype.removeEdge = function(edge) {
    var edges = this.layout.getEdges(edge.source.id, edge.target.id),
        i;
    for (i = 0; i < edges.length; i++) {
        edge.source.degree -= 1;
        edge.target.degree -= 1;
        edge.isInLayout = false;
        this.layout.pruneEdge(edges[i]);
    }
};

Graph.prototype.eachNode = function(fn) {
    var id;
    for (id in this.map) {
        fn(this.map[id]);
    }
};

Graph.prototype.eachEdge = function(fn) {
    var id;
    for (id in this.edges) {
        fn(this.edges[id]);
    }
};

Graph.prototype.layoutUpdate = function() {
    var energy = this.layout.energy();
    if (energy.mean < Options.layout.minEnergy) {
        this.layout.stop();
    }
};

function createLights() {
    var light;
    light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8);
    light.position.set(0, 500, 0);
    return [light];
}

/**
 * Renderer class, used to draw activity maps
 */
function Renderer($el, graph) {
    var i;

    this.width = $el.width();
    this.height = $el.height();
    this.container = $el;
    this.containerOffset = this.container.offset();
    // XXX: remove stats code
    //this.stats = new Stats();
    //this.stats.setMode(1);
    //this.stats.domElement.style.position = 'absolute';
    //this.stats.domElement.style.left = '0px';
    //this.stats.domElement.style.top = '40px';
    //this.container.append(this.stats.domElement);

    console.log('initializing renderer',
                '(' + this.width + 'x' + this.height + ') on', $el);

    // Populated on demand, cleared when the graph is updated.
    this.nodeMeshCache = null;

    //graph.watch.on(Events.UpdateComplete, this.graphUpdate.bind(this));
    graph.callback = this.graphUpdate.bind(this);

    this.graph = graph;
    this.graph.layout.screenSize(this.width, this.height);
    this.renderer = new THREE.WebGLRenderer(Options.renderOptions);
    this.aspect = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera(50, this.aspect, -500, 500);
    this.camera.position.z = 1600;
    this.camera.lookAt(new THREE.Vector3());
    this.renderer.setSize(this.width, this.height);
    // Clear color should match the CSS background color.
    this.renderer.setClearColor(0xD4D4D4, 1);
    this.container.append(this.renderer.domElement);

    this.geometry = new Geometry();
    this.materials = new Materials();
    this.bg = this.geometry.createBackground(this.materials);

    this.scene = new THREE.Scene();
    this.scene.add(this.camera);
    this.scene.add(this.bg);
    this.lights = createLights();
    for (i = 0; i < this.lights.length; i++) {
        this.scene.add(this.lights[i]);
    }

    // Time of last user interaction. We don't want to make changes while the
    // user is interacting with the map.
    this.lastTouch = -Infinity;

    // Will be true if the renderer is currently active
    this.isRendering = false;

    this.animations = new Animations();
}

Renderer.prototype.layoutToWorld = function(x, y) {
    x = x - (this.width / 2);
    y = - (y - (this.height / 2));
    return new THREE.Vector3(x, y, 0);
};

Renderer.prototype.toWorld = function(x, y) {
    var vec,
        projector = new THREE.Projector(),
        offset = this.containerOffset,
        dir,
        pos,
        distance;

    x -= offset.left;
    y -= offset.top;

    vec = new THREE.Vector3((x / this.width) * 2 - 1,
                            (-y / this.height) * 2 + 1,
                            -0.5);
    projector.unprojectVector(vec, this.camera);
    dir = vec.sub(this.camera.position).normalize();
    distance = -this.camera.position.z / dir.z;
    pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

    return pos;
};

Renderer.prototype.toScreen = function(x, y, z) {
    var w = this.width,
        h = this.height,
        offset = this.containerOffset,
        projector = new THREE.Projector(),
        pos = projector.projectVector(new THREE.Vector3(x, y, z), this.camera);
    pos.x = (pos.x * (w / 2)) + (w / 2) + offset.left;
    pos.y = -(pos.y * (h / 2)) + (h / 2) + offset.top;
    return pos;
};

Renderer.prototype.getNodeMeshes = function() {
    var nodeMeshCache;
    if (this.nodeMeshCache !== null) {
        return this.nodeMeshCache;
    }
    nodeMeshCache = [];
    this.graph.layout.eachNode(function(node) {
        nodeMeshCache.push(node.data.mesh);
    });
    this.nodeMeshCache = nodeMeshCache;
    return this.nodeMeshCache;
};

Renderer.prototype.zoom = function(amount) {
    var fovMin = 5,
        fovMax = 160,
        w = this.width,
        h = this.height,
        camera = this.camera,
        m;

    camera.fov -= amount;
    camera.fov = Util.bound(camera.fov, [fovMin, fovMax]);
    m = new THREE.Matrix4().makePerspective(camera.fov, w / h,
                                            camera.near,
                                            camera.far);
    camera.projectionMatrix = m;
    this.step();
};

Renderer.prototype.addHighlight = function(obj) {
    var tween;
    obj.isHighlighted = true;
    tween = new TWEEN.Tween({scale: 1})
        .to({scale: 1.25}, 150)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            obj.mesh.scale.x = this.scale;
            obj.mesh.scale.y = this.scale;
        });

    this.animations.add(obj, Animations.Highlight, tween);
    this.step();
};

Renderer.prototype.removeHighlight = function(obj) {
    var tween;
    obj.isHighlighted = false;
    tween = new TWEEN.Tween({scale: obj.mesh.scale.x})
        .to({scale: 1}, 150)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            obj.mesh.scale.x = this.scale;
            obj.mesh.scale.y = this.scale;
        });

    this.animations.add(obj, Animations.Highlight, tween);
    this.step();
};

Renderer.prototype.pan = function(oldPos, newPos) {
    var p,
        q,
        d = new THREE.Vector3();
    p = this.toWorld(oldPos.x, oldPos.y);
    q = this.toWorld(newPos.x, newPos.y);
    d.subVectors(q, p);
    this.camera.position.sub(d);
    this.renderer.render(this.scene, this.camera);
    this.lastTouch = Date.now();
};

Renderer.prototype.move = function(obj, oldPos, newPos) {
    var p,
        q,
        node,
        d = new THREE.Vector3();
    p = this.toWorld(oldPos.x, oldPos.y);
    q = this.toWorld(newPos.x, newPos.y);
    d.subVectors(q, p);
    obj.mesh.position.add(d);
    node = this.graph.layout.getNode(obj.id);
    node.fixed = true;
    obj.fixed = true;

    // Update position in layout coordinates
    p = obj.mesh.position;
    p = this.toScreen(p.x, p.y, Layers.nodes);
    p = this.graph.layout.fromScreen(p);
    obj.x = p.x;
    obj.y = p.y;
    node.p.x = p.x;
    node.p.y = p.y;

    this.step({nodes: [obj]});
    this.lastTouch = Date.now();
};

// Returns the intersected objects, currently only nodes.
Renderer.prototype.mouseAt = function(mousePos) {
    var i,
        pos = this.toWorld(mousePos.x, mousePos.y),
        results = [],
        camera = this.camera,
        raycaster,
        intersects,
        obj;

    raycaster = new THREE.Raycaster(camera.position,
                                    pos.sub(camera.position)
                                       .normalize());
    intersects = raycaster.intersectObjects(this.getNodeMeshes());
    for (i = 0; i < intersects.length; i++) {
        obj = this.graph.get(intersects[i].object.name);
        results.push(obj);
    }
    if (results.length > 0) {
        // For now, only update lastTouch if the user is intersecting things
        this.lastTouch = Date.now();
    }
    return results;
};

Renderer.prototype.drawBackground = function() {
    //this.bg.rotation.y += (Math.PI / 2) / 600;
};

Renderer.prototype.layoutUpdate = function() {
    this.step();
};

Renderer.prototype.renderNode = function(node, p) {
    var mesh = node.data.mesh,
        labelMesh = node.data.labelMesh,
        child,
        scale = this.aspect * this.camera.fov / 60,
        r = node.data.r || (40 * Math.PI / 2 - 14),
        nodeDistFactor,
        opacity,
        pos,
        z,
        pad = 14;

    if (mesh === null) {
        return;
    }

    if (this.graph.layout.isRunning) {
        // Update positions
        if (!node.fixed && (mesh !== null)) {
            pos = this.layoutToWorld(p.x, p.y);
            node.data.x = p.x;
            node.data.y = p.y;
            mesh.position.set(pos.x, pos.y, Layers.nodes);
        }
    }

    if (node.data.isHighlighted) {
        opacity = 1.0;
        child = mesh.children[0];
        child.material = this.materials.selectedNodeBorder;
        child.scale.x = 1.05;
        child.scale.y = 1.05;
        z = Layers.selection;
    }
    else {
        child = mesh.children[0];
        child.material = this.materials.nodeBorder;
        child.scale.x = 1.0;
        child.scale.y = 1.0;
        nodeDistFactor = 2.25;
        opacity = Util.bound(r * nodeDistFactor / this.camera.fov, [0.0, 1.0]);
        if (opacity < 0.5) {
            opacity = 0;
        }
        if (opacity > 0.7) {
            opacity = 1.0;
        }
        z = Layers.nodes;
        // XXX: For now, reset fixed property if node is not highlighted. We
        // may want to make this behavior a bit smarter.
        node.fixed = false;
        node.data.fixed = false;
    }
    mesh.position.z = z;
    mesh.children[0].position.z = z + 1;
    p = mesh.position;
    p = this.toScreen(p.x, p.y - r * mesh.scale.y, z);
    p = this.toWorld(p.x, p.y + pad);
    labelMesh.position.set(p.x, p.y, Layers.labels);
    labelMesh.scale.x = scale;
    labelMesh.scale.y = scale;
    labelMesh.material.opacity = opacity;
};

Renderer.prototype.renderEdge = function(edge, p, q) {
    var mesh = edge.data.mesh,
        source = edge.source.data,
        target = edge.target.data,
        sourceMesh = source.mesh,
        targetMesh = target.mesh,
        p,
        q;

    if (mesh === null) {
        return;
    }

    p = sourceMesh.position;
    q = targetMesh.position;

    this.geometry.updateEdgeMesh(edge.data, mesh, p, q);
};

Renderer.prototype.drawFrame = function(modified) {
    var i,
        j,
        layout,
        node,
        nodes,
        edges,
        edge;

    if (!this.initialized) {
        return;
    }

    this.drawBackground();

    layout = this.graph.layout;
    if (modified === undefined) {
        // Update everything in the frame
        layout.eachNode(this.renderNode.bind(this));
        layout.eachEdge(this.renderEdge.bind(this));
    }
    else {
        // Update only modified objects
        nodes = modified.nodes || [];
        for (i = 0; i < nodes.length; i++) {
            node = layout.getNode(nodes[i].id);
            edges = layout.getEdgesFrom(node).concat(layout.getEdgesTo(node));
            this.renderNode(node);
            for (j = 0; j < edges.length; j++) {
                edge = edges[j];
                this.renderEdge(edge);
            }
        }
        edges = modified.edges || [];
        for (i = 0; i < edges.length; i++) {
            this.renderEdge(edge);
        }
    }
    this.renderer.render(this.scene, this.camera);
};

Renderer.prototype.step = function(modified) {
    var self = this;

    function renderFn() {
        // XXX: remove stats code
        //self.stats.begin();
        TWEEN.update();
        self.drawFrame(modified);
        //self.stats.end();
        if (!self.animations.empty() || self.graph.layout.isRunning) {
            requestAnimationFrame(renderFn);
        }
        else {
            self.isRendering = false;
        }
        // If we draw again, do a complete redraw
        modified = undefined;
    }

    if (!self.isRendering) {
        requestAnimationFrame(renderFn);
        self.isRendering = true;
    }
};

Renderer.prototype.init = function() {
    this.initialized = true;
    this.graphUpdate();
};

Renderer.prototype.uninit = function() {
    var self = this,
        key;
    self.initialized = false;
    this.graph.layout.eachEdge(function(edge) {
        if (edge.data.mesh !== null) {
            self.scene.remove(edge.data.mesh);
            edge.data.mesh.geometry.dispose();
            edge.data.mesh = null;
        }
    });
    this.graph.layout.eachNode(function(node) {
        if (node.data.mesh !== null) {
            self.scene.remove(node.data.mesh);
            node.data.mesh.geometry.dispose();
            node.data.mesh = null;
        }
    });
    for (key in this.materials) {
        this.materials[key].dispose();
    }
    this.geometry.dispose();
    this.container.empty();
};

Renderer.prototype.canBeUpdated = function() {
    var now = Date.now(),
        minInteractionWaitTime = 1000;
    return now - this.lastTouch >= minInteractionWaitTime;
};

Renderer.prototype.graphUpdate = function() {
    var self = this,
        geometry = self.geometry;

    console.log('start graphUpdate');
    this.graph.eachNode(function(node) {
        var nodeMesh,
            p,
            labelMesh;
        if (node.isInLayout) {
            if (node.mesh === null) {
                p = self.layoutToWorld(node.x, node.y);
                nodeMesh = geometry.createNodeMesh(self.materials, node, p);
                labelMesh = geometry.createNodeLabelMesh(self.materials, node,
                                                         p);
                node.mesh = nodeMesh;
                node.labelMesh = labelMesh;
            }
            if (!node.isInScene) {
                self.scene.add(node.mesh);
                self.scene.add(node.labelMesh);
            }
            node.isInScene = true;
        }
        else {
            if (node.isInScene) {
                // Convert x, y back to layout coordinates, so if the node gets
                // readded to the layout, the conversion back to world
                // coordinates will be correct.
                p = node.mesh.position;
                p = self.toScreen(p.x, p.y, p.z);
                p = self.graph.layout.fromScreen(p);
                node.fixed = false;
                node.x = p.x;
                node.y = p.y;
                self.scene.remove(node.mesh);
                self.scene.remove(node.labelMesh);
            }
            node.isInScene = false;
        }
    });

    this.graph.eachEdge(function(edge) {
        var mesh,
            p,
            q,
            source = edge.source,
            target = edge.target;
        if (edge.isInLayout) {
            if (edge.mesh === null) {
                p = self.layoutToWorld(source.x, source.y);
                q = self.layoutToWorld(target.x, target.y);
                mesh = geometry.createEdgeMesh(self.materials, edge, p, q);
                edge.mesh = mesh;
            }
            if (!edge.isInScene) {
                self.scene.add(edge.mesh);
            }
            edge.isInScene = true;
        }
        else {
            if (edge.isInScene) {
                self.scene.remove(edge.mesh);
            }
            edge.isInScene = false;
        }
    });
    console.log('end graphUpdate (meshes created/destroyed)');

    self.nodeMeshCache = null;
};


/* Events */

Renderer.prototype.onResize = function() {
    this.width = this.container.width();
    this.height = this.container.height();
    this.aspect = this.width / this.height;
    this.containerOffset = this.container.offset();
    this.graph.layout.screenSize(this.width, this.height);
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.step();
};

function ActivityMap(opts) {
    opts = opts || {};

    this.graph = new Graph();
    this.initialized = false;
    this.renderer = null;
    this.controls = null;
    this.element = opts.element || null;
}

ActivityMap.prototype.init = function() {
    var renderer;

    if (this.initialized) {
        return;
    }
    console.log('initialized');

    renderer = new Renderer(this.element, this.graph);
    this.graph.layout.renderer = {
        init: renderer.init.bind(renderer),
        redraw: function() {
            this.graph.layoutUpdate();
            this.renderer.layoutUpdate();
        }.bind(this)
    };
    this.renderer = renderer;
    this.controls = new Controls(renderer);
    this.controls.init();
    this.initialized = true;
};

ActivityMap.prototype.update = function(data) {
    var self = this,
        pollInterval = 500;

    function updatePollFn() {
        if ((self.renderer === null) || self.renderer.canBeUpdated()) {
            self.graph.update(data);
            if (!self.initialized) {
                self.init();
            }
        }
        else {
            setTimeout(updatePollFn, pollInterval);
        }
    }
    updatePollFn();
};

ActivityMap.prototype.bind = function($el) {
    this.element = $el;
};

ActivityMap.prototype.uninit = function() {
    console.log('uninitialized');
    this.renderer.uninit();
};
