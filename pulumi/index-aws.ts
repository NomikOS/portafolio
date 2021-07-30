import * as awsx from "@pulumi/awsx"
import * as aws from "@pulumi/aws"
import * as pulumi from "@pulumi/pulumi"
import * as postgresql from "@pulumi/postgresql"

const config = new pulumi.Config()
const baseStack = new pulumi.StackReference(config.require("baseStack"))
const testSgId = baseStack.getOutput("testSgId")

// Base para la imagen con Amazon linux ami (RHEL, usa yum)
const ami = pulumi.output(
  aws.ec2.getAmi({
    filters: [
      {
        name: "name",
        values: ["amzn-ami-hvm-*"],
      },
    ],
    owners: ["137112412989"], // This owner ID is Amazon
    mostRecent: true,
  })
)

const testZone = new aws.route53.Zone(
  "testZone",
  {
    comment: "",
    forceDestroy: false,
    name: "test.com",
  },
  {
    protect: true,
  }
)

const maquinas = [{ name: "microservice1" }]
const userdata = `#!/bin/bash
sudo yum -y update
yum install postgresql -y`

// EC2
const servers = []
for (let i = 0; i < maquinas.length; i++) {
  const s = new aws.ec2.Instance(`test--${c.name}`, {
    instanceType: "t2.micro",
    vpcSecurityGroupIds: [testSgId],
    subnetId: testVpcPublicSubnetId,
    iamInstanceProfile: testProfileName,
    ami: ami.id,
    userData,
    tags: {
      Name: `test-${c.name}`,
    },
  })

  servers.push(s)
}

export const ips = servers.map((s) => {
  return {
    publicIp: pulumi.output(s.publicIp),
    publicDns: pulumi.output(s.publicDns),
  }
})
