const { createClient } = require("@scaleway/sdk");

const client = createClient({
  accessKey: process.env.SCW_ACCESS_KEY,
  secretKey: process.env.SCW_SECRET_KEY,
  defaultOrganizationId: process.env.SCW_DEFAULT_ORGANIZATION_ID,
  defaultProjectId: process.env.SCW_DEFAULT_PROJECT_ID,
  defaultRegion: "fr-par",
  defaultZone: "fr-par-1",
});

module.exports = {
  client
}
