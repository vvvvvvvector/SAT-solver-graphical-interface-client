import { Formula, Header, Solutions, Panel } from "./components";

import "./styles/global.scss";

export default function App() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="content">
          <Panel />
          <Formula />
          <Solutions />
        </div>
      </div>
    </>
  );
}
