import React, { useEffect } from "react";
import * as NeoVis from "neovis.js";

const NeoGraph = () => {
  useEffect(() => {
    const config = {
      containerId: "viz",
      neo4j: {
        serverUrl: process.env.REACT_APP_NEO_URL,
        serverUser: process.env.REACT_APP_NEO_USER,
        serverPassword: process.env.REACT_APP_NEO_PWD,
      },
      labels: {
        Person: {
          label: "name",
        },
      },
      relationships: {
        KNOWS: {
          thickness: "weight",
        },
      },
      initialCypher: "MATCH (n)-[r]->(m) RETURN n,r,m",
    };

    const viz = new NeoVis.default(config);
    viz.render();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Graph Neo4j avec NeoVis.js</h2>
      <div id="viz" style={{ width: "800px", height: "600px", border: "1px solid black" }} />
    </div>
  );
};

export default NeoGraph;
