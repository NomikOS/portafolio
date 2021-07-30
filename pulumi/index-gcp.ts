import * as pulumi from "@pulumi/pulumi"
import * as gcp from "@pulumi/gcp"

const test = new gcp.organizations.Project(
  "test",
  {
    autoCreateNetwork: true,
    billingAccount: "xxxxxxxxxxxxxxxx",
    name: "Proyecto Test",
    projectId: "mi-test",
  },
  {
    protect: true,
  }
)

const dnsService = new gcp.projects.Service("dns-service", {
  project: test.projectId,
  service: "dns.googleapis.com",
})

const runService = new gcp.projects.Service("run-service", {
  project: test.projectId,
  service: "run.googleapis.com",
})

const testZone = new gcp.dns.ManagedZone("test-zone", {
  name: "test",
  dnsName: "mi-test.cl.",
  project: test.projectId,
  dnssecConfig: {
    state: "on",
  },
  visibility: "public",
})

new gcp.dns.RecordSet("test-recordset-cname-www.mi-test.cl", {
  managedZone: testZone.name,
  name: "www.mi-test.cl.",
  type: "CNAME",
  ttl: 300,
  rrdatas: ["ghs.googlehosted.com."],
})
