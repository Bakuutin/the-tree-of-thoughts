// The tree of thoughts — © tigor <me@tigor.net> (https://tigor.net/me), licensed CC BY 4.0 (see LICENSE).
// Uses D3 (ISC license, see vendor/d3/LICENSE), loaded as the global `d3`.

const graph = await d3.json("./data/graph.json");

function chart(graph) {
  // Specify the dimensions of the chart.
  const width = 1000;
  const height = 1000;

  // The force simulation mutates links and nodes, so work on copies.
  const links = graph.edges.map(d => ({...d}));
  const nodes = graph.nodes.map(d => ({...d}));

  // Create a simulation with several forces.
  const simulation = d3.forceSimulation(nodes)
      .force("center", d3.forceCenter(0, 0))
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody().distanceMax(100))
      .alphaDecay(0);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; background-color: black;");

  // Add a line for each link.
  const link = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-opacity", 0.3)
    .selectAll("line")
    .data(links)
    .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value ?? 1));

  // Add a text element for each node.
  const node = svg.append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
      .attr("style", "user-select: none; cursor: grab;")
      .attr("fill", "white")
      .attr("opacity", 0.5)
      .attr("font-size", "20px")
      .style("font-family", "sans-serif")
      .style("font-weight", "400")
      .attr("text-anchor", "middle")
      .text(d => d.token);

  node.append("title").text(d => d.id);

  // Add a drag behavior.
  node.call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  // Set the position attributes of links and nodes each time the simulation ticks.
  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("x", d => d.x)
        .attr("y", d => d.y);
  });

  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  // Let the simulation settle and unfix the subject once dragging ends.
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0.1);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  simulation.alpha(1).restart();

  return svg.node();
}

document.getElementById("chart").append(chart(graph));
