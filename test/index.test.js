import { expect } from "chai";
import oc from "../src/index";

describe("js-optchain", () => {
  it("should return schema object when undefined", () => {
    const schema = {
      username: "USERNAME",
      password: "PASSWORD",
    };

    expect(oc(undefined, schema)).to.deep.equal(schema);
  });

  it("should return defaults on nested object when missing", () => {
    const handler = {
      event: {
        body: {
          user: {
            username: "username",
            password: "password",
            roles: ["developer"],
          },
        },
      },
    };

    const schema = {
      event: {
        body: {
          user: {
            username: "USERNAME",
            password: "PASSWORD",
            email: "EMAIL",
            roles: [],
          },
          config: {
            isAdmin: true,
          },
        },
        headers: ["x-user", "USER"],
      },
    };

    expect(oc(handler, schema)).to.deep.equal({
      event: {
        body: {
          user: {
            username: "username",
            password: "password",
            roles: ["developer"],
            email: "EMAIL",
          },
          config: {
            isAdmin: true,
          },
        },
        headers: ["x-user", "USER"],
      },
    });
  });

  it("should support partials", () => {
    const handler = {
      event: {
        body: {
          user: {
            username: "username",
            password: "password",
          },
        },
      },
    };

    const schema = {
      event: {},
    };

    expect(oc(handler, schema)).to.deep.equal(handler);
  });

  it("should allow disabling partials", () => {
    const handler = {
      event: {
        body: {
          user: {
            username: "username",
            password: "password",
          },
        },
      },
    };

    const schema = {
      event: {},
    };

    expect(oc(handler, schema, false)).to.deep.equal(schema);
  });
});
