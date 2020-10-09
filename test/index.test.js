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
});
