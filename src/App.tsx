import { Formula, Header, Solutions, Panel, Editor } from "./components";

import "./styles/global.scss";

export default function App() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="content">
          <Editor />
          <Panel />
          <Formula />
          <Solutions />
        </div>
      </div>
    </>
  );
}
