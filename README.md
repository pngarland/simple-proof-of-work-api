# Usage Instructions

```bash
# clone and install
git clone <url>
cd <target-dir>
npm install

# start local server
npm start

# execute the following commands in a separate terminal:
# ------- Do work, return counter as expected
curl -X PUT -H 'Content-Type: application/json' \
    -d '{"c":"iBeat","n":16}' \
    http://localhost:5000/find
# ------- Verify counter returned above
curl -X PUT -H 'Content-Type: application/json' \
    -d '{"c":"iBeat","n":16, "w":62073}' \
    http://localhost:5000/verify

```




