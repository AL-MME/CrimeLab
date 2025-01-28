import React, { useEffect, useRef } from 'react';
import NeoVis from 'neovis.js';

const GraphVisualization = () => {
  const vizRef = useRef(null);

  useEffect(() => {
    const initializeGraph = () => {
        const config = {
            neo4j: {
                server_url: "bolt://localhost:7687", // L'URL doit correspondre à l'instance en cours d'exécution
                username: "neo4j",
                password: "password",
            },
            visConfig: {
                nodes: {
                    shape: 'square'
                },
                edges: {
                    arrows: {
                        to: {enabled: true}
                    }
                },
            },
            labels: {
                Character: {
                    label: 'pagerank',
                    group: 'community',
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                        cypher: {
                            value: "MATCH (n) WHERE id(n) = $id RETURN n.size"
                        },
                        function: {
                            title: NeoVis.objectToTitleHtml
                        },
                    }
                }
            },
            relationships: {
                INTERACTS: {
                    value: 'weight',
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                        function: {
                            title: NeoVis.objectToTitleHtml
                        },
                    }
                }
            },
            initialCypher: 'MATCH (n)-[r]->(m) RETURN n,r,m'
          };
          

      const viz = new NeoVis(config);
      viz.render();
      console.log(viz);
    };

    initializeGraph();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Graph Visualization</h1>
      <div ref={vizRef} className="h-[500px] w-full border rounded-xl shadow-md" />
    </div>
  );
};

export default GraphVisualization;
