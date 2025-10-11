# usps api backend

## deploy locally

1. Install deps

```sh
npm install
```

2. Deploy locally

```sh
node index.js
```

## testing

Test api call using curl:

```sh
curl -sS -X POST localhost:3001/api/postage \
  -H "Content-Type: application/json" \
  --data-raw '{
    "weight": 1.0,
    "nonMachinable": false
  }' | jq

# example output:
# {
#   "hardcoded": {
#     "breakdown": [
#       {
#         "type": "forever",
#         "quantity": 1
#       }
#     ],
#     "total": 0.78
#   },
#   "metered": {
#     "totalBasePrice": 0.74,
#     "rates": [
#       {
#         "SKU": "DFLL0XXXXR00010",
#         "description": "First Class Letter Metered",
#         "priceType": "RETAIL",
#         "price": 0.74,
#         "weight": 1,
#         "fees": [],
#         "startDate": "2025-10-05",
#         "endDate": "",
#         "warnings": [],
#         "mailClass": "FIRST-CLASS_MAIL"
#       }
#     ]
#   }
# }
```