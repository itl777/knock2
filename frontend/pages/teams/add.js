import React from "react";
import IndexLayout from "@/components/layout";
export default function Teams() {
    return (
      <>
        <IndexLayout title="糾團">
          <div><h2>新增團隊</h2></div>
          <div className="col-6">
            <div className="borderbox">
            <h3 className="boxTitle">創立團隊</h3>
            <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" />
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
            </div>
          </div>
          <div className="col-6">
          <div className="borderbox">
            <h3 className="boxTitle">注意事項</h3>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
          </div>
          </div>
        </IndexLayout>
      </>
    );
  }